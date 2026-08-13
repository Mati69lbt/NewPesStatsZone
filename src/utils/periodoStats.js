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
  const roster = new Map()
  const byPlayer = new Map()

  for (const match of matches) {
    const plantel = [...(match.titulares ?? []), ...(match.suplentes ?? [])]
    for (const jugador of plantel) {
      const key = jugador?.id ?? jugador?.nombre
      if (!key) continue
      const rosterRow = roster.get(key) ?? { nombre: jugador.nombre, clubes: new Set(), pj: 0 }
      rosterRow.pj += 1
      if (match.club) rosterRow.clubes.add(match.club)
      roster.set(key, rosterRow)
    }

    const incidencias = (match.incidenciasClub ?? []).filter((i) => (isGoles ? i.goles > 0 : i.asistencias > 0))
    for (const incidencia of incidencias) {
      const key = incidencia.id ?? incidencia.nombre
      const row = byPlayer.get(key) ?? { nombre: incidencia.nombre, goles: 0, asistencias: 0 }
      if (isGoles) row.goles += incidencia.goles
      else row.asistencias += incidencia.asistencias
      byPlayer.set(key, row)
    }
  }

  return [...byPlayer.entries()]
    .map(([key, row]) => {
      const rosterRow = roster.get(key)
      const pj = rosterRow?.pj ?? 0
      const club = rosterRow ? [...rosterRow.clubes].sort((a, b) => a.localeCompare(b)).join(', ') : ''
      const valor = isGoles ? row.goles : row.asistencias
      return {
        nombre: row.nombre,
        club,
        pj,
        goles: row.goles,
        asistencias: row.asistencias,
        promedio: pj > 0 ? valor / pj : 0,
      }
    })
    .sort((a, b) => {
      const av = isGoles ? a.goles : a.asistencias
      const bv = isGoles ? b.goles : b.asistencias
      return bv - av || a.nombre.localeCompare(b.nombre)
    })
}
