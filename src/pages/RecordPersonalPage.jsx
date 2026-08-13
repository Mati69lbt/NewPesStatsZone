import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import RecordPersonalRow from '../components/RecordPersonalRow'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { buildRecordPersonalRows } from '../utils/recordPersonalStats'
import { VISTAS } from '../utils/estadisticasVistas'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const HEADERS = [
  'PJ',
  'GANADOS',
  'EMPATADOS',
  'PERDIDOS',
  'G/P',
  'GOLES A FAVOR',
  'GOLES EN CONTRA',
  'DIF. DE GOLES',
  'PTS / EFEC',
]

function RecordPersonalPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const navigate = useNavigate()

  const [selectedClub, setSelectedClub] = useState('')

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

  const rows = useMemo(() => buildRecordPersonalRows(clubMatches), [clubMatches])

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando récord…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden px-2 py-10 sm:px-4">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 md:max-w-5xl">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-lime-500 sm:h-7 sm:w-7">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v18h18M7 15l4-5 3 3 5-7"
                />
              </svg>
              Récord Personal
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Acumulado histórico general y por condición
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
            <div className="grid grid-cols-2 gap-4">
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
                <select value="/record" onChange={(e) => navigate(e.target.value)} className={FIELD_CLASSES}>
                  {VISTAS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="hidden grid-cols-[140px_repeat(9,minmax(0,1fr))] gap-2 px-2 md:grid">
              <span></span>
              {HEADERS.map((h) => (
                <span
                  key={h}
                  className="text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
                >
                  {h}
                </span>
              ))}
            </div>

            {rows.map((row) => (
              <RecordPersonalRow key={row.condicion} row={row} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecordPersonalPage
