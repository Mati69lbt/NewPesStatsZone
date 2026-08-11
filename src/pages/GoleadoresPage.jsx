import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import GoleadoresSortBar from '../components/GoleadoresSortBar'
import GoleadoresTable from '../components/GoleadoresTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { buildScorersRows } from '../utils/versusStats'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const CONDICIONES = [
  { value: 'general', label: 'Gral' },
  { value: 'local', label: 'Loc' },
  { value: 'visitante', label: 'Vis' },
  { value: 'neutral', label: 'Neu' },
]

const VISTAS = [{ value: '/goleadores', label: 'Goleadores' }]

function sortRows(rows, sortKey, sortDir) {
  const sorted = [...rows].sort((a, b) => {
    if (sortKey === 'nombre') return a.nombre.localeCompare(b.nombre)
    return b[sortKey] - a[sortKey] || a.nombre.localeCompare(b.nombre)
  })
  return sortDir === 'desc' ? sorted : sorted.reverse()
}

function GoleadoresPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const navigate = useNavigate()

  const [selectedClub, setSelectedClub] = useState('')
  const [condicion, setCondicion] = useState('general')
  const [sortKey, setSortKey] = useState('goles')
  const [sortDir, setSortDir] = useState('desc')

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  useEffect(() => {
    if (selectedClub || clubes.length === 0) return
    setSelectedClub(club && clubes.includes(club) ? club : clubes[0])
  }, [club, clubes, selectedClub])

  const clubMatches = useMemo(
    () => matches.filter((m) => m.club === selectedClub),
    [matches, selectedClub]
  )

  const condicionMatches = useMemo(
    () => (condicion === 'general' ? clubMatches : clubMatches.filter((m) => m.condicion === condicion)),
    [clubMatches, condicion]
  )

  const rows = useMemo(() => buildScorersRows(condicionMatches, 'incidenciasClub'), [condicionMatches])
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
          <Loader label="Cargando goleadores…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden px-4 py-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-lime-500">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.75l2.317 4.694 5.183.753-3.75 3.656.885 5.164L12 15.5l-4.635 2.517.885-5.164-3.75-3.656 5.183-.753L12 3.75z"
                />
              </svg>
              Goleadores
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {sortedRows.length} {sortedRows.length === 1 ? 'goleador' : 'goleadores'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASSES}>Club</label>
                <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className={FIELD_CLASSES}>
                  {clubes.length === 0 && <option value="">Sin clubes</option>}
                  {clubes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={LABEL_CLASSES}>Vista</label>
                <select value="/goleadores" onChange={(e) => navigate(e.target.value)} className={FIELD_CLASSES}>
                  {VISTAS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
              <GoleadoresSortBar sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
            </div>
          </div>

          <GoleadoresTable rows={sortedRows} />
        </div>
      </main>
    </div>
  )
}

export default GoleadoresPage
