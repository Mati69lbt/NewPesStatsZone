function signClasses(value) {
  if (value > 0) return 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300'
  if (value < 0) return 'border-rose-500 text-rose-600 dark:border-rose-400 dark:text-rose-300'
  return 'border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-300'
}

function formatEfec(efectividad) {
  return `${efectividad.toFixed(1)}%`
}

const NEUTRAL_CELL_CLASSES =
  'border-zinc-200 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100'

function DesktopCell({ value, highlight }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border bg-zinc-50 py-3 text-sm font-bold dark:bg-zinc-900/40 ${
        highlight ? signClasses(value) : NEUTRAL_CELL_CLASSES
      }`}
    >
      {value}
    </div>
  )
}

function MobileCell({ label, value, highlight }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border bg-zinc-50 px-1 py-2 dark:bg-zinc-900/40 ${
        highlight ? signClasses(value) : NEUTRAL_CELL_CLASSES
      }`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  )
}

function RecordPersonalRow({ row }) {
  const { titulo, metrics } = row
  const ptsEfec = `${metrics.puntosObtenidos}/${metrics.puntosPosibles} (${formatEfec(metrics.efectividad)})`

  return (
    <>
      {/* Desktop */}
      <div className="hidden grid-cols-[140px_repeat(9,minmax(0,1fr))] items-stretch gap-2 rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-700/50 dark:bg-zinc-800 md:grid">
        <div className="flex items-center justify-center rounded-lg bg-zinc-100 px-2 py-3 text-sm font-black uppercase tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          {titulo}
        </div>
        <DesktopCell value={metrics.pj} />
        <DesktopCell value={metrics.g} />
        <DesktopCell value={metrics.e} />
        <DesktopCell value={metrics.p} />
        <DesktopCell value={metrics.gp} highlight />
        <DesktopCell value={metrics.gf} />
        <DesktopCell value={metrics.gc} />
        <DesktopCell value={metrics.dif} highlight />
        <div
          className={`flex items-center justify-center rounded-lg border bg-zinc-50 px-1 py-3 text-center text-xs font-bold dark:bg-zinc-900/40 ${NEUTRAL_CELL_CLASSES}`}
        >
          {ptsEfec}
        </div>
      </div>

      {/* Mobile */}
      <fieldset className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-700/50 dark:bg-zinc-800 md:hidden">
        <legend className="px-1 text-sm font-black uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
          {titulo}
        </legend>
        <div className="grid grid-cols-5 gap-1.5">
          <MobileCell label="PJ" value={metrics.pj} />
          <MobileCell label="G" value={metrics.g} />
          <MobileCell label="E" value={metrics.e} />
          <MobileCell label="P" value={metrics.p} />
          <MobileCell label="G/P" value={metrics.gp} highlight />
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          <MobileCell label="GF" value={metrics.gf} />
          <MobileCell label="GC" value={metrics.gc} />
          <MobileCell label="DIF" value={metrics.dif} highlight />
          <div
            className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border bg-zinc-50 px-1 py-2 dark:bg-zinc-900/40 ${NEUTRAL_CELL_CLASSES}`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              PTS/EFEC
            </span>
            <span className="text-center text-xs font-bold">{ptsEfec}</span>
          </div>
        </div>
      </fieldset>
    </>
  )
}

export default RecordPersonalRow
