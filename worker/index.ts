/**
 * Worker in front of the static site.
 *
 * - Static pages are served from ./dist by the assets layer; only /api/* reaches this code.
 * - POST /api/contact validates the form and enqueues it (contact-messages), answering at once.
 * - The queue consumer sends each message to the owner's inbox through Cloudflare Email Routing.
 *   A failed send is retried with backoff; after max_retries it lands in contact-messages-dlq.
 * - Every failure is written to KV (CONTACT_FAILED, key failed:<id>) with the last error, so a
 *   poison message leaves a durable trace even after the queue's own retention expires.
 */
import { EmailMessage } from 'cloudflare:email';

interface Env {
  ASSETS: Fetcher;
  CONTACT_QUEUE: Queue<ContactMessage>;
  CONTACT_FAILED: KVNamespace;
  EMAIL: SendEmail;
  MAIL_FROM: string;
  MAIL_TO: string;
}

type ContactType = 'team' | 'project' | 'general' | 'other';

interface ContactMessage {
  id: string;
  receivedAt: string;
  lang: 'es' | 'en';
  name: string;
  company?: string;
  email: string;
  type: ContactType;
  message: string;
}

interface FailureRecord {
  message: ContactMessage;
  attempts: number;
  lastError: string;
  status: 'retrying' | 'dead-letter';
  updatedAt: string;
}

const DLQ = 'contact-messages-dlq';
const TYPES: ContactType[] = ['team', 'project', 'general', 'other'];
const TYPE_LABEL: Record<ContactType, string> = {
  team: 'Refuerzo de equipo IT',
  project: 'Proyecto cerrado',
  general: 'Consulta general',
  other: 'Otro',
};
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const ALLOWED_HOSTS = ['marorusassistance.com', 'www.marorusassistance.com', 'localhost'];
const FAILED_TTL = 60 * 60 * 24 * 90; // 90 days

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

function allowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const host = new URL(origin).hostname;
  return ALLOWED_HOSTS.includes(host) || host.endsWith('.marorusassistance.workers.dev');
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function parseContact(body: Record<string, unknown>): Omit<ContactMessage, 'id' | 'receivedAt'> | null {
  const name = str(body.name, 120);
  const company = str(body.company, 160);
  const email = str(body.email, 254);
  const type = str(body.type, 20) as ContactType;
  const message = str(body.message, 5000);
  const lang = body.lang === 'en' ? 'en' : 'es';
  if (name.length < 2 || !EMAIL_RE.test(email) || !TYPES.includes(type) || message.length < 10) return null;
  return { lang, name, company: company || undefined, email, type, message };
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false }, 405);
  if (!allowedOrigin(request)) return json({ ok: false }, 403);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  // Honeypot: a field people never see. Bots that fill it get a fake success.
  if (str(body.website, 200)) return json({ ok: true }, 202);

  const contact = parseContact(body);
  if (!contact) return json({ ok: false }, 400);

  await env.CONTACT_QUEUE.send({ id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...contact });
  return json({ ok: true }, 202);
}

// --- Email (raw MIME, UTF-8, base64 so no user text can inject headers) ---

function b64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
const encodedWord = (text: string) => `=?UTF-8?B?${b64(text)}?=`;

function buildMime(m: ContactMessage, env: Env): string {
  const subject = `Web · ${TYPE_LABEL[m.type]} · ${m.name}${m.company ? ` (${m.company})` : ''}`;
  const text = [
    `Nombre: ${m.name}`,
    `Empresa: ${m.company ?? '-'}`,
    `Email: ${m.email}`,
    `Tipo: ${TYPE_LABEL[m.type]}`,
    `Idioma de la web: ${m.lang}`,
    `Recibido: ${m.receivedAt}`,
    `Id: ${m.id}`,
    '',
    m.message,
    '',
    '--',
    'Responde a este correo para contestar directamente.',
  ].join('\r\n');
  const body = b64(text).replace(/.{1,76}/g, '$&\r\n');
  const domain = env.MAIL_FROM.split('@')[1];
  return [
    `From: ${encodedWord("Web Maroru's Assistance")} <${env.MAIL_FROM}>`,
    `To: <${env.MAIL_TO}>`,
    `Reply-To: ${encodedWord(m.name)} <${m.email}>`,
    `Subject: ${encodedWord(subject)}`,
    `Message-ID: <${m.id}@${domain}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
}

async function recordFailure(env: Env, record: FailureRecord) {
  await env.CONTACT_FAILED.put(`failed:${record.message.id}`, JSON.stringify(record, null, 2), {
    expirationTtl: FAILED_TTL,
  });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },

  async queue(batch, env): Promise<void> {
    // Dead-letter queue: the message exhausted its retries. Keep it in KV and stop.
    if (batch.queue === DLQ) {
      for (const msg of batch.messages) {
        const previous = await env.CONTACT_FAILED.get<FailureRecord>(`failed:${msg.body.id}`, 'json');
        await recordFailure(env, {
          message: msg.body,
          attempts: previous?.attempts ?? msg.attempts,
          lastError: previous?.lastError ?? 'unknown',
          status: 'dead-letter',
          updatedAt: new Date().toISOString(),
        });
        console.error('contact message dead-lettered', msg.body.id);
        msg.ack();
      }
      return;
    }

    for (const msg of batch.messages) {
      try {
        await env.EMAIL.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, buildMime(msg.body, env)));
        if (msg.attempts > 1) await env.CONTACT_FAILED.delete(`failed:${msg.body.id}`);
        msg.ack();
      } catch (err) {
        const lastError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
        console.error('contact email failed', msg.body.id, msg.attempts, lastError);
        await recordFailure(env, {
          message: msg.body,
          attempts: msg.attempts,
          lastError,
          status: 'retrying',
          updatedAt: new Date().toISOString(),
        });
        msg.retry({ delaySeconds: Math.min(60 * 2 ** (msg.attempts - 1), 3600) });
      }
    }
  },
} satisfies ExportedHandler<Env, ContactMessage>;
