import { useMemo, useState } from 'react'
import { buildJugadoresRows } from '../utils/periodoStats'
import EstadisticaPeriodoTable from './EstadisticaPeriodoTable'

function EstadisticaPeriodoGroup({ periodo, matches, metrica, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const rows = useMemo(() => buildJugadoresRows(matches, metrica), [matches, metrica])

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
            {periodo}
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
        <div className="bg-zinc-50 px-2 py-4 dark:bg-zinc-900 sm:px-4">
          <EstadisticaPeriodoTable rows={rows} metrica={metrica} />
        </div>
      )}
    </div>
  )
}

export default EstadisticaPeriodoGroup
