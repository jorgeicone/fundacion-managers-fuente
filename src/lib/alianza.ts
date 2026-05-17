/**
 * Managers Lab — powered by ICONE ialabs (modelo Intel Inside / Bonyurt).
 * Cada marca opera independiente; el concepto conjunto es:
 * IA que ayuda a líderes a tomar mejores decisiones.
 */

export const ALIANZA = {
  nombre: 'Managers Lab',
  poweredBy: 'ICONE ialabs',
  firma: 'Managers Lab — powered by ICONE ialabs',
  claim: 'El laboratorio donde los líderes deciden mejor con inteligencia artificial.',
  bajada:
    'Managers Lab es el espacio conjunto de la Fundación Managers, potenciado por la inteligencia artificial de ICONE ialabs. La comunidad de líderes pone el contexto; la IA, la ventaja para decidir.',
  icone: {
    nombre: 'ICONE ialabs',
    url: 'https://www.iconeialabs.com',
    descripcion: 'Laboratorio de inteligencia artificial: productos, automatización y formación.',
  },
  managers: {
    nombre: 'Fundación Managers',
    descripcion: 'Comunidad de gerentes y líderes en ocio serio, con un solo norte.',
  },
} as const;

export interface AporteMarca {
  marca: string;
  aporta: string[];
}

export const APORTES: readonly AporteMarca[] = [
  {
    marca: 'Fundación Managers',
    aporta: [
      'La comunidad de gerentes y líderes que deciden',
      'El torneo, los eventos y la confianza humana',
      'El contexto real donde se prueban las decisiones',
    ],
  },
  {
    marca: 'ICONE ialabs',
    aporta: [
      'Inteligencia artificial aplicada',
      'Productos, automatización y herramientas',
      'Formación técnica (ICONE Academy)',
    ],
  },
] as const;

/** Cómo fluye una oportunidad entre las dos marcas. */
export const FLUJOS = [
  {
    desde: 'Llegas por Fundación Managers',
    hacia: 'y necesitas IA para tu organización',
    resultado: 'Te conectamos con ICONE ialabs.',
  },
  {
    desde: 'Llegas por ICONE ialabs',
    hacia: 'y lideras una empresa o equipo',
    resultado: 'Te abrimos la comunidad de Managers.',
  },
] as const;

/** Acento visual de la marca aliada (paleta ICONE ialabs). */
export const ICONE_CYAN = '#00D4FF';

/** Ejes donde tiene sentido el CTA cruzado hacia ICONE ialabs. */
export const EJES_CON_CRUCE = ['consultoria', 'emprendimiento'] as const;
