import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import CapitanesResumenSortBar from '../components/CapitanesResumenSortBar'
import CapitanesResumenTable from '../components/CapitanesResumenTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import { computeStats } from '../utils/versusStats'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const CONDICIONES = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
  { value: 'neutral', label: 'Neutral' },
]

function mostFrequentClub(matches) {
  const counts = new Map()
  for (const match of matches) {
    if (!match.club) continue
    counts.set(match.club, (counts.get(match.club) ?? 0) + 1)
  }
  let best = ''
  let bestCount = -1
  for (const [club, count] of counts) {
    if (count > bestCount) {
      best = club
      bestCount = count
    }
  }
  return best
}

function yearRange(matches) {
  const years = matches.map((m) => new Date(m.fecha).getFullYear()).filter((y) => !Number.isNaN(y))
  if (years.length === 0) return ''
  const min = Math.min(...years)
  const max = Math.max(...years)
  return min === max ? `${min}` : `${min} - ${max}`
}

function buildRows(matches, condicion) {
  const groups = new Map()

  for (const match of matches) {
    if (!match.capitanNombre) continue
    if (!groups.has(match.capitanNombre)) groups.set(match.capitanNombre, [])
    groups.get(match.capitanNombre).push(match)
  }

  return [...groups.entries()].map(([capitan, capitanMatches]) => {
    const filtered = condicion === 'general' ? capitanMatches : capitanMatches.filter((m) => m.condicion === condicion)
    const stats = computeStats(filtered)
    const pct = stats.ptsPosibles > 0 ? Math.round((stats.pts / stats.ptsPosibles) * 100) : 0
    return {
      key: capitan,
      capitan,
      club: mostFrequentClub(capitanMatches),
      years: yearRange(capitanMatches),
      ...stats,
      pct,
    }
  })
}

function sortRows(rows, sortKey, sortDir) {
  const sorted = [...rows].sort((a, b) => {
    if (sortKey === 'capitan') return a.capitan.localeCompare(b.capitan)
    return b[sortKey] - a[sortKey] || a.capitan.localeCompare(b.capitan)
  })
  return sortDir === 'desc' ? sorted : sorted.reverse()
}

function CapitanesResumenPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)

  const [condicion, setCondicion] = useState('general')
  const [sortKey, setSortKey] = useState('pj')
  const [sortDir, setSortDir] = useState('desc')

  const rows = useMemo(() => buildRows(matches, condicion), [matches, condicion])
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
          <Loader label="Cargando capitanes…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
          <div>
            <Link
              to="/capitanes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 transition hover:text-lime-500 dark:text-zinc-400 dark:hover:text-lime-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Volver a Capitanes
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
              Capitanes
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {sortedRows.length} {sortedRows.length === 1 ? 'capitán' : 'capitanes'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
            <div>
              <label className={LABEL_CLASSES}>Condición</label>
              <div className="flex w-fit flex-wrap overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
                {CONDICIONES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCondicion(value)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                      condicion === value
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
              <CapitanesResumenSortBar sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
          </div>

          <CapitanesResumenTable rows={sortedRows} />
        </div>
      </main>
    </div>
  )
}

export default CapitanesResumenPage
