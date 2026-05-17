import type { NextConfig } from 'next';

const isGhPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGhPages ? '/fundacion-managers-web' : '';

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
