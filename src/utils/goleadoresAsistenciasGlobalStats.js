function buildGlobalRows(matches, statKey) {
  const byKey = new Map()

  function getRow(player, club) {
    const key = `${player.id ?? player.nombre}__${club}`
    let row = byKey.get(key)
    if (!row) {
      row = { nombre: player.nombre, club, pj: 0, valor: 0, x2: 0, x3: 0 }
      byKey.set(key, row)
    }
    return row
  }

  for (const match of matches) {
    const club = match.club || '-'
    const countedEnPartido = new Set()

    for (const jugador of [...(match.titulares ?? []), ...(match.suplentes ?? [])]) {
      if (!jugador?.nombre) continue
      const row = getRow(jugador, club)
      const key = `${jugador.id ?? jugador.nombre}__${club}`
      if (!countedEnPartido.has(key)) {
        countedEnPartido.add(key)
        row.pj += 1
      }
    }

    const incidencias = (match.incidenciasClub ?? []).filter((i) => i[statKey] > 0)
    for (const incidencia of incidencias) {
      const row = getRow(incidencia, club)
      const key = `${incidencia.id ?? incidencia.nombre}__${club}`
      if (!countedEnPartido.has(key)) {
        countedEnPartido.add(key)
        row.pj += 1
      }
      row.valor += incidencia[statKey]
      if (incidencia[statKey] === 2) row.x2 += 1
      else if (incidencia[statKey] >= 3) row.x3 += 1
    }
  }

  return [...byKey.values()]
    .map((row) => ({ ...row, promedio: row.pj > 0 ? row.valor / row.pj : 0 }))
    .sort((a, b) => b.valor - a.valor || a.nombre.localeCompare(b.nombre))
}

export function buildGoleadoresGlobalRows(matches) {
  return buildGlobalRows(matches, 'goles')
}

export function buildAsistenciasGlobalRows(matches) {
  return buildGlobalRows(matches, 'asistencias')
}
