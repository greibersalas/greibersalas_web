import type { APIRoute } from 'astro';

// Dependency-free sitemap: lists every static .astro page except 404 and dynamic routes.
const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));

const toPath = (file: string) =>
  file
    .replace(/^\.\//, '/')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '/')
    .replace(/^(.+[^/])$/, '$1/');

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://greibersalas.com';
  const urls = pageFiles
    .filter((f) => !f.includes('[') && !/\/404\.astro$/.test(f))
    .map((f) => `  <url><loc>${new URL(toPath(f), origin).href}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
