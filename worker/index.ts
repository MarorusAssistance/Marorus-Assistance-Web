/**
 * Worker in front of the static site.
 *
 * - Static pages are served from ./dist by the assets layer; only /api/* reaches this code.
 * - POST /api/contact checks origin, rate limit, Turnstile and the fields, then emails the
 *   message to the owner's inbox through Cloudflare Email Routing, right away.
 * - If sending fails the visitor sees an error with the phone and email to reach out directly;
 *   the failure is logged (Workers Logs) without the message content.
 */
import { EmailMessage } from 'cloudflare:email';

interface Env {
  ASSETS: Fetcher;
  EMAIL: SendEmail;
  CONTACT_LIMIT: RateLimit;
  TURNSTILE_SECRET: string;
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

const TYPES: ContactType[] = ['team', 'project', 'general', 'other'];
const TYPE_LABEL: Record<ContactType, string> = {
  team: 'Refuerzo de equipo IT',
  project: 'Proyecto cerrado',
  general: 'Consulta general',
  other: 'Otro',
};
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const ALLOWED_HOSTS = ['marorusassistance.com', 'www.marorusassistance.com', 'localhost'];

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

async function verifyTurnstile(token: string, ip: string | null, secret: string): Promise<boolean> {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
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

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ ok: false }, 405);
  if (!allowedOrigin(request)) return json({ ok: false }, 403);

  const ip = request.headers.get('cf-connecting-ip');
  const { success: underLimit } = await env.CONTACT_LIMIT.limit({ key: ip ?? 'unknown' });
  if (!underLimit) return json({ ok: false, error: 'rate-limited' }, 429);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  // Honeypot: a field people never see. Bots that fill it get a fake success.
  if (str(body.website, 200)) return json({ ok: true });

  const contact = parseContact(body);
  if (!contact) return json({ ok: false }, 400);

  if (!(await verifyTurnstile(str(body.turnstile, 4096), ip, env.TURNSTILE_SECRET))) {
    return json({ ok: false, error: 'challenge' }, 403);
  }

  const message: ContactMessage = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...contact };
  try {
    await env.EMAIL.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, buildMime(message, env)));
  } catch (err) {
    console.error('contact email failed', message.id, err instanceof Error ? `${err.name}: ${err.message}` : String(err));
    return json({ ok: false, error: 'send' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
