const POSITION_ORDER = {
  PT: 0,
  DEF: 1,
  LD: 1,
  LI: 1,
  MCD: 2,
  MC: 2,
  MO: 2,
  EXI: 3,
  EXD: 3,
  CD: 3,
  SD: 3,
}

export function getPositionOrder(posicion) {
  return POSITION_ORDER[posicion] ?? 99
}

export function sortByPosition(players) {
  return [...players].sort((a, b) => getPositionOrder(a.posicion) - getPositionOrder(b.posicion))
}
