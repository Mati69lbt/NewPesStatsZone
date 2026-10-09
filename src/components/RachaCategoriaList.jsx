import { formatDateDisplay } from '../utils/dateFormat'

function RachaCategoriaList({ label, descripcion, showGE, ultimos5, mensajeVacio, totalEncontradas }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
      <div className="mb-3 flex flex-row items-baseline gap-1.5">
        <h4 className="text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">{label}</h4>
        <span className="text-zinc-400 dark:text-zinc-500">·</span>
        <span className="text-xs text-zinc-500 opacity-70 dark:text-zinc-400">
          {descripcion}
          {typeof totalEncontradas === 'number' && ` (${totalEncontradas})`}
        </span>
      </div>

      {!ultimos5 || ultimos5.length === 0 ? (
        <p className="py-3 text-center text-xs text-zinc-400 dark:text-zinc-600">
          {mensajeVacio ?? 'Sin rachas registradas.'}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {ultimos5.map((racha, index) => (
            <div
              key={`${racha.fechaInicio}-${racha.fechaFin}-${index}`}
              className={`rounded-lg border p-2.5 ${
                racha.esRecord
                  ? 'border-amber-400 bg-amber-50 dark:border-amber-400/60 dark:bg-amber-400/10'
                  : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded bg-zinc-200 px-1 text-[10px] font-black text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                    #{index + 1}
                  </span>
                  {racha.esRecord && (
                    <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-zinc-900">
                      Récord
                    </span>
                  )}
                  {racha.club && (
                    <span className="truncate text-xs font-bold text-zinc-700 dark:text-zinc-200">{racha.club}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-black leading-none text-zinc-900 dark:text-zinc-100">
                    {racha.partidos} <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">PJ</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {formatDateDisplay(racha.fechaInicio)} → {formatDateDisplay(racha.fechaFin)}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {showGE && (
                  <>
                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      G {racha.ganados}
                    </span>
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                      E {racha.empatados}
                    </span>
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                      P {racha.perdidos}
                    </span>
                  </>
                )}
                <span className="rounded bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 dark:bg-lime-400/20 dark:text-lime-300">
                  GF {racha.gf}
                </span>
                <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                  GC {racha.gc}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RachaCategoriaList
