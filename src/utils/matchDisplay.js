export const RESULT_CLASSES = {
  victoria: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  empate: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  derrota: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
}

export function getMatchResultado(match) {
  const golesClub = match.golesClub ?? 0
  const golesRival = match.golesRival ?? 0
  if (golesClub > golesRival) return 'victoria'
  if (golesClub < golesRival) return 'derrota'
  return 'empate'
}

export function getScoreboard(match) {
  const golesClub = match.golesClub ?? 0
  const golesRival = match.golesRival ?? 0
  const esVisitante = match.condicion === 'visitante'

  return {
    nombreLocal: esVisitante ? match.rival : match.club,
    golesLocal: esVisitante ? golesRival : golesClub,
    golesVisitante: esVisitante ? golesClub : golesRival,
    nombreVisitante: esVisitante ? match.club : match.rival,
  }
}

export function buildGoleadoresLabel(incidencias) {
  const goleadores = (incidencias ?? [])
    .filter((i) => i.goles > 0)
    .map((i) => (i.goles > 1 ? `${i.nombre} (${i.goles})` : i.nombre))
  return goleadores.length > 0 ? goleadores.join(', ') : '-'
}

export function buildAsistentesLabel(incidencias) {
  const asistentes = (incidencias ?? [])
    .filter((i) => i.asistencias > 0)
    .map((i) => (i.asistencias > 1 ? `${i.nombre} (${i.asistencias})` : i.nombre))
  return asistentes.length > 0 ? asistentes.join(', ') : null
}
