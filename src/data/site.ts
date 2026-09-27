// Site content per language. User-facing copy only; keep identifiers and comments in English.
import type { Lang } from '../i18n';

export interface Service { n: string; t: string; d: string; icon: string; }
export interface Project { tag: string; title: string; desc: string; tech: string[]; snippet: string; }
export interface Step { n: string; t: string; d: string; }
export interface SiteContent {
  services: Service[];
  stackRows: string[][];
  projects: Project[];
  steps: Step[];
  /** Hero editor lines as highlighted HTML (spans: cm, kw, ty, fn, str). */
  heroCode: string[];
}

// Builds the decorative hero snippet with localized words
const heroCode = (comment: string, product: string, quality: string, value: string) => [
  `<span class="cm">// ${comment}</span>`,
  '<span class="kw">export class</span> <span class="ty">PlatformService</span> {',
  '  <span class="kw">constructor</span>(<span class="kw">private</span> api: <span class="ty">ApiClient</span>) {}',
  '',
  `  <span class="kw">async</span> <span class="fn">build</span>(idea: <span class="ty">Idea</span>): <span class="ty">Promise</span>&lt;<span class="ty">${product}</span>&gt; {`,
  '    <span class="kw">const</span> plan = <span class="kw">await</span> <span class="fn">scope</span>(idea);',
  `    <span class="kw">return</span> <span class="fn">deploy</span>(plan, { ${quality}: <span class="str">"${value}"</span> });`,
  '  }',
  '}',
];

const es: SiteContent = {
  services: [
    { n: '01', t: 'Aplicaciones web a medida', d: 'Plataformas SaaS y paneles de gestión con Angular y NestJS. Arquitectura escalable, multi-tenant y lista para crecer sin reescribir.', icon: '◈' },
    { n: '02', t: 'Portales y soluciones B2B', d: 'Digitalizo procesos de pedidos, catálogos e integraciones con ERP. Convierto flujos manuales y caóticos en sistemas eficientes.', icon: '⬡' },
    { n: '03', t: 'APIs y backend robusto', d: 'Diseño de APIs REST con NestJS o PHP, modelado de datos en PostgreSQL/MySQL, autenticación, seguridad y rendimiento.', icon: '⟐' },
    { n: '04', t: 'Productos digitales con IA', d: 'Integración de IA en flujos de trabajo y productos: desde herramientas internas hasta micro-SaaS para profesionales.', icon: '✦' },
  ],
  // Two marquee rows, scrolling in opposite directions
  stackRows: [
    ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'RxJS', 'Signals', 'REST API'],
    ['PHP', 'CodeIgniter', 'MySQL', 'WebSocket', 'JWT', 'Node.js', 'IA / LLMs'],
  ],
  projects: [
    { tag: 'SaaS · Hostelería', title: 'Sistema TPV / Backoffice web', desc: 'Plataforma de gestión para el sector hostelero: pedidos en tiempo real, caja, catálogo y reporting. Arquitectura modular, multi-tenant y eventos en vivo.', tech: ['Angular', 'Signals', 'WebSocket', 'REST'], snippet: 'KDS › evento recibido › mesa #12 ✓' },
    { tag: 'B2B · Distribución', title: 'Portal de pedidos B2B', desc: 'Digitalización del proceso de pedidos de un distribuidor: portal mobile-first, recompra en un clic, precios dinámicos e integración con ERP.', tech: ['Angular', 'NestJS', 'ERP', 'PostgreSQL'], snippet: 'POST /orders › 200 OK › 142ms' },
    { tag: 'Producto · IA', title: 'Productos digitales con IA', desc: 'Línea de productos de productividad y bienestar para profesionales, con prompts y flujos asistidos por IA integrados de forma nativa.', tech: ['IA / LLMs', 'Automatización', 'Contenido'], snippet: 'ai.generate() › output ready ✦' },
  ],
  steps: [
    { n: '01', t: 'Descubrimiento', d: 'Entiendo tu negocio y tus objetivos antes de escribir una línea de código. Defino alcance y prioridades juntos.' },
    { n: '02', t: 'Arquitectura', d: 'Diseño la base técnica: stack, modelo de datos e integraciones. Decisiones que evitan reescrituras costosas.' },
    { n: '03', t: 'Desarrollo iterativo', d: 'Construyo en ciclos cortos con entregas visibles. Ves el avance real, no promesas.' },
    { n: '04', t: 'Despliegue y soporte', d: 'Pongo el sistema en producción con calidad y te acompaño después. El proyecto no termina en el deploy.' },
  ],
  heroCode: heroCode('Arquitectura pensada para escalar', 'Producto', 'calidad', 'producción'),
};

const en: SiteContent = {
  services: [
    { n: '01', t: 'Custom web applications', d: 'SaaS platforms and admin dashboards built with Angular and NestJS. Scalable, multi-tenant architecture ready to grow without rewrites.', icon: '◈' },
    { n: '02', t: 'B2B portals and solutions', d: 'I digitize ordering processes, catalogs and ERP integrations, turning manual, chaotic workflows into efficient systems.', icon: '⬡' },
    { n: '03', t: 'Robust APIs and backends', d: 'REST API design with NestJS or PHP, data modeling in PostgreSQL/MySQL, authentication, security and performance.', icon: '⟐' },
    { n: '04', t: 'AI-powered digital products', d: 'AI built into workflows and products: from internal tools to micro-SaaS for professionals.', icon: '✦' },
  ],
  stackRows: [
    ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'RxJS', 'Signals', 'REST API'],
    ['PHP', 'CodeIgniter', 'MySQL', 'WebSocket', 'JWT', 'Node.js', 'AI / LLMs'],
  ],
  projects: [
    { tag: 'SaaS · Hospitality', title: 'POS system / Web back office', desc: 'Management platform for the hospitality sector: real-time orders, cash register, catalog and reporting. Modular, multi-tenant architecture with live events.', tech: ['Angular', 'Signals', 'WebSocket', 'REST'], snippet: 'KDS › event received › table #12 ✓' },
    { tag: 'B2B · Distribution', title: 'B2B ordering portal', desc: "Digitized a distributor's ordering process: mobile-first portal, one-click reordering, dynamic pricing and ERP integration.", tech: ['Angular', 'NestJS', 'ERP', 'PostgreSQL'], snippet: 'POST /orders › 200 OK › 142ms' },
    { tag: 'Product · AI', title: 'AI-powered digital products', desc: 'A line of productivity and wellbeing products for professionals, with AI-assisted prompts and workflows built in natively.', tech: ['AI / LLMs', 'Automation', 'Content'], snippet: 'ai.generate() › output ready ✦' },
  ],
  steps: [
    { n: '01', t: 'Discovery', d: 'I understand your business and goals before writing a single line of code. We define scope and priorities together.' },
    { n: '02', t: 'Architecture', d: 'I design the technical foundation: stack, data model and integrations. Decisions that prevent costly rewrites.' },
    { n: '03', t: 'Iterative development', d: 'I build in short cycles with visible deliverables. You see real progress, not promises.' },
    { n: '04', t: 'Deployment and support', d: "I ship the system to production with quality and stay with you afterwards. The project doesn't end at deploy." },
  ],
  heroCode: heroCode('Architecture built to scale', 'Product', 'quality', 'production'),
};

export const content: Record<Lang, SiteContent> = { es, en };
