const TH_CLASSES =
  'whitespace-nowrap px-1 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:px-3 md:py-3 md:text-[11px]'
const TH_NUM_CLASSES = `${TH_CLASSES} w-10 text-center md:w-14`
const TD_CLASSES = 'px-1 py-2 text-xs text-zinc-300 md:px-3 md:py-3 md:text-sm'
const TD_NUM_CLASSES = `${TD_CLASSES} w-10 text-center whitespace-nowrap md:w-14`

const MEDALLAS = ['🥇', '🥈', '🥉']

function formatPromedio(value) {
  return value.toFixed(2)
}

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function GoleadoresHistoricoTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        No hay datos registrados para esta selección.
      </p>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <table className="w-full table-fixed border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800">
            <th className={`${TH_CLASSES} w-8 text-center md:w-10`}>Pos</th>
            <th className={TH_CLASSES}>Jugador</th>
            <th className={`${TH_CLASSES} w-14 md:w-20`}>Año</th>
            <th className={TH_NUM_CLASSES}>G</th>
            <th className={TH_NUM_CLASSES}>PJ</th>
            <th className={TH_NUM_CLASSES}>Prom.</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row, index) => (
            <tr
              key={`${row.nombre}-${row.periodo}`}
              className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
            >
              <td className={`${TD_CLASSES} w-8 text-center md:w-10`}>
                <Posicion index={index} />
              </td>
              <td className={`${TD_CLASSES} break-words font-bold text-zinc-100`}>
                {row.nombre}
                {row.club && <span className="block truncate text-[10px] font-normal text-zinc-500">{row.club}</span>}
              </td>
              <td className={`${TD_CLASSES} w-14 whitespace-nowrap text-zinc-400 md:w-20`}>{row.periodo}</td>
              <td className={`${TD_NUM_CLASSES} font-bold text-lime-400`}>{row.goles}</td>
              <td className={TD_NUM_CLASSES}>{row.pj}</td>
              <td className={`${TD_NUM_CLASSES} font-semibold text-zinc-200`}>{formatPromedio(row.promedio)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GoleadoresHistoricoTable
