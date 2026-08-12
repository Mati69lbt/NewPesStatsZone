const NUM_TH_CLASSES = 'w-20 px-1 py-2 text-center md:w-24 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-20 px-1 py-2 text-center md:w-24 md:px-2 md:py-3'

const MEDALLAS = ['🥇', '🥈', '🥉']

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function RojasBadge({ value }) {
  return (
    <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-red-500/15 px-2 py-1 text-xs font-extrabold text-red-400 ring-1 ring-inset ring-red-500/40 md:min-w-10 md:px-2.5 md:text-sm">
      {value}
    </span>
  )
}

function ExpulsionesTable({ rows, tipo }) {
  const isRivales = tipo === 'rivales'

  const total = rows.reduce((acc, row) => acc + row.expulsiones, 0)

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {isRivales ? 'No hay expulsiones de rivales registradas.' : 'No hay expulsados propios registrados.'}
      </p>
    )
  }

  return (
    <div
      className={
        isRivales
          ? 'mx-auto w-full max-w-md px-2 md:max-w-3xl'
          : 'mx-auto w-full max-w-sm px-2 md:max-w-lg'
      }
    >
      <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
        <table className="w-full table-fixed border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:text-[11px]">
              <th className="w-8 px-1.5 py-2 text-center md:w-10 md:px-3 md:py-3">#</th>
              <th className={isRivales ? 'w-[36%] px-1.5 py-2 text-left md:px-3 md:py-3' : 'px-1.5 py-2 text-left md:px-3 md:py-3'}>
                Jugador
              </th>
              {isRivales && <th className="w-[36%] px-1.5 py-2 text-left md:px-3 md:py-3">Club</th>}
              <th className={NUM_TH_CLASSES}>Rojas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {rows.map((row, index) => (
              <tr
                key={isRivales ? `${row.nombre}-${row.club}` : row.nombre}
                className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
              >
                <td className="w-8 px-1.5 py-2 md:w-10 md:px-3 md:py-3">
                  <Posicion index={index} />
                </td>
                <td className="break-words px-1.5 py-2 text-left text-xs font-bold text-zinc-100 md:px-3 md:py-3 md:text-sm">
                  {row.nombre}
                </td>
                {isRivales && (
                  <td className="break-words px-1.5 py-2 text-left text-[10px] text-zinc-400 md:px-3 md:py-3 md:text-xs">
                    {row.club}
                  </td>
                )}
                <td className={NUM_TD_CLASSES}>
                  <RojasBadge value={row.expulsiones} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-700 bg-zinc-800 text-[10px] font-bold uppercase text-zinc-300 md:text-xs">
              <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={isRivales ? 3 : 2}>
                Total
              </td>
              <td className={NUM_TD_CLASSES}>
                <RojasBadge value={total} />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ExpulsionesTable
