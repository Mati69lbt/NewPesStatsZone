export function computeStats(matches) {
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

  const pj = matches.length
  const pts = g * 3 + e
  const ptsPosibles = pj * 3

  return { g, e, p, pj, gf, gc, df: gf - gc, gp: g - p, pts, ptsPosibles }
}

export function buildScorersRows(matches, field) {
  const byPlayer = new Map()

  for (const match of matches) {
    const incidencias = (match[field] ?? []).filter((i) => i.goles > 0)
    for (const incidencia of incidencias) {
      const row = byPlayer.get(incidencia.nombre) ?? { nombre: incidencia.nombre, pj: 0, goles: 0, x2: 0, x3: 0 }
      row.pj += 1
      row.goles += incidencia.goles
      if (incidencia.goles === 2) row.x2 += 1
      else if (incidencia.goles >= 3) row.x3 += 1
      byPlayer.set(incidencia.nombre, row)
    }
  }

  return [...byPlayer.values()].sort((a, b) => b.goles - a.goles || a.nombre.localeCompare(b.nombre))
}
