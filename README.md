# greibersalas.com

Marketing / portfolio site for Greiber Salas, full-stack software developer. Static one-page site built with [Astro](https://astro.build). Visible copy is in Spanish; code and docs are in English.

## Commands

| Command           | Action                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the static site into `dist/`       |
| `npm run preview` | Serve the production build locally       |

## Structure

```
src/
  layouts/Base.astro      # <head>, SEO meta, JSON-LD, global CSS import, reveal observer
  pages/index.astro       # Home: composes all sections
  pages/404.astro         # Not-found page (noindex)
  pages/sitemap.xml.ts    # Dependency-free sitemap endpoint
  components/             # Header, Hero, Services, Stack, Projects, Process, Contact, Footer
  data/site.ts            # Content for services, stack, projects and process steps
  styles/global.css       # Design tokens + shared classes
public/                   # favicon, og-image, robots.txt
```

## Conventions

- **Content** lives in `src/data/site.ts`; edit copy there, not in components.
- **Global vs scoped CSS:** `<style>` blocks in `.astro` files are scoped to that component. Anything shared by several components (`.container`, `.btn`, `.tag-label`, `.sec-title`, `.reveal`, …) belongs in `src/styles/global.css`, which is imported from `Base.astro` frontmatter so it stays global.
- **Design tokens:** use the CSS variables in `:root` (`--gs-blue`, `--gs-cyan`, `--surface`, `--line`, `--text-2`, …) instead of hardcoded colors.
- **Reveal animations:** add the `reveal` class; elements are only hidden when JS is running (`html.js`) and are shown immediately for `prefers-reduced-motion`.
- **Accessibility:** new animations must respect `prefers-reduced-motion`; interactive elements need keyboard support and visible focus (global `:focus-visible` style).
