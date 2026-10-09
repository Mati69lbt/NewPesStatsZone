import { formatDateDisplay } from '../utils/dateFormat'

const NUM_TH_CLASSES = 'w-14 px-1 py-2 text-center md:w-16 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-14 px-1 py-2 text-center text-xs md:w-16 md:px-2 md:py-3 md:text-sm'

function JugadoresRachaGolTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Sin jugadores en racha goleadora (2+ partidos consecutivos anotando).
      </p>
    )
  }

  const multiClub = new Set(rows.map((row) => row.club)).size > 1

  return (
    <div className="mx-auto w-max max-w-full overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <table className="w-max max-w-full table-fixed border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-gray-50 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 md:text-[11px]">
            <th className="w-9 px-1.5 py-2 text-center md:w-10 md:px-3 md:py-3">#</th>
            <th className="w-28 px-1.5 py-2 text-left md:w-40 md:px-3 md:py-3">Jugador</th>
            {multiClub && <th className="w-28 px-1.5 py-2 text-left md:w-36 md:px-3 md:py-3">Club</th>}
            <th className={NUM_TH_CLASSES}>Racha</th>
            <th className={NUM_TH_CLASSES}>Goles</th>
            <th className="w-32 px-1.5 py-2 text-left md:w-44 md:px-3 md:py-3">Período</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {rows.map((row, index) => (
            <tr
              key={`${row.club}-${row.nombre}`}
              className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
            >
              <td className="w-9 px-1.5 py-2 text-center text-xs font-bold text-zinc-500 dark:text-zinc-400 md:w-10 md:px-3 md:py-3 md:text-sm">
                {index + 1}
              </td>
              <td className="break-words px-1.5 py-2 text-left text-xs font-bold text-zinc-900 dark:text-zinc-100 md:px-3 md:py-3 md:text-sm">
                {row.nombre}
              </td>
              {multiClub && (
                <td className="break-words px-1.5 py-2 text-left text-[10px] text-zinc-500 dark:text-zinc-400 md:px-3 md:py-3 md:text-xs">
                  {row.club}
                </td>
              )}
              <td className={`${NUM_TD_CLASSES} font-black text-lime-600 dark:text-lime-400`}>{row.partidos}</td>
              <td className={`${NUM_TD_CLASSES} font-black text-zinc-700 dark:text-zinc-200`}>{row.goles}</td>
              <td className="break-words px-1.5 py-2 text-left text-[10px] text-zinc-500 dark:text-zinc-400 md:px-3 md:py-3 md:text-xs">
                {formatDateDisplay(row.fechaInicio)} → {formatDateDisplay(row.fechaFin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JugadoresRachaGolTable
