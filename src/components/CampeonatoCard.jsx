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
      className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border text-[9px] font-bold sm:h-6 sm:w-6 sm:text-[10px] ${getBadgeClasses(
        value
      )}`}
    >
      {value > 0 ? `+${value}` : value}
    </span>
  )
}

const CONDICIONES = [
  { key: 'general', label: 'General', filter: () => true },
  { key: 'local', label: 'Local', filter: (m) => m.condicion === 'local' },
  { key: 'visitante', label: 'Visitante', filter: (m) => m.condicion === 'visitante' },
]

function CampeonatoCard({ torneo, temporada, matches }) {
  const rows = CONDICIONES.map(({ key, label, filter }) => {
    const filtered = key === 'general' ? matches : matches.filter(filter)
    const stats = computeStats(filtered)
    return { key, label, stats, pct: calcPct(stats) }
  }).filter((row) => row.key === 'general' || row.stats.pj > 0)

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <div className="border-b border-t-4 border-t-lime-400 border-b-zinc-700 bg-zinc-800 px-3 py-3 sm:px-4">
        <h3 className="truncate text-sm font-black text-zinc-100 sm:text-base">{torneo}</h3>
        <p className="text-xs font-semibold text-zinc-400">{temporada}</p>
      </div>

      <table className="w-full table-fixed border-collapse text-[10px] sm:text-xs">
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800/60 text-left font-bold uppercase tracking-wide text-zinc-400">
            <th className="w-15 whitespace-nowrap px-1 py-2 pr-4 text-left sm:w-[37.5] sm:px-2 sm:pr-8">Cond.</th>
            <th className="px-1 py-2 text-center sm:px-2">PJ</th>
            <th className="px-1 py-2 text-center sm:px-2">G</th>
            <th className="px-1 py-2 text-center sm:px-2">E</th>
            <th className="px-1 py-2 text-center sm:px-2">P</th>
            <th className="px-1 py-2 text-center sm:px-2">G/P</th>
            <th className="px-1 py-2 text-center sm:px-2">GF</th>
            <th className="px-1 py-2 text-center sm:px-2">GC</th>
            <th className="px-1 py-2 text-center sm:px-2">DF</th>
            <th className="px-1 py-2 text-center sm:px-2">%</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {rows.map((row) => (
            <tr key={row.key} className="text-zinc-300">
              <td className="w-15 whitespace-nowrap px-1 py-2 pr-4 text-left font-bold text-zinc-100 sm:w-[150px] sm:px-2 sm:pr-8">{row.label}</td>
              <td className="px-1 py-2 text-center font-semibold text-zinc-200 sm:px-2">{row.stats.pj}</td>
              <td className="px-1 py-2 text-center sm:px-2">{row.stats.g}</td>
              <td className="px-1 py-2 text-center sm:px-2">{row.stats.e}</td>
              <td className="px-1 py-2 text-center sm:px-2">{row.stats.p}</td>
              <td className="px-1 py-2 text-center sm:px-2">
                <div className="flex justify-center">
                  <StatBadge value={row.stats.gp} />
                </div>
              </td>
              <td className="px-1 py-2 text-center sm:px-2">{row.stats.gf}</td>
              <td className="px-1 py-2 text-center sm:px-2">{row.stats.gc}</td>
              <td className="px-1 py-2 text-center sm:px-2">
                <div className="flex justify-center">
                  <StatBadge value={row.stats.df} />
                </div>
              </td>
              <td className="px-1 py-2 text-center sm:px-2">
                <p className="font-bold text-emerald-400">
                  {row.stats.pts}/{row.stats.ptsPosibles}
                </p>
                <p className="text-[9px] font-semibold text-zinc-500">{row.pct}%</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CampeonatoCard
