# DESIGN_SYSTEM.md — Sistema de Diseño

> Guía visual y de UI para el proyecto **fundacion-managers-web**. Todo el equipo (humanos y Claude Code) debe consultar este archivo antes de tocar cualquier interfaz.

---

## 1. Estrategia de marca

**Marca única "Fundación Managers"**. Todos los seis ejes operan bajo la misma identidad visual. El módulo de torneo es una sección más, sin sub-marca, pero con flexibilidad de paleta inversa (fondos oscuros) para preservar la energía deportiva del activo digital existente en Instagram.

El **logo de la moneda dorada** (símbolo actual del torneo) se mantiene intacto y se eleva a logo oficial de toda la fundación. Comunica triunfo, esfuerzo y reconocimiento — valores transversales a los seis ejes.

---

## 2. Paleta de colores

### 2.1 Colores principales

| Token | Nombre | HEX | Uso |
|---|---|---|---|
| `--color-gold` | Dorado Managers | `#D4A437` | Logo, CTAs principales, acentos premium, identidad |
| `--color-gold-hover` | Dorado Hover | `#BD8E2A` | Hover de elementos dorados |
| `--color-carbon` | Negro Carbón | `#0F1419` | Headers, fondo del módulo torneo, footer |
| `--color-bg` | Blanco Hueso | `#FAFAF7` | Fondo principal del sitio (modo claro) |
| `--color-text` | Grafito | `#1A1A1A` | Cuerpo de texto en modo claro |
| `--color-border` | Gris Cálido | `#E8E5DE` | Bordes, divisores, cards secundarias |
| `--color-success` | Verde Campo | `#2D7A4F` | Estados positivos, sección rural, badges de éxito |
| `--color-danger` | Rojo Managers | `#C8362B` | Errores, urgencias, indicador EN VIVO de partidos |

### 2.2 Escala de neutros (derivados)

```css
--neutral-50:  #FAFAF7;   /* fondo principal */
--neutral-100: #F2EFE8;   /* fondos sutiles */
--neutral-200: #E8E5DE;   /* bordes, divisores */
--neutral-300: #D6D3CC;   /* divisores secundarios */
--neutral-400: #A8A29E;   /* texto deshabilitado */
--neutral-500: #78716C;   /* iconos secundarios */
--neutral-600: #57534E;   /* texto secundario */
--neutral-700: #44403C;   /* texto sobre fondo claro alternativo */
--neutral-800: #1F1B16;   /* texto sobre fondo oscuro */
--neutral-900: #0F1419;   /* fondo modo oscuro */
```

### 2.3 Implementación en `globals.css`

```css
:root {
  --color-gold: #D4A437;
  --color-gold-hover: #BD8E2A;
  --color-carbon: #0F1419;
  --color-bg: #FAFAF7;
  --color-text: #1A1A1A;
  --color-muted: #57534E;
  --color-border: #E8E5DE;
  --color-success: #2D7A4F;
  --color-danger: #C8362B;
}

[data-theme="dark"],
.tournament-section {
  --color-bg: #0F1419;
  --color-text: #FAFAF7;
  --color-muted: #A8A29E;
  --color-border: #1F1B16;
}
```

