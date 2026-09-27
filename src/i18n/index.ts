import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

/**
 * Pages whose slug differs per language. Key = route id, value = slug (without locale prefix).
 * Pages not listed here use the same path in every language (e.g. the home page).
 */
export const routes = {
  legal: { es: 'aviso-legal', en: 'legal-notice' },
  privacy: { es: 'privacidad', en: 'privacy' },
  cookies: { es: 'cookies', en: 'cookies' },
} as const satisfies Record<string, Record<Lang, string>>;
export type RouteKey = keyof typeof routes;

/** Normalizes Astro.currentLocale into a supported language. */
export function getLang(locale: string | undefined): Lang {
  return locale && locale in languages ? (locale as Lang) : defaultLang;
}

/** The other language (the site has exactly two). */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/** Language encoded in a pathname ("/en/..." -> "en", anything else -> default). */
export function langFromPath(pathname: string): Lang {
  const first = pathname.split('/')[1];
  return langs.find((l) => l === first && l !== defaultLang) ?? defaultLang;
}

/** Strips the locale prefix from a pathname: "/en/foo/" -> "/foo/". */
export function pathWithoutLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  return first && first !== defaultLang && first in languages ? `/${rest.join('/')}` : pathname;
}

/** Route id of a pathname if it is a translated-slug page, e.g. "/en/privacy/" -> "privacy". */
export function routeKeyOf(pathname: string): RouteKey | undefined {
  const slug = pathWithoutLocale(pathname).replace(/^\/|\/$/g, '');
  const lang = langFromPath(pathname);
  return (Object.keys(routes) as RouteKey[]).find((k) => routes[k][lang] === slug);
}

/** Locale-less path of the same page in `lang`, translating slugs when needed. */
function translatedPath(pathname: string, lang: Lang): string {
  const key = routeKeyOf(pathname);
  return key ? `/${routes[key][lang]}/` : pathWithoutLocale(pathname);
}

/** Relative URL of the same page in another language. */
export function localizedPath(pathname: string, lang: Lang): string {
  return getRelativeLocaleUrl(lang, translatedPath(pathname, lang));
}

/** Absolute URL of the same page in another language. */
export function localizedUrl(pathname: string, lang: Lang): string {
  return getAbsoluteLocaleUrl(lang, translatedPath(pathname, lang));
}

/** Relative URL of a translated-slug page, e.g. routePath('privacy', 'en') -> "/en/privacy/". */
export function routePath(key: RouteKey, lang: Lang): string {
  return getRelativeLocaleUrl(lang, `/${routes[key][lang]}/`);
}

export const ogLocales: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };
