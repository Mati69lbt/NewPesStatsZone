import { useMemo } from 'react'
import { buildClubColorMap } from '../utils/clubColors'

function signClasses(value) {
  if (value > 0) return 'text-emerald-400'
  if (value < 0) return 'text-rose-400'
  return 'text-amber-400'
}

const HIGHLIGHT_CLASSES = 'text-amber-400'

const METRICA_CLASSES = {
  pj: 'text-orange-400',
  g: 'text-lime-400',
  e: 'text-amber-400',
  p: 'text-rose-400',
  gf: 'text-sky-400',
  gc: 'text-red-400',
}

function StatMini({ label, value, active, colorClass }) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-0.5">
      <span
        className={`text-[9px] font-semibold uppercase tracking-wider ${active ? HIGHLIGHT_CLASSES : 'text-zinc-500'}`}
      >
        {label}
      </span>
      <span className={`flex h-6 items-center justify-center text-xs font-bold ${colorClass}`}>{value}</span>
    </div>
  )
}

function SignStat({ label, value, active }) {
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-0.5">
      <span
        className={`text-[9px] font-semibold uppercase tracking-wider ${active ? HIGHLIGHT_CLASSES : 'text-zinc-500'}`}
      >
        {label}
      </span>
      <span className={`flex h-6 items-center justify-center text-xs font-bold ${signClasses(value)}`}>
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  )
}

function formatProm(value) {
  return value.toFixed(2)
}

function PromGfGc({ promGf, promGc, highlightGf, highlightGc }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold">
      <span className={highlightGf ? HIGHLIGHT_CLASSES : 'text-emerald-400'}>{formatProm(promGf)}</span>
      <span className="text-zinc-600">/</span>
      <span className={highlightGc ? HIGHLIGHT_CLASSES : 'text-rose-400'}>{formatProm(promGc)}</span>
    </span>
  )
}

function ClubCard({ row, index, sortKey, clubColors }) {
  const isActive = (key) => sortKey === key

  return (
    <div className="relative mt-3 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 pb-1 pt-2">
      <div className="absolute -top-2.5 inset-x-2 flex items-center justify-between gap-2 bg-zinc-900 px-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex-shrink-0 text-base font-black text-zinc-500">{index + 1}</span>
          <p className="min-w-0 truncate">
            <span className="text-base font-bold" style={{ color: clubColors.get(row.club) }}>
              {row.club}
            </span>{' '}
            <span className="text-sm font-normal text-zinc-500">· {row.temporada}</span>
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap">
          <p className="text-base font-bold text-emerald-400">
            {row.pts} / {row.ptsPosibles}
          </p>
          <span
            className={`inline-flex items-center rounded-full border border-purple-500 bg-purple-500/10 px-2 py-0.5 text-xs font-extrabold ${
              isActive('pct') ? HIGHLIGHT_CLASSES : 'text-purple-400'
            }`}
          >
            {row.pct}%
          </span>
        </div>
      </div>

      <div className="mt-1.5 overflow-x-auto">
        <div className="flex w-max min-w-full items-start justify-evenly gap-3">
          <StatMini label="PJ" value={row.pj} active={isActive('pj')} colorClass={METRICA_CLASSES.pj} />
          <StatMini label="G" value={row.g} active={isActive('g')} colorClass={METRICA_CLASSES.g} />
          <StatMini label="E" value={row.e} active={isActive('e')} colorClass={METRICA_CLASSES.e} />
          <StatMini label="P" value={row.p} active={isActive('p')} colorClass={METRICA_CLASSES.p} />
          <SignStat label="G/P" value={row.gp} active={isActive('gp')} />
          <StatMini label="GF" value={row.gf} active={isActive('gf')} colorClass={METRICA_CLASSES.gf} />
          <StatMini label="GC" value={row.gc} active={isActive('gc')} colorClass={METRICA_CLASSES.gc} />
          <SignStat label="DIF" value={row.df} active={isActive('df')} />
          <div className="flex flex-shrink-0 flex-col items-center gap-0.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 whitespace-nowrap">
              PROM GF/GC
            </span>
            <span className="flex h-6 items-center justify-center">
              <PromGfGc
                promGf={row.promGf}
                promGc={row.promGc}
                highlightGf={isActive('promGf')}
                highlightGc={isActive('promGc')}
              />
            </span>
          </div>
          <SignStat label="DIF PTS" value={row.difPts} active={isActive('difPts')} />
        </div>
      </div>
    </div>
  )
}

