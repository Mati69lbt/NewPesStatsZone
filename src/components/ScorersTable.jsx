function ScorersTable({ title, rows, showPJ }) {
  const totals = rows.reduce(
    (acc, row) => ({
      goles: acc.goles + row.goles,
      x2: acc.x2 + row.x2,
      x3: acc.x3 + row.x3,
    }),
    { goles: 0, x2: 0, x3: 0 }
  )

  const columnCount = showPJ ? 6 : 5

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-200 shadow dark:border-zinc-700/50">
      <div className="border-b border-zinc-200 bg-zinc-100 px-4 py-2.5 dark:border-zinc-700/50 dark:bg-zinc-800">
        <h3 className="truncate text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
          {title}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-sm dark:bg-zinc-900">
          <thead>
            <tr className="text-left text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Jugador</th>
              {showPJ && <th className="px-2 py-2 text-center">PJ</th>}
              <th className="px-2 py-2 text-center">G</th>
              <th className="px-2 py-2 text-center">X2</th>
              <th className="px-2 py-2 text-center">X3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columnCount} className="px-3 py-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
                  Sin goleadores registrados.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row.nombre}>
                  <td className="px-3 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">{index + 1}</td>
                  <td className="px-3 py-2 font-semibold text-zinc-900 dark:text-zinc-100">{row.nombre}</td>
                  {showPJ && (
                    <td className="px-2 py-2 text-center text-zinc-700 dark:text-zinc-300">{row.pj}</td>
                  )}
                  <td className="px-2 py-2 text-center font-bold text-zinc-900 dark:text-zinc-100">{row.goles}</td>
                  <td className="px-2 py-2 text-center text-zinc-700 dark:text-zinc-300">{row.x2 || '-'}</td>
                  <td className="px-2 py-2 text-center text-zinc-700 dark:text-zinc-300">{row.x3 || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
          {rows.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-zinc-300 bg-zinc-50 text-xs font-bold uppercase text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <td className="px-3 py-2" colSpan={showPJ ? 3 : 2}>
                  Total
                </td>
                <td className="px-2 py-2 text-center">{totals.goles}</td>
                <td className="px-2 py-2 text-center">{totals.x2}</td>
                <td className="px-2 py-2 text-center">{totals.x3}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  )
}

export default ScorersTable
