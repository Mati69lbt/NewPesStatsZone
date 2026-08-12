# Especificación Técnica: Módulo de Goleadores y Asistencias Global (`/goleadores-global`)

## 1. Objetivo y Descripción
Crear una tabla dinámica e interactiva que recopile la acumulación total de **Goleadores** y **Asistidores** considerando la totalidad de clubes dirigidos por el DT.

---

## 2. Ubicación y Filtros Superiores
- **Ruta:** `/goleadores-global` (o integrarlo según la estructura del Navbar).
- **Selector de Modo (Toggle):**
  - Switch/Botón para alternar entre la vista de **GOLEADORES** y **ASISTENCIAS**.
- **Filtro Mínimo (`Min. Goles` / `Min. Asistencias`):**
  - Input numérico para filtrar el piso mínimo de goles/asistencias a mostrar (por defecto `5`, editable por el usuario).

---

## 3. Columnas y Ordenamiento Interactivo

Todas las cabeceras principales de la tabla deben ser **botones cliqueables** que permitan ordenar la tabla de forma **descendente (mayor a menor) o ascendente (menor a mayor)** con su indicador visual de flecha (`▲` / `▼`):

1. **`N°` / Posición:** Ranking del jugador según el ordenamiento actual.
2. **`Goles` / `Asistencias` (Modo Goleadores o Asistencias):**
   - Muestra el valor en una cápsula/badge destacada (estilo `dark/black badge`).
   - Cliqueable para ordenar.
3. **`Jugador`:**
   - Muestra el nombre del jugador en negrita y abajo el nombre del **Club** en texto secundario.
   - Cliqueable para ordenar alfabéticamente (A-Z / Z-A).
4. **`PJ` (Partidos Jugados):**
   - Cliqueable para ordenar por más/menos partidos.
5. **`D` (Dobletes - 2 goles en un partido):**
   - Conteo de partidos donde el jugador hizo exactamente 2 goles.
6. **`T` (Tripletes/Hat-tricks - 3+ goles en un partido):**
   - Conteo de partidos donde el jugador hizo 3 o más goles.
7. **`PROM`:**
   - Promedio de gol o asistencia por partido ($G / PJ$ o $A / PJ$).
   - Formateado a 3 decimales (ej: `0.612`, `1.031`).
   - Cliqueable para ordenar por mejor/peor promedio.

---

## 4. Requerimientos Técnicos
- **Adaptación visual:** Diseñado en `Dark Theme` acorde al estilo general de Pes Stats Zone.
- **Performance:** Calcule los acumulados, dobletes ($2$ goles) y tripletes ($\ge 3$ goles) dinámicamente sobre la colección global de partidos.
- **Mobile First:** En dispositivos móviles, ocultar o comprimir las columnas secundarias para mantener la tabla legible y sin deformaciones.