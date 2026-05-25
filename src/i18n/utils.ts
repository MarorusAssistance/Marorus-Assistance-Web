import es from './es.json';
import en from './en.json';

const translations = { es, en } as const;

export type Locale = keyof typeof translations;

export function t(locale: Locale, key: string): string {
  return (translations[locale] as Record<string, string>)[key] ?? key;
}
