import { useState } from 'react';
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

export default function ContactForm({ lang, fields, labels, privacyUrl }: Props) {
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
      const res = await fetch('https://formspree.io/f/xwvveolo', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          company: values.company || undefined,
          email: values.email,
          type: values.type,
          message: values.message,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-white border border-[#d4cfc5] rounded-md px-4 py-3 font-body text-base text-[#0a0a0a] placeholder-[#9ca3af] focus:outline-none focus:border-[#b80000] focus:ring-1 focus:ring-[#b80000] transition-colors';

  const labelBase = 'block font-body text-sm text-[#0a0a0a] mb-1.5';
  const errorBase = 'mt-1.5 font-body text-xs text-red-600';

  if (status === 'success') {
    return (
      <div className="py-10 text-center">
        <p className="font-body text-base text-[#0a0a0a]">{labels.success}</p>
        <button
          type="button"
          onClick={() => { setValues(EMPTY); setStatus('idle'); setErrors({}); }}
          className="mt-4 font-body text-sm text-[#b80000] hover:underline"
        >
          {labels.anotherMessage}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
            className="mt-0.5 shrink-0 w-4 h-4 border border-[#d4cfc5] rounded accent-[#b80000] cursor-pointer"
          />
          <span className="font-body text-sm text-[#5a5550] leading-snug">
            {fields.privacy}{' '}
            <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="text-[#b80000] hover:underline">
              →
            </a>
          </span>
        </label>
        {errors.privacy && <p id="cf-privacy-error" className={`${errorBase} mt-2`}>{errors.privacy}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#b80000] text-white font-display font-bold text-base py-3.5 rounded-md hover:bg-[#8a0000] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'submitting' ? labels.submitting : labels.submit}
      </button>

      {/* Error global */}
      {status === 'error' && (
        <p className="font-body text-sm text-red-600 text-center">{labels.error}</p>
      )}

      {/* Microcopy */}
      <p className="font-body text-xs text-[#5a5550] text-center">
        {labels.microcopy}{' '}
        <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[#b80000] hover:underline">
          {labels.privacyLink}
        </a>
      </p>
    </form>
  );
}
