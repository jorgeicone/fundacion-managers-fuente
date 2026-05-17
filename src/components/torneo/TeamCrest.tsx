import { getEquipo } from '@/lib/torneo-data';

interface TeamCrestProps {
  slug: string | null;
  size?: number;
  /** Muestra estrellas por títulos bajo el monograma. */
  showStars?: boolean;
}

/** Aclara/oscurece un hex para los degradados metálicos del escudo. */
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(((n >> 16) & 255) + amt);
  const g = clamp(((n >> 8) & 255) + amt);
  const b = clamp((n & 255) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Escudo de club generado en SVG: forma de blasón, degradado metálico,
 * banda superior, monograma y estrellas por título. Coherente y premium
 * mientras llegan los escudos oficiales.
 */
export function TeamCrest({ slug, size = 56, showStars = false }: TeamCrestProps) {
  const eq = slug ? getEquipo(slug) : undefined;
  const base = eq?.color ?? '#3A3F46';
  const light = shade(base, 46);
  const dark = shade(base, -52);
  const id = (eq?.slug ?? 'tbd').replace(/[^a-z0-9]/gi, '');
  const titulos = eq?.titulos ?? 0;
  const champion = titulos > 0;

  return (
    <svg
      role="img"
      aria-label={eq ? `Escudo ${eq.nombre}` : 'Por definir'}
      viewBox="0 0 80 96"
      width={size}
      height={(size * 96) / 80}
      className="shrink-0 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
    >
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="48%" stopColor={base} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`b-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Borde dorado para campeones / borde sutil resto */}
      <path
        d="M40 2 L75 14 V44 C75 68 59 84 40 94 C21 84 5 68 5 44 V14 Z"
        fill={champion ? '#D4A437' : 'rgba(255,255,255,0.18)'}
      />
      {/* Cuerpo del escudo */}
      <path
        d="M40 6 L71 16.5 V44 C71 65.5 56.5 80.5 40 89.5 C23.5 80.5 9 65.5 9 44 V16.5 Z"
        fill={`url(#g-${id})`}
      />
      {/* Banda superior */}
      <path
        d="M40 6 L71 16.5 V27 L40 20 L9 27 V16.5 Z"
        fill="rgba(0,0,0,0.22)"
      />
      {/* Brillo superior */}
      <path
        d="M40 6 L71 16.5 V40 C71 30 56 22 40 22 C24 22 9 30 9 40 V16.5 Z"
        fill={`url(#b-${id})`}
      />
      {/* Monograma */}
      <text
        x="40"
        y="58"
        textAnchor="middle"
        fontFamily="var(--font-display-sport), Impact, sans-serif"
        fontSize="26"
        fill="#fff"
        style={{ letterSpacing: '1px' }}
      >
        {eq?.corto ?? '?'}
      </text>
      {/* Estrellas por título */}
      {showStars && champion ? (
        <g fill="#FFE08A">
          {Array.from({ length: Math.min(titulos, 3) }, (_, i) => {
            const cx = 40 + (i - (Math.min(titulos, 3) - 1) / 2) * 13;
            return (
              <path
                key={i}
                transform={`translate(${cx} 70) scale(0.42)`}
                d="M0 -10 L2.9 -3.1 L10 -2.6 L4.5 2.1 L6.4 9 L0 5 L-6.4 9 L-4.5 2.1 L-10 -2.6 L-2.9 -3.1 Z"
              />
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}
