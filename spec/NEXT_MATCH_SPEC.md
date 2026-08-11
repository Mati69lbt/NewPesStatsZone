# Especificación Técnica: Vista NextMatch (`/next-match` o `/partido-versus`)

## 1. Objetivo del Módulo
Crear o actualizar la vista `NextMatch` para mostrar la previsualización/historial de enfrentamientos de un club. 
* Si en el selector **RIVAL** se elige `"Todos los rivales"`, se visualiza el resumen general + el grid de todos los partidos históricos jugados.
* Si se selecciona un **Rival específico**, se filtra el resumen para ese enfrentamiento, se cargan las tablas de goleadores (propios y del rival) y se muestran solo los partidos disputados contra ese equipo.

---

## 2. Filtros Superiores
1. **CLUB (Select):** Selección del equipo activo del usuario (ej: *Boca Juniors*, *RB Leipzig*).
2. **RIVAL (Select):**
   * Opcion por defecto: `Todos los rivales`.
   * Lista desplegable con los clubes rivales contra los que se ha jugado al menos 1 partido.

---

## 3. Bloque Estadístico (Resumen General vs Rival)

Matriz vertical con 4 niveles: **GENERAL**, **LOCAL**, **VISITANTE** y **NEUTRAL**.

Cada nivel incluye:
* `PJ` (Partidos Jugados).
* `G` (Ganados).
* `E` (Empatados).
* `P` (Perdidos).
* `G/P` (Diferencia de Victorias: $G - P$). Badge circular cromático (Verde si $>0$, Amarillo si $0$, Rojo si $<0$).
* `GF` (Goles a Favor).
* `GC` (Goles en Contra).
* `DIF` (Diferencia de Gol: $GF - GC$). Badge circular cromático (Verde si $>0$, Amarillo si $0$, Rojo si $<0$).

---

## 4. Bloque de Goleadores (Solo cuando RIVAL != "Todos los rivales")

A la derecha de la matriz de resumen se muestran dos tablas de goleadores:

### A. Goleadores de Mi Club (Ej: RB Leipzig)
* **Columnas:** `#`, `JUGADOR`, `PJ`, `G` (Goles), `X2` (Dobletes), `X3` (Tripletes o más).
* **Fila de Total:** Muestra la suma total de goles, dobletes y tripletes anotados contra este rival.

### B. Goleadores del Rival (Ej: Werder Bremen)
* **Columnas:** `#`, `JUGADOR`, `G` (Goles), `X2` (Dobletes), `X3` (Tripletes o más).
* *Nota:* No se incluye la columna `PJ` para los jugadores del equipo rival.
* **Fila de Total:** Suma total de goles y desglose de dobletes/tripletes del rival.

---

## 5. Grid de Tarjetas de Partidos Históricos

* **Orden:** Cronológico descendente (del partido más reciente al más antiguo).
* **Filtrado:**
  * Si `RIVAL == "Todos los rivales"`: Muestra todos los partidos del club activo.
  * Si hay un rival seleccionado: Muestra únicamente los enfrentamientos contra dicho rival.
* **Diseño de la Tarjeta:**
  * **Borde y Badges Cromáticos:** 
    * Verde si fue Victoria (`GANADO`).
    * Amarillo si fue Empate (`EMPATADO`).
    * Rojo si fue Derrota (`PERDIDO`).
  * **Header:** Nombre del torneo + Año (`ej: BUNDESLIGA 2025 - 2026`), Fecha (`DD/MM/AAAA`), Condición (`LOCAL`, `VISITANTE`, `NEUTRO`), Capitán (`CAP: P. Cech`) y resultado (`GANADO` / `EMPATADO` / `PERDIDO`).
  * **Cuerpo:** 
    * Nombres de los equipos y marcador con tipografía destacada.
    * Lista desglosada de autores de los goles (con cantidad si metió más de 1, ej: `Gigliotti (2)`).

    ## 6. Disposición Visual y Responsividad (Layout Update)

1. **Tarjetas de Resumen (General, Local, Visitante, Neutral):**
   * **Ubicación:** Deben posicionarse **arriba en forma horizontal**, ocupando todo el ancho superior por encima del bloque de goleadores.
   * **Comportamiento Móvil:**
     * En escritorio (`lg:`): Los 4 bloques en una sola fila (`grid-cols-4`).
     * En celulares (`sm:`): Distribución responsiva flexible (`grid grid-cols-2 gap-2` o `grid-cols-4` compacto) para acomodarse según el ancho de pantalla sin romper el contenido.
2. **Tablas de Goleadores (Ancho Máximo):**
   * Se deben posicionar **debajo** de las 4 tarjetas de resumen.
   * No deben ocupar todo el ancho disponible (`w-full`), sino tener un ancho máximo razonable (ejemplo: `max-w-5xl` o `max-w-4xl mx-auto`) para que las tablas no se estiren demasiado y mantengan una lectura limpia.