import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://greibersalas.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
