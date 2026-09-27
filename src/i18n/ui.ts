// UI strings per language. Spanish is the source of truth; English must provide the same keys.
import type { Lang } from './index';

const es = {
  meta: {
    title: 'Greiber Salas — Ingeniería de Software a Medida',
    description: 'Desarrollador full-stack senior. Diseño y construyo plataformas SaaS, portales B2B y productos digitales con Angular, NestJS y arquitectura de nivel producción.',
    knowsArchitecture: 'Arquitectura de software',
  },
  a11y: {
    skip: 'Saltar al contenido',
    home: 'Greiber Salas — inicio',
    mainNav: 'Principal',
    mobileNav: 'Principal (móvil)',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    // Label of the language switch, written in the target language
    switchLang: 'Read this site in English',
  },
  // Section anchor ids (kept in Spanish for the Spanish site)
  ids: { services: 'servicios', stack: 'stack', projects: 'proyectos', process: 'proceso', contact: 'contacto' },
  nav: { services: 'Servicios', stack: 'Stack', projects: 'Proyectos', process: 'Proceso', cta: 'Hablemos' },
  hero: {
    tag: 'Disponible para nuevos proyectos',
    titleStart: 'Ingeniería de software',
    titleHighlight: 'que inspira confianza',
    titleEnd: 'y resuelve negocio.',
    leadBefore: 'Soy',
    leadAfter: ', desarrollador full-stack. Convierto ideas complejas en plataformas sólidas, rápidas y mantenibles — del primer boceto a producción.',
    ctaPrimary: 'Iniciar un proyecto →',
    ctaSecondary: 'Ver mi trabajo',
    trust: [
      { title: 'Full-stack', text: 'Front · Back · DB' },
      { title: 'B2B & SaaS', text: 'Producción real' },
      { title: 'End-to-end', text: 'Scoping a deploy' },
    ],
    deployValue: '✓ producción',
  },
  services: { tag: 'Servicios', title: 'Capacidades de extremo a extremo', sub: 'Acompaño cada proyecto desde la estrategia técnica hasta el despliegue. Sin intermediarios, sin cabos sueltos.' },
  stack: { tag: 'Stack tecnológico', title: 'Herramientas probadas en producción', sub: 'Elijo cada tecnología según el problema, no por moda. Una base moderna, tipada y mantenible.' },
  projects: { tag: 'Proyectos', title: 'Trabajo seleccionado', sub: 'Una muestra de sistemas que he diseñado y construido para resolver problemas concretos de negocio.' },
  process: { tag: 'Cómo trabajo', title: 'Un proceso que da tranquilidad', sub: 'Claridad en cada fase. Sabes en todo momento dónde está tu proyecto y hacia dónde va.' },
  contact: {
    titleLines: ['¿Construimos algo', 'que dure?'],
    text: 'Cuéntame qué tienes en mente. Te respondo con un enfoque claro y honesto sobre cómo abordarlo — sin compromiso.',
  },
};

export type UI = typeof es;

const en: UI = {
  meta: {
    title: 'Greiber Salas — Custom Software Engineering',
    description: 'Senior full-stack developer. I design and build SaaS platforms, B2B portals and digital products with Angular, NestJS and production-grade architecture.',
    knowsArchitecture: 'Software architecture',
  },
  a11y: {
    skip: 'Skip to content',
    home: 'Greiber Salas — home',
    mainNav: 'Main',
    mobileNav: 'Main (mobile)',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Ver este sitio en español',
  },
  ids: { services: 'services', stack: 'stack', projects: 'projects', process: 'process', contact: 'contact' },
  nav: { services: 'Services', stack: 'Stack', projects: 'Projects', process: 'Process', cta: "Let's talk" },
  hero: {
    tag: 'Available for new projects',
    titleStart: 'Software engineering',
    titleHighlight: 'that builds trust',
    titleEnd: 'and solves business problems.',
    leadBefore: "I'm",
    leadAfter: ', a full-stack developer. I turn complex ideas into solid, fast and maintainable platforms — from first sketch to production.',
    ctaPrimary: 'Start a project →',
    ctaSecondary: 'See my work',
    trust: [
      { title: 'Full-stack', text: 'Front · Back · DB' },
      { title: 'B2B & SaaS', text: 'Real production' },
      { title: 'End-to-end', text: 'Scoping to deploy' },
    ],
    deployValue: '✓ production',
  },
  services: { tag: 'Services', title: 'End-to-end capabilities', sub: 'I guide every project from technical strategy to deployment. No middlemen, no loose ends.' },
  stack: { tag: 'Tech stack', title: 'Production-proven tools', sub: 'I pick each technology for the problem, not the hype. A modern, typed and maintainable foundation.' },
  projects: { tag: 'Projects', title: 'Selected work', sub: 'A sample of systems I have designed and built to solve concrete business problems.' },
  process: { tag: 'How I work', title: 'A process that gives you peace of mind', sub: 'Clarity at every stage. You always know where your project is and where it is heading.' },
  contact: {
    titleLines: ['Shall we build something', 'that lasts?'],
    text: "Tell me what you have in mind. I'll reply with a clear, honest take on how to approach it — no strings attached.",
  },
};

export const ui: Record<Lang, UI> = { es, en };
