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
  if (value < 0) return 'text-rose-400'
  return 'text-amber-400'
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
  pts: 'text-zinc-100',
  efec: 'text-zinc-100',
}

function DesktopCell({ value, colorClass }) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-zinc-900 px-1 py-3 text-sm font-bold">
      <span className={colorClass}>{value}</span>
    </div>
  )
}

function MobileCell({ label, value, colorClass }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-1 py-2">
      <span className="text-[7px] font-semibold uppercase tracking-wide text-zinc-500">{label}</span>
      <span className={`text-[12.5px] font-bold ${colorClass}`}>{value}</span>
    </div>
  )
}

function TablaResumenRow({ row }) {
  const { condicion, titulo, metrics } = row
  const nivel = NIVELES[condicion] ?? NIVELES.general
  const ptsEfec = `${metrics.puntosObtenidos}/${metrics.puntosPosibles} (${formatEfec(metrics.efectividad)})`

  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden grid-cols-[110px_repeat(12,1fr)] items-stretch gap-1.5 rounded-xl border bg-white p-3 shadow dark:bg-zinc-800 ${nivel.border} border-l-4`}
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
        <DesktopCell value={metrics.puntosObtenidos} colorClass={METRICA_CLASSES.pts} />
        <DesktopCell value={ptsEfec} colorClass={METRICA_CLASSES.efec} />
      </div>

      {/* Mobile */}
      <div className={`relative rounded-xl border bg-white pt-1 dark:bg-zinc-800 ${nivel.border} border-l-4`}>
        <span className="absolute -top-2.5 left-2 z-10 flex items-center gap-1.5 bg-white px-1.5 dark:bg-zinc-800">
          <span className={`text-[11px] font-bold ${nivel.text}`}>{nivel.abr}</span>
          <span className="text-[11px] font-bold text-zinc-400">
            PTS: {ptsEfec}
          </span>
        </span>

        <div className="grid grid-cols-10 gap-x-px rounded-xl bg-zinc-50 dark:bg-zinc-900">
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

export default TablaResumenRow
