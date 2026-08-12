# Especificación Técnica: Módulo de Expulsiones (`/expulsiones`)

## 1. Objetivo
Unificar el registro de tarjetas rojas del equipo propio (Expulsados) y de los equipos rivales (Carniceros) en una vista consolidada.

---

## 2. Lectura de Datos en Firebase
* **Expulsados Propios:** Filtra y contabiliza los jugadores del array `incidenciasClub` donde la propiedad `expulsado === true`.
* **Carniceros (Rivales):** Filtra y contabiliza los jugadores del array `incidenciasRival` donde la propiedad `expulsado === true`.

---

## 3. Componentes y Pestañas Internas (Tabs)
En la parte superior de la vista se incluye un switch para alternar entre:
* **🔴 Expulsados Propios** (Default)
* **🔪 Carniceros (Rivales)**

---

## 4. Estructura de las Tablas

### Tabla 1: Expulsados Propios
* **Columnas:** `#`, `Jugador`, `Expulsiones` (Badge o contador destacado en rojo/rojo oscuro).
* Ordenado de mayor a menor por cantidad de expulsiones.
* **Pie de tabla:** Total de rojas recibidas por el club.

### Tabla 2: Carniceros (Rivales)
* **Columnas:** `#`, `Jugador`, `Club`, `Expulsiones`.
* Ordenado de mayor a menor por cantidad de expulsiones recibidas contra nosotros.
* **Pie de tabla:** Total de rojas provocadas a rivales.

---

## 5. Adaptación Visual y Layout Responsivo
* **Desktop:** Contenedor centrado y compacto (`max-w-2xl mx-auto` o `max-w-3xl mx-auto`).
* **Mobile:** Contenedor ajustado (`max-w-md mx-auto px-2`), fuentes pequeñas (`text-xs`), evitando el uso de `truncate` innecesario en los nombres de clubes.