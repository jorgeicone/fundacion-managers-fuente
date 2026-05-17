/** Imagen de fondo + tinte por eje (lenguaje cinemático unificado). */
export interface EjeVisual {
  query: string;
  tint: string;
  seed: number;
}

const GOLD = '#D4A437';
const GREEN = '#2D7A4F';

export const EJE_VISUAL: Record<string, EjeVisual> = {
  consultoria: { query: 'business,strategy,meeting', tint: GOLD, seed: 101 },
  turismo: { query: 'travel,landscape,mountains', tint: GREEN, seed: 102 },
  eventos: { query: 'conference,event,crowd', tint: GOLD, seed: 103 },
  emprendimiento: { query: 'startup,office,innovation', tint: GOLD, seed: 104 },
  rural: { query: 'countryside,farm,field', tint: GREEN, seed: 105 },
};

export function visualDeEje(slug: string): EjeVisual {
  return EJE_VISUAL[slug] ?? { query: 'leadership,team,business', tint: GOLD, seed: 100 };
}
