import { useMemo, useState } from 'react'
import { buildAssistsRows, buildScorersRows } from '../utils/versusStats'
import CampeonatoStatsTable from './CampeonatoStatsTable'

const TABS = [
  { value: 'goleadores', label: '⚽ Goleadores' },
  { value: 'asistencias', label: '🎯 Asistencias' },
]

function CampeonatoStatsGroup({ torneo, temporada, matches, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const [tab, setTab] = useState('goleadores')

  const goleadoresRows = useMemo(() => buildScorersRows(matches, 'incidenciasClub'), [matches])
  const asistenciasRows = useMemo(() => buildAssistsRows(matches, 'incidenciasClub'), [matches])

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-300 shadow-lg dark:border-zinc-700">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 border-b border-t-4 border-t-lime-400 border-b-zinc-200 bg-white px-4 py-3 text-left dark:border-b-zinc-700 dark:bg-zinc-800 sm:px-5 sm:py-4"
      >
        <div className="min-w-0">
          <h2 className="truncate text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-base">
            {torneo} {temporada && <span className="text-zinc-500 dark:text-zinc-400">· {temporada}</span>}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {matches.length} {matches.length === 1 ? 'partido jugado' : 'partidos jugados'}
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
        <div className="flex flex-col gap-4 bg-zinc-50 py-4 dark:bg-zinc-900">
          <div className="mx-auto flex w-full max-w-md justify-center overflow-hidden rounded-lg border border-zinc-300 px-2 dark:border-zinc-600 md:max-w-4xl">
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                  tab === value
                    ? 'bg-lime-400 text-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <CampeonatoStatsTable rows={tab === 'goleadores' ? goleadoresRows : asistenciasRows} mode={tab} />
        </div>
      )}
    </div>
  )
}

export default CampeonatoStatsGroup
