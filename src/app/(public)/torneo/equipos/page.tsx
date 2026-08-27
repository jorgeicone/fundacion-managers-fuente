import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, Trophy } from 'lucide-react';
import { TeamCrest } from '@/components/torneo/TeamCrest';
import { TorneoShell } from '@/components/torneo/TorneoShell';
import { EQUIPOS, getEquipo } from '@/lib/torneo-data';
import { CAMPEON_VIGENTE, MAXIMO_GANADOR } from '@/lib/torneo';

export const metadata: Metadata = {
  title: 'Equipos · Torneo Managers',
  description: 'Los ocho clubes de la cuarta edición del Torneo Managers F7.',
};

export default function EquiposPage() {
  // El campeón vigente es quien ganó la última edición jugada, NO el club
  // con más títulos. Se toma de la constante para que no vuelva a quedar
  // un slug escrito a mano aquí.
  const campeon = getEquipo(CAMPEON_VIGENTE.slug)!;
  const maximoGanador = getEquipo(MAXIMO_GANADOR.slug)!;
  const resto = EQUIPOS.filter((e) => e.slug !== campeon.slug);

  return (
    <TorneoShell eyebrow="Cuarta edición · 2026-2" title="Clubes" active="/torneo/equipos/">
      {/* Campeón destacado */}
      <Link
        href={`/torneo/equipos/${campeon.slug}/`}
        className="group sweep relative block overflow-hidden rounded-3xl border border-amarillo/40 bg-gradient-to-br from-[#1a1308] via-[#0d1218] to-[#0b0f14] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] lg:p-12"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amarillo/15 blur-3xl"
        />
        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <TeamCrest slug={campeon.slug} size={170} showStars />
          <div className="text-center sm:text-left">
            <p className="flex items-center justify-center gap-2 font-bufon text-sm font-bold uppercase tracking-[0.25em] text-naranja sm:justify-start">
              <Trophy size={18} aria-hidden /> Campeón vigente
            </p>
            <h2 className="mt-2 font-sport text-6xl uppercase leading-none text-neutral-50 md:text-8xl">
              {campeon.nombre}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
              {Array.from({ length: campeon.titulos }, (_, i) => (
                <Star key={i} size={24} className="fill-amarillo text-amarillo" aria-hidden />
              ))}
              <span className="ml-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
                {CAMPEON_VIGENTE.edicion}.ª edición · 2026-1
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Máximo ganador: distinto del campeón vigente, y se dice explícito. */}
      <Link
        href={`/torneo/equipos/${maximoGanador.slug}/`}
        className="group mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 transition-colors hover:border-amarillo/40"
      >
        <TeamCrest slug={maximoGanador.slug} size={44} />
        <span className="min-w-0">
          <span className="block font-bufon text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Máximo ganador
          </span>
          <span className="block truncate text-sm font-semibold text-neutral-200">
            {maximoGanador.nombre} · {maximoGanador.titulos} títulos
          </span>
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1">
          {Array.from({ length: maximoGanador.titulos }, (_, i) => (
            <Star key={i} size={14} className="fill-neutral-500 text-neutral-500" aria-hidden />
          ))}
        </span>
      </Link>

      {/* Resto de clubes */}
      <h3 className="mt-16 font-sport text-4xl uppercase leading-none text-neutral-50 md:text-5xl">
        Los retadores
      </h3>
      <div className="mt-4 h-1 w-full rounded-full energy-bar opacity-70" />

      <ul className="mt-10 grid grid-cols-2 gap-5 stagger-in sm:grid-cols-3 lg:grid-cols-4">
        {resto.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/torneo/equipos/${e.slug}/`}
              className="group flex h-full flex-col items-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#11161d] to-[#0b0f14] p-7 transition-all duration-300 ease-managers hover:-translate-y-2 hover:border-amarillo/50 hover:shadow-[0_28px_70px_rgba(0,0,0,0.6)]"
            >
              <TeamCrest slug={e.slug} size={92} />
              <span className="text-center font-serif text-base font-bold text-neutral-100">
                {e.nombre}
              </span>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors group-hover:text-amarillo">
                Ver club
                <ArrowRight
                  size={14}
                  aria-hidden
                  className="transition-transform duration-200 ease-managers group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </TorneoShell>
  );
}
