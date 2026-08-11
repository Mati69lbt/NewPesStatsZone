import StreakBalls from './StreakBalls'

function StreakRow({ label, matches }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label} <span className="text-zinc-400 dark:text-zinc-600">({Math.min(matches.length, 10)}/10)</span>
      </p>
      <StreakBalls matches={matches} />
    </div>
  )
}

export default StreakRow
