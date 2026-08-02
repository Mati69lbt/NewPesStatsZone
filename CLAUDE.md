# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Estado del proyecto

Este es un proyecto React + Vite recién scaffoldeado (boilerplate por defecto de `create-vite`, plantilla `react`). Aún no hay arquitectura propia: `src/App.jsx` es el contenido de ejemplo de Vite/React. No existe repositorio git inicializado todavía.

## Comandos

- `npm run dev` — inicia el servidor de desarrollo (Vite).
- `npm run build` — build de producción (Vite).
- `npm run preview` — sirve el build de producción localmente.
- `npm run lint` — corre ESLint sobre todo el proyecto.

No hay test runner configurado.

## Stack

- **Vite 8** con `@vitejs/plugin-react`.
- **React 19**.
- **Tailwind CSS 4**, integrado vía `@tailwindcss/vite` en `vite.config.js` (no hay archivo `tailwind.config.js`; la config es CSS-first, revisar `src/index.css`).
- **ESLint 10** (flat config en `eslint.config.js`), con `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`. Ignora `dist`.
- Dependencias instaladas pero aún sin uso en el código: `firebase`, `notiflix`, `react-toastify`.

## Estructura

- `src/main.jsx` — entry point, monta `<App />`.
- `src/App.jsx` — componente raíz (contenido boilerplate de Vite, a reemplazar).
- `public/icons.svg` — sprite SVG referenciado vía `<use href="/icons.svg#...">` en JSX.
- `index.html` — HTML raíz de Vite.

## Reglas de Desarrollo y Arquitectura

1. **Arquitectura modular estricta**: componentes pequeños y enfocados, con responsabilidad única (Single Responsibility Principle). Evitar componentes monolíticos que mezclen lógica de datos, estado y presentación.
2. **Separación clara de responsabilidades**:
   - `src/services/` — servicios de Firebase (auth, Firestore, storage, etc.).
   - `src/hooks/` — hooks personalizados (lógica de estado y efectos reutilizable).
   - `src/components/` — UI pura, sin lógica de acceso a datos.
3. **Estética**: deportiva, minimalista y limpia, usando Tailwind CSS v4 (config CSS-first en `src/index.css`).
4. **Notificaciones**: combinar Notiflix y React-Toastify según la spec del proyecto.
5. **Diseño 100% responsive**: toda interfaz y componente debe estar optimizado tanto para desktop/monitor como para celular, usando las clases adaptativas de Tailwind CSS (`sm:`, `md:`, `lg:`, etc.).
