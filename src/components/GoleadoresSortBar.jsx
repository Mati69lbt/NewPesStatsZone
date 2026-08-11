import { SORT_OPTIONS } from '../utils/goleadoresSortOptions'

function GoleadoresSortBar({ sortKey, sortDir, onSort }) {
  return (
    <div className="flex w-full flex-wrap gap-1.5 sm:gap-2">
      {SORT_OPTIONS.map(({ key, label }) => {
        const active = sortKey === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSort(key)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition sm:px-3 sm:py-1.5 sm:text-xs ${
              active
                ? 'border-lime-400 bg-lime-400 text-zinc-900'
                : 'border-zinc-300 bg-white text-zinc-600 hover:border-lime-400 hover:text-lime-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-lime-400'
            }`}
          >
            {label}
            {active && <span className="text-[10px]">{sortDir === 'desc' ? '↓' : '↑'}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default GoleadoresSortBar
