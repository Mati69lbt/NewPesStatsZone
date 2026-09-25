function getCardClasses(g, p) {
  if (g > p) return 'border-emerald-500/30 bg-emerald-500/10'
  if (g < p) return 'border-rose-500/30 bg-rose-500/10'
  return 'border-amber-500/30 bg-amber-500/10'
}

function getBadgeClasses(value) {
  if (value > 0) return 'border-emerald-500 text-emerald-400'
  if (value < 0) return 'border-rose-500 text-rose-400'
  return 'border-amber-500 text-amber-400'
}

function Badge({ value, label, labelPosition }) {
  const labelEl = (
    <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
      {label}
    </span>
  )
  const valueEl = (
    <span
      title={label}
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2 text-sm font-bold ${getBadgeClasses(
        value
      )}`}
    >
      {value > 0 ? `+${value}` : value}
    </span>
  )

  return (
    <span className="flex items-center gap-1.5">
      {labelPosition === 'left' && labelEl}
      {valueEl}
      {labelPosition === 'right' && labelEl}
    </span>
  )
}

function VersusStatCell({ label, stats, showPoints = false }) {
  const { g, e, p, pj, gf, gc, df, gp, pts, ptsPosibles } = stats

  if (pj === 0) {
    return (
      <div className="flex min-h-[150px] min-w-[160px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-700/50 dark:bg-zinc-800/40">
        {label && (
          <p className="sr-only">{label}</p>
        )}
        <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-600">—</span>
      </div>
    )
  }

  return (
    <div className={`min-w-[160px] rounded-xl border p-4 text-center ${getCardClasses(g, p)}`}>
      {label && (
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      )}
      <div className="flex justify-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-200">
        <span>{g}G</span>
        <span>{e}E</span>
        <span>{p}P</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <Badge value={gp} label="G/P" labelPosition="left" />
        <Badge value={df} label="DF" labelPosition="right" />
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        PJ {pj} · GF {gf} · GC {gc}
      </p>
      {showPoints && (
        <p className="mt-2 flex items-center justify-center gap-1 border-t border-zinc-900/5 pt-2 text-sm font-bold text-zinc-700 dark:border-white/5 dark:text-zinc-200">
          <span>
            {pts} / {ptsPosibles} -
          </span>
          <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            {ptsPosibles > 0 ? Math.round((pts / ptsPosibles) * 100) : 0}%
          </span>
        </p>
      )}
    </div>
  )
}

export default VersusStatCell
