function formatPromedio(value) {
  return value.toFixed(2)
}

const NUM_TH_CLASSES = 'w-8 px-1.5 py-1.5 text-center md:w-10 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-8 px-1.5 py-1.5 text-center text-xs md:w-10 md:px-2 md:py-3 md:text-sm'

function GoleadoresTable({ rows }) {
  const totals = rows.reduce(
    (acc, row) => ({
      goles: acc.goles + row.goles,
      x2: acc.x2 + row.x2,
      x3: acc.x3 + row.x3,
    }),
    { goles: 0, x2: 0, x3: 0 }
  )

  if (rows.length === 0) {
    return (
      <p className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        No hay goleadores registrados para esta condición.
      </p>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md px-2 md:max-w-4xl">
      <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:text-[11px]">
              <th className="w-6 px-1.5 py-1.5 md:w-8 md:px-3 md:py-3">#</th>
              <th className="px-1.5 py-1.5 text-left md:px-3 md:py-3">Jugador</th>
              <th className={NUM_TH_CLASSES}>PJ</th>
              <th className={NUM_TH_CLASSES}>G</th>
              <th className={NUM_TH_CLASSES}>x2</th>
              <th className={NUM_TH_CLASSES}>x3</th>
              <th className={NUM_TH_CLASSES}>P</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {rows.map((row, index) => (
              <tr
                key={row.nombre}
                className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
              >
                <td className="w-6 px-1.5 py-1.5 text-xs font-semibold text-zinc-400 md:w-8 md:px-3 md:py-3 md:text-sm">
                  {index + 1}
                </td>
                <td className="px-1.5 py-1.5 text-left text-xs font-bold text-zinc-100 md:px-3 md:py-3 md:text-sm">
                  {row.nombre}
                </td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.pj}</td>
                <td className={`${NUM_TD_CLASSES} font-bold text-lime-400`}>{row.goles}</td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.x2 || '-'}</td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.x3 || '-'}</td>
                <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-200`}>{formatPromedio(row.promedio)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-700 bg-zinc-800 text-[10px] font-bold uppercase text-zinc-300 md:text-xs">
              <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={3}>
                Totales
              </td>
              <td className={`${NUM_TD_CLASSES} text-lime-400`}>{totals.goles}</td>
              <td className={NUM_TD_CLASSES}>{totals.x2}</td>
              <td className={NUM_TD_CLASSES}>{totals.x3}</td>
              <td className={NUM_TD_CLASSES} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default GoleadoresTable
