# Especificación Técnica: Módulo Récord Personal (`/record`)

## 1. Objetivo y Descripción
Crear la vista de **Récord Personal** que procesa la totalidad de partidos jugados en la plataforma para calcular el acumulado general y desglosado por condición de localía (**GENERAL**, **LOCAL**, **VISITANTE**, **NEUTRAL**).

---

## 2. Ubicación y Navegación
* **Ruta:** `/record` (o `/record-personal`).
* **Navbar:** Agregar la opción **"Récord Personal"** (con icono de gráfico 📊 o pin 📌) dentro del menú desplegable **ESTADÍSTICAS**.

---

## 3. Fórmulas y Cálculos Estadísticos
Para cada condición (`GENERAL`, `LOCAL`, `VISITANTE`, `NEUTRAL`), calcular:

1. **PJ (Partidos Jugados):** Total de partidos disputados ($G + E + P$).
2. **G (Ganados):** Cantidad de victorias.
3. **E (Empatados):** Cantidad de empates.
4. **P (Perdidos):** Cantidad de derrotas.
5. **G/P (Ganados/Perdidos):** $G - P$.
   - *Estilo visual:* Borde/texto **verde** si es $> 0$, **amarillo** si es $== 0$, **rojo** si es $< 0$.
6. **GF (Goles a Favor):** Suma total de goles anotados.
7. **GC (Goles en Contra):** Suma total de goles recibidos.
8. **DIF (Diferencia de Goles):** $GF - GC$.
   - *Estilo visual:* Borde/texto **verde** si es $> 0$, **amarillo** si es $== 0$, **rojo** si es $< 0$.
9. **PTS / EFEC:** 
   - **Puntos Obtenidos:** $(G \times 3) + (E \times 1)$.
   - **Puntos Posibles:** $PJ \times 3$.
   - **Efectividad (%):** $\left(\frac{\text{Puntos Obtenidos}}{\text{Puntos Posibles}}\right) \times 100$ (formateado sin decimales o con 1 decimal y signo `%`).

---

## 4. Diseño y Maquetación Responsive

### 🖥️ Desktop (`md:` en adelante):
- Disposición de las 4 filas principales (`GENERAL`, `LOCAL`, `VISITANTE`, `NEUTRAL`).
- **Cabecera global:** Títulos completos en la parte superior: `PARTIDOS JUGADOS`, `GANADOS`, `EMPATADOS`, `PERDIDOS`, `GANADOS/PERDIDOS`, `GOLES A FAVOR`, `GOLES EN CONTRA`, `DIFERENCIA DE GOLES`, `PTS / EFEC`.
- Cada bloque muestra una fila horizontal continua de 9 tarjetas/pills con sus valores centrados.

### 📱 Mobile (`sm:` e inferiores):
- Cada bloque (`GENERAL`, `LOCAL`, `VISITANTE`, `NEUTRAL`) se presenta dentro de una tarjeta/fieldset delimitada.
- Las 9 métricas se distribuyen en **2 filas internas**:
  - **Fila 1:** `PJ`, `G`, `E`, `P`, `G/P` (5 tarjetas).
  - **Fila 2:** `GF`, `GC`, `DIF`, `PTS/EFEC` (4 tarjetas).
- Cada tarjeta en mobile incluye la sigla/label en texto pequeño arriba y el número abajo para garantizar legibilidad instantánea sin scroll horizontal.

---

## 5. Requerimientos Técnicos
- Mantener la paleta de colores oscura (`dark theme`) de la app.
- Utilizar `useMemo` para procesar la lista global de partidos una sola vez al cargar la vista.