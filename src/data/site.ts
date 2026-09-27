// Site content. User-facing copy is in Spanish; keep identifiers and comments in English.

export interface Service { n: string; t: string; d: string; icon: string; }
export interface Project { tag: string; title: string; desc: string; tech: string[]; snippet: string; }
export interface Step { n: string; t: string; d: string; }

export const services: Service[] = [
  { n: '01', t: 'Aplicaciones web a medida', d: 'Plataformas SaaS y paneles de gestión con Angular y NestJS. Arquitectura escalable, multi-tenant y lista para crecer sin reescribir.', icon: '◈' },
  { n: '02', t: 'Portales y soluciones B2B', d: 'Digitalizo procesos de pedidos, catálogos e integraciones con ERP. Convierto flujos manuales y caóticos en sistemas eficientes.', icon: '⬡' },
  { n: '03', t: 'APIs y backend robusto', d: 'Diseño de APIs REST con NestJS o PHP, modelado de datos en PostgreSQL/MySQL, autenticación, seguridad y rendimiento.', icon: '⟐' },
  { n: '04', t: 'Productos digitales con IA', d: 'Integración de IA en flujos de trabajo y productos: desde herramientas internas hasta micro-SaaS para profesionales.', icon: '✦' },
];

// Two marquee rows, scrolling in opposite directions
export const stackRows: string[][] = [
  ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'RxJS', 'Signals', 'REST API'],
  ['PHP', 'CodeIgniter', 'MySQL', 'WebSocket', 'JWT', 'Node.js', 'IA / LLMs'],
];

export const projects: Project[] = [
  { tag: 'SaaS · Hostelería', title: 'Sistema TPV / Backoffice web', desc: 'Plataforma de gestión para el sector hostelero: pedidos en tiempo real, caja, catálogo y reporting. Arquitectura modular, multi-tenant y eventos en vivo.', tech: ['Angular', 'Signals', 'WebSocket', 'REST'], snippet: 'KDS › evento recibido › mesa #12 ✓' },
  { tag: 'B2B · Distribución', title: 'Portal de pedidos B2B', desc: 'Digitalización del proceso de pedidos de un distribuidor: portal mobile-first, recompra en un clic, precios dinámicos e integración con ERP.', tech: ['Angular', 'NestJS', 'ERP', 'PostgreSQL'], snippet: 'POST /orders › 200 OK › 142ms' },
  { tag: 'Producto · IA', title: 'Productos digitales con IA', desc: 'Línea de productos de productividad y bienestar para profesionales, con prompts y flujos asistidos por IA integrados de forma nativa.', tech: ['IA / LLMs', 'Automatización', 'Contenido'], snippet: 'ai.generate() › output ready ✦' },
];

export const steps: Step[] = [
  { n: '01', t: 'Descubrimiento', d: 'Entiendo tu negocio y tus objetivos antes de escribir una línea de código. Defino alcance y prioridades juntos.' },
  { n: '02', t: 'Arquitectura', d: 'Diseño la base técnica: stack, modelo de datos e integraciones. Decisiones que evitan reescrituras costosas.' },
  { n: '03', t: 'Desarrollo iterativo', d: 'Construyo en ciclos cortos con entregas visibles. Ves el avance real, no promesas.' },
  { n: '04', t: 'Despliegue y soporte', d: 'Pongo el sistema en producción con calidad y te acompaño después. El proyecto no termina en el deploy.' },
];
