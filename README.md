# greibersalas.com

Marketing / portfolio site for Greiber Salas, full-stack software developer. Static site built with [Astro](https://astro.build) 7, bilingual: Spanish at `/` (default) and English at `/en/`. Code and docs are in English.

## Commands

Requires Node.js >= 22.12.

| Command           | Action                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the static site into `dist/`       |
| `npm run preview` | Serve the production build locally       |

## Structure

```
src/
  layouts/Base.astro       # <head>, SEO meta, hreflang, JSON-LD, global CSS, reveal observer
  pages/index.astro        # Spanish home  (/)
  pages/en/index.astro     # English home  (/en/)
  pages/404.astro          # Bilingual not-found page (noindex)
  pages/{aviso-legal,privacidad,cookies}.astro, pages/en/{legal-notice,privacy,cookies}.astro  # Legal pages (Spain: LSSI-CE, RGPD)
  pages/sitemap.xml.ts     # Dependency-free sitemap with hreflang alternates
  components/HomePage.astro# Home body shared by both locales
  components/              # Header, Hero, Services, Stack, Projects, About, Process, Contact, ContactForm,
                           # CookieConsent, WhatsAppFab, Footer, Logo, LegalValue
  layouts/LegalLayout.astro# Shared layout for legal pages
  config.ts                # Contact channels, Umami ID, legal identity (NIF/address), consent settings
  i18n/index.ts            # Languages, translated routes, helpers (getLang, localizedPath, routePath)
  i18n/ui.ts               # UI strings per language (headings, nav, a11y labels, meta)
  data/site.ts             # Content lists per language (services, stack, projects, steps, hero code)
  assets/logo-mark.png     # Brand mark source, optimized to WebP by astro:assets
  styles/fonts.css         # Self-hosted @font-face declarations
  styles/global.css        # Design tokens + shared classes
public/
  fonts/                   # Clash Display, Satoshi (Fontshare ITF FFL), JetBrains Mono (OFL)
  .htaccess                # Apache config for IONOS (404, HTTPS/non-www, caching, headers)
  api/contact.php          # Contact form handler (PHP >= 8.1): validation, honeypot, rate limit, mail()
  robots.txt, favicon.png, og-image.png
design/logo-original.jpg   # Original logo master (not deployed)
```

## Conventions

- **Copy lives in `src/i18n/ui.ts` and `src/data/site.ts`**, never hardcoded in components. Spanish (`es`) is the source of truth; the `UI` / `SiteContent` types force English to provide the same keys.
- **Language detection:** components call `getLang(Astro.currentLocale)`. Section anchor ids are localized (`ui[lang].ids`).
- **Global vs scoped CSS:** `<style>` blocks in `.astro` files are scoped to that component. Anything shared by several components (`.container`, `.btn`, `.tag-label`, `.sec-title`, `.reveal`, …) belongs in `src/styles/global.css`, imported from `Base.astro` frontmatter. Style elements rendered by a child component with `:global()`.
- **Design tokens:** use the CSS variables in `:root` (`--gs-blue`, `--gs-cyan`, `--surface`, `--line`, `--text-2`, …) instead of hardcoded colors.
- **Reveal animations:** add the `reveal` class; elements are only hidden when JS is running (`html.js`) and are shown immediately for `prefers-reduced-motion`.
- **Accessibility:** new animations must respect `prefers-reduced-motion`; interactive elements need keyboard support and visible focus (global `:focus-visible` style).

## Deploy (IONOS)

The site is fully static. Hosting target: IONOS webspace (Apache).

1. `npm run build`
2. Upload the **contents** of `dist/` (including the hidden `.htaccess`) to the webspace document root via SFTP.
   Alternatively connect the GitHub repo with IONOS *Deploy Now* (framework: Astro, build command `npm run build`, output `dist`).
3. After HTTPS is confirmed working, uncomment the `Strict-Transport-Security` header in `public/.htaccess`.

### Before a release
- `src/config.ts`: legal identity (`legal.*`; NIF is intentionally not published, see `memory/decisions.md`) and `analytics.umamiWebsiteId`.
- IONOS panel: PHP >= 8.1 for the webspace; create the mailbox `noreply@greibersalas.com` (sender of the contact form) so mail is relayed and not flagged as spoofed.
- The contact form only works on the server (Astro dev doesn't run PHP). Test locally with `php -S 127.0.0.1:8099 -t dist` after a build.

### Privacy / consent
Nothing optional loads before consent. The banner stores the choice in `localStorage` (`gs-consent`, 12 months) and only then injects Umami. Any new third-party script, embed or cookie must be added as a consent category in `CookieConsent.astro` and documented in the cookie policy pages.
