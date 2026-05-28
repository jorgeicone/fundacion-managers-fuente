'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  cargarInscripciones,
  exportarJSON,
  guardarInscripciones,
  importarJSON,
  nuevaInscripcion,
  PASOS_INSCRIPCION,
  TOTAL_PASOS,
  type Inscripcion,
} from '@/lib/inscripciones';

export function InscripcionesDashboard() {
  const [lista, setLista] = useState<Inscripcion[]>([]);
  const [cargado, setCargado] = useState(false);
  const [equipo, setEquipo] = useState('');
  const [capitan, setCapitan] = useState('');
  const [contacto, setContacto] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Hidrata desde localStorage solo en el cliente.
  useEffect(() => {
    setLista(cargarInscripciones());
    setCargado(true);
  }, []);

  // Persiste cada cambio una vez hidratado.
  useEffect(() => {
    if (cargado) guardarInscripciones(lista);
  }, [lista, cargado]);

  function actualizar(id: string, cambios: Partial<Inscripcion>) {
    setLista((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, ...cambios, actualizadoEn: new Date().toISOString() } : i,
      ),
    );
  }

  function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (equipo.trim() === '' || capitan.trim() === '') return;
    setLista((prev) => [...prev, nuevaInscripcion({ equipo, capitan, contacto })]);
    setEquipo('');
    setCapitan('');
    setContacto('');
  }

  function eliminar(id: string) {
    setLista((prev) => prev.filter((i) => i.id !== id));
  }

  function descargar() {
    const blob = new Blob([exportarJSON(lista)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscripciones-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function abrirImportar() {
    fileRef.current?.click();
  }

  async function importar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const texto = await file.text();
      setLista(importarJSON(texto));
    } catch {
      window.alert('El archivo no tiene un formato válido de inscripciones.');
    }
    e.target.value = '';
  }

  const totalEquipos = lista.length;
  const pagados = lista.filter((i) => i.pagado).length;
  const completos = lista.filter((i) => i.pasoActual >= TOTAL_PASOS).length;

  return (
    <div className="space-y-10">
      {/* MÉTRICAS */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { valor: totalEquipos, label: 'Equipos' },
          { valor: completos, label: 'Inscripción completa' },
          { valor: pagados, label: 'Pagos confirmados' },
          { valor: TOTAL_PASOS, label: 'Pasos del proceso' },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-white/10 bg-[#0d1218]/70 p-5 text-center"
          >
            <p className="font-sport text-4xl text-amarillo">{m.valor}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ACCIONES + ALTA */}
      <div className="rounded-3xl border border-white/10 bg-[#0b0f14]/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-sport text-2xl uppercase text-neutral-50">Registrar equipo</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={descargar}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-neutral-200 transition-colors hover:border-gold hover:text-gold"
            >
              <Download size={14} aria-hidden /> Exportar JSON
            </button>
            <button
              type="button"
              onClick={abrirImportar}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-neutral-200 transition-colors hover:border-gold hover:text-gold"
            >
              <Upload size={14} aria-hidden /> Importar JSON
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              onChange={importar}
              className="hidden"
            />
          </div>
        </div>

        <form onSubmit={agregar} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input
            type="text"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
            placeholder="Nombre del equipo"
            className="rounded-md border border-white/15 px-3 py-2.5 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          <input
            type="text"
            value={capitan}
            onChange={(e) => setCapitan(e.target.value)}
            placeholder="Capitán"
            className="rounded-md border border-white/15 px-3 py-2.5 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          <input
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="WhatsApp (opcional)"
            className="rounded-md border border-white/15 px-3 py-2.5 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amarillo to-naranja px-5 py-2.5 text-sm font-bold text-carbon transition-transform hover:-translate-y-0.5"
          >
            <Plus size={16} aria-hidden /> Agregar
          </button>
        </form>
      </div>

      {/* LISTADO */}
      {totalEquipos === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-neutral-500">
          Aún no hay equipos registrados. Agrega el primero arriba.
        </p>
      ) : (
        <div className="space-y-4">
          {lista.map((ins) => (
            <article
              key={ins.id}
              className="rounded-2xl border border-white/10 bg-[#0d1218]/70 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-neutral-50">{ins.equipo}</h3>
                  <p className="text-sm text-neutral-400">
                    Capitán: {ins.capitan}
                    {ins.contacto ? ` · ${ins.contacto}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => eliminar(ins.id)}
                  aria-label="Eliminar equipo"
                  className="rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:border-red-500/50 hover:text-red-400"
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </div>

              {/* PASOS */}
              <ol className="mt-5 flex flex-wrap gap-2">
                {PASOS_INSCRIPCION.map((paso) => {
                  const hecho = ins.pasoActual >= paso.numero;
                  return (
                    <li
                      key={paso.numero}
                      title={paso.detalle}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        hecho
                          ? 'bg-gradient-to-r from-amarillo to-naranja text-carbon'
                          : 'border border-white/10 text-neutral-500'
                      }`}
                    >
                      {hecho ? <Check size={12} aria-hidden /> : <span>{paso.numero}</span>}
                      {paso.label}
                    </li>
                  );
                })}
              </ol>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={ins.pasoActual <= 1}
                  onClick={() => actualizar(ins.id, { pasoActual: ins.pasoActual - 1 })}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-neutral-200 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={14} aria-hidden /> Anterior
                </button>
                <button
                  type="button"
                  disabled={ins.pasoActual >= TOTAL_PASOS}
                  onClick={() => actualizar(ins.id, { pasoActual: ins.pasoActual + 1 })}
                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-neutral-200 transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Avanzar paso <ChevronRight size={14} aria-hidden />
                </button>
                <label className="ml-auto flex items-center gap-2 text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={ins.pagado}
                    onChange={(e) => actualizar(ins.id, { pagado: e.target.checked })}
                    className="h-4 w-4 rounded border-white/15 text-gold focus:ring-gold"
                  />
                  Pago confirmado
                </label>
              </div>

              <textarea
                value={ins.notas}
                onChange={(e) => actualizar(ins.id, { notas: e.target.value })}
                placeholder="Notas internas (logo recibido, fotos pendientes, etc.)"
                rows={2}
                className="mt-4 block w-full rounded-md border border-white/15 px-3 py-2 text-sm placeholder:text-neutral-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
