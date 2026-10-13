import { formatDateDisplay } from '../utils/dateFormat'

const GRID_COLS =
  'grid grid-cols-[1.25rem_minmax(0,1fr)_7rem_2.5rem_6rem] items-center lg:grid-cols-[1.25rem_minmax(0,1fr)_6rem_2.25rem_5rem]'

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
      <div className={`${GRID_COLS} gap-1 px-1.5 text-[10px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500 sm:gap-2 sm:px-3`}>
        <span className="text-left font-bold">#</span>
        <span className="text-left font-bold">Equipo</span>
        <span className="flex items-center justify-start text-left font-bold">Resultados</span>
        <span className="flex items-center justify-center text-center font-bold">PJ</span>
        <span className="flex items-center justify-start text-left font-bold">Período</span>
      </div>

      <div className="mt-1.5 flex flex-col gap-1.5 text-xs">
        {ultimos5.map((racha, index) => (
          <div
            key={`${racha.fechaInicio}-${racha.fechaFin}-${index}`}
            className={`${GRID_COLS} gap-1 rounded-lg px-1.5 py-2 sm:gap-2 sm:px-3 ${
              racha.esRecord
                ? 'bg-amber-500/10 outline outline-1 outline-amber-500/50'
                : 'bg-zinc-50 outline outline-1 outline-zinc-200 dark:bg-zinc-900 dark:outline-zinc-700'
            }`}
          >
            <span className="text-left font-black text-zinc-500 dark:text-zinc-400">#{index + 1}</span>

            <span className="min-w-0 break-words pr-1 text-left font-bold text-zinc-700 dark:text-zinc-200">
              {racha.club || '—'}
            </span>

            <div className="flex min-w-0 flex-col gap-1">
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

            <div className="flex items-center justify-center gap-0.5">
              <span className="whitespace-nowrap text-sm font-black text-zinc-900 dark:text-zinc-100">
                {racha.partidos}
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">PJ</span>
            </div>

            <div className="flex flex-col items-start text-left text-[10px] leading-tight text-zinc-500 dark:text-zinc-400 sm:text-xs">
              <span className="whitespace-nowrap">{formatDateDisplay(racha.fechaInicio)} →</span>
              <span className="whitespace-nowrap">{formatDateDisplay(racha.fechaFin)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RachaCategoriaList
