import { TeamCrest } from '@/components/torneo/TeamCrest';
import { getEquipo } from '@/lib/torneo-data';
import type { CuartoDerivado } from '@/lib/liga';
import { cn } from '@/lib/utils';

/** Un lado del cruce: siembra, escudo y nombre. */
function Lado({
  slug,
  seed,
  alineacion,
}: {
  slug: string | null;
  seed: number;
  alineacion: 'izquierda' | 'derecha';
}) {
  const eq = slug ? getEquipo(slug) : undefined;
  const derecha = alineacion === 'derecha';

  return (
    <div
      className={cn(
        'flex min-w-0 flex-1 items-center gap-2',
        derecha ? '' : 'justify-end',
      )}
    >
      {derecha ? <TeamCrest slug={slug} size={32} /> : null}
      <span className={cn('flex min-w-0 flex-col', derecha ? '' : 'items-end')}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-amarillo/70">
          {seed}.º
        </span>
        <span
          className={cn(
            'min-w-0 truncate text-sm font-semibold',
            eq ? 'text-neutral-200' : 'text-neutral-500',
          )}
        >
          {eq?.nombre ?? 'Por definir'}
        </span>
      </span>
      {derecha ? null : <TeamCrest slug={slug} size={32} />}
    </div>
  );
}

function Cruce({ c }: { c: CuartoDerivado }) {
  return (
    <li className="rounded-xl border border-dashed border-white/15 bg-black/25 px-4 py-4">
      <p className="text-xs text-neutral-500">
        {c.fecha} · {c.hora}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <Lado slug={c.local} seed={c.seedLocal} alineacion="izquierda" />
        <span className="shrink-0 font-sport text-xl leading-none text-neutral-500">vs</span>
        <Lado slug={c.visitante} seed={c.seedVisitante} alineacion="derecha" />
      </div>
    </li>
  );
}

/**
 * Llave de cuartos derivada de la tabla de posiciones.
 *
 * No recibe cruces cargados a mano: recibe la tabla ya ordenada por el
 * Artículo 14 y dibuja 1º-8º, 2º-7º, 3º-6º y 4º-5º. Si la tabla cambia,
 * esto cambia con ella.
 */
export function CuartosDerivados({
  cuartos,
  definitiva,
}: {
  cuartos: readonly CuartoDerivado[];
  definitiva: boolean;
}) {
  return (
    <div>
      <ul className="grid gap-3 lg:grid-cols-2">
        {cuartos.map((c) => (
          <Cruce key={c.id} c={c} />
        ))}
      </ul>
      <p className="mt-6 rounded-xl border border-dashed border-white/15 p-4 text-center text-xs uppercase tracking-widest text-neutral-500">
        {definitiva
          ? 'Cruces definitivos según la tabla final · Cuartos el 13 sep 2026'
          : 'Proyección según la tabla actual · se actualiza sola al cerrar cada fecha'}
      </p>
    </div>
  );
}
