function calcularMetricas(matches) {
  let g = 0
  let e = 0
  let p = 0
  let gf = 0
  let gc = 0

  for (const match of matches) {
    const golesClub = match.golesClub ?? 0
    const golesRival = match.golesRival ?? 0
    gf += golesClub
    gc += golesRival
    if (golesClub > golesRival) g += 1
    else if (golesClub < golesRival) p += 1
    else e += 1
  }

  const pj = g + e + p
  const puntosObtenidos = g * 3 + e
  const puntosPosibles = pj * 3
  const efectividad = puntosPosibles > 0 ? (puntosObtenidos / puntosPosibles) * 100 : 0

  return {
    pj,
    g,
    e,
    p,
    gp: g - p,
    gf,
    gc,
    dif: gf - gc,
    puntosObtenidos,
    puntosPosibles,
    efectividad,
  }
}

const CONDICIONES = [
  { condicion: 'general', titulo: 'GENERAL', filtro: null },
  { condicion: 'local', titulo: 'LOCAL', filtro: 'local' },
  { condicion: 'visitante', titulo: 'VISITANTE', filtro: 'visitante' },
  { condicion: 'neutral', titulo: 'NEUTRAL', filtro: 'neutral' },
]

export function buildRecordPersonalRows(matches) {
  return CONDICIONES.map(({ condicion, titulo, filtro }) => ({
    condicion,
    titulo,
    metrics: calcularMetricas(filtro ? matches.filter((m) => m.condicion === filtro) : matches),
  }))
}
