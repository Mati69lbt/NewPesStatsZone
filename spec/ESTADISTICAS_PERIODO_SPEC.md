# Especificación Técnica: Goleadores y Asistidores por Período (`/estadisticas-periodo`)

## 1. Objetivo
Unificar las vistas de "Año" y "Año Europeo (Temporada)" en una estructura visual compacta, combinando Goles y Asistencias con desglose por condición.

---

## 2. Definición de Períodos
* **Modo Año Calendario:** Del `01/01` al `31/12`.
* **Modo Año Europeo (Temporada):** Del `01/07` al `30/06` del año posterior.

---

## 3. Estructura y Componentes de la Vista
* **Selector de Formato:** Switch superior para alternar entre `Año Calendario` y `Temporada Europea`.
* **Métrica Activa (Tabs):** Switch para conmutar entre `⚽ Goleadores` y `🎯 Asistencias`.
* **Condición de Partido:** Filtros por `Gral` (General), `Loc` (Local) y `Vis` (Visitante).

---

## 4. Diseño y Ancho de Pantalla (Fix de Layout)
* **Desktop:**
  * **Ancho Máximo:** Envolver toda la tabla/acordeón en un contenedor `max-w-5xl mx-auto` para evitar que la tabla de Temporada Europea o Año se estire excesivamente a los bordes de la pantalla.
  * Mantener el diseño de bloques rectangulares agrupados/acordeones con fondo oscuro nativo.
* **Mobile (Celulares):**
  * Contenedor ajustado (`max-w-md mx-auto px-2`).
  * Columnas numéricas (`PJ`, `G/A`, `PROM`) agrupadas y compactas (`w-8` a `w-12`), sin huecos vacíos en el medio ni scroll horizontal.

---

## 5. Columnas y Totales
* **Columnas:** `POS`, `JUGADOR`, `CLUB/DORSAL`, `PJ`, `G` (o `A`), `PROM.`.
* **Pie de Tabla:** Fila final con el `Total` de Goles o Asistencias acumuladas en ese período y condición.


## 6. Balance y Anchos de Columnas (Fix Ancho Sobrante y Truncate)
* **Contenedor:** Reducir el ancho máximo a `max-w-3xl mx-auto` para evitar que las celdas queden demasiado distantes.
* **Proporción de Columnas:**
  * `POS`: Ancho fijo compacto (`w-10`).
  * `JUGADOR`: Ancho justo ajustado a la izquierda (ej: `w-1/3` o `min-w-[140px]`), sin huecos desproporcionados.
  * `CLUB`: **Sin `truncate`**. Darle espacio suficiente (ej: `w-1/3` o `min-w-[120px]`) para que el nombre del equipo no se recorte ni use puntos suspensivos.
  * `PJ`, `G/A`, `PROM`: Columnas numéricas agrupadas, centradas/derecha, de ancho fijo compacto (`w-12`).
* **Regla Mobile:**
  * Evitar el recorte (`truncate`) en los nombres de los clubes.
  * Mantener espaciado ajustado (`px-1.5 py-2`) y tipografía `text-xs`.