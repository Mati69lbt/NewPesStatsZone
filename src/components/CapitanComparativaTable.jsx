const METRICS = [
  { key: 'pj', label: 'PJ', compare: null, value: (row) => row.pj, format: (row) => row.pj },
  { key: 'g', label: 'Ganados', compare: 'high', value: (row) => row.g, format: (row) => row.g },
  { key: 'e', label: 'Empatados', compare: null, value: (row) => row.e, format: (row) => row.e },
  { key: 'p', label: 'Perdidos', compare: 'low', value: (row) => row.p, format: (row) => row.p },
  { key: 'gf', label: 'Goles a Favor', compare: 'high', value: (row) => row.gf, format: (row) => row.gf },
  { key: 'gc', label: 'Goles en Contra', compare: 'low', value: (row) => row.gc, format: (row) => row.gc },
  {
    key: 'pts',
    label: 'Puntos',
    compare: 'high',
    value: (row) => row.pts,
    format: (row) => `${row.pts}/${row.ptsPosibles}`,
  },
  {
    key: 'pct',
    label: 'Efectividad',
    compare: 'high',
    value: (row) => row.pct,
    format: (row) => `${row.pct}%`,
    diffSuffix: 'pp',
  },
  {
    key: 'promGf',
    label: 'Promedio GF',
    compare: 'high',
    value: (row) => row.promGf,
    format: (row) => row.promGf.toFixed(2),
    decimals: 2,
  },
  {
    key: 'promGc',
    label: 'Promedio GC',
    compare: 'low',
    value: (row) => row.promGc,
    format: (row) => row.promGc.toFixed(2),
    decimals: 2,
  },
]

const WINNER_CLASSES = 'text-lime-400 font-extrabold'
const NEUTRAL_CLASSES = 'text-zinc-300 font-medium'

function getWinner(valueA, valueB, compare) {
  if (!compare || valueA === valueB) return null
  if (compare === 'high') return valueA > valueB ? 'a' : 'b'
  return valueA < valueB ? 'a' : 'b'
}

function formatDiff(diff, { decimals = 0, diffSuffix = '' }) {
  const rounded = decimals > 0 ? Number(diff.toFixed(decimals)) : Math.round(diff)
  const text = decimals > 0 ? Math.abs(rounded).toFixed(decimals) : Math.abs(rounded)
  if (rounded === 0) return `=`
  const sign = rounded > 0 ? '+' : '−'
  return `${sign}${text}${diffSuffix}`
}

function CapitanComparativaTable({ capitanA, statsA, capitanB, statsB }) {
  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
      <table className="w-full table-fixed border-collapse text-[11px] sm:text-sm">
        <colgroup>
          <col className="w-[30%]" />
          <col className="w-[28%]" />
          <col className="w-[14%]" />
          <col className="w-[28%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-zinc-700 bg-zinc-800 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-300 sm:text-xs">
            <th className="px-1.5 py-2 text-left text-[9px] text-zinc-500 sm:px-3 sm:text-[10px]">Métrica</th>
            <th className="truncate px-1 py-2 text-zinc-100 sm:px-3">{capitanA}</th>
            <th className="px-1 py-2 text-[9px] text-zinc-500 sm:px-2 sm:text-[10px]">DIF.</th>
            <th className="truncate px-1 py-2 text-zinc-100 sm:px-3">{capitanB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {METRICS.map((metric, index) => {
            const { key, label, compare, value, format, decimals, diffSuffix } = metric
            const valueA = value(statsA)
            const valueB = value(statsB)
            const winner = getWinner(valueA, valueB, compare)
            const diff = valueA - valueB

            return (
              <tr key={key} className={index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}>
                <td className="truncate px-1.5 py-2 text-[9px] font-semibold uppercase tracking-wide text-zinc-500 sm:px-3 sm:text-[11px]">
                  {label}
                </td>
                <td className={`px-1 py-2 text-center ${winner === 'a' ? WINNER_CLASSES : NEUTRAL_CLASSES}`}>
                  {format(statsA)}
                </td>
                <td
                  className={`px-1 py-2 text-center text-[10px] font-bold sm:text-xs ${
                    winner === 'a' ? 'text-lime-400' : winner === 'b' ? 'text-rose-400' : 'text-zinc-500'
                  }`}
                >
                  {formatDiff(diff, { decimals, diffSuffix })}
                </td>
                <td className={`px-1 py-2 text-center ${winner === 'b' ? WINNER_CLASSES : NEUTRAL_CLASSES}`}>
                  {format(statsB)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CapitanComparativaTable
