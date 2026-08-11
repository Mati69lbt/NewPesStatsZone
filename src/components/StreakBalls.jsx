import { getMatchResultado } from '../utils/matchDisplay'

const BALL_CLASSES = {
  victoria: 'bg-emerald-500',
  empate: 'bg-amber-500',
  derrota: 'bg-rose-500',
}

const LETTER = {
  victoria: 'G',
  empate: 'E',
  derrota: 'P',
}

function StreakBalls({ matches }) {
  const items = matches.slice(0, 10)

  if (items.length === 0) {
    return <p className="text-xs text-zinc-400 dark:text-zinc-500">Sin partidos registrados.</p>
  }

  return (
    <div className="grid grid-cols-5 gap-2 lg:grid-cols-10 lg:gap-3">
      {items.map((match) => {
        const resultado = getMatchResultado(match)
        return (
          <div key={match.id} className="flex flex-col items-center gap-1.5">
            <span
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${BALL_CLASSES[resultado]}`}
            >
              {LETTER[resultado]}
            </span>
            <span className="w-full whitespace-normal break-words text-center text-[10px] font-semibold leading-tight text-zinc-600 dark:text-zinc-400 lg:text-xs">
              {match.rival || '—'}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default StreakBalls
