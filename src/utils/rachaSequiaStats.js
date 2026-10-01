function isPresente(nombre, match) {
  const nomina = [...(match.titulares ?? []), ...(match.suplentes ?? [])]
  if (nomina.some((p) => p.nombre === nombre)) return true
  return (match.incidenciasClub ?? []).some((i) => i.nombre === nombre)
}

function convirtioGol(nombre, match) {
  return (match.incidenciasClub ?? []).some((i) => i.nombre === nombre && i.goles > 0)
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

export function buildRachaSequiaRows(matches, condicion, plantelNombres = null) {
  let nombres = getAllPlayerNames(matches)

  if (plantelNombres) {
    const plantelSet = new Set(plantelNombres)
    nombres = nombres.filter((nombre) => plantelSet.has(nombre))
  }
  const filtered = condicion === 'general' ? matches : matches.filter((m) => m.condicion === condicion)
  const sorted = [...filtered].sort((a, b) => (a.fecha ?? '').localeCompare(b.fecha ?? ''))

  const rows = []
  for (const nombre of nombres) {
    let racha = null
    let rival = null

    for (const match of sorted) {
      if (!isPresente(nombre, match)) continue

      if (convirtioGol(nombre, match)) {
        racha = 0
        rival = match.rival ?? null
      } else if (racha !== null) {
        racha += 1
      }
    }

    if (racha !== null && racha >= 3) {
      rows.push({ nombre, racha, rival: rival || '-' })
    }
  }

  return rows.sort((a, b) => b.racha - a.racha || a.nombre.localeCompare(b.nombre))
}
