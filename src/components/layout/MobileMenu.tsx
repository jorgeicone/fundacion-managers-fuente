'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ICONE_CYAN } from '@/lib/alianza';
import { EJES } from '@/lib/navigation';

/**
 * Menú móvil (hamburguesa). Visible solo < lg; el menú de escritorio
 * sigue en Header. Panel deslizable a pantalla completa con todos los
 * ejes + Managers Lab + Hablemos, para que en móvil SÍ se pueda navegar.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del fondo cuando el menú está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-neutral-100 transition-colors duration-200 hover:border-gold hover:text-gold"
      >
        <Menu size={22} aria-hidden />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#0b0f14]/98 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
            <span className="font-display text-lg font-extrabold text-neutral-50">
              Fundación Managers
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-neutral-100 transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              <X size={22} aria-hidden />
            </button>
          </div>

          <nav
            aria-label="Navegación principal móvil"
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8"
          >
            {EJES.map((eje) => (
              <Link
                key={eje.slug}
                href={`/${eje.slug}/`}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 font-serif text-2xl font-bold text-neutral-100 transition-colors duration-200 hover:text-gold"
              >
                {eje.nombre}
              </Link>
            ))}

            <Link
              href="/alianza/"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex w-fit rounded-full border px-5 py-2.5 text-sm font-semibold"
              style={{ borderColor: ICONE_CYAN, color: ICONE_CYAN }}
            >
              Managers Lab
            </Link>

            <Link
              href="/contacto/"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit rounded-full bg-gold px-6 py-3 text-sm font-semibold text-carbon shadow-gold transition-colors duration-200 hover:bg-gold-hover"
            >
              Hablemos
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
