import { useMemo } from 'react'
import { ACTIVE_CLUB_TEXT_CLASS, isActiveClub } from '../utils/activeClub'
import { buildClubColorMap } from '../utils/clubColors'

const NUM_TH_CLASSES = 'px-1 py-2 text-center md:px-2 md:py-3'
const NUM_TD_CLASSES = 'px-1 py-2 text-center text-xs md:px-2 md:py-3 md:text-sm'
const COMPACT_TH_CLASSES = 'px-0.5 py-2 text-center md:px-1.5 md:py-3'
const COMPACT_TD_CLASSES = 'px-0.5 py-2 text-center text-xs md:px-1.5 md:py-3 md:text-sm'

const MEDALLAS = ['🥇', '🥈', '🥉']

function formatPromedio(value) {
  return value.toFixed(2)
}

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function EstadisticaPeriodoTable({ titulo, rows, metrica, clubActivo }) {
  const isGoles = metrica === 'goleadores'

  const total = rows.reduce((acc, row) => acc + (isGoles ? row.goles : row.asistencias), 0)

  const hayVariosClubes = new Set(rows.flatMap((row) => (row.club ? row.club.split(', ') : []))).size > 1
  const clubColors = useMemo(
    () => buildClubColorMap(rows.flatMap((row) => (row.club ? row.club.split(', ') : []))),
    [rows]
  )

  return (
    <div className="w-full">
      {titulo && (
        <h3 className="mb-2 text-center text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {titulo}
        </h3>
      )}

      {rows.length === 0 ? (
        <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
          {isGoles ? 'No hay goleadores registrados en este período.' : 'No hay asistidores registrados en este período.'}
        </p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              <table className="w-full min-w-[360px] table-fixed border-collapse text-xs md:text-sm">
                <colgroup>
                  <col className="w-[8%]" />
                  <col className="w-[32%]" />
                  <col className="w-[13%]" />
                  <col className="w-[13%]" />
                  <col className="w-[11%]" />
                  <col className="w-[11%]" />
                  <col className="w-[12%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-zinc-200 bg-gray-50 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 md:text-[11px]">
                    <th className="px-1.5 py-2 text-center md:px-3 md:py-3">Pos</th>
                    <th className="px-1.5 py-2 text-left md:px-3 md:py-3">Jugador</th>
                    <th className={NUM_TH_CLASSES}>PJ</th>
                    <th className={NUM_TH_CLASSES}>{isGoles ? 'G' : 'A'}</th>
                    <th className={COMPACT_TH_CLASSES}>x2</th>
                    <th className={COMPACT_TH_CLASSES}>x3</th>
                    <th className={NUM_TH_CLASSES}>Prom.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {rows.map((row, index) => {
                    const esClubActivo = hayVariosClubes && isActiveClub(row.club, clubActivo)
                    const x2 = isGoles ? row.x2Goles : row.x2Asistencias
                    const x3 = isGoles ? row.x3Goles : row.x3Asistencias

                    return (
                      <tr
                        key={row.nombre}
                        className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
                      >
                        <td className="px-1.5 py-2 md:px-3 md:py-3">
                          <Posicion index={index} />
                        </td>
                        <td className="break-words px-1.5 py-2 text-left md:px-3 md:py-3">
                          <div
                            className={`truncate text-xs font-bold md:text-sm ${
                              esClubActivo ? ACTIVE_CLUB_TEXT_CLASS : 'text-zinc-900 dark:text-zinc-100'
                            }`}
                            title={row.nombre}
                          >
                            {row.nombre}
                          </div>
                          <div className="truncate text-[10px] md:text-xs" title={row.club ?? ''}>
                            {row.club
                              ? row.club.split(', ').map((club, clubIndex) => (
                                  <span key={club}>
                                    {clubIndex > 0 && <span className="text-zinc-500 dark:text-zinc-500">, </span>}
                                    <span style={{ color: clubColors.get(club) }}>{club}</span>
                                  </span>
                                ))
                              : '-'}
                          </div>
                        </td>
                        <td className={`${NUM_TD_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.pj}</td>
                        <td className={`${NUM_TD_CLASSES} font-bold text-lime-600 dark:text-lime-400`}>
                          {isGoles ? row.goles : row.asistencias}
                        </td>
                        <td className={`${COMPACT_TD_CLASSES} text-zinc-600 dark:text-zinc-300`}>{x2 || '-'}</td>
                        <td className={`${COMPACT_TD_CLASSES} text-zinc-600 dark:text-zinc-300`}>{x3 || '-'}</td>
                        <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-700 dark:text-zinc-200`}>
                          {formatPromedio(isGoles ? row.promedioGoles : row.promedioAsistencias)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-zinc-200 bg-gray-50 text-[10px] font-bold uppercase text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 md:text-xs">
                    <td className="px-1.5 py-1.5 md:px-3 md:py-3" colSpan={3}>
                      Total
                    </td>
                    <td className={`${NUM_TD_CLASSES} text-lime-600 dark:text-lime-400`}>{total}</td>
                    <td className={NUM_TD_CLASSES} />
                    <td className={NUM_TD_CLASSES} />
                    <td className={NUM_TD_CLASSES} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
      )}
    </div>
  )
}

export default EstadisticaPeriodoTable
