<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio

Sitio de una sola página para Raymond A'campo. El contenido vive en datos; la página lo renderiza.

## Stack

- Next.js 16.4 (App Router) con `cacheComponents` y `partialPrefetching`
- React 19 y React DOM 19
- TypeScript 5, `strict`, alias `@/*` → `src/*`
- Tailwind CSS 4, cargado con `@tailwindcss/turbopack` desde `next.config.ts`
- ESLint 9 con `eslint-config-next` (core-web-vitals + typescript)
- Iconos de stack desde `simple-icons` en `src/content/icons.ts`

## Estructura

- `src/app/layout.tsx` — fuentes Geist, metadata y `globals.css`
- `src/app/page.tsx` — secciones Top, Projects, Stack, About y Contact
- `src/app/globals.css` — tokens de color, tema de Tailwind y clases de superficie
- `src/components/site-header.tsx` — único componente cliente; el resto es de servidor
- `src/content/site.ts` — nombre, proyectos, stack, about y contacto

## Convenciones

- Añade proyectos, texto y enlaces en `src/content/site.ts`. La página solo mapea esos datos.
- Usa Server Components. Marca `"use client"` solo cuando haga falta estado o efectos del navegador.
- Importa con el alias `@/`.
- Estilos con utilidades de Tailwind y las clases ya definidas (`.panel`, `.link`, `.nav-link`, `.placeholder-grid`). Los colores salen de `@theme` en `globals.css`.
- Enlaces externos llevan `target="_blank"` y `rel="noopener noreferrer"`.
- Respeta `prefers-reduced-motion` en cualquier animación nueva.
- Antes de escribir código de Next.js, lee la guía en `node_modules/next/dist/docs/`. Esta versión no coincide con Next.js anterior.
