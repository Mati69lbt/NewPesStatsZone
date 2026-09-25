const NUM_TH_CLASSES = 'w-10 px-1 py-2 text-center md:w-12 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-10 px-1 py-2 text-center text-xs md:w-12 md:px-2 md:py-3 md:text-sm'

const MEDALLAS = ['🥇', '🥈', '🥉']

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function VillanosTable({ rows, tipo }) {
  const isGoles = tipo === 'goleadores'

  const totales = rows.reduce(
    (acc, row) => ({
      valor: acc.valor + (isGoles ? row.goles : row.asistencias),
      x2: acc.x2 + (row.x2 ?? 0),
      x3: acc.x3 + (row.x3 ?? 0),
    }),
    { valor: 0, x2: 0, x3: 0 }
  )

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {isGoles ? 'No hay goleadores rivales registrados.' : 'No hay asistidores rivales registrados.'}
      </p>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md px-2 md:max-w-3xl">
      <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <table className="w-full table-fixed border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-gray-50 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 md:text-[11px]">
              <th className="w-8 px-1.5 py-2 text-center md:w-10 md:px-3 md:py-3">#</th>
              <th className="w-[32%] px-1.5 py-2 text-left md:px-3 md:py-3">Jugador</th>
              <th className="w-[32%] px-1.5 py-2 text-left md:px-3 md:py-3">Club</th>
              {isGoles ? (
                <>
                  <th className={NUM_TH_CLASSES}>Goles</th>
                  <th className={NUM_TH_CLASSES}>⚽ x2</th>
                  <th className={NUM_TH_CLASSES}>⚽ x3</th>
                </>
              ) : (
                <th className={NUM_TH_CLASSES}>Asist.</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map((row, index) => (
              <tr
                key={`${row.nombre}-${row.club}`}
                className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
              >
                <td className="w-8 px-1.5 py-2 md:w-10 md:px-3 md:py-3">
                  <Posicion index={index} />
                </td>
                <td className="break-words px-1.5 py-2 text-left text-xs font-bold text-zinc-900 dark:text-zinc-100 md:px-3 md:py-3 md:text-sm">
                  {row.nombre}
                </td>
                <td className="break-words px-1.5 py-2 text-left text-[10px] text-zinc-500 dark:text-zinc-400 md:px-3 md:py-3 md:text-xs">
                  {row.club}
                </td>
                {isGoles ? (
                  <>
                    <td className={`${NUM_TD_CLASSES} font-bold text-red-500 dark:text-red-400`}>{row.goles}</td>
                    <td className={`${NUM_TD_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.x2 || '-'}</td>
                    <td className={`${NUM_TD_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.x3 || '-'}</td>
                  </>
                ) : (
                  <td className={`${NUM_TD_CLASSES} font-bold text-red-500 dark:text-red-400`}>{row.asistencias}</td>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-200 bg-gray-50 text-[10px] font-bold uppercase text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 md:text-xs">
              <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={3}>
                Totales
              </td>
              {isGoles ? (
                <>
                  <td className={`${NUM_TD_CLASSES} text-red-500 dark:text-red-400`}>{totales.valor}</td>
                  <td className={NUM_TD_CLASSES}>{totales.x2}</td>
                  <td className={NUM_TD_CLASSES}>{totales.x3}</td>
                </>
              ) : (
                <td className={`${NUM_TD_CLASSES} text-red-500 dark:text-red-400`}>{totales.valor}</td>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default VillanosTable
