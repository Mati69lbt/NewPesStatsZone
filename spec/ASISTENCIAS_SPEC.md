# Especificación Técnica: Vista de Asistencias (`/asistencias`)

## 1. Objetivo
Módulo espejo a Goleadores para listar el ranking de máximos asistidores del club activo.

---

## 2. Filtros y Navegación Superior
* **Selector de Club (`CLUB`):** Selecciona el club activo.
* **Selector de Vista (`VISTA`):** Permite cambiar a `Asistencias` (`/asistencias`).
* **Pestañas de Condición:** `Gral` (General), `Loc` (Local), `Vis` (Visitante), `Neu` (Neutral).

---

## 3. Criterio de Filtrado y Métricas
* **Filtro estricto:** Solo figuran jugadores con más de 0 asistencias (`AST > 0` o `A > 0`).
* **Columnas:** `#`, `Jugador`, `PJ`, `A` (Asistencias), `P` (Promedio: $\text{Asistencias} / \text{PJ}$).
* **Pie de Tabla (Totales):** Fila inferior con la suma total de asistencias del equipo en la condición activa.

---

## 4. Barra de Ordenamiento Dinámico
Botones de conmutación:
* `Nombre` (A-Z)
* `PJ` (Partidos Jugados)
* `Asistencias` (Default: Descendente)
* `Promedio`

---

## 5. Layout Compacto y Responsivo (Mobile & Desktop)
* **Desktop:** Contenedor centrado (`max-w-4xl mx-auto`).
* **Mobile (Celulares):** Contenedor compacto (`max-w-md mx-auto px-2`), columnas numéricas agrupadas y juntas (`w-8` / `w-10`), padding reducido (`py-1.5`) y fuente `text-xs` para evitar espacio vacío en el medio.