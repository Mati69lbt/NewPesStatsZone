import { useState } from 'react'
import TablaResumenRow, { TablaResumenHeader } from './TablaResumenRow'
import { buildRecordPersonalRows } from '../utils/recordPersonalStats'

function CampeonatoCard({ torneo, temporada, matches }) {
  const [open, setOpen] = useState(false)

  const rows = buildRecordPersonalRows(matches).filter(
    (row) => row.condicion === 'general' || row.metrics.pj > 0
  )

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 border-b border-t-4 border-t-lime-400 border-b-zinc-700 bg-zinc-800 px-3 py-3 text-left sm:px-4"
      >
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black text-zinc-100 sm:text-base">{torneo}</h3>
          <p className="text-xs font-semibold text-zinc-400">
            Temporada: {temporada} - {matches.length} {matches.length === 1 ? 'Partido' : 'Partidos'}
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
        <div className="flex flex-col gap-4 bg-zinc-900 p-3 sm:gap-2 sm:p-4">
          <TablaResumenHeader />
          {rows.map((row) => (
            <TablaResumenRow key={row.condicion} row={row} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CampeonatoCard
