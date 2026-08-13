import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import CampeonatoCard from '../components/CampeonatoCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { getTemporadaLabel } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const ORDEN_OPTIONS = [
  { value: 'desc', label: 'Más nuevos primero' },
  { value: 'asc', label: 'Más viejos primero' },
]

function buildCampeonatos(matches, club, tournamentResults) {
  const clubMatches = matches.filter((m) => m.club === club)

  const groups = new Map()
  for (const match of clubMatches) {
    const torneo = match.torneo || 'Sin torneo'
    const tipo = tournamentResults[torneo]?.tipo || 'europeo'
    const temporada = getTemporadaLabel(match.fecha, tipo)
    const key = `${torneo}|||${temporada}`
    if (!groups.has(key)) groups.set(key, { torneo, temporada, matches: [] })
    groups.get(key).matches.push(match)
  }

  return [...groups.values()].map(({ torneo, temporada, matches: torneoMatches }) => {
    const ultimaFecha = torneoMatches.reduce((max, m) => (!max || m.fecha > max ? m.fecha : max), null)
    return {
      key: `${torneo}|||${temporada}`,
      torneo,
      temporada,
      matches: torneoMatches,
      ultimaFecha: ultimaFecha || '',
    }
  })
}

function sortCampeonatos(campeonatos, orden) {
  const sorted = [...campeonatos].sort((a, b) => b.ultimaFecha.localeCompare(a.ultimaFecha))
  return orden === 'desc' ? sorted : sorted.reverse()
}

function CampeonatosPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const tournamentResults = useTournamentResults(user?.uid)

  const [selectedClub, setSelectedClub] = useState('')
  const [orden, setOrden] = useState('desc')

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  useEffect(() => {
    if (selectedClub || clubes.length === 0) return
    setSelectedClub(club && clubes.includes(club) ? club : clubes[0])
  }, [club, clubes, selectedClub])

  const campeonatos = useMemo(
    () => sortCampeonatos(buildCampeonatos(matches, selectedClub, tournamentResults), orden),
    [matches, selectedClub, tournamentResults, orden]
  )

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando campeonatos…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
        <div className="w-full max-w-7xl text-center">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-lime-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v3.75m7.5-3.75v3.75M4.5 6.75h15v10.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25V6.75zM3 6.75h1.5v3a3 3 0 01-3-3v-.75A.75.75 0 011.5 5.25h1.5m18 1.5h-1.5v3a3 3 0 003-3v-.75a.75.75 0 00-.75-.75h-1.5M9 21h6"
              />
            </svg>
            Campeonatos
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Estadísticas por torneo disputado
          </p>
        </div>

        <div className="grid w-full max-w-7xl grid-cols-2 gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:flex sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:w-64">
            <label className={LABEL_CLASSES}>Club</label>
            <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className={FIELD_CLASSES}>
              {clubes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-64">
            <label className={LABEL_CLASSES}>Orden</label>
            <select value={orden} onChange={(e) => setOrden(e.target.value)} className={FIELD_CLASSES}>
              {ORDEN_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {campeonatos.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay campeonatos registrados para este club.
          </p>
        ) : (
          <div className="grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {campeonatos.map((c) => (
              <CampeonatoCard key={c.key} torneo={c.torneo} temporada={c.temporada} matches={c.matches} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default CampeonatosPage
