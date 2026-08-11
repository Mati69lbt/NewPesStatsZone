# Especificación Técnica Actualizada: Vista Estadísticas Versus (`/versus`)

## 1. Ajustes de UI y Encabezados
* La fila superior de encabezados (`Rival`, `General`, `Local`, `Visitante` y `Capitanes`) debe coincidir exactamente con el ancho y alineación de las columnas de abajo.
* En pantallas pequeñas se debe mantener el scroll horizontal (`overflow-x-auto`) con la primera columna (**Rival**) fija a la izquierda (`sticky left-0 z-20`).

## 2. Tratamiento de Celdas Vacías (PJ = 0)
* Si en una celda el total de partidos jugados es cero (`PJ === 0`), **NO se debe mostrar la tarjeta con ceros**.
* Debe renderizarse un **guion largo centrado (`—`)** en la celda con un tono gris tenue.

## 3. Identificación de Badges (G/P vs DF)
* Cada celda activa debe diferenciar claramente sus dos círculos/badges:
  * Primer badge: Historial **`G/P`** (Diferencia de Victorias vs Derrotas).
  * Segundo badge: Diferencia de Gol **`DF`** (Goles a Favor menos Goles en Contra).
* Incluir etiquetas pequeñas (`G/P` y `DF`) arriba o dentro de los badges para rápida lectura.

## 4. Controles de Filtro y Ordenamiento Interactivo
* **ÁMBITO (Select):** Opciones: `General`, `Local`, `Visitante` y cada uno de los **Capitanes** del equipo.
* **CAMPO (Select de Ordenamiento):** Debe incluir todas las opciones ampliadas:
  * `Nombre`, `PJ`, `G`, `E`, `P`, `G/P`, `GF`, `GC`, `DF`.
* **Comportamiento de Orden (Toggle):** 
  * Se elimina el select independiente de "ORDEN".
  * Al seleccionar un `Campo` por primera vez, se ordena de forma **Descendente** (o por defecto según el caso). Si se vuelve a presionar el mismo campo (o click en encabezado), conmuta automáticamente a **Ascendente**.

  ## 5. Optimización de la Columna Rival
* **Numeración (Index):** La columna del rival debe incluir el número de posición en la lista antes del nombre (ej: `1. Estudiantes De La Plata`, `2. Gimnasia Esgrima De La Plata`).
* **Ancho Ajustado:** Restringir el ancho de la primera columna (`sticky left-0`) a un tamaño fijo/máximo compacto (ej: `w-36` / `max-w-[150px]`) para evitar el desperdicio de espacio horizontal.
* **Multilínea:** Permitir salto de línea en el nombre del rival (`whitespace-normal break-words`) para que si es un nombre largo o compuesto se lea perfectamente en 2 o 3 renglones aprovechando el alto de la fila.