import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0b0f14]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
