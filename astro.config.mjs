import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://greibersalas.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  // Spanish at "/", English at "/en/"
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false }
  }
});
