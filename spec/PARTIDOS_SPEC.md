# Especificación Técnica: Historial de Partidos (`/partidos`)

## 1. Objetivo
Pantalla de registro e historial cronológico de partidos disputados por el club activo, agrupados o filtrados por torneo/temporada.

---

## 2. Controles y Filtros Superiores
* **Filtro de Período / Temporada:**
  * Toggle o selector para conmutar entre formato `ANUAL` y `EUROPEO`.
* **Filtro de Resultado:** Menú desplegable para filtrar partidos por resultado (`Sin definir`, `Victorias`, `Empates`, `Derrotas`).

---

## 3. Estructura de la Tabla de Partidos
Cada fila representa un partido registrado y contiene las siguientes columnas:

1. **FECHA:** Día y mes del encuentro (ej: `14/02`).
2. **RESULTADO:** Badge cromático o pastilla con el nombre del rival y marcador (ej: `Boca Juniors 2 - 0 Atlético Tucumán`).
3. **CAPITÁN:** Nombre del capitán del equipo en ese partido (ej: `A. Rossi`, `R. Zieler`).
4. **GOLEADORES Y ASISTIDORES PROPIOS:**
   * **Goleadores:** Jugadores del equipo que anotaron (ej: `C. Domínguez`, `E. Salvio`).
   * **Asistidores (NUEVO):** Justo debajo de los goleadores, mostrar en un texto secundario más tenue/compacto los jugadores que dieron asistencia en el partido (obtenidos de la propiedad `asistencias > 0` de los datos en Firebase, ej: `🎯 Asist: A. Pavón`).
5. **GOLES DEL RIVAL:** Jugadores rivales que anotaron goles.
6. **ACCIONES:** Botones para Editar (`✏️`) o Eliminar (`🗑️`) el partido registrado.

---

## 4. Adaptación Responsiva y Rendimiento
* **Tema:** Estética oscura nativa del proyecto con bordes y separadores sutiles (`border-neutral-800`).
* **Mobile:** Toda la información debe ser scannable sin estirar innecesariamente las filas.