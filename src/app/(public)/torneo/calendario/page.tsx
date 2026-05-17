import type { Metadata } from 'next';
import { MatchCard } from '@/components/torneo/MatchCard';
import { TorneoShell } from '@/components/torneo/TorneoShell';
import { CUARTOS, SEMIS, FINAL } from '@/lib/torneo-data';

export const metadata: Metadata = {
  title: 'Calendario · Torneo Managers',
  description: 'Calendario y resultados de la tercera edición del Torneo Managers F7.',
};

const BLOQUES = [
  { titulo: 'Cuartos de final', sub: 'Ronda 1', partidos: CUARTOS },
  { titulo: 'Semifinales', sub: 'Ronda 2', partidos: SEMIS },
  { titulo: 'Gran Final', sub: 'El título', partidos: [FINAL] },
] as const;

export default function CalendarioPage() {
  return (
    <TorneoShell
      eyebrow="Tercera edición · 2026"
      title="Calendario"
      active="/torneo/calendario/"
    >
      <div className="space-y-20">
        {BLOQUES.map((b) => (
          <div key={b.titulo}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-bufon text-sm font-bold uppercase tracking-[0.25em] text-naranja">
                  {b.sub}
                </p>
                <h2 className="mt-1 font-sport text-5xl uppercase leading-none text-neutral-50 md:text-7xl">
                  {b.titulo}
                </h2>
              </div>
              <span className="hidden font-sport text-2xl text-white/15 sm:block">
                {String(b.partidos.length).padStart(2, '0')}
              </span>
            </div>
            <div className="mt-5 h-1 w-full rounded-full energy-bar opacity-70" />
            <div className="mt-8 grid gap-5 stagger-in sm:grid-cols-2 lg:grid-cols-3">
              {b.partidos.map((p) => (
                <MatchCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </TorneoShell>
  );
}
