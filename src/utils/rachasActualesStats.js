import { getMatchResultado } from './matchDisplay'

const RACHA_ACTUAL_MIN_PARTIDOS = 3

export const CATEGORIAS_ACTUALES = [
  { key: 'invicto', label: 'Invicto', descripcion: 'Partidos sin perder' },
  { key: 'victorias', label: 'Racha de Victorias', descripcion: 'Partidos ganados consecutivos' },
  { key: 'anotadora', label: 'Racha Anotadora', descripcion: 'Convirtiendo al menos 1 gol' },
  { key: 'recibeGoles', label: 'Racha de Recibir Goles', descripcion: 'Recibiendo goles en contra' },
]

const PREDICATES = {
  invicto: (m) => getMatchResultado(m) !== 'derrota',
  victorias: (m) => getMatchResultado(m) === 'victoria',
  anotadora: (m) => (m.golesClub ?? 0) > 0,
  recibeGoles: (m) => (m.golesRival ?? 0) > 0,
}

function sortAscending(matches) {
  return [...matches].filter((m) => m.fecha).sort((a, b) => a.fecha.localeCompare(b.fecha))
}

function trailingRun(matchesAsc, predicate) {
  const run = []
  for (let i = matchesAsc.length - 1; i >= 0; i -= 1) {
    if (!predicate(matchesAsc[i])) break
    run.unshift(matchesAsc[i])
  }
  return run
}

function summarizeRun(run) {
  if (!run || run.length === 0) return null

  const ganados = run.filter((m) => getMatchResultado(m) === 'victoria').length
  const empatados = run.filter((m) => getMatchResultado(m) === 'empate').length
  const perdidos = run.length - ganados - empatados
  const gf = run.reduce((sum, m) => sum + (m.golesClub ?? 0), 0)
  const gc = run.reduce((sum, m) => sum + (m.golesRival ?? 0), 0)

  return {
    partidos: run.length,
    fechaInicio: run[0].fecha,
    fechaFin: run[run.length - 1].fecha,
    ganados,
    empatados,
    perdidos,
    gf,
    gc,
  }
}

export function getRachaActual(matches, categoriaKey) {
  const matchesAsc = sortAscending(matches)
  const run = trailingRun(matchesAsc, PREDICATES[categoriaKey])
  if (run.length <= RACHA_ACTUAL_MIN_PARTIDOS) return null
  return summarizeRun(run)
}

export function getCapitanEnTurno(matches) {
  const matchesAsc = sortAscending(matches)
  if (matchesAsc.length === 0) return ''
  return matchesAsc[matchesAsc.length - 1].capitanNombre || ''
}

export function getRachaActualCapitan(matches, categoriaKey, capitan) {
  if (!capitan) return null
  const matchesAsc = sortAscending(matches)
  const predicate = (m) => PREDICATES[categoriaKey](m) && m.capitanNombre === capitan
  const run = trailingRun(matchesAsc, predicate)
  if (run.length <= RACHA_ACTUAL_MIN_PARTIDOS) return null
  return summarizeRun(run)
}
