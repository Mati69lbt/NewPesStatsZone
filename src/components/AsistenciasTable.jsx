function formatPromedio(value) {
  return value.toFixed(2)
}

const NUM_TH_CLASSES = 'w-8 px-1.5 py-1.5 text-center md:w-10 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-8 px-1.5 py-1.5 text-center text-xs md:w-10 md:px-2 md:py-3 md:text-sm'

function AsistenciasTable({ rows }) {
  const totals = rows.reduce((acc, row) => ({ asistencias: acc.asistencias + row.asistencias }), { asistencias: 0 })

  if (rows.length === 0) {
    return (
      <p className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        No hay asistidores registrados para esta condición.
      </p>
    )
  }

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-gray-50 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 md:text-[11px]">
              <th className="w-6 px-1.5 py-1.5 md:w-8 md:px-3 md:py-3">#</th>
              <th className="px-1.5 py-1.5 text-left md:px-3 md:py-3">Jugador</th>
              <th className={NUM_TH_CLASSES}>PJ</th>
              <th className={NUM_TH_CLASSES}>A</th>
              <th className={NUM_TH_CLASSES}>P</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map((row, index) => (
              <tr
                key={row.nombre}
                className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
              >
                <td className="w-6 px-1.5 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 md:w-8 md:px-3 md:py-3 md:text-sm">
                  {index + 1}
                </td>
                <td className="px-1.5 py-1.5 text-left text-xs font-bold text-zinc-900 dark:text-zinc-100 md:px-3 md:py-3 md:text-sm">
                  {row.nombre}
                </td>
                <td className={`${NUM_TD_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.pj}</td>
                <td className={`${NUM_TD_CLASSES} font-bold text-lime-600 dark:text-lime-400`}>{row.asistencias}</td>
                <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-700 dark:text-zinc-200`}>{formatPromedio(row.promedio)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-200 bg-gray-50 text-[10px] font-bold uppercase text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 md:text-xs">
              <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={3}>
                Totales
              </td>
              <td className={`${NUM_TD_CLASSES} text-lime-600 dark:text-lime-400`}>{totals.asistencias}</td>
              <td className={NUM_TD_CLASSES} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default AsistenciasTable
