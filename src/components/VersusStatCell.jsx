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
      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-[11px] font-bold ${getBadgeClasses(
        value
      )}`}
    >
      {value > 0 ? `+${value}` : value}
    </span>
  )

  return (
    <span className="flex items-center gap-1">
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
      <div className="flex min-w-[132px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-center dark:border-zinc-700/50 dark:bg-zinc-800/40">
        {label && (
          <p className="sr-only">{label}</p>
        )}
        <span className="text-lg font-bold text-zinc-300 dark:text-zinc-600">—</span>
      </div>
    )
  }

  return (
    <div className={`min-w-[132px] rounded-lg border p-2 text-center ${getCardClasses(g, p)}`}>
      {label && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      )}
      <div className="flex justify-center gap-1.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-200">
        <span>{g}G</span>
        <span>{e}E</span>
        <span>{p}P</span>
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-2">
        <Badge value={gp} label="G/P" labelPosition="left" />
        <Badge value={df} label="DF" labelPosition="right" />
      </div>
      <p className="mt-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
        PJ {pj} · GF {gf} · GC {gc}
      </p>
      {showPoints && (
        <p className="mt-1.5 border-t border-zinc-900/5 pt-1.5 text-[11px] font-bold text-zinc-700 dark:border-white/5 dark:text-zinc-200">
          {pts} / {ptsPosibles}
          <span className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
            {ptsPosibles > 0 ? Math.round((pts / ptsPosibles) * 100) : 0}%
          </span>
        </p>
      )}
    </div>
  )
}

export default VersusStatCell
