import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import RivalResumenCard from '../components/RivalResumenCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import { buildRecordPersonalRows } from '../utils/recordPersonalStats'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const MIN_PJ_OPTIONS = [3, 5, 10, 15]

const CAMPOS = [
  { value: 'rival', label: 'Nombre' },
  { value: 'pj', label: 'PJ' },
  { value: 'g', label: 'G' },
  { value: 'e', label: 'E' },
  { value: 'p', label: 'P' },
  { value: 'gp', label: 'G/P' },
  { value: 'gf', label: 'GF' },
  { value: 'gc', label: 'GC' },
  { value: 'dif', label: 'DF' },
  { value: 'efectividad', label: '%EFEC' },
]

function SortButton({ value, label, active, orden, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider transition sm:text-xs ${
        active
          ? 'border-lime-400 bg-lime-400/10 text-lime-500 dark:text-lime-400'
          : 'border-zinc-300 text-zinc-500 hover:border-lime-400/60 dark:border-zinc-600 dark:text-zinc-400'
      }`}
    >
      {label}
      {active && <span>{orden === 'asc' ? '↑' : '↓'}</span>}
    </button>
  )
}

function RivalesFrecuentesPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)

  const [minPj, setMinPj] = useState(5)
  const [sort, setSort] = useState({ campo: 'pj', orden: 'desc' })
  const { campo, orden } = sort

  const handleSort = (field) => {
    setSort((prev) =>
      prev.campo === field
        ? { campo: field, orden: prev.orden === 'desc' ? 'asc' : 'desc' }
        : { campo: field, orden: field === 'rival' ? 'asc' : 'desc' }
    )
  }

  const rivales = useMemo(() => {
    const groups = new Map()
    for (const match of matches) {
      if (!match.rival) continue
      if (!groups.has(match.rival)) groups.set(match.rival, [])
      groups.get(match.rival).push(match)
    }

    const rows = [...groups.entries()]
      .map(([rival, rivalMatches]) => {
        const general = buildRecordPersonalRows(rivalMatches).find((row) => row.condicion === 'general').metrics
        return { rival, matches: rivalMatches, general }
      })
      .filter((row) => row.general.pj >= minPj)

    const direction = orden === 'asc' ? 1 : -1
    return rows.sort((a, b) => {
      if (campo === 'rival') return a.rival.localeCompare(b.rival) * direction
      return (a.general[campo] - b.general[campo]) * direction
    })
  }, [matches, minPj, campo, orden])

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando rivales…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
        <div className="w-full max-w-7xl text-center">
          <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            Rivales Frecuentes
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Historial completo contra cada rival, combinando todos tus clubes
          </p>
        </div>

        <div className="flex w-full max-w-7xl flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
          <div>
            <label className={LABEL_CLASSES}>Mínimo de partidos jugados contra el rival</label>
            <div className="flex flex-wrap gap-1.5">
              {MIN_PJ_OPTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMinPj(value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                    minPj === value
                      ? 'border-lime-400 bg-lime-400 text-zinc-900'
                      : 'border-zinc-300 text-zinc-500 hover:border-lime-400/60 dark:border-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {value}+ PJ
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={LABEL_CLASSES}>Ordenar por</label>
            <div className="flex flex-wrap gap-1.5">
              {CAMPOS.map(({ value, label }) => (
                <SortButton
                  key={value}
                  value={value}
                  label={label}
                  active={campo === value}
                  orden={orden}
                  onClick={handleSort}
                />
              ))}
            </div>
          </div>
        </div>

        {rivales.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay rivales con al menos {minPj} partidos jugados en tu historial.
          </p>
        ) : (
          <div className="flex w-full max-w-7xl flex-col gap-4">
            {rivales.map(({ rival, matches: rivalMatches }) => (
              <RivalResumenCard key={rival} rival={rival} matches={rivalMatches} defaultOpen={false} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default RivalesFrecuentesPage
