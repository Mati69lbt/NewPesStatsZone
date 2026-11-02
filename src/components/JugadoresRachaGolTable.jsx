import { useMemo } from 'react'
import { diffDays, formatDateDisplay, formatDuracionDias } from '../utils/dateFormat'
import { buildClubColorMap } from '../utils/clubColors'
import { ACTIVE_CLUB_TEXT_CLASS } from '../utils/activeClub'

const NUM_TH_CLASSES = 'w-14 px-1 py-2 text-center md:w-16 md:px-2 md:py-3'
const NUM_TD_CLASSES = 'w-14 px-1 py-2 text-center text-xs md:w-16 md:px-2 md:py-3 md:text-sm'

function DuracionBadge({ dias }) {
  const { desglose, total } = formatDuracionDias(dias)
  return (
    <span className="inline-flex flex-col items-start gap-0.5 whitespace-nowrap rounded bg-zinc-200 px-2 py-1 leading-tight dark:bg-zinc-700">
      <span className="text-xs font-bold text-zinc-900 dark:text-white">{desglose}</span>
      {total !== '' && (
        <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">- {total}</span>
      )}
    </span>
  )
}

function PeriodoCell({ fechaInicio, fechaFin }) {
  return (
    <td className="w-24 px-1.5 py-2 text-left md:w-28 md:px-3 md:py-3">
      <span className="flex flex-col items-start whitespace-nowrap text-[10px] leading-tight text-zinc-500 dark:text-zinc-400 md:text-xs">
        <span>{formatDateDisplay(fechaInicio)} →</span>
        <span>{formatDateDisplay(fechaFin)}</span>
      </span>
    </td>
  )
}

function DiasCell({ fechaInicio, fechaFin }) {
  const dias = diffDays(fechaInicio, fechaFin)
  return (
    <td className="w-24 px-1.5 py-2 text-center md:w-28 md:px-3 md:py-3">
      <DuracionBadge dias={dias} />
    </td>
  )
}

function JugadoresRachaGolTable({ rows, clubActivo }) {
  const clubColors = useMemo(() => buildClubColorMap(rows.map((row) => row.club)), [rows])

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Sin jugadores en racha goleadora (2+ partidos consecutivos anotando).
      </p>
    )
  }

  return (
    <div className="mx-auto w-max max-w-full overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <table className="w-max max-w-full table-fixed border-collapse text-xs md:text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-gray-50 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 md:text-[11px]">
            <th className="w-9 px-1.5 py-2 text-center md:w-10 md:px-3 md:py-3">#</th>
            <th className="w-32 px-1.5 py-2 text-left md:w-44 md:px-3 md:py-3">Jugador</th>
            <th className={NUM_TH_CLASSES}>Racha</th>
            <th className={NUM_TH_CLASSES}>Goles</th>
            <th className="w-24 px-1.5 py-2 text-left md:w-28 md:px-3 md:py-3">Período</th>
            <th className="w-24 px-1.5 py-2 text-center md:w-28 md:px-3 md:py-3">Días</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {rows.map((row, index) => {
            const esClubActivo = Boolean(clubActivo) && row.club === clubActivo

            return (
            <tr
              key={`${row.club}-${row.nombre}`}
              className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
            >
              <td className="w-9 px-1.5 py-2 text-center text-xs font-bold text-zinc-500 dark:text-zinc-400 md:w-10 md:px-3 md:py-3 md:text-sm">
                {index + 1}
              </td>
              <td className="break-words px-1.5 py-2 text-left md:px-3 md:py-3">
                <span
                  className={`block text-xs font-bold md:text-sm ${
                    esClubActivo ? ACTIVE_CLUB_TEXT_CLASS : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {row.nombre}
                </span>
                {row.club && (
                  <span
                    className="block truncate text-[10px] font-semibold md:text-xs"
                    style={{ color: clubColors.get(row.club) }}
                  >
                    {row.club}
                  </span>
                )}
              </td>
              <td className={`${NUM_TD_CLASSES} font-black text-lime-600 dark:text-lime-400`}>{row.partidos}</td>
              <td className={`${NUM_TD_CLASSES} font-black text-zinc-700 dark:text-zinc-200`}>{row.goles}</td>
              <PeriodoCell fechaInicio={row.fechaInicio} fechaFin={row.fechaFin} />
              <DiasCell fechaInicio={row.fechaInicio} fechaFin={row.fechaFin} />
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default JugadoresRachaGolTable
