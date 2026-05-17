import {
  Briefcase,
  Trophy,
  Plane,
  CalendarHeart,
  Rocket,
  Sprout,
  type LucideIcon,
} from 'lucide-react';

/**
 * Los seis ejes de la fundación. Fuente única de verdad para navegación,
 * footer, grid del home y páginas individuales.
 */
export type EjeTheme = 'light' | 'dark';

export interface Eje {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  theme: EjeTheme;
  /** Clase de acento principal (Tailwind) para badges y bordes. */
  accent: string;
  icon: LucideIcon;
}

export const EJES: readonly Eje[] = [
  {
    slug: 'consultoria',
    nombre: 'Consultoría',
    tagline: 'Estrategia con propósito',
    descripcion: 'Acompañamiento estratégico a empresas y organizaciones.',
    theme: 'light',
    accent: 'text-gold',
    icon: Briefcase,
  },
  {
    slug: 'torneo',
    nombre: 'Torneo Managers',
    tagline: 'F7 para líderes mayores de 28',
    descripcion:
      'Torneo de Fútbol 7 diseñado para líderes mayores de 28 años: recreación, networking y alta competencia.',
    theme: 'dark',
    accent: 'text-gold',
    icon: Trophy,
  },
  {
    slug: 'turismo',
    nombre: 'Turismo',
    tagline: 'Experiencias con propósito',
    descripcion: 'Experiencias diseñadas con propósito.',
    theme: 'light',
    accent: 'text-success',
    icon: Plane,
  },
  {
    slug: 'eventos',
    nombre: 'Eventos',
    tagline: 'Encuentros que conectan',
    descripcion: 'Encuentros que conectan personas y proyectos.',
    theme: 'light',
    accent: 'text-gold',
    icon: CalendarHeart,
  },
  {
    slug: 'emprendimiento',
    nombre: 'Emprendimiento',
    tagline: 'Ideas que se vuelven empresas',
    descripcion: 'Programas para emprendedores en etapa temprana.',
    theme: 'light',
    accent: 'text-gold',
    icon: Rocket,
  },
  {
    slug: 'rural',
    nombre: 'Managers Rural',
    tagline: 'Oportunidades para el campo',
    descripcion: 'Desarrollo y oportunidades para el campo colombiano.',
    theme: 'light',
    accent: 'text-success',
    icon: Sprout,
  },
] as const;

export function getEje(slug: string): Eje | undefined {
  return EJES.find((e) => e.slug === slug);
}
