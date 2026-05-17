import type { NextConfig } from 'next';

const isGhPages = process.env.GITHUB_PAGES === 'true';
// basePath = nombre del repo en GitHub Pages. Configurable por env para que
// el mismo código sirva en cualquier repo (CI define PAGES_BASE_PATH).
const basePath =
  process.env.PAGES_BASE_PATH ?? (isGhPages ? '/fundacion-managers-web' : '');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGhPages ? { output: 'export' as const, basePath, assetPrefix: basePath } : {}),
  trailingSlash: isGhPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGhPages,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
