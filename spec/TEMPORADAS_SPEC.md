# Especificación Técnica: Vista Temporadas (`/seasons` o `/temporadas`)

## 1. Objetivo
Página para analizar el rendimiento estadístico del DT por cada temporada jugada, con soporte para dos formatos de calendario (Anual vs Europeo) y desplegables por cada año/club dirigido.

---

## 2. Controles Superiores
* **Título:** `Temporadas` con su ícono representativo.
* **Filtros de Formato (Toggle / Botones):**
  * `ANUAL`: Agrupa partidos disputados entre el **1 de enero y el 31 de diciembre** del mismo año (ej: `2035`).
  * `EUROPEO`: Agrupa partidos disputados entre el **1 de julio y el 30 de junio** del año siguiente (ej: `2034 - 2035`).
* **Selector/Filtro Adicional:** Botón `Clubes` para filtrar por equipo específico si se desea.

---

## 3. Lista Desplegable (Accordion / Acordeón)
* Cada bloque representa una temporada ligada al equipo dirigido (ej: `2035 · RIVER PLATE`, `2035 · SPARTAK MOSKVA`, `2034 · CELTIC`).
* **Comportamiento:** 
  * Por defecto el más reciente viene **abierto** y el resto **colapsados** (cerrados).
  * Al hacer click en la barra/encabezado, conmuta mediante la flecha (`▲` / `▼`) abriendo o cerrando el contenido.

---

## 4. Estructura Interna del Acordeón (Desglose por Fila)

Cada temporada desplegada muestra filas correspondientes al **Total del Equipo** y a **Cada Capitán** utilizado durante ese ciclo.

### Layout por Fila:
Consta de **4 Bloques Horizontales** de estadísticas:
1. **GENERAL / NOMBRE_EQUIPO (ej: RIVER PLATE - 2035):** Resumen global.
2. **LOCAL:** Partidos jugados en condición de local.
3. **VISITANTE:** Partidos jugados como visitante.
4. **NEUTRAL:** Partidos jugados en cancha neutral.

### Métricas de cada Bloque (Columnas):
* `PJ` (Partidos Jugados).
* `G` (Ganados).
* `E` (Empatados).
* `P` (Perdidos).
* `G/P` (Badge circular verde/rojo/amarillo para diferencia de victorias).
* `GF` (Goles a Favor).
* `GC` (Goles en Contra).
* `DF` (Badge circular verde/rojo/amarillo para diferencia de gol).
* `%` o Puntos Obt/Posibles (ej: `8 / 15` con el porcentaje `53%` abajo).

---

## 5. Filas Secundarias (Capitanes)
* Debajo del bloque general del club, se listan los capitanes activos en esa temporada (ej: `S. BERTOLI`, `Y. PELE`).
* Mantienen exactamente el mismo formato de 4 bloques (General, Local, Visitante, Neutral) y métricas.