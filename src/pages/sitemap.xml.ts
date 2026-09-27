import type { APIRoute } from 'astro';
import { defaultLang, langs, pathWithoutLocale, type Lang } from '../i18n';

// Dependency-free sitemap: lists every static .astro page except 404 and dynamic routes,
// with hreflang alternates for pages that exist in more than one language.
const pageFiles = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((f) => !f.includes('[') && !/\/404\.astro$/.test(f));

const toPath = (file: string) =>
  file
    .replace(/^\.\//, '/')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '/')
    .replace(/^(.+[^/])$/, '$1/');

const langOf = (path: string): Lang => {
  const first = path.split('/')[1];
  return langs.find((l) => l === first && l !== defaultLang) ?? defaultLang;
};

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://greibersalas.com';
  const paths = pageFiles.map(toPath);

  // Group localized variants by their locale-less path
  const groups = new Map<string, Map<Lang, string>>();
  for (const path of paths) {
    const key = pathWithoutLocale(path);
    if (!groups.has(key)) groups.set(key, new Map());
    groups.get(key)!.set(langOf(path), new URL(path, origin).href);
  }

  const urls = paths.map((path) => {
    const variants = groups.get(pathWithoutLocale(path))!;
    const alternates = variants.size > 1
      ? [...variants].map(([l, href]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${href}"/>`).join('')
        + (variants.has(defaultLang) ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${variants.get(defaultLang)}"/>` : '')
      : '';
    return `  <url>\n    <loc>${new URL(path, origin).href}</loc>${alternates}\n  </url>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
