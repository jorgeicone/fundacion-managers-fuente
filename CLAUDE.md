# CLAUDE.md — Instrucciones para Claude Code

> Este archivo es leído automáticamente por Claude Code al iniciar cada sesión. Contiene el contexto permanente del proyecto, las convenciones, comandos y reglas que debes seguir siempre.

---

## 1. Contexto del proyecto

**Nombre:** `fundacion-managers-web`
**Cliente:** Fundación Managers
**Tipo:** Plataforma web institucional + módulo deportivo interactivo

La Fundación Managers tiene seis ejes de trabajo bajo una marca única:
1. **Consultoría Empresarial**
2. **Deportes / Torneo Managers** (módulo crítico e interactivo, inspirado en Premier League)
3. **Turismo**
4. **Eventos**
5. **Emprendimiento**
6. **Managers Rural**

El **Torneo Managers** es un torneo de F7 (fútbol 7) para líderes mayores de 28 años, con tres ediciones jugadas. Pomada Alfa FC es el bicampeón vigente.

**Documento maestro de especificaciones:** está en la raíz del repo como `Managers_Especificaciones_v2.docx`. Cuando tengas dudas funcionales o de alcance, consúltalo antes de improvisar.

---

## 2. Stack tecnológico (no cambiar sin discusión explícita)

- **Frontend:** Next.js 15 (App Router) + TypeScript estricto
- **Estilos:** Tailwind CSS + shadcn/ui
- **Backend:** Next.js Route Handlers + tRPC
- **Base de datos:** PostgreSQL en Supabase
- **ORM:** Prisma
- **Auth:** Supabase Auth
- **Tiempo real:** Supabase Realtime
- **Almacenamiento:** Cloudinary
- **Pagos:** Wompi (Colombia) + Stripe (USD)
- **WhatsApp:** Cloud API oficial de Meta
- **Email:** Resend + React Email
- **Jobs/Cron:** Inngest
- **Hosting:** Vercel
- **Monitoreo:** Sentry + Better Stack
- **Tests:** Vitest (unit) + Playwright (E2E)

---

## 3. Reglas de oro (NO negociables)

### Idioma
- **Documentación, comentarios, mensajes de UI, commits:** español.
- **Código (nombres de variables, funciones, clases, archivos):** inglés siempre.
- **Strings visibles al usuario:** español, usando i18n desde el principio (`next-intl`).

### Estilo de código
- TypeScript estricto: nada de `any` salvo justificación documentada en comentario.
- Funciones puras donde sea posible. Side effects aislados en `server/services/`.
- Validación de TODO input externo con Zod (formularios, API, webhooks).
- Sin lógica de negocio en componentes React. La lógica vive en `server/services/`.

### Seguridad
- **NUNCA** loguear, commitear ni mostrar al usuario: credenciales, tokens, llaves de API, secretos de webhook.
- **NUNCA** confiar en input del cliente sin validación en el servidor.
- **SIEMPRE** validar la firma de los webhooks (Wompi, Stripe, WhatsApp) antes de procesar.
- **NUNCA** ejecutar SQL crudo construido por concatenación de strings. Usa Prisma o queries parametrizadas.
- Variables sensibles solo en `.env.local` (nunca en `.env.example`).

### Base de datos
- Toda modificación de schema pasa por una migración de Prisma con nombre descriptivo.
- Nunca borrar datos en producción sin confirmación explícita del usuario.
- Nombres de tablas en `snake_case` plural. Campos en `snake_case`. En código TypeScript, Prisma los expone en `camelCase`.

### Git
- Branch `main` siempre desplegable.
- Branches de feature: `feature/<descripcion-corta>`.
- Commits en español, formato Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- Ejemplo: `feat: añadir tabla de posiciones con racha de últimos 5 partidos`
- Nunca commitear directo a `main`. Siempre PR.

---

## 4. Estructura del proyecto

```
fundacion-managers-web/
├── CLAUDE.md                    ← este archivo
├── README.md                    ← onboarding técnico
├── DESIGN_SYSTEM.md             ← tokens visuales y reglas de UI
├── Managers_Especificaciones_v2.docx ← spec maestra
├── .env.example
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/            ← rutas públicas (home, ejes, torneo, blog)
│   │   ├── (auth)/              ← login, registro
│   │   ├── (admin)/             ← panel administrativo
│   │   ├── (scorer)/            ← interfaz móvil para anotadores
│   │   └── api/                 ← endpoints y webhooks
│   ├── components/
│   │   ├── ui/                  ← shadcn primitives
│   │   ├── layout/
│   │   ├── torneo/              ← BracketView, StandingsTable, LiveMatchHeader
│   │   ├── inscripcion/
│   │   └── shared/
│   ├── lib/                     ← clientes de servicios externos
│   ├── server/
│   │   ├── routers/             ← tRPC routers
│   │   ├── services/
│   │   │   ├── tournament/      ← 4 generadores polimórficos
│   │   │   ├── registration.ts
│   │   │   ├── payments.ts
│   │   │   └── notifications.ts
│   │   └── jobs/                ← Inngest functions
│   ├── styles/
│   └── types/
└── tests/
```

---

## 5. Módulo Torneo: arquitectura crítica

El torneo soporta **4 formatos configurables**. La lógica debe ser polimórfica:

