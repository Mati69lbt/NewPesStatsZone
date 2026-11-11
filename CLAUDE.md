# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

App de estadísticas de un grupo de fútbol amateur (PES Stats Zone): registro de partidos, goleadores, capitanes, clubes, rachas, versus entre jugadores/clubes, etc. React + Vite + Firebase, desplegada a GitHub Pages.

## Comandos

- `npm run dev` — servidor de desarrollo (Vite).
- `npm run build` — build de producción.
- `npm run preview` — sirve el build localmente.
- `npm run lint` — ESLint sobre todo el proyecto.
- `npm run deploy` — build + publica `dist/` en GitHub Pages (`gh-pages -d dist`).

No hay test runner configurado.

## Stack

- **Vite 8** + `@vitejs/plugin-react`, **React 19**, **react-router-dom 7** (`HashRouter`, por el deploy a GitHub Pages).
- **Tailwind CSS 4**, config CSS-first vía `@tailwindcss/vite` en `vite.config.js` (no hay `tailwind.config.js`; revisar `src/index.css`).
- **Firebase** (`firebase/app`, `firebase/auth`, `firebase/firestore`) como backend de datos y autenticación.
- **Notiflix** + **react-toastify** para notificaciones (`ToastContainer` montado en `App.jsx`).
- ESLint 10 (flat config en `eslint.config.js`) con `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`.

## Arquitectura

### Flujo de datos: Firebase por usuario

Todos los datos (partidos, jugadores, clubes, formaciones) viven en Firestore bajo `users/{uid}/<colección>` (p. ej. `users/{uid}/partidos`). No hay datos globales compartidos entre usuarios: cada usuario autenticado tiene su propio set de datos.

El patrón se repite en cada dominio (ver `matchesService.js`, `playersService.js`, `clubService.js`, `formationsService.js`, `tournamentsService.js`):

1. **`src/services/*Service.js`** — funciones puras que hablan con Firestore: `subscribeToX(uid, onChange)` usa `onSnapshot` + `query/orderBy` para suscripción en tiempo real, y `addX`/`updateX`/`deleteX` son operaciones CRUD async. Nunca importan React.
2. **`src/hooks/use*.js`** — envuelven el `subscribeToX` del service en un hook (`useState` + `useEffect` indexado por `uid`), devolviendo el array reactivo. Si `uid` es falsy, devuelven `[]`/estado vacío en vez de suscribirse.
3. **`src/pages/*Page.jsx`** — componen hooks + services + componentes de UI para armar la pantalla de una ruta.
4. **`src/components/*.jsx`** — UI pura y presentación (tablas, cards, sort bars); no acceden a Firestore directamente, reciben datos ya resueltos por props.
5. **`src/utils/*.js`** — funciones puras de transformación/cálculo de estadísticas (ordenamiento, streaks, versus, palmarés, etc.) sin estado ni dependencia de React; hacen la mayoría de los cálculos de stats a partir de los arrays crudos de Firestore.

### Auth y config

- `src/config/firebase.js` inicializa `app`, `auth`, `db` desde variables `VITE_FIREBASE_*` (`.env`, no versionado).
- `useCurrentUser` (hook) expone el usuario autenticado; el resto de hooks de datos reciben `uid` derivado de ahí.
- Rutas no tienen guard explícito en `App.jsx`: `LoginPage`/`RegisterPage` son las entradas de auth, y las páginas de datos asumen un `uid` disponible vía hooks.

### Routing

`HashRouter` en `main.jsx` (requerido para GitHub Pages, que no sirve rutas arbitrarias). Todas las rutas están declaradas planas en `App.jsx` (sin rutas anidadas ni layout compartido salvo el wrapper raíz + `ToastContainer`). `/` redirige a `/login`.

### Barrels sin usar

Los `index.js` en `src/{components,hooks,pages,services,utils}/` son placeholders (`export {}`): el código importa directo desde el archivo concreto (p. ej. `import usePlayers from '../hooks/usePlayers'`), no desde el barrel. No asumir que los barrels están poblados; si se agrega un export ahí, mantener el patrón de imports directos salvo que se decida migrar explícitamente.

### Estética

Deportiva, minimalista, dark-mode first (`useDarkMode` hook, clases `dark:` de Tailwind en todos los componentes). Diseño 100% responsive con breakpoints `sm:`/`md:`/`lg:`.
