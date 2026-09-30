import { getPositionOrder } from './positionOrder'

export function sortPlayers(players, sortKey, sortDir) {
  const sorted = [...players].sort((a, b) => {
    if (sortKey === 'dorsal') return a.dorsal - b.dorsal
    if (sortKey === 'posicion') {
      return getPositionOrder(a.posicion) - getPositionOrder(b.posicion) || a.nombre.localeCompare(b.nombre)
    }
    return a.nombre.localeCompare(b.nombre)
  })
  return sortDir === 'desc' ? sorted.reverse() : sorted
}
