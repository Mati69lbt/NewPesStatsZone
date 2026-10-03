import { useState } from 'react'
import { computeStats } from '../utils/versusStats'

function calcPct(stats) {
  return stats.ptsPosibles > 0 ? Math.round((stats.pts / stats.ptsPosibles) * 100) : 0
}

function getBadgeClasses(value) {
  if (value > 0) return 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
  if (value < 0) return 'border-rose-500 bg-rose-500/10 text-rose-400'
  return 'border-amber-500 bg-amber-500/10 text-amber-400'
}

function StatBadge({ value }) {
  return (
    <span
      className={`inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-bold sm:h-7 sm:w-7 sm:text-xs ${getBadgeClasses(
        value
      )}`}
    >
      {Math.abs(value)}
    </span>
  )
}

const CONDICIONES = [
  { key: 'general', label: 'General', filter: () => true },
  { key: 'local', label: 'Local', filter: (m) => m.condicion === 'local' },
  { key: 'visitante', label: 'Visitante', filter: (m) => m.condicion === 'visitante' },
]

function CampeonatoCard({ torneo, temporada, matches }) {
  const [open, setOpen] = useState(false)

  const rows = CONDICIONES.map(({ key, label, filter }) => {
    const filtered = key === 'general' ? matches : matches.filter(filter)
    const stats = computeStats(filtered)
    return { key, label, stats, pct: calcPct(stats) }
  }).filter((row) => row.key === 'general' || row.stats.pj > 0)

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
        <table className="w-full table-fixed border-collapse text-[11px] sm:text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800/60 text-left font-bold uppercase tracking-wide text-zinc-400">
              <th className="w-12 whitespace-nowrap px-1 py-2 text-left sm:w-16 sm:px-1.5">Cond.</th>
              <th className="px-0.5 py-2 text-center sm:px-1">PJ</th>
              <th className="px-px py-2 text-center sm:px-0.5">G</th>
              <th className="px-px py-2 text-center sm:px-0.5">E</th>
              <th className="px-px py-2 text-center sm:px-0.5">P</th>
              <th className="px-0.5 py-2 text-center sm:px-1">G/P</th>
              <th className="px-0.5 py-2 text-center sm:px-1">GF</th>
              <th className="px-0.5 py-2 text-center sm:px-1">GC</th>
              <th className="px-0.5 py-2 text-center sm:px-1">DF</th>
              <th className="w-10 px-0.5 py-2 text-center sm:w-12 sm:px-1">%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {rows.map((row) => (
              <tr key={row.key} className="text-zinc-300">
                <td className="whitespace-nowrap px-1 py-2 text-left font-bold text-zinc-100 sm:px-1.5">{row.label}</td>
                <td className="px-0.5 py-2 text-center font-semibold text-zinc-200 sm:px-1">{row.stats.pj}</td>
                <td className="px-px py-2 text-center sm:px-0.5">{row.stats.g}</td>
                <td className="px-px py-2 text-center sm:px-0.5">{row.stats.e}</td>
                <td className="px-px py-2 text-center sm:px-0.5">{row.stats.p}</td>
                <td className="px-0.5 py-2 text-center sm:px-1">
                  <div className="flex justify-center">
                    <StatBadge value={row.stats.gp} />
                  </div>
                </td>
                <td className="px-0.5 py-2 text-center sm:px-1">{row.stats.gf}</td>
                <td className="px-0.5 py-2 text-center sm:px-1">{row.stats.gc}</td>
                <td className="px-0.5 py-2 text-center sm:px-1">
                  <div className="flex justify-center">
                    <StatBadge value={row.stats.df} />
                  </div>
                </td>
                <td className="whitespace-nowrap px-0.5 py-2 text-center sm:px-1">
                  <p className="font-bold text-emerald-400">
                    {row.stats.pts}/{row.stats.ptsPosibles}
                  </p>
                  <p className="text-[10px] font-semibold text-zinc-500 sm:text-xs">{row.pct}%</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CampeonatoCard
