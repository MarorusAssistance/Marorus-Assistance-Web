import { useRef, useState } from 'react';
import { z } from 'zod';

type Locale = 'es' | 'en';

interface FieldLabels {
  name: string;
  company: string;
  email: string;
  type: string;
  typeOptions: { team: string; project: string; general: string; other: string };
  message: string;
  privacy: string;
}

interface FormLabels {
  submit: string;
  submitting: string;
  success: string;
  error: string;
  microcopy: string;
  privacyLink: string;
  anotherMessage: string;
}

interface Props {
  lang: Locale;
  fields: FieldLabels;
  labels: FormLabels;
  privacyUrl: string;
  turnstileSiteKey: string;
}

// Cloudflare Turnstile (anti-bot). Loaded only once someone starts filling the form;
// runs invisibly and shows a check only when Cloudflare is unsure.
type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window { turnstile?: Turnstile }
}
let turnstileLoading: Promise<Turnstile> | null = null;
function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  turnstileLoading ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
    s.onerror = () => { turnstileLoading = null; reject(new Error('turnstile')); };
    document.head.appendChild(s);
  });
  return turnstileLoading;
}

type FormValues = {
  name: string;
  company: string;
  email: string;
  type: string;
  message: string;
  privacy: boolean;
};

const EMPTY: FormValues = { name: '', company: '', email: '', type: '', message: '', privacy: false };
const HONEYPOT = 'website';

export default function ContactForm({ lang, fields, labels, privacyUrl, turnstileSiteKey }: Props) {
  const challengeRef = useRef<HTMLDivElement>(null);

  const getToken = async (): Promise<string> => {
    const ts = await loadTurnstile();
    return new Promise((resolve, reject) => {
      const el = challengeRef.current;
      if (!el) return reject(new Error('turnstile'));
      const id = ts.render(el, {
        sitekey: turnstileSiteKey,
        language: lang,
        execution: 'execute',
        appearance: 'interaction-only',
        callback: (token: string) => { resolve(token); setTimeout(() => ts.remove(id), 0); },
        'error-callback': () => { reject(new Error('turnstile')); ts.remove(id); },
      });
      ts.execute(id);
    });
  };

  const err = lang === 'es'
    ? {
        nameMin: 'Mínimo 2 caracteres',
        emailInvalid: 'Email no válido',
        typeRequired: 'Selecciona una opción',
        messageMin: 'Mínimo 10 caracteres',
        privacyRequired: 'Debes aceptar la política de privacidad',
      }
    : {
        nameMin: 'Minimum 2 characters',
        emailInvalid: 'Invalid email',
        typeRequired: 'Please select an option',
        messageMin: 'Minimum 10 characters',
        privacyRequired: 'You must accept the privacy policy',
      };

  const schema = z.object({
    name: z.string().min(2, err.nameMin),
    company: z.string().optional(),
    email: z.string().email(err.emailInvalid),
    type: z.enum(['team', 'project', 'general', 'other'], { errorMap: () => ({ message: err.typeRequired }) }),
    message: z.string().min(10, err.messageMin),
    privacy: z.boolean().refine((v) => v === true, { message: err.privacyRequired }),
  });

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const newVal = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setValues((prev) => ({ ...prev, [name]: newVal }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormValues;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStatus('submitting');
    try {
      // Our own endpoint (worker/index.ts): checks the request and emails the message
      const honeypot = (e.currentTarget as HTMLFormElement).elements.namedItem(HONEYPOT) as HTMLInputElement | null;
      const turnstile = await getToken();
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          name: values.name,
          company: values.company || undefined,
          email: values.email,
          type: values.type,
          message: values.message,
          website: honeypot?.value ?? '',
          turnstile,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-transparent border-0 border-b border-ink-muted rounded-none px-0 py-3 font-body text-lg text-ink placeholder:text-ink-muted focus:outline-none focus:border-primary transition-colors';

  const labelBase = 'block font-body text-sm text-ink-muted';
  const errorBase = 'mt-1.5 font-body text-sm text-primary';

  if (status === 'success') {
    return (
      <div className="py-10 text-center">
        <p className="font-display text-4xl text-ink">{labels.success}</p>
        <button
          type="button"
          onClick={() => { setValues(EMPTY); setStatus('idle'); setErrors({}); }}
          className="mt-6 font-body text-base text-ink underline hover:text-primary"
        >
          {labels.anotherMessage}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocusCapture={() => { loadTurnstile().catch(() => {}); }} noValidate className="flex flex-col gap-7">
      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      {/* Nombre */}
      <div>
        <label htmlFor="cf-name" className={labelBase}>{fields.name} *</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-error' : undefined}
          className={inputBase}
        />
        {errors.name && <p id="cf-name-error" className={errorBase}>{errors.name}</p>}
      </div>

      {/* Empresa */}
      <div>
        <label htmlFor="cf-company" className={labelBase}>{fields.company}</label>
        <input
          id="cf-company"
          name="company"
          type="text"
          value={values.company}
          onChange={handleChange}
          autoComplete="organization"
          className={inputBase}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className={labelBase}>{fields.email} *</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'cf-email-error' : undefined}
          className={inputBase}
        />
        {errors.email && <p id="cf-email-error" className={errorBase}>{errors.email}</p>}
      </div>

      {/* Tipo */}
      <div>
        <label htmlFor="cf-type" className={labelBase}>{fields.type} *</label>
        <select
          id="cf-type"
          name="type"
          value={values.type}
          onChange={handleChange}
          aria-invalid={!!errors.type}
          aria-describedby={errors.type ? 'cf-type-error' : undefined}
          className={`${inputBase} cursor-pointer`}
        >
          <option value="" disabled>{lang === 'es' ? 'Selecciona una opción' : 'Select an option'}</option>
          <option value="team">{fields.typeOptions.team}</option>
          <option value="project">{fields.typeOptions.project}</option>
          <option value="general">{fields.typeOptions.general}</option>
          <option value="other">{fields.typeOptions.other}</option>
        </select>
        {errors.type && <p id="cf-type-error" className={errorBase}>{errors.type}</p>}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="cf-message" className={labelBase}>{fields.message} *</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          className={`${inputBase} resize-y`}
        />
        {errors.message && <p id="cf-message-error" className={errorBase}>{errors.message}</p>}
      </div>

      {/* Privacidad */}
      <div>
        <label className="flex gap-3 items-start cursor-pointer">
          <input
            name="privacy"
            type="checkbox"
            checked={values.privacy}
            onChange={handleChange}
            aria-invalid={!!errors.privacy}
            aria-describedby={errors.privacy ? 'cf-privacy-error' : undefined}
            className="mt-0.5 shrink-0 w-4 h-4 accent-primary cursor-pointer"
          />
          <span className="font-body text-sm text-ink-muted leading-snug">
            {fields.privacy}
          </span>
        </label>
        {errors.privacy && <p id="cf-privacy-error" className={`${errorBase} mt-2`}>{errors.privacy}</p>}
      </div>

      {/* Turnstile shows a check here only if Cloudflare needs one */}
      <div ref={challengeRef} />

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="self-start inline-flex items-center h-12 px-8 bg-primary text-paper font-body text-base hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {status === 'submitting' ? labels.submitting : labels.submit}
      </button>

      {/* Error global */}
      {status === 'error' && (
        <p className="font-body text-sm text-primary">{labels.error}</p>
      )}

      {/* Microcopy */}
      <p className="font-body text-sm text-ink-muted">
        {labels.microcopy}{' '}
        <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline hover:text-primary">
          {labels.privacyLink}
        </a>
      </p>
    </form>
  );
}
