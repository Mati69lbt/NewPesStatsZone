import { useMemo } from 'react'
import { buildClubColorMap } from '../utils/clubColors'
import { ACTIVE_CLUB_TEXT_CLASS, isActiveClub } from '../utils/activeClub'

const TH_CLASSES =
  'whitespace-nowrap px-1 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:px-3 md:py-3 md:text-[11px]'
const TH_NUM_CLASSES = `${TH_CLASSES} text-center`
const TD_CLASSES = 'px-1 py-2 text-xs text-zinc-600 dark:text-zinc-300 md:px-3 md:py-3 md:text-sm'
const TD_BASE_CLASSES = 'px-1 py-2 text-xs md:px-3 md:py-3 md:text-sm'
const TD_NUM_CLASSES = `${TD_CLASSES} text-center whitespace-nowrap`

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

function HighlightBadge({ value, colorClass }) {
  return (
    <span
      className={`inline-flex min-w-[1.8em] items-center justify-center rounded-md bg-zinc-900/5 px-1.5 py-0.5 text-sm font-black dark:bg-white/10 md:text-base ${colorClass}`}
    >
      {value}
    </span>
  )
}

function GoleadoresHistoricoTable({
  rows,
  valueKey = 'goles',
  valueLabel = 'G',
  promedioKey = 'promedio',
  highlightColumn = 'value',
  highlightColorClass = 'text-lime-600 dark:text-lime-400',
  clubActivo,
  showGoalBreakdown = valueKey === 'goles',
}) {
  const clubColors = useMemo(
    () => buildClubColorMap(rows.flatMap((row) => (row.club ? row.club.split(', ') : []))),
    [rows]
  )

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        No hay datos registrados para esta selección.
      </p>
    )
  }

  const valueHighlight = highlightColumn === 'value'
  const pjHighlight = highlightColumn === 'pj'
  const promedioHighlight = highlightColumn === 'promedio'

  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto w-fit overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <table className="table-fixed border-collapse text-xs md:text-sm">
          <colgroup>
            <col className="w-9 md:w-12" />
            <col className="w-14 md:w-16" />
            <col className="w-28 md:w-40" />
            <col className="w-12 md:w-16" />
            <col className="w-10 md:w-14" />
            {showGoalBreakdown && <col className="w-10 md:w-14" />}
            {showGoalBreakdown && <col className="w-10 md:w-14" />}
            <col className="w-12 md:w-16" />
          </colgroup>
          <thead>
            <tr className="border-b border-zinc-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800">
              <th className={`${TH_CLASSES} text-center`}>Pos</th>
              <th className={`${TH_NUM_CLASSES} ${valueHighlight ? `text-sm md:text-base ${highlightColorClass}` : ''}`}>{valueLabel}</th>
              <th className={TH_CLASSES}>Jugador</th>
              <th className={`${TH_CLASSES} text-center`}>Año</th>
              <th className={`${TH_NUM_CLASSES} ${pjHighlight ? `text-sm md:text-base ${highlightColorClass}` : ''}`}>PJ</th>
              {showGoalBreakdown && <th className={TH_NUM_CLASSES}>Dob</th>}
              {showGoalBreakdown && <th className={TH_NUM_CLASSES}>Tri</th>}
              <th className={`${TH_NUM_CLASSES} ${promedioHighlight ? `text-sm md:text-base ${highlightColorClass}` : ''}`}>Prom.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map((row, index) => {
              const esClubActivo = isActiveClub(row.club, clubActivo)

              return (
                <tr
                  key={`${row.nombre}-${row.periodo}`}
                  className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
                >
                  <td className={`${TD_CLASSES} text-center`}>
                    <Posicion index={index} />
                  </td>
                  <td className={`${TD_NUM_CLASSES} ${valueHighlight ? '' : 'font-bold'}`}>
                    {valueHighlight ? (
                      <HighlightBadge value={row[valueKey]} colorClass={highlightColorClass} />
                    ) : (
                      <span className="text-zinc-700 dark:text-zinc-200">{row[valueKey]}</span>
                    )}
                  </td>
                  <td
                    className={`${TD_BASE_CLASSES} break-words font-bold ${
                      esClubActivo ? ACTIVE_CLUB_TEXT_CLASS : 'text-zinc-900 dark:text-zinc-100'
                    }`}
                  >
                    {row.nombre}
                    {row.club && (
                      <span className="block truncate text-[10px] font-normal">
                        {row.club.split(', ').map((club, clubIndex) => (
                          <span key={club}>
                            {clubIndex > 0 && <span className="text-zinc-500 dark:text-zinc-500">, </span>}
                            <span style={{ color: clubColors.get(club) }}>{club}</span>
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td className={`${TD_CLASSES} whitespace-nowrap text-center text-zinc-500 dark:text-zinc-400`}>{row.periodo}</td>
                  <td className={`${TD_NUM_CLASSES} ${pjHighlight ? '' : 'font-semibold text-zinc-600 dark:text-zinc-300'}`}>
                    {pjHighlight ? <HighlightBadge value={row.pj} colorClass={highlightColorClass} /> : row.pj}
                  </td>
                  {showGoalBreakdown && (
                    <td className={`${TD_NUM_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.dobletes || '-'}</td>
                  )}
                  {showGoalBreakdown && (
                    <td className={`${TD_NUM_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.hattricks || '-'}</td>
                  )}
                  <td className={`${TD_NUM_CLASSES} ${promedioHighlight ? '' : 'font-semibold text-zinc-700 dark:text-zinc-200'}`}>
                    {promedioHighlight ? (
                      <HighlightBadge value={formatPromedio(row[promedioKey])} colorClass={highlightColorClass} />
                    ) : (
                      formatPromedio(row[promedioKey])
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GoleadoresHistoricoTable
