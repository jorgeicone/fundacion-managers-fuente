import type { Metadata } from 'next';
import { BracketView } from '@/components/torneo/BracketView';
import { TorneoShell } from '@/components/torneo/TorneoShell';

export const metadata: Metadata = {
  title: 'Llave · Torneo Managers',
  description: 'Bracket de la tercera edición del Torneo Managers F7.',
};

export default function BracketPage() {
  return (
    <TorneoShell eyebrow="Tercera edición · 2026" title="La llave" active="/torneo/bracket/">
      <BracketView />
      <p className="mt-12 rounded-xl border border-dashed border-white/15 p-4 text-center text-xs uppercase tracking-widest text-neutral-500">
        Resultados de cuartos confirmados · semifinales el 31 may 2026
      </p>
    </TorneoShell>
  );
}
