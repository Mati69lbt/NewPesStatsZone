# Especificación Técnica: Ranking Resumen Histórico de Capitanes (`/capitanes/resumen`)

## 1. Objetivo
Vista de ranking comparativo de TODOS los capitanes que pertenecieron a cualquier club a lo largo de toda la historia registrada, desglosado por condición (General, Local, Visitante, Neutral).

---

## 2. Navegación y Encabezado
* **Botón Volver:** Ubicado arriba a la izquierda (`← Volver a Capitanes`).
* **Título:** `Capitanes` con la cantidad total de registros debajo (ej: `25 capitanes`).

---

## 3. Selector de Condición (Tabs/Acordeones de Fila)
Permite filtrar o seleccionar la condición de los partidos contabilizados para el ranking:
* `GENERAL`
* `LOCAL`
* `VISITANTE`
* `NEUTRAL`

---

## 4. Barra de Ordenamiento Dinámico
Botones de filtro ordenadores (con flecha `↓` / `↑` al presionar para conmutar entre orden descendente y ascendente):
* Ícono Guante / Nombre (`Capitán`).
* `PJ` (Partidos Jugados).
* `G` (Ganados).
* `E` (Empatados).
* `P` (Perdidos).
* `G/P` (Diferencia de Victorias).
* `GF` (Goles a Favor).
* `GC` (Goles en Contra).
* `DIF` (Diferencia de Gol).
* `%` (Porcentaje de Puntos / Efectividad).

---

## 5. Estructura de Filas de la Tabla (Tema Oscuro Nativo)
Cada fila de capitán muestra:
* **Columna Capitán:**
  * Número de Posición + Nombre (ej: `1 - Pacheco`).
  * Nombre del Club en texto secundario debajo (ej: `RB Leipzig`).
  * Período de Años debajo (ej: `2023 - 2026`).
* **Métricas:** `PJ`, `G`, `E`, `P`, `G/P` (badge cromático), `GF`, `GC`, `DIF` (badge cromático), `PTS / EFEC` (ej: `183 / 270` y `68%`).

---

## 6. Layout y Cero Scroll
* **Desktop:** Contenedor centrado con `w-full max-w-6xl mx-auto px-4` para aprovechar monitores grandes.
* **Mobile:** Toda la tabla debe entrar en el ancho del celular (`w-full max-w-full overflow-x-hidden`) mediante fuentes compactas y padding reducido. Queda **estrictamente prohibido el scroll horizontal interno**.

## 7. Disposición en Pantallas Pequeñas (Mobile Layout Idéntico)

* **Apilado Vertical:** Las tarjetas de cada capitán (ej: *Y. Pele*, *S. Bertoli*) se muestran una debajo de la otra en una sola columna (`grid grid-cols-1 gap-4`).
* **Encaje Exacto sin Scroll:** Toda la tabla debe entrar 100% dentro del marco del celular sin scroll horizontal.
* **Ajuste de Tipografía y Espaciado:**
  * Fuente muy compacta para la tabla (`text-[10px]` o `text-xs`).
  * Padding horizontal reducido en celdas (`px-1` o `px-1.5`).
  * Badges cromáticos pequeños en `G/P` y `DIF` (`w-5 h-5` o `w-6 h-6`).
  * Filas con fondo intercalado sutil para facilitar la lectura renglón por renglón (`General`, `Local`, `Visitante`, `Neutral`).