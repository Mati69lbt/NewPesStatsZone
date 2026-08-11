# Especificación Técnica: Vista Análisis de Capitanes (`/capitanes` o Sub-tab de Análisis)

## 1. Objetivo
Página para analizar y comparar el rendimiento estadístico del equipo según quién llevó la cinta de capitán (ej: *Pacheco*, *P. Cech*, *Herralde*, *Lamprou*).

---

## 2. Filtros y Controles
* **Selector Superior:** Permite elegir el **CLUB** activo (ej: *RB Leipzig*).
* **Navegación Interna (Pills/Tabs):**
  * `🔎 Resumen`
  * `🖐️ Capitanes` (Pestaña activa).

---

## 3. Sección Superior: TOTALES GENERALES
* **Bloque Fijo / Acordeón:** Encabezado `TOTALES GENERALES` con indicador de cantidad de capitanes (ej: `4 capitanes ▲`). Abierto por defecto.
* **Layout de Capitanes:**
  * **En Escritorio (`lg:`):** Las tarjetas de los capitanes se organizan horizontalmente en columnas (`grid grid-cols-2 xl:grid-cols-4 gap-4` o `flex overflow-x-auto`).
  * **En Celulares (`sm:`):** Se acomodan de forma vertical en 1 columna (`grid-cols-1`) o deslizable suave.

### Estructura de la Tarjeta por Capitán:
* **Encabezado:** Nombre del capitán (ej: *Pacheco*).
* **Filas Internas:**
  1. `General`
  2. `Local`
  3. `Visitante`
  4. `Neutral`
* **Columnas de Métricas:**
  * `Tipo` (General / Local / Visitante / Neutral).
  * `PJ` (Partidos Jugados).
  * `G` (Ganados).
  * `E` (Empatados).
  * `P` (Perdidos).
  * `G/P` (Badge circular verde/amarillo/rojo para diferencia de victorias).
  * `GF` (Goles a Favor).
  * `GC` (Goles en Contra).
  * `DIF` (Badge circular verde/amarillo/rojo para diferencia de gol).
  * `PTS/EFEC` (Puntos Obtenidos / Posibles y porcentaje de efectividad debajo).

---

## 4. Sección Inferior: Desglose por Torneos (Acordeones)
* Lista cronológica de torneos disputados por el club (ej: `CHAMPIONS LEAGUE 2025-2026`, `BUNDESLIGA 2025-2026`, `DFB POKAL 2025-2026`).
* **Comportamiento Acordeón:** Colapsados por defecto. Al hacer click en la barra del torneo, se despliegan las tarjetas de los capitanes que jugaron en dicho torneo con sus métricas correspondientes.

---

## 5. Layout Ancho y Cero Scrolls Internos (PROHIBIDO SCROLL)

1. **Pantallas Grandes (Desktop):**
   * El contenedor principal debe ser amplio: usar `w-full max-w-7xl mx-auto px-4` (o `max-w-full`).
   * **Prohibido el scroll horizontal interno** en las tablas de cada capitán (`overflow-x-auto` eliminado).
   * Para que las 10 columnas de la tabla entrén perfectas sin desbordar la tarjeta:
     * Reducir el padding horizontal de las celdas (`px-1.5` o `px-2` en `th` y `td`).
     * Usar tamaño de fuente compacto (`text-xs` o `text-sm`).
     * Achicar el tamaño de los badges de `G/P` y `DIF` (ej: `w-6 h-6 text-xs`).

2. **Pantallas Pequeñas (Celulares):**
   * Toda la vista debe ajustarse al ancho exacto del celular (`w-full max-w-full overflow-x-hidden`).
   * Las tarjetas de los capitanes se apilan en 1 sola columna (`grid-cols-1`).
   * Las minitablas internas deben ajustar sus márgenes y padding para que **quepan completas dentro de la pantalla del celular sin generar scroll**.