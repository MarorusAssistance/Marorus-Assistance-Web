import es from './es.json';
import en from './en.json';

const translations = { es, en } as const;

export type Locale = keyof typeof translations;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (typeof current !== 'object' || current === null) return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return 'es';
}

export function useTranslations(lang: Locale) {
  const dict = translations[lang] as Record<string, unknown>;
  return function t(key: string): string {
    return getNestedValue(dict, key);
  };
}

export function getLocalizedPath(path: string, lang: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return `/en${cleanPath}`;
  // Strip /en prefix for Spanish
  return cleanPath.replace(/^\/en/, '') || '/';
}
