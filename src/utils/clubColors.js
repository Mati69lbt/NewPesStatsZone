// Paleta amplia de colores con buen contraste sobre fondo oscuro, sin tonos duplicados.
const CLUB_COLOR_PALETTE = [
  '#f87171', '#fb923c', '#fbbf24', '#facc15', '#a3e635',
  '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8',
  '#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#e879f9',
  '#f472b6', '#fb7185', '#f97316', '#eab308', '#84cc16',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6',
  '#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#ef4444',
  '#d97706', '#65a30d',
]

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/**
 * Asigna un color único a cada club, sin repeticiones mientras la cantidad
 * de clubes no supere el tamaño de la paleta. El orden alfabético garantiza
 * que la asignación sea estable sin importar el orden de iteración de las filas.
 */
export function buildClubColorMap(clubNames) {
  const uniqueClubs = [...new Set(clubNames.filter(Boolean))].sort((a, b) => a.localeCompare(b))
  const map = new Map()
  const usedColors = new Set()

  for (const club of uniqueClubs) {
    let index = hashString(club) % CLUB_COLOR_PALETTE.length
    let color = CLUB_COLOR_PALETTE[index]
    let attempts = 0
    while (usedColors.has(color) && attempts < CLUB_COLOR_PALETTE.length) {
      index = (index + 1) % CLUB_COLOR_PALETTE.length
      color = CLUB_COLOR_PALETTE[index]
      attempts += 1
    }
    usedColors.add(color)
    map.set(club, color)
  }

  return map
}
