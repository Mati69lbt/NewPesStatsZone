const FILAS = [
  { key: 'general', label: 'General' },
  { key: 'local', label: 'Local' },
  { key: 'visitante', label: 'Visitante' },
  { key: 'neutral', label: 'Neutral' },
]

function toneClasses(value) {
  if (value > 0) return 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
  if (value < 0) return 'border-rose-500 bg-rose-500/10 text-rose-400'
  return 'border-amber-500 bg-amber-500/10 text-amber-400'
}

function ToneBadge({ value }) {
  return (
    <span
      className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full border px-0.5 text-[8px] font-bold leading-none sm:h-5 sm:min-w-5 sm:text-[9px] ${toneClasses(
        value
      )}`}
    >
      {value > 0 ? `+${value}` : value}
    </span>
  )
}

function CapitanCard({ capitan, stats }) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:p-4">
      <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">{capitan}</h3>

      <table className="w-full table-fixed border-collapse text-[10px] sm:text-xs">
        <colgroup>
          <col className="w-[16%]" />
          <col className="w-[7%]" />
          <col className="w-[7%]" />
          <col className="w-[7%]" />
          <col className="w-[7%]" />
          <col className="w-[10%]" />
          <col className="w-[7%]" />
          <col className="w-[7%]" />
          <col className="w-[10%]" />
          <col className="w-[15%]" />
        </colgroup>
        <thead>
          <tr className="text-[8px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 sm:text-[9px]">
            <th className="px-1 py-1 text-left sm:py-1.5">Tipo</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">PJ</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">G</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">E</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">P</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">G/P</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">GF</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">GC</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">DIF</th>
            <th className="px-0.5 py-1 sm:px-1 sm:py-1.5">PTS/EF</th>
          </tr>
        </thead>
        <tbody>
          {FILAS.map(({ key, label }) => {
            const s = stats[key]
            const efec = s.ptsPosibles > 0 ? Math.round((s.pts / s.ptsPosibles) * 100) : 0
            return (
              <tr key={key} className="border-t border-zinc-100 text-center dark:border-zinc-700/50">
                <td className="truncate px-1 py-1 text-left font-semibold text-zinc-700 dark:text-zinc-200 sm:py-1.5">
                  {label}
                </td>
                <td className="px-0.5 py-1 text-zinc-600 dark:text-zinc-300 sm:px-1 sm:py-1.5">{s.pj}</td>
                <td className="px-0.5 py-1 text-zinc-600 dark:text-zinc-300 sm:px-1 sm:py-1.5">{s.g}</td>
                <td className="px-0.5 py-1 text-zinc-600 dark:text-zinc-300 sm:px-1 sm:py-1.5">{s.e}</td>
                <td className="px-0.5 py-1 text-zinc-600 dark:text-zinc-300 sm:px-1 sm:py-1.5">{s.p}</td>
                <td className="px-0.5 py-1 sm:px-1 sm:py-1.5">
                  <ToneBadge value={s.gp} />
                </td>
                <td className="px-0.5 py-1 text-zinc-600 dark:text-zinc-300 sm:px-1 sm:py-1.5">{s.gf}</td>
                <td className="px-0.5 py-1 text-zinc-600 dark:text-zinc-300 sm:px-1 sm:py-1.5">{s.gc}</td>
                <td className="px-0.5 py-1 sm:px-1 sm:py-1.5">
                  <ToneBadge value={s.df} />
                </td>
                <td className="px-0.5 py-1 sm:px-1 sm:py-1.5">
                  <span className="font-bold text-zinc-700 dark:text-zinc-200">
                    {s.pts}/{s.ptsPosibles}
                  </span>
                  <span className="block text-[8px] text-zinc-500 dark:text-zinc-400 sm:text-[9px]">{efec}%</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CapitanCard
