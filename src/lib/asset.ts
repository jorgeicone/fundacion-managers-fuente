/**
 * Prepende el `basePath` cuando hay que servir un asset de `public/`
 * con `next/image` en modo `unoptimized` (necesario para GitHub Pages).
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  if (!path.startsWith('/')) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}
