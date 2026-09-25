function getValueClasses(value) {
  if (value > 0) return 'text-emerald-600 dark:text-emerald-400'
  if (value < 0) return 'text-rose-600 dark:text-rose-400'
  return 'text-amber-600 dark:text-amber-400'
}

function VersusStatDetail({ stats }) {
  const { g, e, p, pj, gf, gc, df, gp, pts, ptsPosibles } = stats

  if (pj === 0) {
    return (
      <p className="py-6 text-center text-sm text-zinc-400 dark:text-zinc-500">
        Sin partidos jugados en este bloque.
      </p>
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
    <div>
      <div className="grid grid-cols-4 gap-2">
        {metrics.map(({ label, value, className }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 py-2 dark:border-zinc-700/50 dark:bg-zinc-800/60"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              {label}
            </span>
            <span className={`text-lg font-bold ${className}`}>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 dark:border-zinc-700/50 dark:bg-zinc-800/60">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          PTS / EFECT.
        </span>
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {pts} / {ptsPosibles} · {efectividad}%
        </span>
      </div>
    </div>
  )
}

export default VersusStatDetail
