import type { Metadata } from 'next';
import { TorneoLanding } from '@/components/torneo/TorneoLanding';
import { TORNEO_BIO } from '@/lib/torneo';

export const metadata: Metadata = {
  title: 'Torneo Managers F7',
  description: TORNEO_BIO,
};

export default function TorneoPage() {
  return <TorneoLanding />;
}
