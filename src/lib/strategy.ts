/**
 * Marco estratégico de la Fundación Managers (reunión con William, 2026).
 *
 * Sombrilla: OCIO SERIO. Norte único: que los líderes TOMEN MEJORES DECISIONES.
 * Tres pilares organizan toda la operación. Los 6 ejes cuelgan de un pilar.
 */

export const NORTE = 'Tomar mejores decisiones';

export const OCIO_SERIO = {
  titulo: 'Ocio serio',
  bajada:
    'No es entretenimiento. Es tiempo invertido con disciplina que devuelve criterio, red y mejores decisiones.',
  journey:
    'Cada miembro recorre un viaje: una búsqueda sistemática, no un consumo de actividades sueltas.',
};

export interface Pilar {
  numero: '01' | '02' | '03';
  slug: string;
  titulo: string;
  promesa: string;
  componentes: string[];
}

export const PILARES: readonly Pilar[] = [
  {
    numero: '01',
    slug: 'habilidades',
    titulo: 'Desarrollo de habilidades',
    promesa: 'Liderar, administrar y conectar mejor.',
    componentes: ['Networking', 'Liderazgo', 'Administrar'],
  },
  {
    numero: '02',
    slug: 'conocimiento',
    titulo: 'Apropiación de nuevo conocimiento',
    promesa: 'Convertir conocimiento en criterio aplicado.',
    componentes: ['Consultoría', 'Educación', 'Proyectos'],
  },
  {
    numero: '03',
    slug: 'esfuerzo',
    titulo: 'Gestionar el esfuerzo',
    promesa: 'Decidir bajo presión, sostener el rendimiento.',
    componentes: ['Torneo', 'Experiencias de viaje'],
  },
] as const;

/** Mapa eje → pilar (fuente única para etiquetar cada eje). */
export const EJE_PILAR: Record<string, Pilar['numero']> = {
  eventos: '01',
  consultoria: '02',
  emprendimiento: '02',
  rural: '02',
  torneo: '03',
  turismo: '03',
};

export function pilarDeEje(slug: string): Pilar | undefined {
  const num = EJE_PILAR[slug];
  return PILARES.find((p) => p.numero === num);
}
