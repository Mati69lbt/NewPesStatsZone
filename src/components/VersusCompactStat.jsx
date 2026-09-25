function getBorderClasses(g, p) {
  if (g > p) return 'border-emerald-500/30 bg-emerald-500/10'
  if (g < p) return 'border-rose-500/30 bg-rose-500/10'
  return 'border-amber-500/30 bg-amber-500/10'
}

function getValueClasses(value) {
  if (value > 0) return 'text-emerald-600 dark:text-emerald-400'
  if (value < 0) return 'text-rose-600 dark:text-rose-400'
  return 'text-amber-600 dark:text-amber-400'
}

function VersusCompactStat({ stats, onClick }) {
  const { g, e, p, pj, gf, gc, df, gp, pts, ptsPosibles } = stats

  if (pj === 0) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-full min-w-[120px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 py-3 transition hover:border-lime-400/60 dark:border-zinc-700/50 dark:bg-zinc-800/40"
      >
        <span className="text-base font-bold text-zinc-300 dark:text-zinc-600">—</span>
      </button>
    )
  }

  const efectividad = ptsPosibles > 0 ? Math.round((pts / ptsPosibles) * 100) : 0

  const metrics = [
    { label: 'PJ', value: pj, className: 'text-zinc-700 dark:text-zinc-200' },
    { label: 'G', value: g, className: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'E', value: e, className: 'text-amber-600 dark:text-amber-400' },
    { label: 'P', value: p, className: 'text-rose-600 dark:text-rose-400' },
    { label: 'G/P', value: gp > 0 ? `+${gp}` : gp, className: getValueClasses(gp) },
    { label: 'GF', value: gf, className: 'text-zinc-700 dark:text-zinc-200' },
    { label: 'GC', value: gc, className: 'text-zinc-700 dark:text-zinc-200' },
    { label: 'DIF', value: df > 0 ? `+${df}` : df, className: getValueClasses(df) },
  ]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[120px] rounded-lg border p-1.5 text-left transition hover:brightness-95 dark:hover:brightness-125 ${getBorderClasses(g, p)}`}
    >
      <div className="grid grid-cols-4 gap-x-1.5 gap-y-1.5">
        {metrics.map(({ label, value, className }) => (
          <div key={label} className="flex flex-col items-center leading-none">
            <span className="text-[8px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              {label}
            </span>
            <span className={`text-[11px] font-bold ${className}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1 border-t border-zinc-900/5 pt-1 dark:border-white/5">
        <span className="text-[8px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          PTS/EF.
        </span>
        <span className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100">
          {pts}/{ptsPosibles} · {efectividad}%
        </span>
      </div>
    </button>
  )
}

export default VersusCompactStat
