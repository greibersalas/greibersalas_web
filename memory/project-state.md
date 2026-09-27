# Project state

Living status of greibersalas.com. **Read at session start, update after every work block.** Decisions: [decisions.md](decisions.md).

## Status (last update 2026-09-27)
**Phase 1 is LIVE on IONOS** (release `release/greibersalas-web-2026-09-27-phase1.zip`) and verified by the user: contact form delivers mail, consent banner + Umami, WhatsApp, legal pages all work. `feature/phase-1` merged into `main` (local). Next: Phase 2 when the user is ready.

## Git
- `main`: Phase 1 live release (fast-forward merge of `feature/phase-1`). **Not pushed yet** — needs OK.
- `feature/site-upgrade`: pushed, fully merged — can be deleted.
- `feature/phase-1`: fully merged, local only — can be deleted.

## Done
- **Release 1 (live):** audit fixes, a11y, SEO, self-hosted fonts, optimized logo, Astro 7, i18n es/en, IONOS `.htaccess`, contact email greibersalas@gmail.com.
- **Phase 1 (live since 2026-09-27):**
  - `src/config.ts` central config (contact, WhatsApp +34 663 60 72 32, Umami, legal identity, consent).
  - Contact form (`ContactForm.astro`) with qualifying fields (project type, budget, timeline), privacy checkbox, honeypot, fill-time check; progressive enhancement (fetch + inline status, works without JS). Contact section redesigned: form + direct channels (email, WhatsApp, LinkedIn).
  - `public/api/contact.php`: validation (whitelists), honeypot/too-fast → fake success, rate limit 5/h per hashed IP (sys temp dir), CRLF stripping, UTF-8 mail via `mail()` From noreply@greibersalas.com + Reply-To visitor, JSON or HTML response. **Tested locally** with php -S + SMTP sink: 405/422/429/honeypot/no-JS/UTF-8/header-injection all OK.
  - About section (`About.astro`) with SVG portrait placeholder + bio + 3 highlights; nav link added (6 links → desktop nav collapses under 960px).
  - Floating WhatsApp button (`WhatsAppFab.astro`) with localized prefilled message.
  - Cookie consent (`CookieConsent.astro`): banner (accept/reject equal prominence + configure), settings `<dialog>`, `localStorage` `gs-consent` (12 months, versioned), Umami injected only after analytics consent, reload on withdrawal; footer "Configurar cookies" + button on cookie pages.
  - Legal pages es/en: `/aviso-legal/` ↔ `/en/legal-notice/`, `/privacidad/` ↔ `/en/privacy/`, `/cookies/` ↔ `/en/cookies/` (`LegalLayout.astro`; identity = name + "Barcelona, España" + email, NIF not published by owner's choice). Translated slugs via `routes` in `src/i18n/index.ts`; language switch, hreflang and sitemap handle them.
  - Footer with legal links; header anchors now `/#id` / `/en/#id` so they work from legal pages. JSON-LD adds telephone.
  - Umami click events via `data-umami-event` (contact-email, contact-whatsapp, contact-linkedin, whatsapp-fab) + `contact-form-sent`.

## Pending
1. Push `main` to GitHub (asked 2026-09-27). Optionally delete merged branches.
2. Enable HSTS in `public/.htaccess` (HTTPS works on the live site) in the next deploy.
3. User still to review About bio/highlights and legal texts (Claude-written templates: 12-month retention, processors IONOS/Google/Umami).
4. Replace SVG portrait with a real photo when available.
5. Phase 2: case studies, testimonials, FAQ (+ schema), engagement models. Phase 3: blog, lead magnet.
6. Optional: footer uses text mark `<GS/>` instead of logo image; delete merged branch `feature/site-upgrade`.

## How to produce a deployable build
`npm run build` → upload the **contents** of `dist/` (incl. hidden `.htaccess` and `api/contact.php`) to the IONOS document root. Zip with `tar -a -c -f release/<name>.zip -C dist .` (forward-slash paths; PowerShell 5.1 `Compress-Archive` uses backslashes).

## How to test the contact form locally
`npm run build`, then `php -d xdebug.mode=off -S 127.0.0.1:8099 -t dist` (add `-d SMTP=127.0.0.1 -d smtp_port=2525` with a local SMTP sink to capture mail). Run servers/requests from PowerShell (Bash tool hangs on network calls here).

## Session log
- 2026-09-27 (1): Audit; memory + implementer agent created.
- 2026-09-27 (2): Critical CSS scoping fix, headings, no-JS reveal, LinkedIn.
- 2026-09-27 (3): A11y / perf / SEO / hygiene backlog.
- 2026-09-27 (4): git + GitHub remote, Astro 7, self-hosted fonts, logo, English version, IONOS .htaccess; Phase 1 recommendations given.
- 2026-09-27 (5): Contact email → greibersalas@gmail.com; memory moved into repo (`CLAUDE.md`, `memory/`); first deployable build zipped in `release/`.
- 2026-09-27 (6): User deployed the build to IONOS and approved it. Merged `feature/site-upgrade` into `main`, pushed both branches.
- 2026-09-27 (7): Phase 1 implemented on `feature/phase-1` (form + PHP, About, WhatsApp, cookie consent, legal pages, Umami wiring). PHP handler tested locally. Waiting for NIF/address, Umami ID, IONOS mailbox, content review.
- 2026-09-27 (8): User chose not to publish NIF/DNI or full address → legal pages show name + "Barcelona, España" + email (LegalValue removed). Umami ID set (loaded only after consent). Phase 1 release zip built.
- 2026-09-27 (9): User deployed Phase 1 and confirmed everything works. Merged `feature/phase-1` into `main` (fast-forward).
