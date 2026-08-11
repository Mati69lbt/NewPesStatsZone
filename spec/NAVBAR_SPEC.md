# Especificación Técnica: Rediseño de Navbar con Dropdowns (`Navbar.jsx`)

## 1. Objetivo
Organizar la navegación principal de la aplicación mediante menús desplegables (Dropdowns) para evitar la saturación de links horizontales y dar espacio a futuras secciones.

---

## 2. Estructura de Menús

* **Logo:** `PES STATS ZONE` (a la izquierda, redirige a inicio `/`).

* **Bloque 1: Partidos ▾**
  * `Partidos` (`/partidos`)
  * `Próximo Partido` (`/next-match`)
  * `Versus` (`/versus`)
  * `Últimos 10` (`/ultimos-10`)

* **Bloque 2: Estadísticas ▾**
  * `Capitanes` (`/capitanes`)
  * `Temporadas` (`/temporadas`)

* **Bloque 3: Torneos y Clubes ▾**
  * `Campeonatos` (`/campeonatos`)
  * `Clubes` (`/clubes`)

* **Acciones Directas (Derecha):**
  * `Formación` (`/formacion`)
  * `+ Registrar Partido` (Botón destacado verde/cromático).
  * Toggle de Modo Oscuro/Claro.

---

## 3. Comportamiento Visual (Desktop)
* **Hover / Click Dropdown:** Al pasar el mouse o hacer click en una categoría, se despliega una tarjeta oscura Flotante (`absolute top-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2 z-50`) con los links correspondiente.
* **Indicador de Ruta Activa:** Si el usuario está dentro de `/campeonatos`, la categoría `Torneos y Clubes` debe resaltarse en color activo (ej. verde del proyecto).

---

## 4. Mobile (Celulares)
* **MANTENER SIN CAMBIOS:** La lógica y diseño actual del menú hamburguesa en mobile se mantiene exactamente igual a la versión actual. Solo se aplican los dropdowns en la versión Desktop (`hidden md:flex`).