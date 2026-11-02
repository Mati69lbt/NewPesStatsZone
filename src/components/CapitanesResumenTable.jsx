import { useMemo } from 'react'
import { buildClubColorMap } from '../utils/clubColors'

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

const HIGHLIGHT_CLASSES = 'text-amber-400'

function CapitanesResumenTable({ rows, sortKey }) {
  if (rows.length === 0) {
    return (
      <p className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        No hay capitanes registrados todavía.
      </p>
    )
  }

  const isActive = (key) => sortKey === key
  const clubColors = useMemo(() => buildClubColorMap(rows.map((row) => row.club)), [rows])

  return (
    <div className="mx-auto w-fit max-w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-auto border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[9px] font-bold uppercase tracking-wide text-zinc-400">
                <th className="px-2 py-1.5">Capitán</th>
                <th className={`px-1 py-1.5 text-center ${isActive('pj') ? HIGHLIGHT_CLASSES : ''}`}>PJ</th>
                <th className={`px-1 py-1.5 text-center ${isActive('g') ? HIGHLIGHT_CLASSES : ''}`}>G</th>
                <th className={`px-1 py-1.5 text-center ${isActive('e') ? HIGHLIGHT_CLASSES : ''}`}>E</th>
                <th className={`px-1 py-1.5 text-center ${isActive('p') ? HIGHLIGHT_CLASSES : ''}`}>P</th>
                <th className="px-1 py-1.5 text-center">G/P</th>
                <th className={`px-1 py-1.5 text-center ${isActive('gf') ? HIGHLIGHT_CLASSES : ''}`}>GF</th>
                <th className={`px-1 py-1.5 text-center ${isActive('gc') ? HIGHLIGHT_CLASSES : ''}`}>GC</th>
                <th className="px-1 py-1.5 text-center">DIF</th>
                <th className="px-1 py-1.5 text-center">%</th>
                <th className="px-2 py-1.5 text-center">Prom GF/GC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rows.map((row, index) => (
                <tr
                  key={row.key}
                  className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
                >
                  <td className="px-2 py-1.5">
                    <p className="font-bold text-zinc-100">
                      {index + 1} - {row.capitan}
                    </p>
                    {row.club ? (
                    <p
                      className="inline-block rounded px-1 py-0.5 text-[9px] font-semibold"
                      style={{ color: clubColors.get(row.club), backgroundColor: `${clubColors.get(row.club)}1a` }}
                    >
                      {row.club}
                    </p>
                  ) : (
                    <p className="text-[9px] text-zinc-500">Sin club</p>
                  )}
                    <p className="text-[8px] text-zinc-600">{row.years || '—'}</p>
                  </td>
                  <td
                    className={`px-1 py-1.5 text-center font-semibold ${
                      isActive('pj') ? HIGHLIGHT_CLASSES : 'text-zinc-200'
                    }`}
                  >
                    {row.pj}
                  </td>
                  <td className={`px-1 py-1.5 text-center ${isActive('g') ? HIGHLIGHT_CLASSES : 'text-zinc-300'}`}>
                    {row.g}
                  </td>
                  <td className={`px-1 py-1.5 text-center ${isActive('e') ? HIGHLIGHT_CLASSES : 'text-zinc-300'}`}>
                    {row.e}
                  </td>
                  <td className={`px-1 py-1.5 text-center ${isActive('p') ? HIGHLIGHT_CLASSES : 'text-zinc-300'}`}>
                    {row.p}
                  </td>
                  <td className="px-1 py-1.5 text-center">
                    <StatBadge value={row.gp} />
                  </td>
                  <td className={`px-1 py-1.5 text-center ${isActive('gf') ? HIGHLIGHT_CLASSES : 'text-zinc-300'}`}>
                    {row.gf}
                  </td>
                  <td className={`px-1 py-1.5 text-center ${isActive('gc') ? HIGHLIGHT_CLASSES : 'text-zinc-300'}`}>
                    {row.gc}
                  </td>
                  <td className="px-1 py-1.5 text-center">
                    <StatBadge value={row.df} />
                  </td>
                  <td className="px-1 py-1.5 text-center">
                    <p className="text-xs font-bold text-emerald-400">
                      {row.pts} / {row.ptsPosibles}
                    </p>
                    <p
                      className={`text-[9px] font-semibold ${
                        isActive('pct') ? HIGHLIGHT_CLASSES : 'text-zinc-500'
                      }`}
                    >
                      {row.pct}%
                    </p>
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <p className={isActive('promGf') ? HIGHLIGHT_CLASSES : 'text-emerald-400'}>
                      {row.promGf.toFixed(2)}
                    </p>
                    <p className={isActive('promGc') ? HIGHLIGHT_CLASSES : 'text-rose-400'}>
                      {row.promGc.toFixed(2)}
                    </p>
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
