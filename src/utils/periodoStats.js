import { getTemporadaLabel } from './dateFormat'

function periodoSortKey(periodo) {
  const year = Number.parseInt(periodo, 10)
  return Number.isNaN(year) ? 0 : year
}

export function buildPeriodoGroups(matches, formato) {
  const groups = new Map()

  for (const match of matches) {
    if (!match.fecha) continue
    const periodo = getTemporadaLabel(match.fecha, formato)
    if (!groups.has(periodo)) groups.set(periodo, [])
    groups.get(periodo).push(match)
  }

  return [...groups.entries()]
    .map(([periodo, periodoMatches]) => ({ periodo, matches: periodoMatches }))
    .sort((a, b) => periodoSortKey(b.periodo) - periodoSortKey(a.periodo))
}

export function buildJugadoresRows(matches, metrica) {
  const isGoles = metrica === 'goleadores'
  const byPlayer = new Map()

  for (const match of matches) {
    const incidencias = (match.incidenciasClub ?? []).filter((i) => (isGoles ? i.goles > 0 : i.asistencias > 0))
    for (const incidencia of incidencias) {
      const row =
        byPlayer.get(incidencia.nombre) ??
        { nombre: incidencia.nombre, clubes: new Set(), pj: 0, goles: 0, asistencias: 0 }
      row.pj += 1
      if (match.club) row.clubes.add(match.club)
      if (isGoles) row.goles += incidencia.goles
      else row.asistencias += incidencia.asistencias
      byPlayer.set(incidencia.nombre, row)
    }
  }

  return [...byPlayer.values()]
    .map((row) => {
      const valor = isGoles ? row.goles : row.asistencias
      return {
        nombre: row.nombre,
        club: [...row.clubes].sort((a, b) => a.localeCompare(b)).join(', '),
        pj: row.pj,
        goles: row.goles,
        asistencias: row.asistencias,
        promedio: row.pj > 0 ? valor / row.pj : 0,
      }
    })
    .sort((a, b) => {
      const av = isGoles ? a.goles : a.asistencias
      const bv = isGoles ? b.goles : b.asistencias
      return bv - av || a.nombre.localeCompare(b.nombre)
    })
}
