import { formatDateDisplay } from '../utils/dateFormat'

function RachaBloque({ etiqueta, data, showGE, acento }) {
  if (!data) {
    return (
      <div className="flex-1 rounded-lg border border-dashed border-zinc-300 p-3 text-center dark:border-zinc-700">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{etiqueta}</p>
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">Sin racha</p>
      </div>
    )
  }

  return (
    <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
      <p className={`text-[10px] font-bold uppercase tracking-wider ${acento}`}>{etiqueta}</p>
      <p className="mt-1 text-2xl font-black text-zinc-900 dark:text-zinc-100">
        {data.partidos} <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">PJ</span>
      </p>
      <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
        {formatDateDisplay(data.fechaInicio)} → {formatDateDisplay(data.fechaFin)}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {showGE && (
          <>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              G {data.ganados}
            </span>
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
              E {data.empatados}
            </span>
          </>
        )}
        <span className="rounded bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 dark:bg-lime-400/20 dark:text-lime-300">
          GF {data.gf}
        </span>
        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
          GC {data.gc}
        </span>
      </div>
    </div>
  )
}

function RachaCategoriaCard({ label, descripcion, showGE, actual, record }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
      <h4 className="text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">{label}</h4>
      <p className="mb-3 text-[11px] text-zinc-500 dark:text-zinc-400">{descripcion}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <RachaBloque etiqueta="Racha Actual" data={actual} showGE={showGE} acento="text-lime-600 dark:text-lime-400" />
        <RachaBloque etiqueta="Racha Récord" data={record} showGE={showGE} acento="text-orange-500 dark:text-orange-400" />
      </div>
    </div>
  )
}

export default RachaCategoriaCard
