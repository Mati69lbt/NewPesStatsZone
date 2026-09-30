function getBadgeClasses(value) {
  if (value > 0) return 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
  if (value < 0) return 'border-rose-500 bg-rose-500/10 text-rose-400'
  return 'border-amber-500 bg-amber-500/10 text-amber-400'
}

function StatBadge({ value }) {
  return (
    <span
      className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full border px-1 text-[10px] font-bold ${getBadgeClasses(
        value
      )}`}
    >
      {value > 0 ? `+${value}` : value}
    </span>
  )
}

function CapitanesResumenTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        No hay capitanes registrados todavía.
      </p>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-max min-w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[9px] font-bold uppercase tracking-wide text-zinc-400">
                <th className="px-1.5 py-1.5">Capitán</th>
                <th className="px-1 py-1.5 text-center">PJ</th>
                <th className="px-1 py-1.5 text-center">G</th>
                <th className="px-1 py-1.5 text-center">E</th>
                <th className="px-1 py-1.5 text-center">P</th>
                <th className="px-1 py-1.5 text-center">G/P</th>
                <th className="px-1 py-1.5 text-center">GF</th>
                <th className="px-1 py-1.5 text-center">GC</th>
                <th className="px-1 py-1.5 text-center">DIF</th>
                <th className="px-1.5 py-1.5 text-center">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rows.map((row, index) => (
                <tr
                  key={row.key}
                  className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
                >
                  <td className="px-1.5 py-1.5">
                    <p className="font-bold text-zinc-100">
                      {index + 1} - {row.capitan}
                    </p>
                    <p className="text-[9px] text-zinc-500">{row.club || 'Sin club'}</p>
                    <p className="text-[8px] text-zinc-600">{row.years || '—'}</p>
                  </td>
                  <td className="px-1 py-1.5 text-center font-semibold text-zinc-200">{row.pj}</td>
                  <td className="px-1 py-1.5 text-center text-zinc-300">{row.g}</td>
                  <td className="px-1 py-1.5 text-center text-zinc-300">{row.e}</td>
                  <td className="px-1 py-1.5 text-center text-zinc-300">{row.p}</td>
                  <td className="px-1 py-1.5 text-center">
                    <StatBadge value={row.gp} />
                  </td>
                  <td className="px-1 py-1.5 text-center text-zinc-300">{row.gf}</td>
                  <td className="px-1 py-1.5 text-center text-zinc-300">{row.gc}</td>
                  <td className="px-1 py-1.5 text-center">
                    <StatBadge value={row.df} />
                  </td>
                  <td className="px-1.5 py-1.5 text-center">
                    <p className="text-xs font-bold text-emerald-400">
                      {row.pts} / {row.ptsPosibles}
                    </p>
                    <p className="text-[9px] font-semibold text-zinc-500">{row.pct}%</p>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default CapitanesResumenTable
