# CLAUDE.md

Guidance for Claude Code in this repository.

## Start of every session
1. Read [`memory/project-state.md`](memory/project-state.md) — current status, pending work, session log.
2. Skim [`memory/decisions.md`](memory/decisions.md) for decisions already taken (don't re-ask them).
3. Give the user a short summary (in Spanish) of where we left off.

## Working rules
- **Reply to the user in Spanish.** All code, comments, docs, memory files and commit messages in **English**.
- **Always keep `memory/project-state.md` up to date**: after every meaningful change (feature done, bug fixed, decision taken, task paused) update status, move items between sections and add a dated line to the session log. New decisions go to `memory/decisions.md`. Use absolute dates (YYYY-MM-DD).
- The site is **bilingual**: every copy change must be made in both languages (`src/i18n/ui.ts`, `src/data/site.ts`).
- Don't invent content (clients, metrics, testimonials, URLs, legal data) — ask the user.
- Verify with `npm run build` after changes; delete `dist/` afterwards unless a deployable build was requested.
- Implementation of scoped tasks can be delegated to the `implementer` agent (`.claude/agents/implementer.md`, Sonnet 5, effort high).

## Git
- Identity: `Greiber Salas <greibersalas@gmail.com>` (repo-local config). Remote `origin`: https://github.com/greibersalas/greibersalas_web.git
- Work on feature branches; commit per logical step; **never push without the user's explicit OK**.
- On Windows/PowerShell write the commit message to a temp file and use `git commit -F <file>`.
- End commit messages with the `Co-Authored-By` trailer given by the harness.

## Project summary
Marketing / portfolio site for Greiber Salas (freelance full-stack developer: Angular, NestJS, PHP, PostgreSQL/MySQL, AI products). **Goal: win clients.** Domain https://greibersalas.com, hosted on **IONOS** webspace (Apache; PHP available).

- **Stack:** Astro 7 static site, Node >= 22.12, no UI/CSS framework, TypeScript strict.
- **i18n:** Spanish at `/` (default), English at `/en/`. Components call `getLang(Astro.currentLocale)`; UI strings in `src/i18n/ui.ts`, content lists in `src/data/site.ts`.
- **Structure, conventions and deploy steps:** see [`README.md`](README.md).
- **Contact:** greibersalas@gmail.com · LinkedIn https://www.linkedin.com/in/greibersalas/

## Key files
- `src/config.ts` — contact channels (email, WhatsApp +34 663 60 72 32, LinkedIn), Umami Website ID, legal identity (NIF/address), consent settings.
- `public/api/contact.php` — contact form handler on IONOS (PHP >= 8.1). Astro dev doesn't run PHP; test with `php -S` over `dist/`.
- `src/components/CookieConsent.astro` — consent banner/dialog; the only place optional scripts (Umami) are loaded.

## Gotchas
- Astro `<style>` blocks are **scoped** to their component. Shared classes live in `src/styles/global.css` (imported in `Base.astro` frontmatter). Style elements rendered by a child component with `:global()`.
- `.reveal` elements are only hidden when `html.js` is set; all motion must respect `prefers-reduced-motion`.
- Hero float cards ("UPTIME 99.9%", "DEPLOY") are intentionally decorative.
- Nothing optional (analytics, embeds, third-party scripts) may load before consent. New ones need a consent category + an entry in both cookie policy pages.
- Legal pages are templates written by Claude, not legal advice; any change to data processing (new form fields, new providers) must be reflected in both privacy policy pages.
- Pages with translated slugs must be registered in `routes` (`src/i18n/index.ts`) so the language switch, hreflang and sitemap pair them.
- PowerShell 5.1 reads `.ps1` files without BOM as ANSI — build non-ASCII test strings with `[char]` codes.
