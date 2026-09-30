const POSITION_ORDER = {
  PT: 0,
  DEF: 1,
  LI: 2,
  LD: 3,
  MCD: 4,
  MC: 5,
  MO: 6,
  EXD: 7,
  EXI: 8,
  SD: 9,
  CD: 10,
}

export function getPositionOrder(posicion) {
  return POSITION_ORDER[posicion] ?? 99
}

export function sortByPosition(players) {
  return [...players].sort((a, b) => getPositionOrder(a.posicion) - getPositionOrder(b.posicion))
}
