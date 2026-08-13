import { getTemporadaLabel } from './dateFormat'

function periodoSortKey(periodo) {
  const year = Number.parseInt(periodo, 10)
  return Number.isNaN(year) ? 0 : year
}

function buildPlayerPeriodRows(matches, formato) {
  const byKey = new Map()

  function getRow(nombre, periodo) {
    const key = `${nombre}__${periodo}`
    let row = byKey.get(key)
    if (!row) {
      row = { nombre, periodo, club: new Set(), pj: 0, goles: 0, asistencias: 0 }
      byKey.set(key, row)
    }
    return row
  }

  for (const match of matches) {
    if (!match.fecha) continue
    const periodo = getTemporadaLabel(match.fecha, formato)

    for (const titular of match.titulares ?? []) {
      if (!titular.nombre) continue
      const row = getRow(titular.nombre, periodo)
      row.pj += 1
      if (match.club) row.club.add(match.club)
    }

    for (const incidencia of match.incidenciasClub ?? []) {
      if (!(incidencia.goles > 0 || incidencia.asistencias > 0)) continue
      const row = getRow(incidencia.nombre, periodo)
      row.goles += incidencia.goles > 0 ? incidencia.goles : 0
      row.asistencias += incidencia.asistencias > 0 ? incidencia.asistencias : 0
      if (match.club) row.club.add(match.club)
    }
  }

  return [...byKey.values()].map((row) => ({
    nombre: row.nombre,
    periodo: row.periodo,
    club: [...row.club].sort((a, b) => a.localeCompare(b)).join(', '),
    pj: row.pj,
    goles: row.goles,
    asistencias: row.asistencias,
    promedio: row.pj > 0 ? row.goles / row.pj : 0,
    promedioAsistencias: row.pj > 0 ? row.asistencias / row.pj : 0,
  }))
}

export function buildTopGoleadoresHistorico(matches, formato) {
  return buildPlayerPeriodRows(matches, formato)
    .filter((row) => row.goles > 0)
    .sort((a, b) => b.goles - a.goles || a.nombre.localeCompare(b.nombre))
    .slice(0, 15)
}

export function buildTopPromedioHistorico(matches, formato) {
  return buildPlayerPeriodRows(matches, formato)
    .filter((row) => row.pj > 0 && row.goles > 0)
    .sort((a, b) => b.promedio - a.promedio || b.goles - a.goles || a.nombre.localeCompare(b.nombre))
    .slice(0, 15)
}

export function buildTopAsistenciasHistorico(matches, formato) {
  return buildPlayerPeriodRows(matches, formato)
    .filter((row) => row.asistencias > 0)
    .sort((a, b) => b.asistencias - a.asistencias || a.nombre.localeCompare(b.nombre))
    .slice(0, 15)
}

export function buildTopPJHistorico(matches, formato) {
  return buildPlayerPeriodRows(matches, formato)
    .filter((row) => row.pj > 0)
    .sort((a, b) => b.pj - a.pj || b.goles - a.goles || a.nombre.localeCompare(b.nombre))
    .slice(0, 15)
}

export function buildMejoresAniosGoleadores(matches, formato) {
  const byPeriodo = new Map()

  for (const match of matches) {
    if (!match.fecha) continue
    const periodo = getTemporadaLabel(match.fecha, formato)
    const goles = (match.incidenciasClub ?? []).reduce((sum, i) => sum + (i.goles > 0 ? i.goles : 0), 0)
    byPeriodo.set(periodo, (byPeriodo.get(periodo) ?? 0) + goles)
  }

  return [...byPeriodo.entries()]
    .map(([periodo, goles]) => ({ periodo, goles }))
    .sort((a, b) => b.goles - a.goles || periodoSortKey(b.periodo) - periodoSortKey(a.periodo))
    .slice(0, 15)
}
