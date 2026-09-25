const MEDALLAS = ['🥇', '🥈', '🥉']

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function MejoresAniosTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        No hay datos registrados para esta selección.
      </p>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <table className="w-full table-fixed border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800">
            <th className="w-8 px-1 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:w-10 md:px-3 md:py-3 md:text-[11px]">
              Pos
            </th>
            <th className="px-1 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:px-3 md:py-3 md:text-[11px]">
              Año
            </th>
            <th className="w-16 px-1 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:w-24 md:px-3 md:py-3 md:text-[11px]">
              Goles
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {rows.map((row, index) => (
            <tr
              key={row.periodo}
              className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
            >
              <td className="w-8 px-1 py-2 text-center md:w-10 md:px-3 md:py-3">
                <Posicion index={index} />
              </td>
              <td className="whitespace-nowrap px-1 py-2 text-left text-xs font-bold text-zinc-900 dark:text-zinc-100 md:px-3 md:py-3 md:text-sm">
                {row.periodo}
              </td>
              <td className="w-16 whitespace-nowrap px-1 py-2 text-center text-xs font-bold text-lime-600 dark:text-lime-400 md:w-24 md:px-3 md:py-3 md:text-sm">
                {row.goles}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MejoresAniosTable