```typescript
// src/server/services/tournament/index.ts
interface TournamentGenerator {
  generateFixtures(season: Season, teams: Team[]): Promise<Match[]>;
  computeStandings(matches: Match[]): Promise<Standing[]>;
  advanceBracket(match: Match): Promise<void>;
  isStageComplete(stage: Stage): Promise<boolean>;
}

// Implementaciones por archivo:
// - league.ts          → liga round-robin
// - knockout.ts        → eliminación directa (formato Managers 2026)
// - groups-knockout.ts → grupos + eliminación
// - league-playoffs.ts → fase regular + playoffs

// Factory según season.format_type
const generator = TournamentGeneratorFactory.for(season.formatType);
```

**Cada generador debe tener tests unitarios exhaustivos** que cubran casos límite (empates en grupo, equipos con bye, criterios de desempate).

---

## 6. Convenciones específicas

### Nombres de archivos
- Componentes React: `PascalCase.tsx` (ej: `StandingsTable.tsx`)
- Utilidades y servicios: `kebab-case.ts` (ej: `tournament-service.ts`)
- Rutas de App Router: `kebab-case/page.tsx`

### Imports
- Orden: librerías externas → módulos internos absolutos (`@/...`) → relativos.
- Path alias `@/` apunta a `src/`.

### Componentes
- Server Components por defecto. Usar `"use client"` solo cuando sea estrictamente necesario (estado, eventos, hooks del cliente).
- Props tipadas con interface, nunca con `type` inline.

### Errores
- En el servidor, lanzar errores tipados (no strings).
- En el cliente, mostrar mensajes amigables en español. Detalles técnicos van a Sentry, no a la UI.

---

## 7. Cuando trabajes en una tarea

### Modo de operación: autónomo
- **NUNCA pidas permiso para ejecutar herramientas.** El proyecto tiene `permissions.defaultMode: "bypassPermissions"` en `.claude/settings.local.json`. Ejecuta directamente: Bash, Edit, Write, Read, npm, git (sin push), etc.
- No preguntes "¿quieres que haga X?" antes de cada paso. Decide y avanza.
- Solo detente para confirmar cuando aplique una de las excepciones reales del punto 3 de abajo (cambios destructivos, stack, pagos en producción).
- Al terminar un bloque coherente de trabajo, resume qué quedó hecho — sin pedir validación intermedia.

### Flujo
1. **Lee primero** el documento maestro (`Managers_Especificaciones_v2.docx`) si la tarea afecta funcionalidad.
2. **Consulta el DESIGN_SYSTEM.md** antes de tocar cualquier UI.
3. **Pregunta antes de:**
   - Cambiar el stack o añadir dependencias mayores.
   - Modificar el schema de Prisma de forma destructiva.
   - Tocar webhooks de pagos o WhatsApp en producción.
   - Borrar archivos o carpetas existentes.
   - Hacer `git push`, `git reset --hard`, force-push o cualquier acción irreversible sobre el remoto.
4. **No preguntes para:**
   - Crear componentes nuevos siguiendo las convenciones establecidas.
   - Añadir tests.
   - Refactorizar internamente un servicio manteniendo su API pública.
   - Aplicar fixes de linting o tipos.

---

## 8. Comandos útiles (definidos en `package.json`)

```bash
npm run dev              # desarrollo local
npm run build            # build de producción
npm run lint             # ESLint + Prettier check
npm run typecheck        # TypeScript sin emitir
npm run test             # unit tests
npm run test:e2e         # Playwright
npm run db:migrate       # nueva migración de Prisma
npm run db:push          # push schema sin migración (solo desarrollo)
npm run db:seed          # cargar seed inicial
npm run db:studio        # Prisma Studio
```

---

## 9. Roadmap actual

Estamos en **Fase 0 — Fundación**. El plan completo está en la sección 7 del documento maestro. Resumen:

- **Fase 0** (sem 1): Setup, design system, layout base
- **Fase 1** (sem 2-3): Web institucional (6 ejes)
- **Fase 2** (sem 4): Blog
- **Fase 3** (sem 5-7): Torneo modelo + lectura
- **Fase 4** (sem 8-9): Torneo en tiempo real
- **Fase 5** (sem 10-11): Inscripciones + pagos
- **Fase 6** (sem 12): WhatsApp avanzado + automatizaciones
- **Fase 7** (sem 13): Pulido + lanzamiento

Cuando termines una fase, propón el commit, la actualización del CHANGELOG y un resumen de lo entregado antes de pasar a la siguiente.

---

## 10. Información del cliente (contexto humano)

- La fundación opera principalmente en Colombia (Bogotá).
- Idioma único de la plataforma: español.
- Moneda principal: COP. Secundaria: USD (consultorías internacionales y donaciones).
- Marco legal: Ley 1581 de 2012 (Habeas Data Colombia). Toda recolección de datos personales requiere consentimiento explícito.
- Público objetivo del torneo: hombres mayores de 28 años con perfil profesional/networking.
- Tono editorial: cercano pero profesional. Energía deportiva en el módulo torneo, cálido y humano en los otros ejes.

---

**Última actualización:** mayo 2026
**Versión del proyecto:** 0.1.0 (pre-fase 0)
