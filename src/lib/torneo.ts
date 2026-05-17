/**
 * Datos del Torneo Managers extraídos de la presencia oficial en Instagram
 * (@torneo_managers) hasta mayo 2026. Esta información debe revisarse contra
 * Managers_Especificaciones_v2.docx y la base de datos cuando se conecte
 * Supabase en la Fase 3 del roadmap.
 */

export const TORNEO_INSTAGRAM = '@torneo_managers';
export const TORNEO_INSTAGRAM_URL = 'https://www.instagram.com/torneo_managers/';

export const TORNEO_BIO =
  'Torneo de F7 diseñado para líderes mayores de 28 años que encuentran en el fútbol un espacio de recreación, networking y alta competencia.';

export interface Edicion {
  numero: number;
  anio: number;
  estado: 'jugada' | 'en-curso';
  campeon?: string;
  notas?: string;
}

export const EDICIONES: readonly Edicion[] = [
  {
    numero: 1,
    anio: 2024,
    estado: 'jugada',
    campeon: 'Pomada Alfa FC',
    notas: 'Primera edición del torneo.',
  },
  {
    numero: 2,
    anio: 2025,
    estado: 'jugada',
    campeon: 'Pomada Alfa FC',
    notas: 'Bicampeonato. Pomada Alfa firma la segunda estrella.',
  },
  {
    numero: 3,
    anio: 2026,
    estado: 'en-curso',
    notas: 'Tercera edición — en cuartos de final.',
  },
] as const;

export const CAMPEON_VIGENTE = {
  equipo: 'Pomada Alfa FC',
  titulos: 2,
  descripcion: 'Bicampeón del Torneo Managers F7 (ediciones 2024 y 2025).',
};

/** Equipos identificados en el bracket de la edición 2026. */
export const EQUIPOS_2026: readonly string[] = [
  'Pomada Alfa FC',
  'Managers FC',
  'The Originals FC',
  'Alianza',
  'Los Pibes del Barrio',
  'Useche FC',
  'Yonotomo FC',
  'TP F.C.',
] as const;

export const TORNEO_STATS = [
  { valor: '3', etiqueta: 'Ediciones' },
  { valor: '8+', etiqueta: 'Equipos por edición' },
  { valor: '28+', etiqueta: 'Edad mínima' },
  { valor: 'F7', etiqueta: 'Formato' },
] as const;
