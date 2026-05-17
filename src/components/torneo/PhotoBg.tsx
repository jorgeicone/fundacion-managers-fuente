import { cn } from '@/lib/utils';

interface PhotoBgProps {
  /** Tema de la foto (palabras clave LoremFlickr). */
  query?: string;
  /** Semilla fija para que la foto no cambie en cada carga. */
  seed: number;
  /** Color de tinte de marca (degradado encima). */
  tint?: string;
  className?: string;
}

/**
 * Fondo fotográfico TEMPORAL (stock Creative Commons vía LoremFlickr) con
 * tratamiento de marca: desaturado + degradado carbón/dorado encima para
 * cohesión y legibilidad. Reemplazar por fotos reales cambiando la fuente.
 */
export function PhotoBg({
  query = 'stadium,floodlights,night',
  seed,
  tint = '#D4A437',
  className,
}: PhotoBgProps) {
  const url = `https://loremflickr.com/1600/900/${query}?lock=${seed}`;
  return (
    <div aria-hidden className={cn('absolute inset-0 overflow-hidden', className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${url}')`,
          filter: 'grayscale(0.45) contrast(1.05) brightness(0.7)',
        }}
      />
      {/* Tinte de marca */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, ${tint}38 0%, transparent 60%)`,
        }}
      />
      {/* Oscurecido para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14]/75 via-[#0b0f14]/60 to-[#0b0f14]" />
    </div>
  );
}
