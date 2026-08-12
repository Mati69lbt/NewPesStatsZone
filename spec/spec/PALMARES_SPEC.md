# Especificación Técnica: Módulo de Palmarés (`/palmares`)

## 1. Objetivo
Crear la vista de **Palmarés** (historial de títulos y participaciones) que reúna todas las competencias disputadas agrupadas por año o temporada europea, mostrando el club utilizado, partidos jugados y la posición/resultado final alcanzado.

---

## 2. Ubicación y Navegación
- **Ruta:** `/palmares`
- **Navbar:** Agregar la opción **"Palmarés"** (con icono de corona 👑 o trofeo 🏆) dentro del menú desplegable **ESTADÍSTICAS**.

---

## 3. Estructura y Reglas de Negocio

1. **Agrupación por Período / Temporada:**
   - Agrupar las competencias por temporada (ej: `2034-2035`, `2033-2034` o por año calendario según la configuración).
   - Mostrar los bloques de años en orden cronológico descendente (los más recientes primero).

2. **Tarjetas de Competencia (Cards):**
   Cada tarjeta dentro de una temporada debe incluir:
   - **Nombre de la Competencia:** (ej: *Champions League*, *Copa De Argentina*, *Premier League*).
   - **Club:** Nombre del club con el que se disputó dicho torneo (ej: *Boca Juniors*, *Celtic*, *Spartak Moskva*).
   - **Partidos Jugados:** Total de partidos registrados en esa competición (ej: `6 partidos`).
   - **Badge / Insignia de Resultado:**
     - Proviene del campo `RESULTADO` guardado en el torneo/copa.
     - **Campeón:** Destacado visualmente con badge/borde **verde** brillante (ej: `bg-emerald-500/20 text-emerald-400 border-emerald-500/30`).
     - **Sub Campeón:** Badge **naranja / dorado** (ej: `bg-amber-500/20 text-amber-400`).
     - **Tercero / Semi Final / Cuartos / Otros:** Badges en tonos **azules / grisáceos** neutros.
     - **Sin definir:** Badge discreto o tenue.

3. **Diseño Responsive:**
   - En **Desktop:** Tarjetas centradas o en contenedor fluido estilo timeline/lista limpia.
   - En **Mobile:** Tarjetas a ancho completo (`w-full`), manteniendo legibilidad del título, club y el badge de resultado a la derecha.

---

## 4. Requerimientos Técnicos
- Reutilizar la paleta de colores oscura existente de la app (`dark theme`).
- Asegurar que si un torneo no tiene resultado asignado o está "Sin definir", se liste igual con su badge correspondiente.