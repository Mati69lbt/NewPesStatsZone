# Especificación Técnica: Vista Comparativa General de Capitanes (`/capitanes/comparativa`)

## 1. Objetivo
Página de ranking y comparativa estadística global de todos los Capitanes por ciclo/temporada, incorporando el toggle de formato de año (Anual vs Europeo).

---

## 2. Encabezado y Selector Anual/Europeo
* **Botón Volver:** `← Volver` para regresar a la vista de Análisis de Capitanes o Temporadas.
* **Título:** `Capitanes` (con contador de entradas debajo, ej: `25 capitanes`).
* **Toggle de Formato (Filtro Clave):**
  * `ANUAL`: Agrupa y contabiliza las estadísticas de los capitanes por año calendario (Enero - Diciembre).
  * `EUROPEO`: Agrupa y contabiliza las estadísticas por temporada europea (Julio - Junio, ej: `2023 - 2026`).

---

## 3. Barra de Ordenamiento Dinámico
Botones pills horizontales alineados exactamente al ancho de la tabla:
* `PJ` (Partidos Jugados).
* `G` (Ganados).
* `E` (Empatados).
* `P` (Perdidos).
* `G/P` (Diferencia de Victorias).
* `GF` (Goles a Favor).
* `GC` (Goles en Contra).
* `DIF` (Diferencia de Gol).
* `%` (Porcentaje de Efectividad).

**Comportamiento:**
* El botón activo muestra la dirección de orden (`PJ ↓` / `PJ ↑`).
* Un segundo click sobre el botón activo conmuta entre **Descendente** y **Ascendente**.

---

## 4. Estructura de la Tabla Comparativa
A diferencia de la captura clara, se usará el **tema oscuro del proyecto** con badges cromáticos:

### Columnas:
1. **Posición + Capitán:** Número de ranking (1, 2, 3...), Nombre del Capitán, Club debajo y Año/Período (ej: `1 - Pacheco` / `RB Leipzig` / `2023 - 2026`).
2. **PJ:** Total partidos.
3. **G:** Ganados.
4. **E:** Empatados.
5. **P:** Perdidos.
6. **G/P:** Badge circular cromático (Verde $>0$, Amarillo $0$, Rojo $<0$).
7. **GF:** Goles a favor.
8. **GC:** Goles en contra.
9. **DIF:** Badge circular cromático (Verde $>0$, Amarillo $0$, Rojo $<0$).
10. **PTS/EFEC:** Puntos obtenidos / posibles y porcentaje de efectividad debajo (ej: `183 / 270` y `68%`).

---

## 5. Layout, Ancho y Responsividad (CERO SCROLL)
* **Pantallas Grandes (Desktop):**
  * Contenedor centrado con ancho amplio (`w-full max-w-6xl mx-auto px-4`).
  * Los botones de ordenamiento deben coincidir con el ancho exacto de la tabla.
* **Pantallas Pequeñas (Celulares):**
  * Toda la tabla y controles se ajustan al celular (`w-full max-w-full overflow-x-hidden`).
  * Sin scroll horizontal: celdas con padding ajustado (`px-1.5`) y texto compacto (`text-xs`).