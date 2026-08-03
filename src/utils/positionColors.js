const YELLOW = 'bg-yellow-500 text-neutral-900'
const BLUE = 'bg-blue-600 text-white'
const GREEN = 'bg-emerald-600 text-white'
const RED = 'bg-red-600 text-white'

const POSITION_COLORS = {
  PT: YELLOW,
  DEF: BLUE,
  LD: BLUE,
  LI: BLUE,
  MCD: GREEN,
  MC: GREEN,
  MO: GREEN,
  EXI: RED,
  EXD: RED,
  CD: RED,
  SD: RED,
}

export function getPositionColorClasses(posicion) {
  return POSITION_COLORS[posicion] ?? 'bg-zinc-500 text-white'
}
