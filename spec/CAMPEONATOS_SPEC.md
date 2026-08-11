# Especificación Técnica: Vista Campeonatos (`/campeonatos`)

## 1. Objetivo
Página visual para revisar las estadísticas detalladas del club seleccionado desglosadas por cada torneo/campeonato disputado a lo largo del tiempo.

---

## 2. Filtros y Controles Superiores
* **Selector de Club (`CLUB`):** Menú desplegable para seleccionar el club activo (ej: *RB Leipzig*).
* **Selector de Orden (`ORDEN`):** 
  * `Más nuevos primero` (Opción por defecto: del torneo disputado más recientemente al más antiguo).
  * `Más viejos primero` (Invierte el orden cronológico).

---

## 3. Grilla y Tarjetas de Torneos
Las tarjetas de los torneos se distribuyen en una grilla responsiva:
* **Escritorio (`lg:`):** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
* **Celulares (`sm:`):** `grid grid-cols-1 gap-4`.

### Estructura Interna de Cada Tarjeta de Torneo:
* **Encabezado:** Nombre del torneo y temporada/año (ej: `Champions League 2025-2026`, `Bundesliga 2024-2025`).
* **Tabla de Condiciones:**
  * Filas: `GENERAL`, `LOCAL`, `VISITANTE` (o solo la condición disputada si no aplica otra).
  * Columnas: 
    * `CONDICIÓN` (General / Local / Visitante)
    * `PJ` (Partidos Jugados)
    * `G` (Ganados)
    * `E` (Empatados)
    * `P` (Perdidos)
    * `G/P` (Badge circular cromático)
    * `GF` (Goles a Favor)
    * `GC` (Goles en Contra)
    * `DF` (Diferencia de gol con badge circular cromático)
    * `%` (Puntos obtenidos / posibles y porcentaje de efectividad debajo)

---

## 4. Ajustes de Layout y Responsividad (CERO SCROLL HORIZONTAL)
* **Desktop:**
  * Usar un contenedor amplio (`w-full max-w-7xl mx-auto px-4`) para que las tarjetas aprovechen el ancho de monitores grandes.
* **Celulares (Mobile):**
  * **Prohibido el scroll horizontal interno en las tarjetas.**
  * Las celdas deben usar padding ajustado (`px-1` o `px-1.5`) y tipografía compacta (`text-xs` o `text-[11px]`).
  * Los badges de `G/P` y `DF` deben ser pequeños (`w-5 h-5` o `w-6 h-6`).

  ## 5. Corrección de Alineación y Espaciado en Tablas de Campeonatos
* **Columna COND. (Condición):** 
  * Debe estar alineada a la izquierda (`text-left`).
  * Debe incluir margen o padding derecho suficiente (`pr-3` o `w-24` / `min-w-[80px]`) para que el texto (General, Local, Visitante) NUNCA se pegue a la columna de `PJ`.
* **Columnas de Números (`PJ`, `G`, `E`, `P`, `G/P`, `GF`, `GC`, `DF`, `%`):**
  * Deben mantenerse centradas (`text-center`) con espacio uniforme entre cada cabecera y celda.