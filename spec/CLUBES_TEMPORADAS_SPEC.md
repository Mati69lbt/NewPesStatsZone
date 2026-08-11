# Especificación Técnica: Vista Comparativa de Clubes (`/temporadas/clubes` o Sub-vista Clubes)

## 1. Objetivo
Página de comparativa de rendimiento estadístico de todos los clubes/ciclos dirigidos, utilizando la estética oscura con badges cromáticos del proyecto.

---

## 2. Encabezado y Navegación
* **Botón de Volver:** Ubicado en la parte superior izquierda o junto al título (`← Volver a Temporadas`), para regresar a la vista principal de `/temporadas`.
* **Título:** `Clubes` (con contador de entradas debajo, ej: `22 entradas`).
* **Filtros de Formato (Toggle):**
  * `ANUAL`: Filtra y agrupa las temporadas de enero a diciembre.
  * `EUROPEO`: Filtra y agrupa las temporadas de julio a junio.

---

## 3. Barra de Ordenamiento Dinámico (Botones de Filtro)
Fila de botones pills horizontales con el estado activo marcado:
* `General` (Icono de tabla/resumen).
* `PJ` (Partidos Jugados).
* `G` (Ganados).
* `E` (Empatados).
* `P` (Perdidos).
* `G/P` (Diferencia de Victorias).
* `GF` (Goles a Favor).
* `GC` (Goles en Contra).
* `DIF` (Diferencia de Goles).
* `%` (Porcentaje de Puntos / Efectividad).

**Comportamiento de Orden (Toggle):**
* El botón activo muestra una flecha de dirección (`PJ ↓` / `PJ ↑`).
* Al presionar el mismo botón una segunda vez, conmuta el orden entre **Descendente** y **Ascendente**.

---

## 4. Estructura de la Tabla Comparativa
A diferencia de la tabla clara de la captura, esta tabla usará el **estilo visual oscuro nativo de Pes Stats Zone**:

### Columnas:
1. **Club:** Nombre del club + Año/Temporada debajo (ej: `Atletico Nacional` / `2022`).
2. **PJ:** Total partidos.
3. **G:** Ganados.
4. **E:** Empatados.
5. **P:** Perdidos.
6. **G/P:** Badge circular cromático (Verde $>0$, Amarillo $0$, Rojo $<0$).
7. **GF:** Goles a favor.
8. **GC:** Goles en contra.
9. **DIF:** Badge circular cromático (Verde $>0$, Amarillo $0$, Rojo $<0$).
10. **%:** Puntos obtenidos / Posibles y porcentaje (ej: `132 / 198` en verde con `67%` abajo).

---

## 5. Diseño y Estilos
* **Estética:** Tabla contenedora con bordes redondeados, fondo oscuro (`bg-zinc-900`/`bg-zinc-800`), separadores tenues y filas alternadas para alta legibilidad.
* **Índice/Ranking:** Número de posición (1, 2, 3...) destacado a la izquierda de cada club.

## 6. Ajustes de Layout, Ancho Máximo y Responsividad

1. **Contenedor Principal (Desktop):**
   * No debe ocupar todo el ancho disponible (`w-full` ilimitado prohibido).
   * Usar un ancho máximo centrado (ej: `max-w-5xl mx-auto px-4`) tanto para la cabecera, la barra de ordenamiento como para la tabla.
   
2. **Barra de Botones de Ordenamiento:**
   * Debe estar encerrada dentro del mismo contenedor con `max-w-5xl` para que sus extremos coincidan exactamente con los bordes de la tabla.
   * En pantallas pequeñas, hacerla deslizable horizontalmente (`flex overflow-x-auto gap-1 pb-2`) o compacta para no ensanchar la pantalla.

3. **Adaptación Celulares (Mobile Fit):**
   * El contenedor raíz de la página debe tener `w-full max-w-full overflow-x-hidden`.
   * Evitar que la página entera genere scroll horizontal verticalmente desbordado. La tabla interna debe tener su propio contenedor con `overflow-x-auto` si las columnas sobrepasan el ancho del celular.