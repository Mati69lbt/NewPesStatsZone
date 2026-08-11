function getBadgeClasses(value) {
  if (value > 0) return 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
  if (value < 0) return 'border-rose-500 bg-rose-500/10 text-rose-400'
  return 'border-amber-500 bg-amber-500/10 text-amber-400'
}

function StatBadge({ value }) {
  return (
    <span
      className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full border px-1.5 text-xs font-bold ${getBadgeClasses(
        value
      )}`}
    >
      {value > 0 ? `+${value}` : value}
    </span>
  )
}

function StatMini({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
      <span className="text-xs font-bold text-zinc-200">{value}</span>
    </div>
  )
}

function ClubCard({ row, index }) {
  return (
    <div className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex-shrink-0 text-sm font-black text-zinc-500">{index + 1}</span>
          <div className="min-w-0">
            <p className="truncate font-bold text-zinc-100">{row.club}</p>
            <p className="text-xs text-zinc-500">{row.temporada}</p>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-sm font-bold text-emerald-400">
            {row.pts} / {row.ptsPosibles}
          </p>
          <p className="text-[10px] font-semibold text-zinc-500">{row.pct}%</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 border-t border-zinc-800 pt-3">
        <StatMini label="PJ" value={row.pj} />
        <StatMini label="G" value={row.g} />
        <StatMini label="E" value={row.e} />
        <StatMini label="P" value={row.p} />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 border-t border-zinc-800 pt-3">
        <StatMini label="GF" value={row.gf} />
        <StatMini label="GC" value={row.gc} />
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">G/P</span>
          <StatBadge value={row.gp} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">DIF</span>
          <StatBadge value={row.df} />
        </div>
      </div>
    </div>
  )
}

function ClubesTable({ rows }) {
  if (rows.length === 0) {
    return (
      <p className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        No hay clubes registrados todavía.
      </p>
    )
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3 sm:hidden">
        {rows.map((row, index) => (
          <ClubCard key={row.key} row={row} index={index} />
        ))}
      </div>

      <div className="hidden w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Club</th>
                <th className="px-2 py-3 text-center">PJ</th>
                <th className="px-2 py-3 text-center">G</th>
                <th className="px-2 py-3 text-center">E</th>
                <th className="px-2 py-3 text-center">P</th>
                <th className="px-2 py-3 text-center">G/P</th>
                <th className="px-2 py-3 text-center">GF</th>
                <th className="px-2 py-3 text-center">GC</th>
                <th className="px-2 py-3 text-center">DIF</th>
                <th className="px-3 py-3 text-center">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rows.map((row, index) => (
                <tr
                  key={row.key}
                  className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
                >
                  <td className="px-3 py-3 text-sm font-black text-zinc-500">{index + 1}</td>
                  <td className="px-3 py-3">
                    <p className="font-bold text-zinc-100">{row.club}</p>
                    <p className="text-xs text-zinc-500">{row.temporada}</p>
                  </td>
                  <td className="px-2 py-3 text-center font-semibold text-zinc-200">{row.pj}</td>
                  <td className="px-2 py-3 text-center text-zinc-300">{row.g}</td>
                  <td className="px-2 py-3 text-center text-zinc-300">{row.e}</td>
                  <td className="px-2 py-3 text-center text-zinc-300">{row.p}</td>
                  <td className="px-2 py-3 text-center">
                    <StatBadge value={row.gp} />
                  </td>
                  <td className="px-2 py-3 text-center text-zinc-300">{row.gf}</td>
                  <td className="px-2 py-3 text-center text-zinc-300">{row.gc}</td>
                  <td className="px-2 py-3 text-center">
                    <StatBadge value={row.df} />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <p className="text-sm font-bold text-emerald-400">
                      {row.pts} / {row.ptsPosibles}
                    </p>
                    <p className="text-[10px] font-semibold text-zinc-500">{row.pct}%</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ClubesTable
