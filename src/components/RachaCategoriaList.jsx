import { formatDateDisplay } from '../utils/dateFormat'

function RachaCategoriaList({ ultimos5, mensajeVacio }) {
  if (!ultimos5 || ultimos5.length === 0) {
    return (
      <p className="py-3 text-center text-xs text-zinc-400 dark:text-zinc-600">
        {mensajeVacio ?? 'Sin rachas registradas.'}
      </p>
    )
  }

  return (
    <div className="flex justify-center overflow-x-auto">
      <table className="w-max border-separate border-spacing-y-1.5 text-xs">
        <thead>
          <tr className="text-[10px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            <th className="w-8 px-2 py-1 text-left font-bold">#</th>
            <th className="px-2 py-1 text-left font-bold">Equipo</th>
            <th className="px-2 py-1 text-left font-bold">Resultados</th>
            <th className="w-14 px-2 py-1 text-right font-bold">PJ</th>
            <th className="px-2 py-1 text-right font-bold">Período</th>
          </tr>
        </thead>
        <tbody>
          {ultimos5.map((racha, index) => (
            <tr
              key={`${racha.fechaInicio}-${racha.fechaFin}-${index}`}
              className={
                racha.esRecord
                  ? 'bg-amber-500/10 outline outline-1 outline-amber-500/50'
                  : 'bg-zinc-50 outline outline-1 outline-zinc-200 dark:bg-zinc-900 dark:outline-zinc-700'
              }
            >
              <td className="rounded-l-lg px-2 py-2 text-left font-black text-zinc-500 dark:text-zinc-400">
                #{index + 1}
              </td>
              <td className="px-2 py-2 text-left">
                <span className="whitespace-nowrap font-bold text-zinc-700 dark:text-zinc-200">
                  {racha.club || '—'}
                </span>
              </td>
              <td className="px-2 py-2 text-left">
                <div className="flex flex-nowrap gap-1.5">
                  <span className="whitespace-nowrap rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                    G {racha.ganados}
                  </span>
                  <span className="whitespace-nowrap rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                    E {racha.empatados}
                  </span>
                  <span className="whitespace-nowrap rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                    P {racha.perdidos}
                  </span>
                  <span className="whitespace-nowrap rounded bg-lime-100 px-1.5 py-0.5 text-[10px] font-bold text-lime-700 dark:bg-lime-400/20 dark:text-lime-300">
                    GF {racha.gf}
                  </span>
                  <span className="whitespace-nowrap rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                    GC {racha.gc}
                  </span>
                </div>
              </td>
              <td className="px-2 py-2 text-right">
                <span className="whitespace-nowrap text-sm font-black text-zinc-900 dark:text-zinc-100">
                  {racha.partidos} <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">PJ</span>
                </span>
              </td>
              <td className="rounded-r-lg px-2 py-2 text-right">
                <span className="whitespace-nowrap text-[11px] text-zinc-500 dark:text-zinc-400">
                  {formatDateDisplay(racha.fechaInicio)} → {formatDateDisplay(racha.fechaFin)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RachaCategoriaList
