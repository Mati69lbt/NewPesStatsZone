import { getMatchResultado } from './matchDisplay'

const RECORD_MIN_PARTIDOS = 5

export const CATEGORIAS_EQUIPO = [
  { key: 'invicto', label: 'Invicto', descripcion: 'Partidos sin perder', showGE: true },
  { key: 'victorias', label: 'Racha de Victorias', descripcion: 'Solo partidos ganados' },
  { key: 'anotadora', label: 'Racha Anotadora', descripcion: 'Convirtiendo al menos 1 gol' },
  { key: 'recibeGoles', label: 'Racha de Recibir Goles', descripcion: 'Con al menos 1 gol en contra' },
  { key: 'vallaInvicta', label: 'Valla Invicta', descripcion: 'Sin recibir goles' },
  { key: 'sequiaColectiva', label: 'Sequía Colectiva', descripcion: 'Sin convertir goles' },
]

const PREDICATES = {
  invicto: (m) => getMatchResultado(m) !== 'derrota',
  victorias: (m) => getMatchResultado(m) === 'victoria',
  anotadora: (m) => (m.golesClub ?? 0) > 0,
  recibeGoles: (m) => (m.golesRival ?? 0) > 0,
  vallaInvicta: (m) => (m.golesRival ?? 0) === 0,
  sequiaColectiva: (m) => (m.golesClub ?? 0) === 0,
}

function sortAscending(matches) {
  return [...matches].filter((m) => m.fecha).sort((a, b) => a.fecha.localeCompare(b.fecha))
}

function buildRuns(matches, predicate) {
  const runs = []
  let current = null

  for (const match of matches) {
    if (predicate(match)) {
      if (!current) current = []
      current.push(match)
    } else if (current) {
      runs.push(current)
      current = null
    }
  }
  if (current) runs.push(current)

  return runs
}

function summarizeRun(run) {
  if (!run || run.length === 0) return null

  const ganados = run.filter((m) => getMatchResultado(m) === 'victoria').length
  const empatados = run.filter((m) => getMatchResultado(m) === 'empate').length
  const gf = run.reduce((sum, m) => sum + (m.golesClub ?? 0), 0)
  const gc = run.reduce((sum, m) => sum + (m.golesRival ?? 0), 0)

  return {
    partidos: run.length,
    fechaInicio: run[0].fecha,
    fechaFin: run[run.length - 1].fecha,
    ganados,
    empatados,
    gf,
    gc,
  }
}

function buildCategoria(matchesAsc, key) {
  const predicate = PREDICATES[key]
  const runs = buildRuns(matchesAsc, predicate)

  const record = runs
    .filter((run) => run.length > RECORD_MIN_PARTIDOS)
    .sort((a, b) => b.length - a.length)[0]

  const lastMatch = matchesAsc[matchesAsc.length - 1]
  const lastRun = runs[runs.length - 1]
  const actual = lastRun && lastRun[lastRun.length - 1] === lastMatch ? lastRun : null

  return {
    actual: summarizeRun(actual),
    record: summarizeRun(record),
  }
}

function buildEquipoRachas(matchesAsc) {
  const result = {}
  for (const { key } of CATEGORIAS_EQUIPO) {
    result[key] = buildCategoria(matchesAsc, key)
  }
  return result
}

function isPresente(nombre, match) {
  const nomina = [...(match.titulares ?? []), ...(match.suplentes ?? [])]
  if (nomina.some((p) => p.nombre === nombre)) return true
  return (match.incidenciasClub ?? []).some((i) => i.nombre === nombre)
}

function golesDe(nombre, match) {
  const incidencia = (match.incidenciasClub ?? []).find((i) => i.nombre === nombre)
  return incidencia?.goles ?? 0
}

function getAllPlayerNames(matches) {
  const set = new Set()
  for (const match of matches) {
    for (const p of [...(match.titulares ?? []), ...(match.suplentes ?? [])]) {
      if (p.nombre) set.add(p.nombre)
    }
    for (const i of match.incidenciasClub ?? []) {
      if (i.nombre) set.add(i.nombre)
    }
  }
  return [...set]
}

const JUGADOR_RACHA_MIN_PARTIDOS = 2

function buildJugadoresRachas(matchesAsc) {
  const nombres = getAllPlayerNames(matchesAsc)
  const rows = []

  for (const nombre of nombres) {
    let run = []

    for (const match of matchesAsc) {
      if (!isPresente(nombre, match)) continue

      if (golesDe(nombre, match) > 0) {
        run.push(match)
      } else {
        run = []
      }
    }

    if (run.length >= JUGADOR_RACHA_MIN_PARTIDOS) {
      rows.push({
        nombre,
        partidos: run.length,
        goles: run.reduce((sum, m) => sum + golesDe(nombre, m), 0),
        fechaInicio: run[0].fecha,
        fechaFin: run[run.length - 1].fecha,
      })
    }
  }

  return rows.sort((a, b) => b.partidos - a.partidos || a.nombre.localeCompare(b.nombre))
}

export function buildRachasAvanzadas(matches) {
  const matchesAsc = sortAscending(matches)

  return {
    equipo: buildEquipoRachas(matchesAsc),
    jugadores: buildJugadoresRachas(matchesAsc),
  }
}
