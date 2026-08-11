# Especificación Técnica: Vista ÚLTIMOS 10 (`/ultimos-10` o `/racha`)

## 1. Objetivo
Página visual para analizar la racha reciente del club activo, desglosando los últimos 10 partidos disputados en tres niveles: Global, por Capitán y por Torneo.

---

## 2. Filtros y Estructura Principal
* **Selector Superior:** Permite cambiar el **Club** activo.
* **Sección 1: Historial Reciente (Sin Acordeón):**
  * Bloque visible directamente con tres filas:
    * `Últimos 10 Resultados (General)`
    * `Últimos 10 Resultados (Local)`
    * `Últimos 10 Resultados (Visitante)`
* **Sección 2: Capitanes (Acordeón):**
  * Encabezado desplegable `Capitanes` (abierto por defecto).
  * Dentro incluye tarjetas por cada capitán (ej: `Últimos 10 con Pacheco`, `Últimos 10 con P. Cech`).
  * Cada tarjeta contiene las 3 filas: General, Local y Visitante.
* **Sección 3: Torneos (Acordeón):**
  * Encabezado desplegable `Torneos`.
  * Dentro incluye bloques por torneo (ej: `CHAMPIONS LEAGUE`) y sub-bloques por capitán dentro del torneo.

---

## 3. Formato Visual de la Racha (Bolitas / Badges)

Cada fila contiene una secuencia horizontal de **hasta 10 ítems** ordenados del más reciente al más antiguo:

* **Indicador de Resultado (Bolita):**
  * **Verde:** Victoria (`G`).
  * **Amarillo:** Empate (`E`).
  * **Rojo:** Derrota (`P`).
* **Etiqueta del Rival:**
  * Debe mostrar el nombre del equipo rival arriba o abajo de cada bolita.
  * **En Escritorio (`lg:`):** Quitar la propiedad `truncate` o `max-w` estricta para que el nombre del rival se lea completo sin puntos suspensivos (`...`). Aprovechar todo el ancho disponible (`w-full` responsivo).
  * **En Celulares (`sm:`):** Formato compacto con scroll horizontal suave (`overflow-x-auto`) o texto reducido en 2 líneas para evitar deformar la pantalla.

---

## 4. Ancho y Responsividad (Desktop Ancho Completo + Mobile 2x5)

1. **Pantallas Grandes (Desktop / Monitores Grandes):**
   * El contenedor principal NO debe ser angosto. Usar `w-full max-w-6xl mx-auto` o `max-w-7xl` para aprovechar el ancho del monitor de 24".
   * **Fila de Bolitas:** En desktop (`lg:`), las 10 bolitas con los nombres de los rivales DEBEN entrar en **UNA SOLA FILA HORIZONTAL** (`grid grid-cols-10` o `flex justify-between items-start w-full`).
   * No debe haber saltos de línea innecesarios de bolitas en monitores grandes.

2. **Pantallas Pequeñas (Celulares):**
   * Para evitar scroll horizontal y mantener la simetría, la racha debe mostrarse estrictamente en **2 filas de 5 ítems** (`grid grid-cols-5 gap-2`).