const VARIANT_CLASSES = {
  general: {
    title: 'text-[#a3e635]',
    border: 'border-l-[#a3e635]',
  },
  local: {
    title: 'text-sky-500 dark:text-sky-400',
    border: 'border-l-sky-500 dark:border-l-sky-400',
  },
  visitante: {
    title: 'text-purple-500 dark:text-purple-400',
    border: 'border-l-purple-500 dark:border-l-purple-400',
  },
  neutral: {
    title: 'text-amber-500 dark:text-amber-400',
    border: 'border-l-amber-500 dark:border-l-amber-400',
  },
}

const NIVELES = [
  { key: 'general', label: 'General', short: 'GRL' },
  { key: 'local', label: 'Local', short: 'LOC' },
  { key: 'visitante', label: 'Visitante', short: 'VIS' },
  { key: 'neutral', label: 'Neutral', short: 'NEU' },
]

const NEUTRAL_CELL_CLASSES =
  'border-zinc-200 text-zinc-800 dark:border-zinc-700 dark:text-zinc-100'

const COLOR_CLASSES = {
  pj: 'border-zinc-200 text-orange-500 dark:border-zinc-700 dark:text-orange-400',
  g: 'border-zinc-200 text-[#a3e635] dark:border-zinc-700',
  e: 'border-zinc-200 text-amber-500 dark:border-zinc-700 dark:text-amber-300',
  p: 'border-zinc-200 text-rose-500 dark:border-zinc-700 dark:text-rose-400',
  gf: 'border-zinc-200 text-sky-500 dark:border-zinc-700 dark:text-sky-400',
  gc: 'border-zinc-200 text-red-500 dark:border-zinc-700 dark:text-red-400',
  promGf: 'border-zinc-200 text-sky-500 dark:border-zinc-700 dark:text-sky-400',
  promGc: 'border-zinc-200 text-red-500 dark:border-zinc-700 dark:text-red-400',
}

function signClasses(value) {
  if (value > 0) return 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300'
  if (value < 0) return 'border-rose-500 text-rose-600 dark:border-rose-400 dark:text-rose-300'
  return 'border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-300'
}

function formatEfectividad(pts, ptsPosibles) {
  if (ptsPosibles === 0) return '0'
  const valor = (pts / ptsPosibles) * 100
  return Number.isInteger(valor) ? `${valor}` : valor.toFixed(1)
}

function formatProm(value) {
  return value.toFixed(2)
}

function Cell({ value, dynamic, colorKey }) {
  const cls = dynamic ? signClasses(value) : COLOR_CLASSES[colorKey] || NEUTRAL_CELL_CLASSES
  const display = dynamic && typeof value === 'number' && value > 0 ? `+${value}` : value

  return (
    <div
      className={`flex items-center justify-center rounded-lg border bg-zinc-50 px-1 py-2.5 text-xs font-bold dark:bg-zinc-900/40 sm:text-sm ${cls}`}
    >
      {display}
    </div>
  )
}

