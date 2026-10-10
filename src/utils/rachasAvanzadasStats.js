import { getMatchResultado } from './matchDisplay'

const RACHA_MIN_PARTIDOS = 3

const KEYS_RACHA_MINIMA_ESTRICTA = ['vallaInvicta', 'sequiaColectiva']
const RACHA_MINIMA_ESTRICTA = 3
const MENSAJE_SIN_RACHA_MINIMA = 'Sin rachas mayores a 3 partidos'

export const CATEGORIAS_EQUIPO = [
  { key: 'invicto', label: 'Invicto', descripcion: 'Partidos sin perder' },
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

function groupByClub(matchesAsc) {
  const groups = new Map()
  for (const match of matchesAsc) {
    const club = match.club ?? ''
    if (!groups.has(club)) groups.set(club, [])
    groups.get(club).push(match)
  }
  return [...groups.values()]
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

function summarizeRun(run, esRecord) {
  if (!run || run.length === 0) return null

  const ganados = run.filter((m) => getMatchResultado(m) === 'victoria').length
  const empatados = run.filter((m) => getMatchResultado(m) === 'empate').length
  const perdidos = run.length - ganados - empatados
  const gf = run.reduce((sum, m) => sum + (m.golesClub ?? 0), 0)
  const gc = run.reduce((sum, m) => sum + (m.golesRival ?? 0), 0)

  return {
    club: run[run.length - 1].club ?? '',
    partidos: run.length,
    fechaInicio: run[0].fecha,
    fechaFin: run[run.length - 1].fecha,
    ganados,
    empatados,
    perdidos,
    gf,
    gc,
    esRecord,
  }
}

const TOP_RACHAS_LIMIT = 10

function sortRunsByPartidosDesc(runs) {
  return [...runs].sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length
    return b[b.length - 1].fecha.localeCompare(a[a.length - 1].fecha)
  })
}

function buildCategoria(matchesAsc, key) {
  const predicate = PREDICATES[key]
  const runsPorClub = groupByClub(matchesAsc).map((clubMatches) => buildRuns(clubMatches, predicate))
  const runs = runsPorClub.flat()
  const esEstricta = KEYS_RACHA_MINIMA_ESTRICTA.includes(key)

  let candidatas
  if (esEstricta) {
    candidatas = runs.filter((run) => run.length >= RACHA_MINIMA_ESTRICTA)
  } else {
    const calificadas = runs.filter((run) => run.length > RACHA_MIN_PARTIDOS)
    candidatas = calificadas.length > 0 ? calificadas : runs
  }

  const topPorPJ = sortRunsByPartidosDesc(candidatas).slice(0, TOP_RACHAS_LIMIT)
  const maxPartidos = topPorPJ.reduce((max, run) => Math.max(max, run.length), 0)
  const topResumen = topPorPJ.map((run) => summarizeRun(run, run.length === maxPartidos))

  const ultimos5 = [...topResumen].sort((a, b) => b.fechaFin.localeCompare(a.fechaFin))

  const mensajeVacio = esEstricta && ultimos5.length === 0 ? MENSAJE_SIN_RACHA_MINIMA : undefined

  return { ultimos5, mensajeVacio, totalEncontradas: candidatas.length }
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
const JUGADOR_RACHA_TOP_LIMIT = 15

function buildJugadoresRachas(matchesAsc) {
  const rows = []

  for (const clubMatches of groupByClub(matchesAsc)) {
    const club = clubMatches[0]?.club ?? ''
    const nombres = getAllPlayerNames(clubMatches)

    for (const nombre of nombres) {
      let run = []

      for (const match of clubMatches) {
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
          club,
          partidos: run.length,
          goles: run.reduce((sum, m) => sum + golesDe(nombre, m), 0),
          fechaInicio: run[0].fecha,
          fechaFin: run[run.length - 1].fecha,
        })
      }
    }
  }

  return rows
    .sort((a, b) => b.partidos - a.partidos || b.goles - a.goles || a.nombre.localeCompare(b.nombre))
    .slice(0, JUGADOR_RACHA_TOP_LIMIT)
}

export function buildRachasAvanzadas(matches) {
  const matchesAsc = sortAscending(matches)

  return {
    equipo: buildEquipoRachas(matchesAsc),
    jugadores: buildJugadoresRachas(matchesAsc),
  }
}
