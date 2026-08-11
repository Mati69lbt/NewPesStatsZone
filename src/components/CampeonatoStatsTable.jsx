const NUM_TH_CLASSES = 'w-8 px-1.5 py-1.5 text-center md:w-10 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-8 px-1.5 py-1.5 text-center text-xs md:w-10 md:px-2 md:py-3 md:text-sm'

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

function CampeonatoStatsTable({ rows, mode }) {
  const isGoles = mode === 'goleadores'

  const totals = rows.reduce(
    (acc, row) => ({
      goles: acc.goles + (row.goles || 0),
      asistencias: acc.asistencias + (row.asistencias || 0),
      x2: acc.x2 + (row.x2 || 0),
      x3: acc.x3 + (row.x3 || 0),
    }),
    { goles: 0, asistencias: 0, x2: 0, x3: 0 }
  )

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        {isGoles ? 'No hay goleadores registrados en este torneo.' : 'No hay asistidores registrados en este torneo.'}
      </p>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md px-2 md:max-w-4xl">
      <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:text-[11px]">
              <th className="w-6 px-1.5 py-1.5 text-center md:w-8 md:px-3 md:py-3">Pos</th>
              <th className="px-1.5 py-1.5 text-left md:px-3 md:py-3">Jugador</th>
              <th className={NUM_TH_CLASSES}>PJ</th>
              {isGoles ? (
                <>
                  <th className={NUM_TH_CLASSES}>Goles</th>
                  <th className={NUM_TH_CLASSES}>Prom.</th>
                  <th className={NUM_TH_CLASSES}>⚽ x2</th>
                  <th className={NUM_TH_CLASSES}>⚽ x3</th>
                </>
              ) : (
                <>
                  <th className={NUM_TH_CLASSES}>Asist.</th>
                  <th className={NUM_TH_CLASSES}>Prom.</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {rows.map((row, index) => (
              <tr
                key={row.nombre}
                className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
              >
                <td className="w-6 px-1.5 py-1.5 md:w-8 md:px-3 md:py-3">
                  <Posicion index={index} />
                </td>
                <td className="px-1.5 py-1.5 text-left text-xs font-bold text-zinc-100 md:px-3 md:py-3 md:text-sm">
                  {row.nombre}
                </td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.pj}</td>
                {isGoles ? (
                  <>
                    <td className={`${NUM_TD_CLASSES} font-bold text-lime-400`}>{row.goles}</td>
                    <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-200`}>{formatPromedio(row.promedio)}</td>
                    <td className={NUM_TD_CLASSES}>
                      {row.x2 > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold text-sky-400 md:text-xs">
                          {row.x2}
                        </span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                    <td className={NUM_TD_CLASSES}>
                      {row.x3 > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 md:text-xs">
                          {row.x3}
                        </span>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                  </>
                ) : (
                  <>
                    <td className={`${NUM_TD_CLASSES} font-bold text-lime-400`}>{row.asistencias}</td>
                    <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-200`}>{formatPromedio(row.promedio)}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-700 bg-zinc-800 text-[10px] font-bold uppercase text-zinc-300 md:text-xs">
              <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={3}>
                Totales Torneo
              </td>
              {isGoles ? (
                <>
                  <td className={`${NUM_TD_CLASSES} text-lime-400`}>{totals.goles}</td>
                  <td className={NUM_TD_CLASSES} />
                  <td className={`${NUM_TD_CLASSES} text-sky-400`}>{totals.x2}</td>
                  <td className={`${NUM_TD_CLASSES} text-amber-400`}>{totals.x3}</td>
                </>
              ) : (
                <>
                  <td className={`${NUM_TD_CLASSES} text-lime-400`}>{totals.asistencias}</td>
                  <td className={NUM_TD_CLASSES} />
                </>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default CampeonatoStatsTable
