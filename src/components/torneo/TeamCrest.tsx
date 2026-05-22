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
 * Escudo de club: usa el logo OFICIAL en `public/escudos/<slug>.png`
 * con halo de luz tipo REFLECTOR atrás (radial gradient + blur). Es el
 * efecto que pidió Jorge — como un artista iluminado por un spot — y
 * resuelve que los logos con elementos oscuros (Useche, contornos
 * negros) no se pierdan sobre el fondo oscuro del sitio. SIN marco
 * circular ni recortes: el escudo respira con su forma original.
 *
 * - Equipos normales: halo blanco-cálido sutil.
 * - Bicampeón (Pomada Alfa): halo dorado más intenso + estrellas.
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

  // Halo tipo reflector: dorado intenso para campeón, cálido neutro para el resto.
  const haloGradient = champion
    ? 'radial-gradient(circle, rgba(245,200,90,0.55) 0%, rgba(212,164,55,0.28) 28%, rgba(212,164,55,0.08) 55%, transparent 75%)'
    : 'radial-gradient(circle, rgba(255,247,225,0.42) 0%, rgba(255,236,180,0.18) 32%, rgba(255,236,180,0.05) 60%, transparent 78%)';

  // El halo desborda el contenedor del escudo para que parezca un foco real.
  const haloPx = Math.round(size * 1.35);
  const haloOffset = Math.round((size - haloPx) / 2);

  return (
    <div className="inline-flex shrink-0 flex-col items-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            width: haloPx,
            height: haloPx,
            left: haloOffset,
            top: haloOffset,
            background: haloGradient,
            filter: 'blur(10px)',
          }}
        />
        <Image
          src={asset(`/escudos/${eq.slug}.png`)}
          alt={`Escudo ${eq.nombre}`}
          width={size}
          height={size}
          className="relative block h-auto w-auto object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
          style={{ maxWidth: size, maxHeight: size }}
        />
      </div>

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
