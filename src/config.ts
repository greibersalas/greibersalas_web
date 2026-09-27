// Site-wide configuration: contact channels, analytics and legal identity.
// Values used by both languages live here; translatable copy lives in src/i18n/ui.ts.

export const contact = {
  email: 'greibersalas@gmail.com',
  linkedin: 'https://www.linkedin.com/in/greibersalas/',
  whatsapp: {
    /** E.164 digits without "+", as required by wa.me links. */
    number: '34663607232',
    display: '+34 663 60 72 32',
  },
} as const;

/** Endpoint of the PHP form handler (public/api/contact.php, runs on IONOS). */
export const contactEndpoint = '/api/contact.php';

export const analytics = {
  /**
   * Umami Cloud website ID. Leave empty to disable analytics entirely.
   * TODO: set it after creating the site in https://cloud.umami.is
   */
  umamiWebsiteId: '',
  umamiSrc: 'https://cloud.umami.is/script.js',
} as const;

/**
 * Legal identity for the legal notice (LSSI-CE art. 10) and privacy policy (RGPD art. 13).
 * TODO: fill `nif` and `address` — both are legally required in Spain for a professional website.
 */
export const legal = {
  owner: 'Greiber Salas',
  nif: '',
  address: '',
  email: contact.email,
  domain: 'greibersalas.com',
  /** Date shown as "last updated" on the legal pages (YYYY-MM-DD). */
  updated: '2026-09-27',
} as const;

/** Consent is stored in localStorage under this key; bump `version` to re-ask everyone. */
export const consentConfig = {
  storageKey: 'gs-consent',
  version: 1,
  /** Consent older than this is requested again (AEPD recommends renewing at least every 24 months). */
  maxAgeDays: 365,
} as const;
