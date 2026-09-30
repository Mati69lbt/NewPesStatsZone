import { useMemo, useState } from 'react'
import { buildAssistsRows, buildScorersRows } from '../utils/versusStats'
import CampeonatoStatsTable from './CampeonatoStatsTable'

function CampeonatoStatsGroup({ torneo, temporada, matches, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  const goleadoresRows = useMemo(() => buildScorersRows(matches, 'incidenciasClub'), [matches])
  const asistenciasRows = useMemo(() => buildAssistsRows(matches, 'incidenciasClub'), [matches])

  const golesTotales = useMemo(() => goleadoresRows.reduce((acc, row) => acc + (row.goles || 0), 0), [goleadoresRows])
  const asistenciasTotales = useMemo(
    () => asistenciasRows.reduce((acc, row) => acc + (row.asistencias || 0), 0),
    [asistenciasRows]
  )
  const promedioGoles = matches.length > 0 ? golesTotales / matches.length : 0

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-300 shadow-lg dark:border-zinc-700">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 border-b border-t-4 border-t-lime-400 border-b-zinc-200 bg-white px-4 py-3 text-left dark:border-b-zinc-700 dark:bg-zinc-800 sm:px-5 sm:py-4"
      >
        <div className="min-w-0">
          <h2 className="whitespace-normal break-words text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-base">
            {torneo} {temporada && <span className="text-zinc-500 dark:text-zinc-400">· {temporada}</span>}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {matches.length} {matches.length === 1 ? 'partido' : 'partidos'} - {golesTotales} goles - {asistenciasTotales} asistencias -{' '}
            {promedioGoles.toFixed(2)} prom. goles
          </p>
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform ${open ? '' : '-rotate-90'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="grid grid-cols-1 gap-4 bg-zinc-50 p-4 dark:bg-zinc-900 md:grid-cols-2">
          <CampeonatoStatsTable rows={goleadoresRows} mode="goleadores" />
          <CampeonatoStatsTable rows={asistenciasRows} mode="asistencias" />
        </div>
      )}
    </div>
  )
}

export default CampeonatoStatsGroup
