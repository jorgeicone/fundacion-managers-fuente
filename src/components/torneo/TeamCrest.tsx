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
 * Escudo de club: usa el logo OFICIAL (`public/escudos/<slug>.png`,
 * con fondos exteriores transparentes ya procesados).
 *
 * Diseño: SIN marco circular oscuro que tragaba logos navy/negros y
 * apretaba los escudos. El logo se renderiza directo, ocupando todo el
 * espacio, sobre fondo transparente. Para bicampeones se añade un
 * brillo dorado por drop-shadow (no un anillo que recorte). Esto es
 * lo que hacen FIFA/Premier/Champions con sus escudos en UI.
 */
export function TeamCrest({ slug, size = 56, showStars = false }: TeamCrestProps) {
  const eq = slug ? getEquipo(slug) : undefined;
  const titulos = eq?.titulos ?? 0;
  const champion = titulos > 0;
  const starSize = Math.max(11, Math.round(size * 0.2));

  if (!eq) {
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

  // Resplandor dorado solo para campeón (sin anillo que constriña).
  const championGlow = champion
    ? 'drop-shadow-[0_0_14px_rgba(212,164,55,0.55)] drop-shadow-[0_6px_18px_rgba(212,164,55,0.35)]'
    : 'drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]';

  return (
    <div className="inline-flex shrink-0 flex-col items-center">
      <Image
        src={asset(`/escudos/${eq.slug}.png`)}
        alt={`Escudo ${eq.nombre}`}
        width={size}
        height={size}
        className={`block h-auto w-auto object-contain ${championGlow}`}
        style={{ maxWidth: size, maxHeight: size }}
      />

      {showStars && champion ? (
        <div
          aria-hidden
          className="flex items-center gap-1"
          style={{ marginTop: Math.round(size * 0.06) }}
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
