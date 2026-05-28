'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';

/** Celular oficial al que llega la pre-inscripción por WhatsApp. */
const WHATSAPP_NUMERO = '573126299744';

function construirMensaje(capitan: string, equipo: string): string {
  return [
    'Hola, quiero inscribir mi equipo al Torneo Managers — Edición 4° (2026-2).',
    `Capitán: ${capitan}`,
    `Equipo: ${equipo}`,
  ].join('\n');
}

export function InscripcionForm() {
  const [capitan, setCapitan] = useState('');
  const [equipo, setEquipo] = useState('');
  const [autoriza, setAutoriza] = useState(false);

  const listo = capitan.trim() !== '' && equipo.trim() !== '' && autoriza;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!listo) return;
    const mensaje = construirMensaje(capitan.trim(), equipo.trim());
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="capitan" className="block text-sm font-medium text-neutral-300">
          Nombre del capitán
        </label>
        <input
          id="capitan"
          type="text"
          name="capitan"
          required
          autoComplete="name"
          value={capitan}
          onChange={(e) => setCapitan(e.target.value)}
          placeholder="Tu nombre completo"
          className="mt-2 block w-full rounded-md border border-white/15 px-3 py-2.5 text-sm shadow-sm transition-colors duration-200 ease-managers placeholder:text-neutral-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <div>
        <label htmlFor="equipo" className="block text-sm font-medium text-neutral-300">
          Nombre del equipo
        </label>
        <input
          id="equipo"
          type="text"
          name="equipo"
          required
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          placeholder="Como quieres que aparezca en la tabla"
          className="mt-2 block w-full rounded-md border border-white/15 px-3 py-2.5 text-sm shadow-sm transition-colors duration-200 ease-managers placeholder:text-neutral-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-neutral-400">
        <input
          type="checkbox"
          checked={autoriza}
          onChange={(e) => setAutoriza(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/15 text-gold focus:ring-gold"
        />
        <span>
          Autorizo el tratamiento de mis datos personales según la{' '}
          <Link href="/privacidad/" className="font-semibold text-gold hover:underline">
            política de privacidad
          </Link>{' '}
          (Ley 1581 de 2012).
        </span>
      </label>

      <button
        type="submit"
        disabled={!listo}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amarillo to-naranja px-7 py-3.5 text-sm font-bold text-carbon shadow-[0_12px_40px_rgba(232,114,44,0.4)] transition-all duration-200 ease-managers hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        <MessageCircle size={18} aria-hidden />
        Continuar por WhatsApp
      </button>

      <p className="flex items-start gap-2 rounded-md border border-dashed border-white/15 p-3 text-xs text-neutral-500">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden />
        Al continuar te llevamos a un chat de WhatsApp con la Fundación para unirte al grupo
        del torneo. Tus datos no se publican en el sitio.
      </p>
    </form>
  );
}
