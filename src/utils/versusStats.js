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

  // Solo el equipo propio tiene alineación (titulares) registrada en Firebase;
  // el rival no, así que su PJ sigue contando partidos en los que anotó.
  const presenceField = field === 'incidenciasClub' ? 'titulares' : null

  if (presenceField) {
    for (const match of matches) {
      for (const titular of match[presenceField] ?? []) {
        if (!titular?.nombre) continue
        const key = titular.id ?? titular.nombre
        const row = byPlayer.get(key) ?? { nombre: titular.nombre, pj: 0, goles: 0, x2: 0, x3: 0 }
        row.pj += 1
        byPlayer.set(key, row)
      }
    }
  }

  for (const match of matches) {
    const incidencias = (match[field] ?? []).filter((i) => i.goles > 0)
    for (const incidencia of incidencias) {
      // Se agrupa por ID de jugador (estable) y no solo por nombre, para evitar
      // que variaciones de texto entre partidos dividan/mezclen a un mismo jugador.
      const key = incidencia.id ?? incidencia.nombre
      const row = byPlayer.get(key) ?? { nombre: incidencia.nombre, pj: 0, goles: 0, x2: 0, x3: 0 }
      if (!presenceField) row.pj += 1
      row.goles += incidencia.goles
      if (incidencia.goles === 2) row.x2 += 1
      else if (incidencia.goles >= 3) row.x3 += 1
      byPlayer.set(key, row)
    }
  }

  return [...byPlayer.values()]
    .filter((row) => row.goles > 0)
    .map((row) => ({ ...row, promedio: row.pj > 0 ? row.goles / row.pj : 0 }))
    .sort((a, b) => b.goles - a.goles || a.nombre.localeCompare(b.nombre))
}

export function buildAssistsRows(matches, field) {
  const byPlayer = new Map()

  // Solo el equipo propio tiene alineación (titulares) registrada en Firebase;
  // el rival no, así que su PJ sigue contando partidos en los que asistió.
  const presenceField = field === 'incidenciasClub' ? 'titulares' : null

  if (presenceField) {
    for (const match of matches) {
      for (const titular of match[presenceField] ?? []) {
        if (!titular?.nombre) continue
        const key = titular.id ?? titular.nombre
        const row = byPlayer.get(key) ?? { nombre: titular.nombre, pj: 0, asistencias: 0 }
        row.pj += 1
        byPlayer.set(key, row)
      }
    }
  }

  for (const match of matches) {
    const incidencias = (match[field] ?? []).filter((i) => i.asistencias > 0)
    for (const incidencia of incidencias) {
      const key = incidencia.id ?? incidencia.nombre
      const row = byPlayer.get(key) ?? { nombre: incidencia.nombre, pj: 0, asistencias: 0 }
      if (!presenceField) row.pj += 1
      row.asistencias += incidencia.asistencias
      byPlayer.set(key, row)
    }
  }

  return [...byPlayer.values()]
    .filter((row) => row.asistencias > 0)
    .map((row) => ({ ...row, promedio: row.pj > 0 ? row.asistencias / row.pj : 0 }))
    .sort((a, b) => b.asistencias - a.asistencias || a.nombre.localeCompare(b.nombre))
}
