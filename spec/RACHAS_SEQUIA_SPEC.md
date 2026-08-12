# Especificación Técnica: Vista de Racha de Sequía Goleadora (`/rachas-sequia`)

## 1. Objetivo
Listar a los jugadores que, habiendo marcado un gol anteriormente, acumulan 3 o más partidos consecutivos jugados sin volver a convertir.

---

## 2. Reglas de Negocio Estrictas

1. **Punto Cero (Condición Inicial Obligatoria):**
   * El cálculo de sequía de un jugador **comienza únicamente a partir de su último gol registrado**.
   * Si un jugador NUNCA convirtió un gol, NO entra en este cálculo ni aparece en la tabla.
   * Se guarda la información del `Rival` al que le convirtió ese último gol.

2. **Incremento de Racha:**
   * Por cada partido posterior disputado (presente en array `titulares` o `suplentes`) donde el jugador **NO convirtió gol**: `racha++`.
   * Si el jugador vuelve a convertir un gol en un nuevo partido: la racha se reinicia a `0` y se actualiza el último rival.

3. **Criterio de Visibilidad en Tabla:**
   * Solo se muestran los jugadores con `racha >= 3` partidos disputados sin gol.

---

## 3. Estructura y Componentes (Acordeones por Condición)
La vista contiene 3 acordeones desplegables principales:
* **🟢 General** (Evaluación sobre todos los partidos disputados).
* **🏠 Local** (Evaluación considerando solo partidos en condición de local).
* **✈️ Visitante** (Evaluación considerando solo partidos en condición de visitante).

### Columnas de la Tabla Interna
* `#` (Posición en el ranking de sequía).
* `Jugador` (Nombre del futbolista).
* `Racha` (Cantidad de partidos consecutivos jugados sin convertir gol desde el último).
* `Último Rival` (Nombre del rival al que le convirtió el último gol).

---

## 4. Layout Responsivo
* **Desktop:** `max-w-4xl mx-auto`, tarjetas de acordeón con estética oscura nativa.
* **Mobile:** `max-w-md mx-auto px-2`, fuentes compactas (`text-xs`), padding fino (`py-1.5`) para evitar scroll horizontal.