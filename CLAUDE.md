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
- `src/components/` — UI pura, sin lógica de acceso a datos.
- `src/services/` — servicios de Firebase (auth, Firestore, storage, etc.).
- `src/hooks/` — hooks personalizados (lógica de estado y efectos reutilizable).
- `src/pages/` — componentes de nivel página/ruta.
- `src/config/` — configuración de la app (p. ej. inicialización de Firebase).
- `src/utils/` — funciones utilitarias puras.
- `public/icons.svg` — sprite SVG referenciado vía `<use href="/icons.svg#...">` en JSX.
- `index.html` — HTML raíz de Vite.

Cada carpeta de `src/` tiene un `index.js` placeholder para mantener la estructura; reemplazar por barrel exports reales a medida que se agreguen módulos.

## Reglas de Desarrollo y Arquitectura

1. **Arquitectura modular estricta**: componentes pequeños y enfocados, con responsabilidad única (Single Responsibility Principle). Evitar componentes monolíticos que mezclen lógica de datos, estado y presentación.
2. **Separación clara de responsabilidades**:
   - `src/services/` — servicios de Firebase (auth, Firestore, storage, etc.).
   - `src/hooks/` — hooks personalizados (lógica de estado y efectos reutilizable).
   - `src/components/` — UI pura, sin lógica de acceso a datos.
   - `src/pages/` — componentes de nivel página/ruta, componen componentes + hooks + servicios.
   - `src/config/` — configuración e inicialización (p. ej. Firebase app config).
   - `src/utils/` — funciones utilitarias puras, sin estado ni dependencias de React.
3. **Estética**: deportiva, minimalista y limpia, usando Tailwind CSS v4 (config CSS-first en `src/index.css`).
4. **Notificaciones**: combinar Notiflix y React-Toastify según la spec del proyecto.
5. **Diseño 100% responsive**: toda interfaz y componente debe estar optimizado tanto para desktop/monitor como para celular, usando las clases adaptativas de Tailwind CSS (`sm:`, `md:`, `lg:`, etc.).

## Preferencias de trabajo

- Al finalizar cualquier tarea larga o ejecución de comandos en la terminal, notificar la finalización con un bip sonoro del sistema.
