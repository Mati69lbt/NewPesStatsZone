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

## 3. Comportamiento Interactivo de Dropdowns (Modo Click)
* **Apertura/Cierre por Click:** Los menús desplegables (`Partidos ▾`, `Estadísticas ▾`, `Torneos y Clubes ▾`) abren y cierran al hacer **click** sobre la categoría principal.
* **Cierre Automático:** 
  * Se cierra automáticamente cuando el usuario hace click en cualquiera de las sub-rutas.
  * Se cierra si el usuario hace click fuera del menú (evento `click outside`).
  * Solo puede haber un menú desplegable abierto a la vez.

---

## 4. Mobile (Celulares)
* **MANTENER SIN CAMBIOS:** La lógica y diseño actual del menú hamburguesa en mobile se mantiene exactamente igual a la versión actual. Solo se aplican los dropdowns en la versión Desktop (`hidden md:flex`).