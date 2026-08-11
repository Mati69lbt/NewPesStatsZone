import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import ClubesSortBar from '../components/ClubesSortBar'
import ClubesTable from '../components/ClubesTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import { computeStats } from '../utils/versusStats'
import { getTemporadaLabel } from '../utils/dateFormat'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const FORMATOS = [
  { value: 'anual', label: 'Anual' },
  { value: 'europeo', label: 'Europeo' },
]

function temporadaSortKey(temporada) {
  const year = Number.parseInt(temporada, 10)
  return Number.isNaN(year) ? 0 : year
}

function buildRows(matches, formato) {
  const groups = new Map()

  for (const match of matches) {
    if (!match.club || !match.fecha) continue
    const temporada = getTemporadaLabel(match.fecha, formato)
    const key = `${temporada}::${match.club}`
    if (!groups.has(key)) groups.set(key, { temporada, club: match.club, matches: [] })
    groups.get(key).matches.push(match)
  }

  return [...groups.values()].map(({ temporada, club, matches: groupMatches }) => {
    const stats = computeStats(groupMatches)
    const pct = stats.ptsPosibles > 0 ? Math.round((stats.pts / stats.ptsPosibles) * 100) : 0
    return { key: `${temporada}::${club}`, temporada, club, ...stats, pct }
  })
}

function sortRows(rows, sortKey, sortDir) {
  const sorted = [...rows].sort((a, b) => {
    if (sortKey === 'general') {
      return temporadaSortKey(b.temporada) - temporadaSortKey(a.temporada) || a.club.localeCompare(b.club)
    }
    return b[sortKey] - a[sortKey] || a.club.localeCompare(b.club)
  })
  return sortDir === 'desc' ? sorted : sorted.reverse()
}

function ClubesPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)

  const [formato, setFormato] = useState('europeo')
  const [sortKey, setSortKey] = useState('general')
  const [sortDir, setSortDir] = useState('desc')

  const rows = useMemo(() => buildRows(matches, formato), [matches, formato])
  const sortedRows = useMemo(() => sortRows(rows, sortKey, sortDir), [rows, sortKey, sortDir])

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando clubes…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4">
          <div>
            <Link
              to="/temporadas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 transition hover:text-lime-500 dark:text-zinc-400 dark:hover:text-lime-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Volver a Temporadas
            </Link>
          </div>

          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-7 w-7 text-lime-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21c4.97-4.03 8.25-7.86 8.25-11.5A8.25 8.25 0 003.75 9.5C3.75 13.14 7.03 16.97 12 21z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.5a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
              </svg>
              Clubes
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {sortedRows.length} {sortedRows.length === 1 ? 'entrada' : 'entradas'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
            <div>
              <label className={LABEL_CLASSES}>Formato</label>
              <div className="flex w-fit overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
                {FORMATOS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormato(value)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                      formato === value
                        ? 'bg-lime-400 text-zinc-900'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={LABEL_CLASSES}>Ordenar por</label>
              <ClubesSortBar sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
          </div>

          <ClubesTable rows={sortedRows} />
        </div>
      </main>
    </div>
  )
}

export default ClubesPage
