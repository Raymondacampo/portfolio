# Design

Tema oscuro, una columna estrecha, paneles con borde suave y un acento lima. Fuente de verdad: `src/app/globals.css` y `src/app/layout.tsx`.

## Color

Tokens en `:root` y `@theme`. Úsalos como `bg-background`, `text-foreground`, `text-muted`, `border-line`, `text-link`, `text-lime` y `bg-panel`.

| Token | Valor | Uso |
| --- | --- | --- |
| background | `#070b16` | Fondo de la página |
| foreground | `#eef3ff` | Texto principal |
| muted | `#93a0bd` | Meta, etiquetas de grupo, stack de un proyecto |
| line | `rgba(150, 176, 255, 0.22)` | Borde de paneles y chips |
| link | `#8eb6ff` | Enlaces y anillo de foco |
| lime | `#d6f25c` | Rol bajo el nombre |
| panel | `#101830` | Superficie base del tema |

Colores de atmósfera, todavía sin token:

| Valor | Uso |
| --- | --- |
| `#0c1428` | Hueco de imagen, chip de icono y `.placeholder-grid` |
| `rgba(72, 132, 255, 0.28)` | Resplandor superior del fondo |
| `rgba(28, 58, 140, 0.22)` | Resplandor en la esquina superior derecha |
| `rgba(160, 190, 255, 0.16)` | Anillo decorativo detrás del contenido |
| `rgba(26, 38, 74, 0.96)` → `rgba(12, 18, 38, 0.96)` | Gradiente vertical de `.panel` |
| `rgba(40, 80, 180, 0.16)` | Sombra en reposo del panel |
| `rgba(186, 208, 255, 0.5)` | Borde al pasar el cursor |
| `rgba(48, 96, 200, 0.22)` | Sombra al pasar el cursor |
| `rgba(150, 176, 255, 0.08)` | Rejilla del placeholder |
| `rgba(90, 140, 255, 0.16)` | Brillo central del placeholder |
| `white/5`, `white/15` | Relleno y borde del chip de icono |
| `foreground/90` | Párrafos de intro y de proyecto |

Foco visible: contorno de 2px en `--link`, con 3px de separación.

## Tipografía

- Sans: Geist, cargada con `next/font/google` como `--font-geist-sans`. Es la fuente del `body`.
- Mono: Geist Mono, como `--font-geist-mono` y `--font-mono`. Está disponible; la página no la usa en el cuerpo.
- Reserva sans: `ui-sans-serif, system-ui, sans-serif`.
- El `html` lleva `antialiased`.

Escala que ya usa la página:

| Elemento | Clases |
| --- | --- |
| Nombre | `text-4xl font-medium tracking-tight sm:text-5xl` |
| Rol | `text-sm text-lime` |
| Titular | `text-lg leading-8` |
| Título de sección | `text-xl font-medium tracking-tight` |
| Título de proyecto | `text-lg font-medium tracking-tight` |
| Cuerpo de panel | `leading-7` |
| Meta y enlaces de proyecto | `text-sm leading-6` |
| Etiqueta de grupo | `text-sm text-muted` |

Enlaces de texto: subrayado con `text-underline-offset: 0.2em`. En reposo el trazo va al 45% de `--link`; al pasar el cursor queda sólido.

## Superficie y ritmo

- Columna: `max-w-[46rem]`, padding horizontal `px-6`, cierre inferior `pb-24`.
- El header fijo publica `--header-height`. El contenido y el `scroll-mt` de cada sección dependen de esa variable.
- Panel: radio `1.25rem`, borde `--line`, gradiente azul oscuro, sombra azul suave.
- Hover de proyecto: sube 2px en 160ms. Con `prefers-reduced-motion: reduce` solo cambian borde y sombra.
- Imagen de proyecto: relación `16/9`. Sin imagen, se usa `.placeholder-grid` (rejilla de 28px).
- Chips de stack: píldora con borde `border-line` e icono en un círculo de 32px.
