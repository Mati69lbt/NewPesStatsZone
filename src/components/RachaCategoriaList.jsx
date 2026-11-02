import { formatDateDisplay, diffDays, formatDuracionDias } from '../utils/dateFormat'

const GRID_COLS =
  'sm:grid sm:grid-cols-[1.25rem_minmax(0,1fr)_7rem_2.5rem_6rem_6.5rem] sm:items-center lg:grid-cols-[1.25rem_minmax(0,1fr)_6rem_2.25rem_5rem_6rem]'

function DuracionBadge({ dias, stacked = false, className = '' }) {
  const { desglose, total } = formatDuracionDias(dias)
  const layout = stacked ? 'flex-col items-start gap-0.5' : 'flex-row items-baseline gap-1'
  return (
    <span
      className={`inline-flex ${layout} whitespace-nowrap rounded bg-zinc-200 px-2 py-1 leading-tight dark:bg-zinc-700 ${className}`}
    >
      <span className="text-xs font-bold text-zinc-900 dark:text-white">{desglose}</span>
      {total !== '' && (
        <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">- {total}</span>
      )}
    </span>
  )
}

function RachaCategoriaList({ ultimos5, mensajeVacio, categoria }) {
  if (!ultimos5 || ultimos5.length === 0) {
    return (
      <p className="py-3 text-center text-xs text-zinc-400 dark:text-zinc-600">
        {mensajeVacio ?? 'Sin rachas registradas.'}
      </p>
    )
  }

  const ocultarEmpatados = categoria === 'victorias'
  const ocultarPerdidos = categoria === 'invicto' || categoria === 'victorias' || categoria === 'vallaInvicta'

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`hidden ${GRID_COLS} gap-1 px-1.5 text-[10px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500 sm:gap-2 sm:px-3`}
      >
        <span className="text-left font-bold">#</span>
        <span className="text-left font-bold">Equipo</span>
        <span className="flex items-center justify-start text-left font-bold">Resultados</span>
        <span className="flex items-center justify-center text-center font-bold">PJ</span>
        <span className="flex items-center justify-start text-left font-bold">Período</span>
        <span className="flex items-center justify-center text-center font-bold">Días</span>
      </div>

      <div className="mt-1.5 flex flex-col gap-1.5 text-xs">
        {ultimos5.map((racha, index) => {
          const dias = diffDays(racha.fechaInicio, racha.fechaFin)

          return (
            <div
              key={`${racha.fechaInicio}-${racha.fechaFin}-${index}`}
              className={`flex flex-col gap-2 rounded-lg px-2.5 py-2.5 sm:gap-2 sm:px-3 ${GRID_COLS} ${
                racha.esRecord
                  ? 'bg-amber-500/10 outline outline-1 outline-amber-500/50'
                  : 'bg-zinc-50 outline outline-1 outline-zinc-200 dark:bg-zinc-900 dark:outline-zinc-700'
              }`}
            >
              {/* Mobile: renglón superior — índice + equipo + días */}
              <div className="flex items-start justify-between gap-2 sm:hidden">
                <div className="flex min-w-0 items-start gap-2">
                  <span className="shrink-0 font-black text-zinc-500 dark:text-zinc-400">#{index + 1}</span>
                  <span className="min-w-0 break-words text-sm font-bold text-zinc-700 dark:text-zinc-200">
                    {racha.club || '—'}
                  </span>
                </div>
                <DuracionBadge dias={dias} className="shrink-0" />
              </div>

              {/* Mobile: renglón inferior — resultados, PJ y período */}
              <div className="flex flex-wrap items-center justify-between gap-2 sm:hidden">
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
                  <span className="whitespace-nowrap rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {racha.partidos} PJ
                  </span>
                </div>
                <span className="whitespace-nowrap text-[10px] leading-tight text-zinc-500 dark:text-zinc-400">
                  {formatDateDisplay(racha.fechaInicio)} → {formatDateDisplay(racha.fechaFin)}
                </span>
              </div>

              {/* Desktop/tablet: columnas de grilla */}
              <span className="hidden text-left font-black text-zinc-500 dark:text-zinc-400 sm:block">
                #{index + 1}
              </span>

              <span className="hidden min-w-0 break-words pr-1 text-left font-bold text-zinc-700 dark:text-zinc-200 sm:block">
                {racha.club || '—'}
              </span>

              <div className="hidden min-w-0 flex-col gap-1 sm:flex">
                <div className="flex flex-wrap gap-1">
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
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="whitespace-nowrap rounded bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 dark:bg-lime-400/20 dark:text-lime-300">
                    GF {racha.gf}
                  </span>
                  <span className="whitespace-nowrap rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                    GC {racha.gc}
                  </span>
                </div>
              </div>

              <div className="hidden items-center justify-center gap-0.5 sm:flex">
                <span className="whitespace-nowrap text-sm font-black text-zinc-900 dark:text-zinc-100">
                  {racha.partidos}
                </span>
                <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">PJ</span>
              </div>

              <div className="hidden flex-col items-start text-left text-[10px] leading-tight text-zinc-500 dark:text-zinc-400 sm:flex sm:text-xs">
                <span className="whitespace-nowrap">{formatDateDisplay(racha.fechaInicio)} →</span>
                <span className="whitespace-nowrap">{formatDateDisplay(racha.fechaFin)}</span>
              </div>

              <div className="hidden items-center justify-center sm:flex">
                <DuracionBadge dias={dias} stacked />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RachaCategoriaList
