# Especificación Técnica: Goleadores y Asistencias por Campeonato (`/goleadores-campeonato` o Vista Campeonato)

## 1. Objetivo
Módulo de estadísticas desglosadas por cada torneo/campeonato en formato de acordeones desplegables, permitiendo consultar tanto Goleadores como Asistidores de cada torneo.

---

## 2. Orden Cronológico y Acordeones
* Los torneos se ordenan de forma descendente **(del más reciente al más antiguo disputado)**.
* Cada torneo es un acordeón desplegable. Por defecto, el torneo más reciente aparece abierto.

---

## 3. Pestañas Internas (Goleadores vs Asistencias)
En la cabecera interna de cada torneo desplegado se incluye un switch/tab:
* **⚽ Goleadores** (Default)
* **🎯 Asistencias**

---

## 4. Estructura de la Tabla de Goleadores (Diseño Oscuro)
* **Columnas:** 
  * `POS` (Posición con medallas 🥇, 🥈, 🥉 en los primeros 3 lugares).
  * `JUGADOR` (Nombre del futbolista).
  * `PJ` (Partidos jugados en el torneo).
  * `GOLES` (Badge/número destacado).
  * `PROM.` (Promedio: $\text{Goles} / \text{PJ}$ a 2 decimales).
  * `⚽ x2` (Badge bien marcado de Dobletes, ej: `2` en verde/celeste).
  * `⚽ x3` (Badge bien marcado de Tripletes/Hat-tricks, ej: `1` en dorado/rojo).

### Fila de Totales al Pie
* Justo al final de la lista del torneo, se agrega una fila con el resumen total:
  * `TOTALES TORNEO`: Suma total de Goles, Dobletes y Tripletes del equipo en ese campeonato.

---

## 5. Estructura de la Tabla de Asistencias
* Muestra `POS`, `JUGADOR`, `PJ`, `ASISTENCIAS` y `PROM.`.
* Pie de tabla con la suma total de asistencias del equipo en ese campeonato.

---

## 6. Adaptación Responsiva (Mobile / Celulares)
* **Desktop:** Contenedor centrado (`max-w-4xl mx-auto`).
* **Mobile:** Usar contenedor compacto (`max-w-md mx-auto px-2`), fuentes pequeñas (`text-xs`), padding fino (`py-1.5`) y columnas numéricas agrupadas sin huecos vacíos ni scroll horizontal.