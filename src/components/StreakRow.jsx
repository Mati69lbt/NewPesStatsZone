import StreakBalls from './StreakBalls'
import { getStreakBreakdown } from '../utils/matchDisplay'

function StreakRow({ label, matches }) {
  const { g, e, p } = getStreakBreakdown(matches)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label} <span className="text-zinc-400 dark:text-zinc-600">({Math.min(matches.length, 10)}/10)</span>
        {matches.length > 0 && (
          <span className="ml-1.5 whitespace-nowrap normal-case tracking-normal">
            <span className="text-emerald-600 dark:text-emerald-400">{g}G</span>
            {' - '}
            <span className="text-amber-600 dark:text-amber-400">{e}E</span>
            {' - '}
            <span className="text-rose-600 dark:text-rose-400">{p}P</span>
          </span>
        )}
      </p>
      <StreakBalls matches={matches} />
    </div>
  )
}

export default StreakRow