### 2.4 Configuración en `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A437',
          hover: '#BD8E2A',
        },
        carbon: '#0F1419',
        success: '#2D7A4F',
        danger: '#C8362B',
        neutral: {
          50: '#FAFAF7',
          100: '#F2EFE8',
          200: '#E8E5DE',
          300: '#D6D3CC',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#1F1B16',
          900: '#0F1419',
        },
      },
    },
  },
} satisfies Config;
```

---

## 3. Tipografía

Todas son Google Fonts (licencia libre, alto rendimiento, soportadas por `next/font`).

| Rol | Familia | Pesos | Uso específico |
|---|---|---|---|
| Display deportivo | **Bebas Neue** | 400 | Marcadores grandes, números del torneo, hero del módulo deportes |
| Display institucional | **Plus Jakarta Sans** | 700, 800 | Títulos de páginas, hero de secciones institucionales |
| Cuerpo | **Inter** | 400, 500, 600 | Párrafos, labels, navegación, formularios |
| Datos tabulares | **Inter** (con `font-feature-settings: "tnum"`) | 500 | Tablas de posiciones, estadísticas, fixtures |
| Monospace | **JetBrains Mono** | 400, 500 | Códigos de inscripción, IDs, snippets técnicos |

### 3.1 Importación con `next/font`

```typescript
// src/app/layout.tsx
import { Bebas_Neue, Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display-sport',
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});
```

### 3.2 Escala tipográfica

| Token | Tamaño | Line-height | Weight | Uso |
|---|---|---|---|---|
| `display-2xl` | 72px | 1.0 | 800 | Hero principal |
| `display-xl` | 60px | 1.05 | 800 | Hero secundario |
| `display-lg` | 48px | 1.1 | 700 | Títulos de sección |
| `h1` | 36px | 1.2 | 700 | Encabezados de página |
| `h2` | 28px | 1.25 | 700 | Subsecciones |
| `h3` | 22px | 1.3 | 600 | Bloques |
| `h4` | 18px | 1.4 | 600 | Sub-bloques |
| `body-lg` | 18px | 1.6 | 400 | Párrafos destacados |
| `body` | 16px | 1.6 | 400 | Default |
| `body-sm` | 14px | 1.5 | 400 | Texto secundario |
| `caption` | 12px | 1.4 | 500 | Etiquetas, captions, footers |

---

## 4. Espaciado

Escala basada en múltiplos de 4px (estándar Tailwind):

```
4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px
```

**Reglas:**
- Padding interno de cards: 24px (mobile) / 32px (desktop).
- Gap entre secciones en una página: 64px (mobile) / 96px (desktop).
- Gap entre elementos en una lista: 12px o 16px.
- Margen entre párrafos: 16px.

---

## 5. Radios y sombras

```css
--radius-sm: 6px;       /* inputs, botones sutiles */
--radius-md: 10px;      /* cards, modals */
--radius-lg: 16px;      /* hero cards, secciones destacadas */
--radius-full: 9999px;  /* avatars, pills, badges */

--shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 12px rgb(0 0 0 / 0.08);
--shadow-lg: 0 12px 32px rgb(0 0 0 / 0.12);
--shadow-gold: 0 8px 24px rgb(212 164 55 / 0.25); /* CTAs premium */
```

---

## 6. Aplicación por sección

| Sección | Modo | Detalles |
|---|---|---|
| **Home** | Claro | Hero con foto + acento dorado. Cards para los 6 ejes con paleta neutra y solo iconos en color. |
| **Consultoría** | Claro | Tono corporativo, fotos en B&W con acento dorado. |
| **Deportes / Torneo** | **Oscuro completo** | Negro carbón + dorado prominente + rojo para EN VIVO. |
| **Turismo** | Claro | Fotografía a sangrado. Acentos verde campo. |
| **Eventos** | Claro | Cards visuales. Dorado para fechas y CTAs. |
| **Emprendimiento** | Claro | Energía cálida. Foco en historias y testimonios. |
| **Managers Rural** | Claro | Paleta verde campo más presente. Fotografía documental. |
| **Blog** | Claro | Máxima legibilidad. Tipografía cómoda para lectura larga. |
| **Panel admin** | Claro | Funcional, denso en información, accesible. |
| **Scorer (anotador)** | Oscuro | Mobile-first, botones grandes, alto contraste para uso en cancha. |

---

## 7. Componentes base

Usar **shadcn/ui** como base y extender solo cuando sea necesario. NUNCA recrear desde cero un componente que ya existe en shadcn.

### Botones

| Variante | Cuándo usar |
|---|---|
| `primary` (dorado) | CTA principal de la página. Máximo uno por vista. |
| `secondary` (carbón) | CTA secundaria, acciones importantes. |
| `outline` | Acciones terciarias, cancelar, volver. |
| `ghost` | Acciones inline, en tablas, en navegación. |
| `destructive` (rojo) | Borrar, cancelar inscripción, acciones irreversibles. |

### Estados de partidos (badges)

```tsx
<Badge variant="live">EN VIVO</Badge>      // rojo con punto pulsante
<Badge variant="scheduled">PROGRAMADO</Badge>  // neutral
<Badge variant="finished">FINALIZADO</Badge>   // gris
<Badge variant="postponed">APLAZADO</Badge>    // amarillo
```

---

## 8. Iconografía

- **Librería única:** `lucide-react`.
- Tamaños estándar: 16px (inline), 20px (UI), 24px (destacados), 32px (hero).
- Stroke width: 1.75 por defecto.
- Color: hereda del texto contextual. Nunca pintar iconos en colores aleatorios.

---

## 9. Imágenes y fotografía

- **Componente único:** `next/image` (NUNCA usar `<img>` directo).
- **Servicio:** Cloudinary para todas las imágenes generadas por usuarios.
- **Formato preferido:** AVIF → WebP → JPG fallback (Next.js lo maneja automáticamente).
- **Ratios estándar:**
  - Hero: 16:9 o 21:9
  - Cards: 4:3 o 1:1
  - Avatares: 1:1
  - Escudos: 1:1 con padding interno

### Estilo fotográfico por sección

- **Consultoría, Eventos:** B&W con acento dorado al hover.
- **Torneo:** color saturado, alta energía.
- **Rural, Turismo:** documental, cálido, sin filtros pesados.

---

## 10. Accesibilidad (no negociable)

- **Contraste mínimo AA:** 4.5:1 para texto normal, 3:1 para texto grande (18px+).
- **Foco visible:** todos los elementos interactivos deben tener un outline visible (color dorado).
- **Navegación por teclado:** Tab, Enter, Escape deben funcionar en todos los componentes interactivos.
- **Alt text:** todas las imágenes informativas. Las decorativas con `alt=""`.
- **Etiquetas en formularios:** siempre con `<label>` asociado, nunca solo placeholder.
- **Live regions:** marcadores en vivo del torneo deben anunciarse con `aria-live="polite"`.
- **Test:** correr `axe-core` en cada PR.

---

## 11. Performance

Metas mínimas (Lighthouse mobile):

| Métrica | Meta |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

**Reglas:**
- Imágenes siempre con `next/image` y dimensiones explícitas.
- Fuentes con `next/font` (no `<link>` manual de Google Fonts).
- Componentes pesados con `dynamic()` y `loading` skeleton.
- Tablas largas con virtualización (`@tanstack/react-virtual`).

---

## 12. Animación

- **Librería:** `framer-motion` para animaciones complejas, transiciones CSS nativas para lo simple.
- **Duración:** 150-300ms para micro-interacciones. 400-600ms para transiciones de página.
- **Easing por defecto:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out fuerte).
- **Respetar `prefers-reduced-motion`:** desactivar animaciones no esenciales si el usuario lo prefiere.

---

## 13. Componentes específicos del torneo

### Marcador en vivo (`LiveMatchHeader`)
- Fondo negro carbón.
- Marcador en Bebas Neue 96px, dorado.
- Logo de equipos en 64px circular.
- Badge "EN VIVO" rojo pulsante.
- Minuto y período en tipografía mono.

### Tabla de posiciones (`StandingsTable`)
- Header fijo al hacer scroll.
- Filas con hover dorado sutil.
- Indicador de zona de clasificación con borde izquierdo de color (verde = clasifica, rojo = eliminado).
- Números en `Inter` con `font-feature-settings: "tnum"` (números monoespaciados).

### Bracket eliminatorio (`BracketView`)
- Líneas conectoras grises sutiles.
- Equipo ganador en dorado, perdedor en gris.
- Hover muestra detalle del partido.
- En mobile: vista vertical scrolleable. En desktop: vista horizontal tradicional.

---

**Última actualización:** mayo 2026
