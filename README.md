# Fundación Managers — Plataforma Web

Plataforma web integral de la Fundación Managers. Cubre los seis ejes de la fundación (Consultoría, Deportes, Turismo, Eventos, Emprendimiento, Rural) e incluye un módulo deportivo interactivo para el Torneo Managers de F7.

> **Documento de especificaciones completo:** ver `Managers_Especificaciones_v2.docx` en la raíz.

---

## Tabla de contenido

1. [Requisitos previos](#1-requisitos-previos)
2. [Instalación de herramientas](#2-instalación-de-herramientas)
3. [Crear cuenta en Supabase](#3-crear-cuenta-en-supabase)
4. [Crear cuenta en Vercel](#4-crear-cuenta-en-vercel)
5. [Clonar e inicializar el proyecto](#5-clonar-e-inicializar-el-proyecto)
6. [Variables de entorno](#6-variables-de-entorno)
7. [Comandos disponibles](#7-comandos-disponibles)
8. [Flujo de trabajo con Claude Code](#8-flujo-de-trabajo-con-claude-code)
9. [Despliegue](#9-despliegue)
10. [Soporte](#10-soporte)

---

## 1. Requisitos previos

Antes de empezar necesitas tener instalado en tu computador:

- **Node.js 22 LTS o superior** (incluye npm)
- **Git**
- **Una cuenta en GitHub**
- **Un editor de código** (recomendado: VS Code o Cursor)
- **Claude Code** (línea de comandos de Anthropic)

Si ya tienes Git y trabajas con GitHub, lo único que probablemente te falta es Node.js y Claude Code.

---

## 2. Instalación de herramientas

### 2.1 Verificar lo que ya tienes

Abre la terminal y ejecuta:

```bash
node --version
npm --version
git --version
```

Si alguno responde "command not found", instálalo siguiendo los pasos abajo.

### 2.2 Instalar Node.js 22 LTS

**En macOS (recomendado vía Homebrew):**
```bash
brew install node@22
```

**En Windows:** descarga el instalador desde [nodejs.org](https://nodejs.org/) (versión LTS).

**En Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verifica:
```bash
node --version    # debe mostrar v22.x.x
npm --version     # debe mostrar 10.x.x o superior
```

### 2.3 Instalar Claude Code

Claude Code es la herramienta oficial de Anthropic para desarrollo asistido desde la terminal.

```bash
npm install -g @anthropic-ai/claude-code
```

Verifica:
```bash
claude --version
```

La primera vez que ejecutes `claude` te pedirá iniciar sesión con tu cuenta de Anthropic.

---

## 3. Crear cuenta en Supabase

Supabase será nuestra base de datos PostgreSQL, sistema de autenticación, almacenamiento de archivos y servicio de tiempo real.

### Paso a paso

1. Entra a **[supabase.com](https://supabase.com)** y haz clic en **"Start your project"**.
2. Inicia sesión con GitHub (recomendado, así queda enlazado a tu cuenta de desarrollo).
3. Crea una nueva organización: **"Fundación Managers"**.
4. Crea un nuevo proyecto con estos datos:
   - **Name:** `fundacion-managers`
   - **Database Password:** generar una fuerte (Supabase incluye un botón "Generate password"). **Guárdala en un lugar seguro como 1Password o un gestor de contraseñas.** No la podrás recuperar después.
   - **Region:** `South America (São Paulo)` — la más cercana a Colombia.
   - **Pricing Plan:** `Free`.
5. Espera 1-2 minutos a que el proyecto se aprovisione.
6. Una vez listo, ve a **Project Settings → API** y guarda estos tres valores (los necesitarás en el paso 6):
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public key** (clave pública, segura para el navegador)
   - **service_role key** (clave privada, NUNCA exponerla al cliente)
7. Ve a **Project Settings → Database** y guarda la **Connection String** en modo **Transaction**. Reemplaza `[YOUR-PASSWORD]` con la contraseña que generaste.

---

## 4. Crear cuenta en Vercel

Vercel hospedará la aplicación Next.js y la conectará automáticamente al repositorio de GitHub.

1. Entra a **[vercel.com](https://vercel.com)** y haz clic en **"Sign Up"**.
2. Inicia sesión con GitHub.
3. No crees aún el proyecto en Vercel: lo haremos después de subir el código a GitHub (paso 9).

---

## 5. Clonar e inicializar el proyecto

### 5.1 Crear el repositorio en GitHub

1. Entra a [github.com/new](https://github.com/new).
2. Configura:
   - **Repository name:** `fundacion-managers-web`
   - **Description:** `Plataforma web de la Fundación Managers`
   - **Visibility:** Private (al menos hasta el lanzamiento)
   - **NO inicialices** con README, .gitignore ni license (los crearemos nosotros).
3. Crea el repositorio.

### 5.2 Clonar en tu computador

```bash
cd ~/proyectos      # o la carpeta donde guardes tus proyectos
git clone https://github.com/TU-USUARIO/fundacion-managers-web.git
cd fundacion-managers-web
```

### 5.3 Colocar los archivos guía

Copia estos tres archivos (descargados desde Claude.ai) a la raíz del proyecto:

- `CLAUDE.md`
- `README.md` (este archivo)
- `DESIGN_SYSTEM.md`
- `Managers_Especificaciones_v2.docx`

Y haz el primer commit:

```bash
git add .
git commit -m "docs: agregar documentación guía inicial del proyecto"
git push origin main
```

### 5.4 Iniciar Claude Code en el proyecto

Desde la carpeta `fundacion-managers-web`, ejecuta:

```bash
claude
```

Claude Code leerá automáticamente el archivo `CLAUDE.md` y tendrá todo el contexto cargado. Tu primer prompt sugerido:

```
Lee CLAUDE.md, README.md, DESIGN_SYSTEM.md y revisa las secciones 6 y 7 de
Managers_Especificaciones_v2.docx. Después arranquemos la Fase 0 del roadmap:
inicializar Next.js 15 con TypeScript, Tailwind, ESLint y la estructura
de carpetas descrita en CLAUDE.md sección 4.
```

---

## 6. Variables de entorno

Crea un archivo `.env.local` en la raíz (NUNCA lo commitees a git) con estas variables. El archivo `.env.example` tendrá la lista completa sin valores reales.

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key"
SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key"
DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="generar-con-openssl-rand-base64-32"

# Cloudinary (cuenta se crea más adelante, fase 3)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Wompi (sandbox, fase 5)
WOMPI_PUBLIC_KEY=""
WOMPI_PRIVATE_KEY=""
WOMPI_EVENTS_SECRET=""

# Stripe (fase 5)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""

# WhatsApp Cloud API (fase 6)
WHATSAPP_ACCESS_TOKEN=""
WHATSAPP_PHONE_NUMBER_ID=""
WHATSAPP_VERIFY_TOKEN=""

# Resend (email)
RESEND_API_KEY=""

# Inngest
INNGEST_EVENT_KEY=""
INNGEST_SIGNING_KEY=""

# Sentry (monitoreo)
SENTRY_DSN=""
```

### Generar el NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copia el resultado al `.env.local`.

---

## 7. Comandos disponibles

Una vez Claude Code haya inicializado el proyecto, estos serán los comandos principales:

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000` |
| `npm run build` | Build de producción |
| `npm run start` | Correr la build de producción local |
| `npm run lint` | Revisar lint y formato |
| `npm run typecheck` | Verificar tipos de TypeScript |
| `npm run test` | Tests unitarios (Vitest) |
| `npm run test:e2e` | Tests end-to-end (Playwright) |
| `npm run db:migrate` | Crear y aplicar migración de Prisma |
| `npm run db:push` | Push schema sin migración (solo desarrollo) |
| `npm run db:seed` | Cargar datos semilla |
| `npm run db:studio` | Abrir Prisma Studio (UI visual de la base de datos) |

---

## 8. Flujo de trabajo con Claude Code

### Sesión típica de desarrollo

1. Abre la terminal en `~/proyectos/fundacion-managers-web`.
2. Ejecuta `claude` para iniciar Claude Code.
3. Dile qué quieres lograr en lenguaje natural. Ejemplos:
   - "Implementa la página de la sección Consultoría según la especificación."
   - "Agrega el modelo Match en Prisma con las relaciones definidas en la sección 4.2.4 del documento maestro."
   - "Corre los tests y arregla los que fallen."
4. Claude Code propondrá cambios. **Revisa cada cambio antes de aprobar** (Claude Code pide confirmación para acciones destructivas).
5. Cuando una funcionalidad esté completa, haz commit y push:
   ```bash
   git add .
   git commit -m "feat: agregar página de Consultoría Empresarial"
   git push origin main
   ```

### Buenas prácticas

- **Una tarea a la vez.** No le pidas a Claude Code "haz todo el blog y el torneo". Hazlo por fases pequeñas y revisables.
- **Revisa antes de commitear.** Usa `git diff` o tu editor para ver los cambios.
- **Si algo no entiende, dale más contexto.** "Mira la sección X del documento maestro" suele resolverlo.
- **Cuando termines una fase, actualiza el CHANGELOG** (Claude Code puede hacerlo automáticamente si se lo pides).

---

## 9. Despliegue

### Primera conexión con Vercel

1. En Vercel haz clic en **"Add New → Project"**.
2. Selecciona el repositorio `fundacion-managers-web` de GitHub.
3. Vercel detectará Next.js automáticamente.
4. En **Environment Variables**, pega todas las variables de `.env.local` (excepto las que sean solo de desarrollo local).
5. Haz clic en **Deploy**.

A partir de ese momento, cada `git push` a `main` desplegará automáticamente en producción. Cada PR genera un preview deploy.

### Configurar dominio personalizado

Cuando tengas el dominio definitivo (por ejemplo `fundacionmanagers.org`):

1. En Vercel: **Settings → Domains** → añadir dominio.
2. Vercel te dará los registros DNS a configurar en tu proveedor de dominio.
3. Espera la propagación (15 min a 24h) y Vercel emitirá el certificado SSL automáticamente.

---

## 10. Soporte

- **Documentación maestra:** `Managers_Especificaciones_v2.docx`
- **Instrucciones para Claude Code:** `CLAUDE.md`
- **Sistema de diseño:** `DESIGN_SYSTEM.md`
- **Documentación de Next.js:** https://nextjs.org/docs
- **Documentación de Supabase:** https://supabase.com/docs
- **Documentación de Claude Code:** https://docs.claude.com/en/docs/claude-code/overview

---

**Versión del proyecto:** 0.1.0
**Última actualización:** mayo 2026
