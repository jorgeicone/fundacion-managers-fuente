import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Star } from 'lucide-react';
import { GoldCoin } from '@/components/shared/GoldCoin';
import { MatchCard } from '@/components/torneo/MatchCard';
import { PlayerAvatar } from '@/components/torneo/PlayerAvatar';
import { TorneoBackdrop } from '@/components/torneo/TorneoBackdrop';
import { TeamCrest } from '@/components/torneo/TeamCrest';
import { TorneoNav } from '@/components/torneo/TorneoNav';
import {
  BRACKET_2026,
  EQUIPOS,
  POSICIONES,
  getEquipo,
  plantelDe,
} from '@/lib/torneo-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EQUIPOS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const eq = getEquipo(slug);
  if (!eq) return {};
  return { title: `${eq.nombre} · Torneo Managers` };
}

export default async function EquipoPage({ params }: Props) {
  const { slug } = await params;
  const eq = getEquipo(slug);
  if (!eq) notFound();

  const plantel = plantelDe();
  const partidos = BRACKET_2026.filter(
    (p) => p.local === eq.slug || p.visitante === eq.slug,
  );

  return (
    <div className="tournament-section relative">
      <TorneoBackdrop tint={eq.color} image={`/fotos/torneo-eq-${eq.slug}.jpg`} />
      {/* HERO DE CLUB */}
      <section className="relative z-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(120deg, ${eq.color}40 0%, transparent 55%)`,
          }}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-end lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <Link
              href="/torneo/equipos/"
              className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors duration-200 ease-managers hover:text-amarillo"
            >
              <ArrowLeft size={16} aria-hidden />
              Todos los clubes
            </Link>
            <div className="mt-6 flex items-center gap-6">
              <TeamCrest slug={eq.slug} size={120} showStars />
              <div>
                <p className="font-bufon text-sm font-bold uppercase tracking-[0.2em] text-amarillo">
                  {eq.titulos > 0 ? `Bicampeón · ${eq.titulos} títulos` : 'Tercera edición · 2026'}
                </p>
                <h1 className="mt-2 font-sport text-6xl uppercase leading-[0.85] text-neutral-50 md:text-8xl">
                  {eq.nombre}
                </h1>
                {eq.titulos > 0 ? (
                  <div className="mt-3 flex items-center gap-1.5">
                    {Array.from({ length: eq.titulos }, (_, i) => (
                      <Star
                        key={i}
                        size={22}
                        className="fill-amarillo text-amarillo"
                        aria-hidden
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {eq.titulos > 0 ? (
            <div className="ml-auto hidden shrink-0 lg:block">
              <div className="float-y">
                <GoldCoin size={120} animate />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <TorneoNav active="/torneo/equipos/" />

      {/* CONTENIDO */}
      <section className="relative z-10 overflow-hidden grain">
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          {/* Datos rápidos */}
          <div className="grid grid-cols-2 gap-4 stagger-in sm:grid-cols-4">
            {[
              { l: 'Títulos', v: String(eq.titulos) },
              { l: 'Edición', v: '3ª' },
              { l: 'Año', v: '2026' },
              { l: 'Formato', v: 'F7' },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-[#0d1218]/70 p-6 text-center"
              >
                <div className="font-sport text-5xl leading-none text-energy">{s.v}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* PLANTEL */}
          <div className="mt-20">
            <p className="font-bufon text-sm font-bold uppercase tracking-[0.25em] text-naranja">
              Plantel
            </p>
            <h2 className="mt-1 font-sport text-5xl uppercase leading-none text-neutral-50 md:text-7xl">
              La nómina
            </h2>
            <div className="mt-4 h-1 w-full rounded-full energy-bar opacity-70" />

            <div className="mt-10 space-y-12">
              {POSICIONES.map((pos) => {
                const grupo = plantel.filter((j) => j.posicion === pos.key);
                if (!grupo.length) return null;
                return (
                  <div key={pos.key}>
                    <h3 className="font-serif text-xl font-bold text-neutral-200">
                      {pos.label}
                    </h3>
                    <ul className="mt-5 grid grid-cols-2 gap-4 stagger-in sm:grid-cols-3 lg:grid-cols-6">
                      {grupo.map((j) => (
                        <li
                          key={j.numero}
                          className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#0d1218]/70 p-5 transition-all duration-300 ease-managers hover:-translate-y-1.5 hover:border-amarillo/40"
                        >
                          <PlayerAvatar color={eq.color} numero={j.numero} size={88} />
                          <div className="text-center">
                            <p className="text-sm font-bold text-neutral-100">
                              #{j.numero}
                            </p>
                            <p className="text-[11px] uppercase tracking-widest text-neutral-500">
                              {j.nombre}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-xs uppercase tracking-widest text-neutral-600">
              Nómina placeholder · nombres y dorsales reales por integrar
            </p>
          </div>

          {/* PARTIDOS */}
          <div className="mt-20">
            <p className="font-bufon text-sm font-bold uppercase tracking-[0.25em] text-naranja">
              Camino en el torneo
            </p>
            <h2 className="mt-1 font-sport text-5xl uppercase leading-none text-neutral-50 md:text-7xl">
              Partidos
            </h2>
            <div className="mt-4 h-1 w-full rounded-full energy-bar opacity-70" />
            {partidos.length ? (
              <div className="mt-8 grid gap-5 stagger-in sm:grid-cols-2">
                {partidos.map((p) => (
                  <MatchCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-2xl border border-dashed border-white/15 p-8 text-sm text-neutral-500">
                Aún sin partidos asignados en esta fase del bracket.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
