function buildGlobalRows(matches, field, statKey) {
  const byKey = new Map()

  for (const match of matches) {
    const club = match.club || '-'
    const incidencias = (match[field] ?? []).filter((i) => i[statKey] > 0)
    for (const incidencia of incidencias) {
      const key = `${incidencia.nombre}__${club}`
      const row = byKey.get(key) ?? { nombre: incidencia.nombre, club, pj: 0, valor: 0, x2: 0, x3: 0 }
      row.pj += 1
      row.valor += incidencia[statKey]
      if (incidencia[statKey] === 2) row.x2 += 1
      else if (incidencia[statKey] >= 3) row.x3 += 1
      byKey.set(key, row)
    }
  }

  return [...byKey.values()]
    .map((row) => ({ ...row, promedio: row.pj > 0 ? row.valor / row.pj : 0 }))
    .sort((a, b) => b.valor - a.valor || a.nombre.localeCompare(b.nombre))
}

export function buildGoleadoresGlobalRows(matches) {
  return buildGlobalRows(matches, 'incidenciasClub', 'goles')
}

export function buildAsistenciasGlobalRows(matches) {
  return buildGlobalRows(matches, 'incidenciasClub', 'asistencias')
}
