import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import ExpulsionesTable from '../components/ExpulsionesTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { buildExpulsadosPropiosRows, buildCarnicerosRows } from '../utils/expulsionesStats'
import { VISTAS } from '../utils/estadisticasVistas'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const TABS = [
  { value: 'propios', label: '🔴 Expulsados Propios' },
  { value: 'rivales', label: '🔪 Carniceros (Rivales)' },
]

function ExpulsionesPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const navigate = useNavigate()

  const [selectedClub, setSelectedClub] = useState('')
  const [tab, setTab] = useState('propios')

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

  const propiosRows = useMemo(() => buildExpulsadosPropiosRows(clubMatches), [clubMatches])
  const rivalesRows = useMemo(() => buildCarnicerosRows(clubMatches), [clubMatches])
  const rows = tab === 'propios' ? propiosRows : rivalesRows

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando expulsiones…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden px-2 py-10 sm:px-4">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 md:max-w-3xl">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-red-500 sm:h-7 sm:w-7">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v18m-6-6h12M8 3h8a1 1 0 011 1v3H7V4a1 1 0 011-1zM7 15h10v3a1 1 0 01-1 1H8a1 1 0 01-1-1v-3z"
                />
              </svg>
              Expulsiones
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {rows.length} {rows.length === 1 ? 'jugador' : 'jugadores'}
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
                <select value="/expulsiones" onChange={(e) => navigate(e.target.value)} className={FIELD_CLASSES}>
                  {VISTAS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex w-fit mx-auto flex-wrap overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                  tab === value
                    ? 'bg-red-500 text-zinc-950'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <ExpulsionesTable rows={rows} tipo={tab} />
        </div>
      </main>
    </div>
  )
}

export default ExpulsionesPage
