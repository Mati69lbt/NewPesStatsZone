const NUM_TH_CLASSES = 'w-14 px-1 py-2 text-center md:w-16 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-14 px-1 py-2 text-center text-xs md:w-16 md:px-2 md:py-3 md:text-sm'

function RachaSequiaTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Sin jugadores en sequía (3+ partidos sin convertir).
      </p>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-zinc-900">
      <table className="w-full table-fixed border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:text-[11px]">
            <th className="w-9 px-1.5 py-2 text-center md:w-10 md:px-3 md:py-3">#</th>
            <th className="px-1.5 py-2 text-left md:px-3 md:py-3">Jugador</th>
            <th className={NUM_TH_CLASSES}>Racha</th>
            <th className="w-[30%] px-1.5 py-2 text-left md:px-3 md:py-3">Último Rival</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row, index) => (
            <tr
              key={row.nombre}
              className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
            >
              <td className="w-9 px-1.5 py-2 text-center text-xs font-bold text-zinc-400 md:w-10 md:px-3 md:py-3 md:text-sm">
                {index + 1}
              </td>
              <td className="break-words px-1.5 py-2 text-left text-xs font-bold text-zinc-100 md:px-3 md:py-3 md:text-sm">
                {row.nombre}
              </td>
              <td className={`${NUM_TD_CLASSES} font-black text-orange-400`}>{row.racha}</td>
              <td className="break-words px-1.5 py-2 text-left text-[10px] text-zinc-400 md:px-3 md:py-3 md:text-xs">
                {row.rival}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RachaSequiaTable
