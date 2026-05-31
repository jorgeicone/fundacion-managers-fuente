-- ============================================================
-- Torneo Managers — tabla de inscripciones + RLS
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================

create table if not exists public.inscripciones (
  id              uuid primary key default gen_random_uuid(),
  equipo          text not null,
  capitan         text not null,
  contacto        text,
  paso_actual     int  not null default 1 check (paso_actual between 1 and 5),
  pagado          boolean not null default false,
  notas           text,
  creado_en       timestamptz not null default now(),
  actualizado_en  timestamptz not null default now()
);

-- Activar Row Level Security (sin políticas, todo queda bloqueado por defecto).
alter table public.inscripciones enable row level security;

-- 1) El público (anon) SOLO puede INSERTAR su pre-inscripción.
drop policy if exists "publico_inserta" on public.inscripciones;
create policy "publico_inserta"
  on public.inscripciones
  for insert
  to anon
  with check (true);

-- 2) Solo usuarios autenticados (admin) pueden VER las inscripciones.
drop policy if exists "admin_lee" on public.inscripciones;
create policy "admin_lee"
  on public.inscripciones
  for select
  to authenticated
  using (true);

-- 3) Solo usuarios autenticados pueden ACTUALIZAR (avanzar pasos, marcar pago).
drop policy if exists "admin_actualiza" on public.inscripciones;
create policy "admin_actualiza"
  on public.inscripciones
  for update
  to authenticated
  using (true)
  with check (true);

-- 4) Solo usuarios autenticados pueden ELIMINAR.
drop policy if exists "admin_elimina" on public.inscripciones;
create policy "admin_elimina"
  on public.inscripciones
  for delete
  to authenticated
  using (true);

-- Mantener actualizado_en al modificar.
create or replace function public.touch_actualizado_en()
returns trigger language plpgsql as $$
begin
  new.actualizado_en := now();
  return new;
end;
$$;

drop trigger if exists trg_touch_inscripciones on public.inscripciones;
create trigger trg_touch_inscripciones
  before update on public.inscripciones
  for each row execute function public.touch_actualizado_en();
