import { describe, expect, it } from 'vitest';
import {
  CRUCES_CUARTOS,
  DISCIPLINA,
  GOLEADORES_LIGA,
  PARTIDOS_LIGA,
  calcularPosiciones,
  derivarCuartos,
  puntosJuegoLimpio,
  tablaDefinitiva,
  type Disciplina,
  type PartidoLiga,
} from '@/lib/liga';

/** Tabla oficial tras la Fecha 5, verificada contra la base de datos. */
const ORDEN_ESPERADO_F5 = [
  'pomada-alfa',
  'los-pibes',
  'the-originals',
  'useche-fc',
  'tp-fc',
  'yonotomo-fc',
  'managers-fc',
  'la-banda-cruzada',
];

describe('Artículo 14 — orden de desempate', () => {
  it('ordena por puntaje antes que cualquier otro criterio', () => {
    const tabla = calcularPosiciones();
    for (let i = 1; i < tabla.length; i++) {
      expect(tabla[i - 1]!.pts).toBeGreaterThanOrEqual(tabla[i]!.pts);
    }
  });

  it('pone el Fair Play ANTES que la diferencia de gol', () => {
    // Dos clubes con los mismos puntos: gana el que tiene menos tarjetas,
    // aunque el otro tenga mejor diferencia de gol.
    const partidos: PartidoLiga[] = [
      { id: 'a', jornada: 1, fecha: '01/01/2026', hora: '08:00', local: 'pomada-alfa', visitante: 'managers-fc', golesLocal: 5, golesVisitante: 0, estado: 'jugado' },
      { id: 'b', jornada: 1, fecha: '01/01/2026', hora: '09:00', local: 'the-originals', visitante: 'yonotomo-fc', golesLocal: 1, golesVisitante: 0, estado: 'jugado' },
    ];
    // pomada-alfa: 3 pts, DG +5, pero sucio. the-originals: 3 pts, DG +1, limpio.
    const disciplina: Record<string, Disciplina> = {
      'pomada-alfa': { amarillas: 10, rojas: 3 },
      'the-originals': { amarillas: 0, rojas: 0 },
    };
    const tabla = calcularPosiciones(partidos, disciplina);
    const orden = tabla.map((f) => f.equipo);
    expect(orden.indexOf('the-originals')).toBeLessThan(orden.indexOf('pomada-alfa'));
  });

  it('usa la diferencia de gol cuando el Fair Play queda empatado', () => {
    const partidos: PartidoLiga[] = [
      { id: 'a', jornada: 1, fecha: '01/01/2026', hora: '08:00', local: 'pomada-alfa', visitante: 'managers-fc', golesLocal: 5, golesVisitante: 0, estado: 'jugado' },
      { id: 'b', jornada: 1, fecha: '01/01/2026', hora: '09:00', local: 'the-originals', visitante: 'yonotomo-fc', golesLocal: 1, golesVisitante: 0, estado: 'jugado' },
    ];
    const disciplina: Record<string, Disciplina> = {
      'pomada-alfa': { amarillas: 2, rojas: 0 },
      'the-originals': { amarillas: 2, rojas: 0 },
    };
    const tabla = calcularPosiciones(partidos, disciplina);
    const orden = tabla.map((f) => f.equipo);
    expect(orden.indexOf('pomada-alfa')).toBeLessThan(orden.indexOf('the-originals'));
  });

  it('cuenta la roja como el triple de una amarilla', () => {
    expect(puntosJuegoLimpio({ ta: 3, tr: 2 })).toBe(9);
    expect(puntosJuegoLimpio({ ta: 0, tr: 0 })).toBe(0);
  });

  it('reproduce el orden oficial de la tabla con los datos de respaldo', () => {
    const tabla = calcularPosiciones(PARTIDOS_LIGA, DISCIPLINA);
    expect(tabla.map((f) => f.equipo)).toEqual(ORDEN_ESPERADO_F5);
  });

  it('numera las posiciones de 1 a 8 sin huecos', () => {
    const tabla = calcularPosiciones();
    expect(tabla.map((f) => f.posicion)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('mantiene la coherencia entre goles a favor y en contra', () => {
    const tabla = calcularPosiciones();
    const gf = tabla.reduce((s, f) => s + f.gf, 0);
    const gc = tabla.reduce((s, f) => s + f.gc, 0);
    expect(gf).toBe(gc);
  });
});

describe('Llave de cuartos derivada de la tabla', () => {
  it('usa exactamente los cruces 1-8, 2-7, 3-6 y 4-5', () => {
    expect(CRUCES_CUARTOS).toEqual([
      [1, 8],
      [2, 7],
      [3, 6],
      [4, 5],
    ]);
  });

  it('arma los cuatro cruces a partir de la tabla actual', () => {
    const cuartos = derivarCuartos(calcularPosiciones());
    expect(cuartos).toHaveLength(4);
    expect(cuartos.map((c) => [c.local, c.visitante])).toEqual([
      ['pomada-alfa', 'la-banda-cruzada'],
      ['los-pibes', 'managers-fc'],
      ['the-originals', 'yonotomo-fc'],
      ['useche-fc', 'tp-fc'],
    ]);
  });

  it('cambia sola cuando cambia la tabla', () => {
    const tabla = calcularPosiciones();
    const invertida = [...tabla].reverse().map((f, i) => ({ ...f, posicion: i + 1 }));
    const cuartos = derivarCuartos(invertida);
    // Quien era último pasa a ser 1.º y el cruce se recalcula solo: la llave
    // sigue a la tabla, no al revés.
    expect(cuartos[0]!.local).toBe(tabla[tabla.length - 1]!.equipo);
    expect(cuartos[0]!.visitante).toBe(tabla[0]!.equipo);
  });

  it('nunca enfrenta a un equipo consigo mismo ni repite clubes', () => {
    const cuartos = derivarCuartos(calcularPosiciones());
    const usados = cuartos.flatMap((c) => [c.local, c.visitante]);
    expect(new Set(usados).size).toBe(8);
    for (const c of cuartos) expect(c.local).not.toBe(c.visitante);
  });

  it('deja los slots en null si la tabla aún no tiene ocho clubes', () => {
    const cuartos = derivarCuartos([]);
    expect(cuartos).toHaveLength(4);
    expect(cuartos.every((c) => c.local === null && c.visitante === null)).toBe(true);
  });

  it('las siembras suman siempre 9', () => {
    for (const c of derivarCuartos(calcularPosiciones())) {
      expect(c.seedLocal + c.seedVisitante).toBe(9);
    }
  });

  it('marca la tabla como no definitiva mientras falten fechas', () => {
    expect(tablaDefinitiva(PARTIDOS_LIGA)).toBe(false);
    const todos = PARTIDOS_LIGA.map((p) => ({ ...p, estado: 'jugado' as const }));
    expect(tablaDefinitiva(todos)).toBe(true);
  });
});


describe('Ranking de goleadores', () => {
  it('no repite jugadores: cada anotador aparece una sola vez', () => {
    const nombres = GOLEADORES_LIGA.map((g) => g.jugador);
    expect(new Set(nombres).size).toBe(nombres.length);
  });

  it('lista a Jeison Malagón una sola vez, con 4 goles', () => {
    const jeison = GOLEADORES_LIGA.filter((g) => g.jugador === 'Jeison Malagón');
    expect(jeison).toHaveLength(1);
    expect(jeison[0]!.goles).toBe(4);
    expect(jeison[0]!.equipo).toBe('pomada-alfa');
  });

  it('no confunde a Jeison con Yesid Malagón: son dos jugadores distintos', () => {
    const malagones = GOLEADORES_LIGA.filter((g) => g.jugador.endsWith('Malagón'));
    expect(malagones.map((g) => g.jugador).sort()).toEqual([
      'Jeison Malagón',
      'Yesid Malagón',
    ]);
    expect(new Set(malagones.map((g) => g.numero)).size).toBe(2);
  });

  it('viene ordenado de más a menos goles', () => {
    for (let i = 1; i < GOLEADORES_LIGA.length; i++) {
      expect(GOLEADORES_LIGA[i - 1]!.goles).toBeGreaterThanOrEqual(GOLEADORES_LIGA[i]!.goles);
    }
  });

  it('numera las posiciones sin huecos', () => {
    expect(GOLEADORES_LIGA.map((g) => g.posicion)).toEqual(
      GOLEADORES_LIGA.map((_, i) => i + 1),
    );
  });

  it('no asigna más goles de los que se marcaron en la cancha', () => {
    const marcados = calcularPosiciones(PARTIDOS_LIGA, DISCIPLINA).reduce((s, f) => s + f.gf, 0);
    const asignados = GOLEADORES_LIGA.reduce((s, g) => s + g.goles, 0);
    expect(asignados).toBeLessThanOrEqual(marcados);
    // Falta un gol de La Banda Cruzada por asignar (Fecha 5, 2-7 vs Pomada
    // Alfa): la organización debe confirmar el autor. Si este número crece,
    // es que se cargó un goleador de más.
    expect(marcados - asignados).toBe(1);
  });
});