function DesktopTable({ stats }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white p-3 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
      <div className="min-w-[900px]">
        <div className="mb-2 grid grid-cols-[110px_repeat(12,minmax(0,1fr))] gap-1.5 px-1 text-[10px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          <span />
          <span className="text-center">PJ</span>
          <span className="text-center">G</span>
          <span className="text-center">E</span>
          <span className="text-center">P</span>
          <span className="text-center">G/P</span>
          <span className="text-center">GF</span>
          <span className="text-center">GC</span>
          <span className="text-center">DF</span>
          <span className="text-center">PROM GF</span>
          <span className="text-center">PROM GC</span>
          <span className="text-center">PTS</span>
          <span className="text-center">%EFEC</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {NIVELES.map(({ key, label }) => {
            const { g, e, p, pj, gf, gc, df, gp, pts, ptsPosibles } = stats[key]
            const promGf = pj > 0 ? gf / pj : 0
            const promGc = pj > 0 ? gc / pj : 0
            const variant = VARIANT_CLASSES[key]

            return (
              <div
                key={key}
                className={`grid grid-cols-[110px_repeat(12,minmax(0,1fr))] items-stretch gap-1.5 rounded-xl border border-l-4 bg-white p-1.5 dark:border-zinc-700/50 dark:bg-zinc-900 ${variant.border}`}
              >
                <div
                  className={`flex items-center justify-center rounded-lg bg-zinc-100 px-1 py-2.5 text-xs font-black uppercase tracking-wide dark:bg-zinc-800 ${variant.title}`}
                >
                  {label}
                </div>
                <Cell value={pj} colorKey="pj" />
                <Cell value={g} colorKey="g" />
                <Cell value={e} colorKey="e" />
                <Cell value={p} colorKey="p" />
                <Cell value={gp} dynamic />
                <Cell value={gf} colorKey="gf" />
                <Cell value={gc} colorKey="gc" />
                <Cell value={df} dynamic />
                <Cell value={formatProm(promGf)} colorKey="promGf" />
                <Cell value={formatProm(promGc)} colorKey="promGc" />
                <div
                  className={`flex items-center justify-center rounded-lg border bg-zinc-50 px-1 py-2.5 text-xs font-bold dark:bg-zinc-900/40 sm:text-sm ${NEUTRAL_CELL_CLASSES}`}
                >
                  {pts}/{ptsPosibles}
                </div>
                <div
                  className={`flex items-center justify-center rounded-lg border bg-zinc-50 px-1 py-2.5 text-xs font-bold dark:bg-zinc-900/40 sm:text-sm ${NEUTRAL_CELL_CLASSES}`}
                >
                  {formatEfectividad(pts, ptsPosibles)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MicroStat({ label, value, colorKey, dynamic }) {
  const cls = dynamic ? signClasses(value) : COLOR_CLASSES[colorKey] || NEUTRAL_CELL_CLASSES
  const display = dynamic && typeof value === 'number' && value > 0 ? `+${value}` : value
  const textCls = cls
    .split(' ')
    .filter((c) => c.includes('text-'))
    .join(' ')

  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-px">
      <span className="text-[7px] font-semibold uppercase tracking-wide leading-none text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
      <span className={`text-[12.5px] font-bold leading-none ${textCls}`}>{display}</span>
    </div>
  )
}

function MobileCards({ stats }) {
  return (
    <div className="flex flex-col gap-4">
      {NIVELES.map(({ key, short }) => {
        const { g, e, p, pj, gf, gc, df, gp, pts, ptsPosibles } = stats[key]
        const promGf = pj > 0 ? gf / pj : 0
        const promGc = pj > 0 ? gc / pj : 0
        const variant = VARIANT_CLASSES[key]

        return (
          <div
            key={key}
            className={`relative rounded-xl border border-l-4 bg-white pt-1 dark:border-zinc-700/50 dark:bg-zinc-800 ${variant.border}`}
          >
            <span
              className={`absolute -top-2.5 left-2 flex items-center gap-1.5 whitespace-nowrap bg-white px-1.5 dark:bg-zinc-800`}
            >
              <span className={`text-[11px] font-black uppercase tracking-wide ${variant.title}`}>{short}</span>
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                PTS: {pts}/{ptsPosibles} - {formatEfectividad(pts, ptsPosibles)}%
              </span>
            </span>

            <div className="grid grid-cols-10 gap-x-px rounded-xl bg-zinc-50 px-0.5 py-2 dark:bg-zinc-900/40">
              <MicroStat label="PJ" value={pj} colorKey="pj" />
              <MicroStat label="G" value={g} colorKey="g" />
              <MicroStat label="E" value={e} colorKey="e" />
              <MicroStat label="P" value={p} colorKey="p" />
              <MicroStat label="G/P" value={gp} dynamic />
              <MicroStat label="GF" value={gf} colorKey="gf" />
              <MicroStat label="GC" value={gc} colorKey="gc" />
              <MicroStat label="DF" value={df} dynamic />
              <MicroStat label="P.GF" value={formatProm(promGf)} colorKey="promGf" />
              <MicroStat label="P.GC" value={formatProm(promGc)} colorKey="promGc" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function NextMatchSummaryTable({ stats, title = 'Tabla Resumen' }) {
  return (
    <div className="w-full max-w-6xl">
      {title && (
        <h2 className="mb-3 text-lg font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
      )}

      <div className="hidden md:block">
        <DesktopTable stats={stats} />
      </div>
      <div className="md:hidden">
        <MobileCards stats={stats} />
      </div>
    </div>
  )
}

export default NextMatchSummaryTable
