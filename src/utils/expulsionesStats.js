export function buildExpulsadosPropiosRows(matches) {
  const byNombre = new Map()

  for (const match of matches) {
    const incidencias = (match.incidenciasClub ?? []).filter((i) => i.expulsado === true)
    for (const incidencia of incidencias) {
      const row = byNombre.get(incidencia.nombre) ?? { nombre: incidencia.nombre, expulsiones: 0 }
      row.expulsiones += 1
      byNombre.set(incidencia.nombre, row)
    }
  }

  return [...byNombre.values()].sort(
    (a, b) => b.expulsiones - a.expulsiones || a.nombre.localeCompare(b.nombre)
  )
}

export function buildCarnicerosRows(matches) {
  const byKey = new Map()

  for (const match of matches) {
    const club = match.rival || '-'
    const incidencias = (match.incidenciasRival ?? []).filter((i) => i.expulsado === true)
    for (const incidencia of incidencias) {
      const key = `${incidencia.nombre}__${club}`
      const row = byKey.get(key) ?? { nombre: incidencia.nombre, club, expulsiones: 0 }
      row.expulsiones += 1
      byKey.set(key, row)
    }
  }

  return [...byKey.values()].sort(
    (a, b) => b.expulsiones - a.expulsiones || a.nombre.localeCompare(b.nombre)
  )
}
