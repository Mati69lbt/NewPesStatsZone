# Especificación Técnica: Módulo de Estadísticas de Goleadores (`/goleadores`)

## 1. Objetivo y Vistas
Unificar las **Estadísticas Anuales** y **Estadísticas del Calendario Europeo** dentro del módulo de Goleadores en una misma pantalla mediante un selector de vista (`VISTA`).

---

## 2. Reglas de Negocio y Lógica de Períodos
* **Selector de Vista Global (`VISTA`):**
  - **Est. Anuales:** Agrupa los datos por año calendario (del 1 de enero al 31 de diciembre). Ejemplo de etiqueta: `2022`.
  - **Est. Europeo:** Agrupa los datos por temporada europea (del 1 de julio al 30 de junio del año siguiente). Ejemplo de etiqueta: `2022/2023`.
* **Cálculo de Promedio (`PROM`):**
  - Fórmulas: `Goles / Partidos Jugados` (`G / PJ`).
  - Si `PJ == 0`, mostrar `0.00` (evitar `NaN`). Formatear siempre con 2 decimales.
* **Partidos Jugados (`PJ`):**
  - Solamente se contabilizan los partidos jugados titulares. Se omiten suplentes.

---

## 3. Estructura de la Interfaz (Acordeones y Sub-acordeones)
La vista consta de **4 Acordeones Principales** verticales. Cada uno contiene internamente **3 Sub-acordeones desglosados** en grid (`GENERAL`, `LOCAL` y `VISITANTE`).

### 1. Top 15 Goleadores Históricos
- Ranking de los 15 jugadores con más goles anotados en el período.
- **Columnas:** `POS` (con medallas 🥇, 🥈, 🥉 para el Top 3), `JUGADOR`, `CLUB`, `AÑO` (o Período), `G`, `PJ`, `PROM`.

### 2. Top 15 Mejor Promedio Histórico
- Ranking de los 15 mejores promedios (`G / PJ`) del período.
- **Columnas:** `POS`, `JUGADOR`, `CLUB`, `AÑO`, `G`, `PJ`, `PROM`.

### 3. Top 15 Más Partidos Jugados
- Ranking de los 15 jugadores con más partidos disputados en el período.
- **Columnas:** `POS`, `JUGADOR`, `CLUB`, `AÑO`, `G`, `PJ`, `PROM`.

### 4. Mejores Años Goleadores
- Muestra el total de goles convertidos en la plataforma por año o temporada.
- **Columnas:** `POS`, `AÑO` (o Período), `GOLES`.

---

## 4. Requerimientos Técnicos
- **Layout:** Grid de 3 columnas en desktop (`lg:grid-cols-3`) para los sub-acordeones y apilado en mobile.
- **Performance:** Procesar y clasificar el listado mediante `useMemo` o helpers eficientes al cambiar la vista o el club seleccionado.