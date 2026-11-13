import { formatDateDisplay, diffDays, formatDuracionDias } from '../utils/dateFormat'

const BORDER_COLOR = {
  invicto: 'border-l-emerald-500 dark:border-l-emerald-400',
  victorias: 'border-l-lime-500 dark:border-l-lime-400',
  anotadora: 'border-l-sky-500 dark:border-l-sky-400',
  recibeGoles: 'border-l-rose-500 dark:border-l-rose-400',
}

function DuracionBadge({ dias }) {
  const { desglose, total } = formatDuracionDias(dias)
  return (
    <span className="inline-flex flex-row items-baseline gap-1 whitespace-nowrap rounded bg-zinc-200 px-2 py-1 leading-tight dark:bg-zinc-700">
      <span className="text-xs font-bold text-zinc-900 dark:text-white">{desglose}</span>
      {total !== '' && <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">- {total}</span>}
    </span>
  )
}

function RachaActualCard({ label, subtitle, categoria, racha }) {
  const dias = diffDays(racha.fechaInicio, racha.fechaFin)
  const ocultarEmpatados = categoria === 'victorias'
  const ocultarPerdidos = categoria === 'invicto' || categoria === 'victorias'

  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border-l-4 bg-zinc-50 px-3 py-2.5 outline outline-1 outline-zinc-200 dark:bg-zinc-900 dark:outline-zinc-700 ${BORDER_COLOR[categoria]}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-zinc-800 dark:text-zinc-100">{label || '—'}</p>
          {subtitle && (
            <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>
        <span className="flex items-baseline gap-0.5 leading-none">
          <span className="text-xl font-black text-lime-500 drop-shadow-[0_0_6px_rgba(163,230,53,0.45)] dark:text-lime-400">
            {racha.partidos}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wide text-lime-600 dark:text-lime-400/80">PJ</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <span className="whitespace-nowrap rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            G {racha.ganados}
          </span>
          {!ocultarEmpatados && (
            <span className="whitespace-nowrap rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
              E {racha.empatados}
            </span>
          )}
          {!ocultarPerdidos && (
            <span className="whitespace-nowrap rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
              P {racha.perdidos}
            </span>
          )}
          <span className="whitespace-nowrap rounded bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 dark:bg-lime-400/20 dark:text-lime-300">
            GF {racha.gf}
          </span>
          <span className="whitespace-nowrap rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
            GC {racha.gc}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-[10px] leading-tight text-zinc-500 dark:text-zinc-400">
            {formatDateDisplay(racha.fechaInicio)} → {formatDateDisplay(racha.fechaFin)}
          </span>
          <DuracionBadge dias={dias} />
        </div>
      </div>
    </div>
  )
}

export default RachaActualCard
