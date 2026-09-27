# Project state

Living status of greibersalas.com. **Read at session start, update after every work block.** Decisions: [decisions.md](decisions.md).

## Status (last update 2026-09-27)
**Site is live on IONOS** (build `release/greibersalas-web-2026-09-27.zip`) and approved by the user ("perfecta"). `feature/site-upgrade` merged into `main` and both pushed to GitHub. Next: **Phase 1 (client acquisition)** once the user provides content/choices.

## Git
- `main` (pushed, tracks `origin/main`): baseline + Astro 7 + fonts/logo + i18n/.htaccess + email/memory (fast-forward merge of `feature/site-upgrade`).
- `feature/site-upgrade`: pushed to origin; fully merged — can be deleted later.
- Next work: new branch per feature off `main` (e.g. `feature/phase-1-...`).

## Done
- **Audit fixes:** global CSS was scoped to Base (nothing shared applied) → imported in frontmatter; `.sec-title/.sec-sub` global; `.reveal` gated behind `html.js`; LinkedIn URL.
- **A11y:** global `prefers-reduced-motion`, reduced-motion typing/marquee, skip link, `:focus-visible`, accessible burger (aria-expanded, Escape, outside click), decorative hero `aria-hidden`.
- **SEO:** canonical per page, hreflang + x-default, og:locale, JSON-LD Person, `robots.txt`, sitemap with hreflang alternates, bilingual 404 (noindex).
- **Perf:** self-hosted fonts with preload; logo optimized to WebP 1x/2x (145 KB → 1–6 KB).
- **Platform:** Astro 7.3.5, Node >= 22.12, tsconfig strict, README, .gitignore/.gitattributes.
- **i18n:** es `/`, en `/en/`, language switch, localized anchors.
- **Hosting:** `public/.htaccess` for IONOS (404, HTTPS + non-www redirect, compression, caching, security headers; HSTS commented until HTTPS is verified).
- **Contact email** changed to greibersalas@gmail.com.

## Pending
1. Confirm HTTPS works on the live domain, then uncomment HSTS in `public/.htaccess` (next deploy).
2. **Phase 1 — client acquisition** (recommended, not started). Needs from the user:
   - Legal pages (Aviso legal, Privacidad, Cookies — LSSI/RGPD): fiscal data.
   - Contact form with qualifying fields + honeypot: PHP handler on IONOS vs external service (Web3Forms/Formspree).
   - Booking CTA (Cal.com account?), WhatsApp number?
   - About section: photo + short bio.
   - Cookieless analytics: Plausible / Umami / Cloudflare.
3. Phase 2: case studies, testimonials, FAQ (+ schema), engagement models. Phase 3: blog, lead magnet.
4. Footer still shows the text mark `<GS/>` (logo image not used there) — optional.

## How to produce a deployable build
`npm run build` → upload the **contents** of `dist/` (incl. hidden `.htaccess`) to the IONOS document root. Zip with `tar -a -c -f release/<name>.zip -C dist .` (forward-slash paths; PowerShell 5.1 `Compress-Archive` uses backslashes).

## Session log
- 2026-09-27 (1): Audit; memory + implementer agent created.
- 2026-09-27 (2): Critical CSS scoping fix, headings, no-JS reveal, LinkedIn.
- 2026-09-27 (3): A11y / perf / SEO / hygiene backlog.
- 2026-09-27 (4): git + GitHub remote, Astro 7, self-hosted fonts, logo, English version, IONOS .htaccess; Phase 1 recommendations given.
- 2026-09-27 (5): Contact email → greibersalas@gmail.com; memory moved into repo (`CLAUDE.md`, `memory/`); first deployable build zipped in `release/`.
- 2026-09-27 (6): User deployed the build to IONOS and approved it. Merged `feature/site-upgrade` into `main`, pushed both branches.
