import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

/** Normalizes Astro.currentLocale into a supported language. */
export function getLang(locale: string | undefined): Lang {
  return locale && locale in languages ? (locale as Lang) : defaultLang;
}

/** The other language (the site has exactly two). */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/** Strips the locale prefix from a pathname: "/en/foo/" -> "/foo/". */
export function pathWithoutLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  return first && first !== defaultLang && first in languages ? `/${rest.join('/')}` : pathname;
}

/** Relative URL of the same page in another language. */
export function localizedPath(pathname: string, lang: Lang): string {
  return getRelativeLocaleUrl(lang, pathWithoutLocale(pathname));
}

/** Absolute URL of the same page in another language. */
export function localizedUrl(pathname: string, lang: Lang): string {
  return getAbsoluteLocaleUrl(lang, pathWithoutLocale(pathname));
}

export const ogLocales: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };
