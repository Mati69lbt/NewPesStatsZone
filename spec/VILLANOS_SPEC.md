# Especificación Técnica: Villanos (Goleadores y Asistidores Rivales) (`/villanos`)

## 1. Objetivo
Listar los jugadores rivales que más goles o asistencias han convertido en contra de nuestro club.

---

## 2. Pestañas Internas (Tabs)
En la parte superior de la tabla se incluye un switch para conmutar entre:
* **⚽ Goleadores Rivales** (Default)
* **🎯 Asistidores Rivales**

---

## 3. Estructura de Tablas

### Tabla de Goleadores Rivales
* **Columnas:** `#`, `Jugador`, `Club`, `Goles`, `⚽ x2`, `⚽ x3`.
* Ordenado de mayor a menor por cantidad total de goles.

### Tabla de Asistidores Rivales
* **Columnas:** `#`, `Jugador`, `Club`, `Asistencias`.
* Ordenado de mayor a menor por cantidad total de asistencias entregadas contra el equipo.

---

## 4. Anchos y Layout
* **Desktop:** Contenedor centrado (`max-w-3xl mx-auto`).
* **Club/Jugador:** Espaciado suficiente para que nombres largos de clubes (*Ej. Borussia Monchengladbach*) o jugadores no usen `truncate`.
* **Mobile:** Ajuste fluido (`max-w-md mx-auto px-2`), fuentes pequeñas (`text-xs`) y celdas numéricas alineadas.