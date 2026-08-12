const NUM_TH_CLASSES = 'w-12 px-1 py-2 text-center md:w-14 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-12 px-1 py-2 text-center text-xs md:w-14 md:px-2 md:py-3 md:text-sm'

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

function EstadisticaPeriodoTable({ rows, metrica }) {
  const isGoles = metrica === 'goleadores'

  const total = rows.reduce((acc, row) => acc + (isGoles ? row.goles : row.asistencias), 0)

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {isGoles ? 'No hay goleadores registrados en este período.' : 'No hay asistidores registrados en este período.'}
      </p>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <table className="w-full table-fixed border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:text-[11px]">
            <th className="w-9 px-1.5 py-2 text-center md:w-10 md:px-3 md:py-3">Pos</th>
            <th className="w-[30%] px-1.5 py-2 text-left md:px-3 md:py-3">Jugador</th>
            <th className="w-[30%] px-1.5 py-2 text-left md:px-3 md:py-3">Club</th>
            <th className={NUM_TH_CLASSES}>PJ</th>
            <th className={NUM_TH_CLASSES}>{isGoles ? 'G' : 'A'}</th>
            <th className={NUM_TH_CLASSES}>Prom.</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row, index) => (
            <tr
              key={row.nombre}
              className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
            >
              <td className="w-9 px-1.5 py-2 md:w-10 md:px-3 md:py-3">
                <Posicion index={index} />
              </td>
              <td className="break-words px-1.5 py-2 text-left text-xs font-bold text-zinc-100 md:px-3 md:py-3 md:text-sm">
                {row.nombre}
              </td>
              <td className="break-words px-1.5 py-2 text-left text-[10px] text-zinc-400 md:px-3 md:py-3 md:text-xs">
                {row.club || '-'}
              </td>
              <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.pj}</td>
              <td className={`${NUM_TD_CLASSES} font-bold text-lime-400`}>{isGoles ? row.goles : row.asistencias}</td>
              <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-200`}>{formatPromedio(row.promedio)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-zinc-700 bg-zinc-800 text-[10px] font-bold uppercase text-zinc-300 md:text-xs">
            <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={4}>
              Total
            </td>
            <td className={`${NUM_TD_CLASSES} text-lime-400`}>{total}</td>
            <td className={NUM_TD_CLASSES} />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default EstadisticaPeriodoTable
