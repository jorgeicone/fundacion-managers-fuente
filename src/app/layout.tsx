import type { Metadata } from 'next';
import { bebasNeue, fredoka, inter, jakarta, jetbrainsMono, playfair } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Fundación Managers',
    template: '%s · Fundación Managers',
  },
  description:
    'Fundación Managers: consultoría, deportes, turismo, eventos, emprendimiento y desarrollo rural bajo una sola marca.',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Fundación Managers',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es-CO"
      className={cn(
        bebasNeue.variable,
        jakarta.variable,
        playfair.variable,
        fredoka.variable,
        inter.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-dvh font-body">{children}</body>
    </html>
  );
}
