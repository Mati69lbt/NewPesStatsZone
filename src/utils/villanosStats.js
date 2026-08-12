export function buildVillanosGoleadoresRows(matches) {
  const byKey = new Map()

  for (const match of matches) {
    const club = match.rival || '-'
    const incidencias = (match.incidenciasRival ?? []).filter((i) => i.goles > 0)
    for (const incidencia of incidencias) {
      const key = `${incidencia.nombre}__${club}`
      const row = byKey.get(key) ?? { nombre: incidencia.nombre, club, pj: 0, goles: 0, x2: 0, x3: 0 }
      row.pj += 1
      row.goles += incidencia.goles
      if (incidencia.goles === 2) row.x2 += 1
      else if (incidencia.goles >= 3) row.x3 += 1
      byKey.set(key, row)
    }
  }

  return [...byKey.values()].sort((a, b) => b.goles - a.goles || a.nombre.localeCompare(b.nombre))
}

export function buildVillanosAsistidoresRows(matches) {
  const byKey = new Map()

  for (const match of matches) {
    const club = match.rival || '-'
    const incidencias = (match.incidenciasRival ?? []).filter((i) => i.asistencias > 0)
    for (const incidencia of incidencias) {
      const key = `${incidencia.nombre}__${club}`
      const row = byKey.get(key) ?? { nombre: incidencia.nombre, club, pj: 0, asistencias: 0 }
      row.pj += 1
      row.asistencias += incidencia.asistencias
      byKey.set(key, row)
    }
  }

  return [...byKey.values()].sort((a, b) => b.asistencias - a.asistencias || a.nombre.localeCompare(b.nombre))
}
