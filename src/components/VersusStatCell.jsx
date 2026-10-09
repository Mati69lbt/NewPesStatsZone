const VARIANT_TITLES = {
  general: 'text-[#a3e635]',
  local: 'text-sky-400',
  visitante: 'text-purple-400',
  neutral: 'text-amber-400',
}

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

function VersusStatCell({ label, stats, showPoints = false, variant = 'general' }) {
  const { g, e, p, pj, gf, gc, df, gp, pts, ptsPosibles } = stats
  const titleClass = VARIANT_TITLES[variant] || VARIANT_TITLES.general

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
        <p className={`mb-1.5 text-xs font-bold uppercase tracking-wider ${titleClass}`}>
          {label}
        </p>
      )}
      <div className="flex justify-center gap-2 text-sm font-bold">
        <span className="text-[#a3e635]">{g}G</span>
        <span className="text-amber-300">{e}E</span>
        <span className="text-rose-500">{p}P</span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <Badge value={gp} label="G/P" labelPosition="left" />
        <Badge value={df} label="DF" labelPosition="right" />
      </div>
      <p className="mt-2 text-xs font-semibold">
        <span className="text-orange-400">PJ {pj}</span>
        <span className="text-zinc-500 dark:text-zinc-400"> · </span>
        <span className="text-sky-400">GF {gf}</span>
        <span className="text-zinc-500 dark:text-zinc-400"> · </span>
        <span className="text-red-400">GC {gc}</span>
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
