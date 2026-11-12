const NIVELES = {
  general: {
    abr: 'GRL',
    border: 'border-lime-400',
    text: 'text-lime-400',
  },
  local: {
    abr: 'LOC',
    border: 'border-cyan-400',
    text: 'text-cyan-400',
  },
  visitante: {
    abr: 'VIS',
    border: 'border-violet-400',
    text: 'text-violet-400',
  },
  neutral: {
    abr: 'NEU',
    border: 'border-amber-400',
    text: 'text-amber-400',
  },
}

function signClasses(value) {
  if (value > 0) return 'text-emerald-400'
  if (value < 0) return 'text-red-400'
  return 'text-amber-400'
}

function getRowClasses(g, p) {
  if (g > p) return 'border-emerald-500/30 bg-emerald-500/10'
  if (g < p) return 'border-rose-500/30 bg-rose-500/10'
  return 'border-amber-500/30 bg-amber-500/10'
}

function formatEfec(efectividad) {
  return `${efectividad.toFixed(1)}%`
}

function formatProm(value) {
  return value.toFixed(2)
}

const METRICA_CLASSES = {
  pj: 'text-orange-400',
  g: 'text-lime-400',
  e: 'text-amber-400',
  p: 'text-rose-400',
  gf: 'text-sky-400',
  gc: 'text-red-400',
  promGf: 'text-sky-400',
  promGc: 'text-red-400',
  pts: 'text-emerald-400',
  efec: 'text-purple-400',
}

const HEADER_LABELS = ['PJ', 'G', 'E', 'P', 'G/P', 'GF', 'GC', 'DF', 'PROM GF', 'PROM GC', 'PTS', '%EFEC']

function DesktopCell({ value, colorClass, borderClass }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-zinc-900 px-1 py-3 text-sm font-bold ${
        borderClass ? `border ${borderClass}` : ''
      }`}
    >
      <span className={colorClass}>{value}</span>
    </div>
  )
}

function MobileCell({ label, value, colorClass, borderClass }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-0.5 rounded-md px-px py-0.5 ${
        borderClass ? `border ${borderClass}` : ''
      }`}
    >
      <span className="text-[7px] font-semibold uppercase tracking-wide leading-none text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
      <span className={`text-[12.5px] font-bold leading-none ${colorClass}`}>{value}</span>
    </div>
  )
}

function TablaResumenRow({ row }) {
  const { condicion, titulo, metrics } = row
  const nivel = NIVELES[condicion] ?? NIVELES.general
  const ptsLabel = `${metrics.puntosObtenidos}/${metrics.puntosPosibles}`
  const ptsEfec = `${ptsLabel} (${formatEfec(metrics.efectividad)})`

  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:grid grid-cols-[110px_repeat(12,1fr)] items-stretch gap-1.5 rounded-xl border border-l-4 p-3 shadow ${getRowClasses(metrics.g, metrics.p)} ${nivel.border}`}
      >
        <div className="flex items-center text-xs font-black uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
          {titulo}
        </div>
        <DesktopCell value={metrics.pj} colorClass={METRICA_CLASSES.pj} />
        <DesktopCell value={metrics.g} colorClass={METRICA_CLASSES.g} />
        <DesktopCell value={metrics.e} colorClass={METRICA_CLASSES.e} />
        <DesktopCell value={metrics.p} colorClass={METRICA_CLASSES.p} />
        <DesktopCell value={metrics.gp} colorClass={signClasses(metrics.gp)} />
        <DesktopCell value={metrics.gf} colorClass={METRICA_CLASSES.gf} />
        <DesktopCell value={metrics.gc} colorClass={METRICA_CLASSES.gc} />
        <DesktopCell value={metrics.dif} colorClass={signClasses(metrics.dif)} />
        <DesktopCell value={formatProm(metrics.promGf)} colorClass={METRICA_CLASSES.promGf} />
        <DesktopCell value={formatProm(metrics.promGc)} colorClass={METRICA_CLASSES.promGc} />
        <DesktopCell value={ptsLabel} colorClass={METRICA_CLASSES.pts} />
        <DesktopCell value={formatEfec(metrics.efectividad)} colorClass={METRICA_CLASSES.efec} />
      </div>

      {/* Mobile */}
      <div
        className={`relative rounded-xl border border-l-4 pt-0.5 md:hidden ${getRowClasses(metrics.g, metrics.p)} ${nivel.border}`}
      >
        <span className="absolute -top-2.5 left-2 flex items-center gap-1.5 whitespace-nowrap bg-white px-1.5 dark:bg-zinc-900">
          <span className={`text-[11px] font-black uppercase tracking-wide ${nivel.text}`}>{nivel.abr}</span>
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">PTS: {ptsEfec}</span>
        </span>

        <div className="grid grid-cols-10 gap-x-px rounded-xl bg-zinc-50 px-0.5 py-2 dark:bg-zinc-900/40">
          <MobileCell label="PJ" value={metrics.pj} colorClass={METRICA_CLASSES.pj} />
          <MobileCell label="G" value={metrics.g} colorClass={METRICA_CLASSES.g} />
          <MobileCell label="E" value={metrics.e} colorClass={METRICA_CLASSES.e} />
          <MobileCell label="P" value={metrics.p} colorClass={METRICA_CLASSES.p} />
          <MobileCell label="G/P" value={metrics.gp} colorClass={signClasses(metrics.gp)} />
          <MobileCell label="GF" value={metrics.gf} colorClass={METRICA_CLASSES.gf} />
          <MobileCell label="GC" value={metrics.gc} colorClass={METRICA_CLASSES.gc} />
          <MobileCell label="DF" value={metrics.dif} colorClass={signClasses(metrics.dif)} />
          <MobileCell label="P.GF" value={formatProm(metrics.promGf)} colorClass={METRICA_CLASSES.promGf} />
          <MobileCell label="P.GC" value={formatProm(metrics.promGc)} colorClass={METRICA_CLASSES.promGc} />
        </div>
      </div>
    </>
  )
}

export function TablaResumenHeader() {
  return (
    <div className="hidden grid-cols-[110px_repeat(12,1fr)] gap-1.5 px-3 md:grid">
      <span></span>
      {HEADER_LABELS.map((label) => (
        <span
          key={label}
          className="text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
        >
          {label}
        </span>
      ))}
    </div>
  )
}

export default TablaResumenRow
