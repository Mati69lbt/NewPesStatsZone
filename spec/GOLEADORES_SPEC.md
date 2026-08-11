# Especificación Técnica: Vista de Goleadores (`/goleadores`)

## 1. Objetivo
Módulo para listar el ranking de goleadores del club activo, filtrable por condición de partido y con ordenamiento dinámico por distintas métricas de gol.

---

## 2. Filtros y Navegación Superior
* **Selector de Club (`CLUB`):** Selecciona el club activo.
* **Selector de Vista (`VISTA`):** Permite saltar entre sub-vistas estadísticas (Goleadores, Asistencias, etc.).
* **Condición de Partido:** Pestañas superiores para filtrar los datos:
  * `Gral` (General)
  * `Loc` (Local)
  * `Vis` (Visitante)
  * `Neu` (Neutral)

---

## 3. Criterio de Filtrado
* **Filtro estricto:** Solo deben figurar en la tabla aquellos jugadores que tengan **al menos 1 gol anotado** (`G > 0`) en la condición seleccionada.

---

## 4. Barra de Ordenamiento Dinámico
Botones de conmutación para ordenar la tabla según:
* `Nombre` (A-Z / Z-A)
* `PJ` (Partidos Jugados)
* `Goles` (Default: Descendente)
* `⚽ x2` (Cantidad de partidos con 2 goles / dobletes)
* `⚽ x3` (Cantidad de partidos con 3 o más goles / tripletes o hat-tricks)
* `Promedio` ($\text{Goles} / \text{PJ}$)

---

## 5. Estructura y Columnas de la Tabla (Diseño Oscuro)
* `#` (Posición en el ranking).
* `Jugador` (Nombre del futbolista).
* `PJ` (Partidos Jugados).
* `G` (Goles convertidos).
* `⚽ x2` (Dobletes).
* `⚽ x3` (Tripletes).
* `P` (Promedio de gol por partido, ej: `0.61`).

### Fila de Totales Generales (Pie de Tabla)
* En la parte inferior se muestra la sumatoria total del equipo en la condición activa: `Total Goles`, `Total Dobletes (x2)` y `Total Tripletes (x3)`.

---

## 6. Layout Compacto y Ajustado para Celulares (Mobile Fix)
* **Contenedor Principal:** Usar `w-full max-w-md md:max-w-4xl mx-auto px-2` para evitar que la tabla se desparrame a los extremos en móviles.
* **Espaciado Interno de Tabla:**
  * Reducir padding de celdas en móvil a `px-1.5 py-1.5`.
  * Definir anchos fijos/compactos para las columnas numéricas (`w-8` o `w-10`) para que estén agrupadas y pegadas entre sí.
  * Columna del Jugador: Ocupar el espacio restante (`w-full` o alineado a la izquierda) sin separarse exageradamente de los números.
* **Tamaño de Fuente:** `text-xs` en pantallas chicas, `text-sm` en pantallas medianas/grandes.