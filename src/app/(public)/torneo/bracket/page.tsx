import type { Metadata } from 'next';
import { BracketView } from '@/components/torneo/BracketView';
import { CuartosDerivados } from '@/components/torneo/CuartosDerivados';
import { EliminatoriaLiga } from '@/components/torneo/EliminatoriaLiga';
import { TorneoShell } from '@/components/torneo/TorneoShell';
import { calcularPosiciones, derivarCuartos, tablaDefinitiva } from '@/lib/liga';
import { cargarLigaConAviso } from '@/lib/liga-supabase';

export const metadata: Metadata = {
  title: 'Llave · Torneo Managers',
  description:
    'Cuartos de final de la cuarta edición del Torneo Managers F7, derivados de la tabla de posiciones.',
};

export default async function BracketPage() {
  const datos = await cargarLigaConAviso();

  // La llave sale de la tabla, nunca de cruces escritos a mano.
  const posiciones = calcularPosiciones(datos.partidos, datos.disciplina);
  const cuartos = derivarCuartos(posiciones);
  const definitiva = tablaDefinitiva(datos.partidos);

  // Cuando la organización cargue los cuartos reales con su marcador, esos
  // mandan sobre la proyección.
  const cuartosJugados = datos.eliminatoria.filter((p) => p.fase === 'cuartos');
  const restoFaseFinal = datos.eliminatoria.filter((p) => p.fase !== 'cuartos');

  return (
    <TorneoShell eyebrow="Cuarta edición · 2026-2" title="La llave" active="/torneo/bracket/">
      <p className="max-w-2xl text-sm text-neutral-400">
        Los cuartos de final se arman con la tabla de posiciones: 1.º contra 8.º, 2.º contra
        7.º, 3.º contra 6.º y 4.º contra 5.º. No se escriben a mano — cada vez que la tabla
        cambia, los cruces se recalculan solos.
      </p>

      <div className="mt-10">
        {cuartosJugados.length > 0 ? (
          <EliminatoriaLiga partidos={datos.eliminatoria} />
        ) : (
          <>
            <CuartosDerivados cuartos={cuartos} definitiva={definitiva} />
            {restoFaseFinal.length > 0 ? (
              <div className="mt-12">
                <EliminatoriaLiga partidos={restoFaseFinal} />
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* ===== Historial: la llave de la 3ª edición ===== */}
      <div className="mt-24 border-t border-white/10 pt-16">
        <p className="font-bufon text-sm font-bold uppercase tracking-[0.25em] text-neutral-500">
          Historial
        </p>
        <h2 className="mt-1 font-sport text-4xl uppercase leading-none text-neutral-300 md:text-5xl">
          Tercera edición · 2026-1
        </h2>
        <div className="mt-8">
          <BracketView />
        </div>
      </div>
    </TorneoShell>
  );
}
