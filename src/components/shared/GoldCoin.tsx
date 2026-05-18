import Image from 'next/image';
import { asset } from '@/lib/asset';
import { cn } from '@/lib/utils';

interface GoldCoinProps {
  className?: string;
  /** Activa una animación suave de "shimmer" sobre la moneda. */
  animate?: boolean;
  size?: number;
  priority?: boolean;
  ariaLabel?: string;
}

/**
 * Moneda dorada oficial del Torneo Managers (logo de la fundación).
 * Archivo de origen: `public/coin-managers.png`.
 */
export function GoldCoin({
  className,
  animate = false,
  size = 240,
  priority = false,
  ariaLabel = 'Moneda dorada del Torneo Managers',
}: GoldCoinProps) {
  return (
    <span
      className={cn(
        'relative inline-flex aspect-square items-center justify-center overflow-hidden rounded-full',
        'drop-shadow-[0_24px_60px_rgba(212,164,55,0.45)]',
        className,
      )}
      // Tamaño fluido: nunca más ancho que el viewport en móvil.
      style={{ width: `min(${size}px, 62vw)` }}
    >
      <Image
        src={asset('/coin-managers.webp')}
        alt={ariaLabel}
        width={size}
        height={size}
        priority={priority}
        sizes={`${size}px`}
        className="h-full w-full object-contain"
      />

      {animate ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ mixBlendMode: 'screen' }}
        >
          <span className="coin-shimmer absolute -left-1/3 top-0 block h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </span>
      ) : null}
    </span>
  );
}
