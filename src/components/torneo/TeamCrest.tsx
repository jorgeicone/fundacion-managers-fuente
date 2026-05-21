import Image from 'next/image';
import { Star } from 'lucide-react';
import { asset } from '@/lib/asset';
import { getEquipo } from '@/lib/torneo-data';

interface TeamCrestProps {
  slug: string | null;
  size?: number;
  /** Muestra estrellas por títulos bajo el escudo. */
  showStars?: boolean;
}

/**
 * Escudo de club. Usa el logo OFICIAL del equipo cuando existe en
 * `public/escudos/<slug>.png` (todos los 8 reales están versionados).
 * Para campeones agrega un sutil aro dorado; las estrellas aparecen
 * abajo si `showStars`. Para slug nulo ("por definir") muestra un
 * marcador neutro.
 */
export function TeamCrest({ slug, size = 56, showStars = false }: TeamCrestProps) {
  const eq = slug ? getEquipo(slug) : undefined;
  const titulos = eq?.titulos ?? 0;
  const champion = titulos > 0;
  const starSize = Math.max(10, Math.round(size * 0.18));

  if (!eq) {
    // Placeholder neutro (rival por definir).
    return (
      <div
        aria-label="Por definir"
        className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 font-mono text-neutral-400"
        style={{ width: size, height: size, fontSize: size * 0.34 }}
      >
        ?
      </div>
    );
  }

  return (
    <div className="inline-flex shrink-0 flex-col items-center">
      <div
        aria-label={`Escudo ${eq.nombre}`}
        className={
          champion
            ? 'relative rounded-full p-[3px]'
            : 'relative'
        }
        style={
          champion
            ? {
                background:
                  'linear-gradient(135deg, #F2C75A 0%, #D4A437 50%, #8C6A1F 100%)',
                boxShadow: '0 8px 22px rgba(212,164,55,0.35)',
              }
            : undefined
        }
      >
        <div
          className="overflow-hidden rounded-full bg-[#0d1218]/80 ring-1 ring-white/10"
          style={{ width: size, height: size }}
        >
          <Image
            src={asset(`/escudos/${eq.slug}.png`)}
            alt={`Escudo ${eq.nombre}`}
            width={size}
            height={size}
            className="h-full w-full object-contain p-[8%]"
          />
        </div>
      </div>

      {showStars && champion ? (
        <div
          aria-hidden
          className="mt-2 flex items-center gap-1"
          style={{ marginTop: Math.round(size * 0.08) }}
        >
          {Array.from({ length: Math.min(titulos, 3) }, (_, i) => (
            <Star
              key={i}
              size={starSize}
              className="fill-amarillo text-amarillo drop-shadow-[0_2px_6px_rgba(212,164,55,0.45)]"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