function ClubesTable({ rows, sortKey }) {
  const isActive = (key) => sortKey === key
  const clubColors = useMemo(() => buildClubColorMap(rows.map((row) => row.club)), [rows])

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
          <ClubCard key={row.key} row={row} index={index} sortKey={sortKey} clubColors={clubColors} />
        ))}
      </div>

      <div className="hidden w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">Club</th>
                <th className={`px-1.5 py-3 text-center ${isActive('pj') ? HIGHLIGHT_CLASSES : ''}`}>PJ</th>
                <th className={`px-1.5 py-3 text-center ${isActive('g') ? HIGHLIGHT_CLASSES : ''}`}>G</th>
                <th className={`px-1.5 py-3 text-center ${isActive('e') ? HIGHLIGHT_CLASSES : ''}`}>E</th>
                <th className={`px-1.5 py-3 text-center ${isActive('p') ? HIGHLIGHT_CLASSES : ''}`}>P</th>
                <th className={`px-1.5 py-3 text-center ${isActive('gp') ? HIGHLIGHT_CLASSES : ''}`}>G/P</th>
                <th className={`px-1.5 py-3 text-center ${isActive('gf') ? HIGHLIGHT_CLASSES : ''}`}>GF</th>
                <th className={`px-1.5 py-3 text-center ${isActive('gc') ? HIGHLIGHT_CLASSES : ''}`}>GC</th>
                <th className={`px-1.5 py-3 text-center ${isActive('df') ? HIGHLIGHT_CLASSES : ''}`}>DIF</th>
                <th className="px-1.5 py-3 text-center">PROM GF/GC</th>
                <th className={`px-1.5 py-3 text-center ${isActive('difPts') ? HIGHLIGHT_CLASSES : ''}`}>DIF PTS</th>
                <th className="px-2 py-3 text-center">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rows.map((row, index) => (
                <tr
                  key={row.key}
                  className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
                >
                  <td className="px-2 py-3 text-sm font-black text-zinc-500">{index + 1}</td>
                  <td className="px-2 py-3">
                    <p className="font-bold" style={{ color: clubColors.get(row.club) }}>
                      {row.club}
                    </p>
                    <p className="text-xs text-zinc-500">{row.temporada}</p>
                  </td>
                  <td className={`px-1.5 py-3 text-center font-bold ${METRICA_CLASSES.pj}`}>{row.pj}</td>
                  <td className={`px-1.5 py-3 text-center font-bold ${METRICA_CLASSES.g}`}>{row.g}</td>
                  <td className={`px-1.5 py-3 text-center font-bold ${METRICA_CLASSES.e}`}>{row.e}</td>
                  <td className={`px-1.5 py-3 text-center font-bold ${METRICA_CLASSES.p}`}>{row.p}</td>
                  <td className={`px-1.5 py-3 text-center font-bold ${signClasses(row.gp)}`}>
                    {row.gp > 0 ? `+${row.gp}` : row.gp}
                  </td>
                  <td className={`px-1.5 py-3 text-center font-bold ${METRICA_CLASSES.gf}`}>{row.gf}</td>
                  <td className={`px-1.5 py-3 text-center font-bold ${METRICA_CLASSES.gc}`}>{row.gc}</td>
                  <td className={`px-1.5 py-3 text-center font-bold ${signClasses(row.df)}`}>
                    {row.df > 0 ? `+${row.df}` : row.df}
                  </td>
                  <td className="px-1.5 py-3 text-center">
                    <PromGfGc
                      promGf={row.promGf}
                      promGc={row.promGc}
                      highlightGf={isActive('promGf')}
                      highlightGc={isActive('promGc')}
                    />
                  </td>
                  <td className={`px-1.5 py-3 text-center font-bold ${signClasses(row.difPts)}`}>
                    {row.difPts > 0 ? `+${row.difPts}` : row.difPts}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <p className="text-sm font-bold text-emerald-400">
                      {row.pts} / {row.ptsPosibles}
                    </p>
                    <p
                      className={`text-[10px] font-semibold ${
                        isActive('pct') ? HIGHLIGHT_CLASSES : 'text-zinc-500'
                      }`}
                    >
                      {row.pct}%
                    </p>
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
