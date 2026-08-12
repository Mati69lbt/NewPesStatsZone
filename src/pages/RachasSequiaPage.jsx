import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Accordion from '../components/Accordion'
import RachaSequiaTable from '../components/RachaSequiaTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { buildRachaSequiaRows } from '../utils/rachaSequiaStats'
import { VISTAS } from '../utils/estadisticasVistas'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const SECCIONES = [
  { value: 'general', titulo: 'General' },
  { value: 'local', titulo: 'Local' },
  { value: 'visitante', titulo: 'Visitante' },
]

function RachasSequiaPage() {
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

  const secciones = useMemo(
    () => SECCIONES.map((s) => ({ ...s, rows: buildRachaSequiaRows(clubMatches, s.value) })),
    [clubMatches]
  )

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando rachas…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-6 px-2 py-10 sm:px-4">
        <div className="mx-auto w-full max-w-md text-center sm:max-w-4xl">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-orange-400 sm:h-7 sm:w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6c0-1.887-.833-3.482-2.187-5.028-.395-.454-.858-.79-1.13-1.317-.478-.93-.147-2.107.317-3.157C13.11 3.36 11.2 4.4 9.938 6.19c-.7.99-1.09 2.213-1.03 3.428.03.61-.492 1.061-1.098.837-.94-.347-1.516-1.153-1.72-2.108C4.933 9.65 5 11.5 5.5 12.75c.5 1.25 1.5 3 3 4A6 6 0 0012 18.75z"
              />
            </svg>
            Racha de Sequía Goleadora
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Jugadores con 3 o más partidos consecutivos sin convertir
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:max-w-4xl">
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
              <select value="/rachas-sequia" onChange={(e) => navigate(e.target.value)} className={FIELD_CLASSES}>
                {VISTAS.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:max-w-4xl">
          {secciones.map((s, index) => (
            <Accordion
              key={s.value}
              title={s.titulo}
              subtitle={`${s.rows.length} ${s.rows.length === 1 ? 'jugador en sequía' : 'jugadores en sequía'}`}
              defaultOpen={index === 0}
            >
              <RachaSequiaTable rows={s.rows} />
            </Accordion>
          ))}
        </div>
      </main>
    </div>
  )
}

export default RachasSequiaPage
