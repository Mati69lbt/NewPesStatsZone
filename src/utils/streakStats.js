export function buildStreakTrio(matches) {
  return {
    general: matches.slice(0, 10),
    local: matches.filter((m) => m.condicion === 'local').slice(0, 10),
    visitante: matches.filter((m) => m.condicion === 'visitante').slice(0, 10),
  }
}
