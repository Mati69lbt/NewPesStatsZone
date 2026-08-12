import { getTemporadaLabel } from './dateFormat'

export function getResultadoBadgeClasses(resultado) {
  if (resultado === 'Campeón') {
    return 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
  }
  if (resultado === 'Subcampeón') {
    return 'border-amber-500 bg-amber-500/20 text-amber-400'
  }
  if (!resultado) {
    return 'border-zinc-700 bg-zinc-800/40 text-zinc-500'
  }
  return 'border-sky-500/60 bg-sky-500/10 text-sky-400'
}

function mostFrequent(values) {
  const counts = new Map()
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }
  let best = ''
  let bestCount = 0
  for (const [value, count] of counts) {
    if (count > bestCount) {
      best = value
      bestCount = count
    }
  }
  return best
}

export function buildPalmares(matches, tournamentResults) {
  const groups = new Map()
  for (const match of matches) {
    const torneo = match.torneo || 'Sin torneo'
    if (!groups.has(torneo)) groups.set(torneo, [])
    groups.get(torneo).push(match)
  }

  const competencias = [...groups.entries()].map(([torneo, torneoMatches]) => {
    const tipo = tournamentResults[torneo]?.tipo || 'europeo'
    const resultado = tournamentResults[torneo]?.resultado || ''
    const club = mostFrequent(torneoMatches.map((m) => m.club).filter(Boolean))
    const ultimaFecha = torneoMatches.reduce((max, m) => (!max || m.fecha > max ? m.fecha : max), null)
    const temporada = getTemporadaLabel(ultimaFecha, tipo)
    return {
      key: torneo,
      torneo,
      club,
      resultado,
      partidosJugados: torneoMatches.length,
      temporada,
      ultimaFecha: ultimaFecha || '',
    }
  })

  const temporadaGroups = new Map()
  for (const competencia of competencias) {
    const temporada = competencia.temporada || 'Sin temporada'
    if (!temporadaGroups.has(temporada)) temporadaGroups.set(temporada, [])
    temporadaGroups.get(temporada).push(competencia)
  }

  return [...temporadaGroups.entries()]
    .map(([temporada, items]) => ({
      temporada,
      items: items.sort((a, b) => b.ultimaFecha.localeCompare(a.ultimaFecha)),
    }))
    .sort((a, b) => b.items[0].ultimaFecha.localeCompare(a.items[0].ultimaFecha))
}
