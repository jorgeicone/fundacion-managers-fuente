import type { Metadata } from 'next';
import { Trophy } from 'lucide-react';
import { TeamCrest } from '@/components/torneo/TeamCrest';
import { TorneoShell } from '@/components/torneo/TorneoShell';
import { GOLEADORES, MVP, getEquipo } from '@/lib/torneo-data';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Estadísticas · Torneo Managers',
  description: 'Goleadores y MVP de la tercera edición del Torneo Managers F7.',
};

const PODIO = [
  { ring: 'border-amarillo/70', glow: 'bg-amarillo/25', lift: 'sm:-mt-6' },
  { ring: 'border-white/20', glow: 'bg-white/10', lift: 'sm:mt-2' },
  { ring: 'border-naranja/60', glow: 'bg-naranja/20', lift: 'sm:mt-8' },
] as const;

export default function EstadisticasPage() {
  const mvpEq = getEquipo(MVP.equipo);

  return (
    <TorneoShell
      eyebrow="Tercera edición · 2026"
      title="Estadísticas"
      active="/torneo/estadisticas/"
    >
      {/* Podio de goleadores */}
      <p className="font-bufon text-sm font-bold uppercase tracking-[0.25em] text-naranja">
        Goleadores
      </p>
      <h2 className="mt-1 font-sport text-5xl uppercase leading-none text-neutral-50 md:text-7xl">
        La bota de oro
      </h2>
      <div className="mt-4 h-1 w-full rounded-full energy-bar opacity-70" />

      <div className="mt-14 grid items-start gap-5 stagger-in sm:grid-cols-3">
        {GOLEADORES.map((g, idx) => {
          const eq = getEquipo(g.equipo);
          const st = PODIO[idx] ?? PODIO[2];
          return (
            <div
              key={g.posicion}
              className={cn(
                'relative flex flex-col items-center gap-3 rounded-2xl border bg-gradient-to-b from-[#11161d] to-[#0b0f14] px-6 pb-7 pt-10 text-center',
                st.ring,
                st.lift,
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute -top-8 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full blur-3xl',
                  st.glow,
                )}
              />
              <span className="relative font-sport text-7xl leading-none text-energy">
                {g.posicion}
              </span>
              <TeamCrest slug={g.equipo} size={44} />
              <span className="truncate text-sm font-bold text-neutral-100">
                {g.jugador}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-neutral-500">
                {eq?.nombre ?? ''}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-widest text-neutral-600">
        Tabla de goleo por confirmar con los datos del torneo
      </p>

      {/* MVP dramático */}
      <div className="sweep relative mt-20 overflow-hidden rounded-3xl border border-amarillo/40 bg-gradient-to-br from-[#1a1308] via-[#0d1218] to-[#0b0f14] p-10 lg:p-16">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-naranja/15 blur-3xl"
        />
        <div className="relative flex flex-col items-center gap-8 text-center sm:flex-row sm:gap-12 sm:text-left">
          <TeamCrest slug={MVP.equipo} size={150} showStars />
          <div>
            <p className="flex items-center justify-center gap-2 font-bufon text-sm font-bold uppercase tracking-[0.25em] text-naranja sm:justify-start">
              <Trophy size={18} aria-hidden /> Jugador más valioso
            </p>
            <h2 className="mt-3 font-sport text-5xl uppercase leading-none text-neutral-50 md:text-7xl">
              MVP
            </h2>
            <p className="mt-4 text-lg font-semibold text-neutral-100">{MVP.jugador}</p>
            <p className="text-sm text-neutral-400">{mvpEq?.nombre ?? ''}</p>
            <p className="mt-4 max-w-md text-xs text-neutral-500">{MVP.nota}</p>
          </div>
        </div>
      </div>
    </TorneoShell>
  );
}
