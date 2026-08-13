import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import CampeonatoStatsGroup from '../components/CampeonatoStatsGroup'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { getTemporadaLabel } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

function buildCampeonatos(matches, club, tournamentResults) {
  const clubMatches = matches.filter((m) => m.club === club)

  const groups = new Map()
  for (const match of clubMatches) {
    const torneo = match.torneo || 'Sin torneo'
    const tipo = tournamentResults[torneo]?.tipo || 'europeo'
    const temporada = getTemporadaLabel(match.fecha, tipo)
    const key = `${torneo}__${temporada}`
    if (!groups.has(key)) groups.set(key, { torneo, temporada, matches: [] })
    groups.get(key).matches.push(match)
  }

  return [...groups.entries()].map(([key, { torneo, temporada, matches: torneoMatches }]) => {
    const ultimaFecha = torneoMatches.reduce((max, m) => (!max || m.fecha > max ? m.fecha : max), null)
    return {
      key,
      torneo,
      temporada,
      matches: torneoMatches,
      ultimaFecha: ultimaFecha || '',
    }
  })
}

function sortCampeonatosDesc(campeonatos) {
  return [...campeonatos].sort((a, b) => b.ultimaFecha.localeCompare(a.ultimaFecha))
}

function GoleadoresCampeonatoPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const tournamentResults = useTournamentResults(user?.uid)

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

  const campeonatos = useMemo(
    () => sortCampeonatosDesc(buildCampeonatos(matches, selectedClub, tournamentResults)),
    [matches, selectedClub, tournamentResults]
  )

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando estadísticas…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-6 px-2 py-10 sm:px-4">
        <div className="w-full max-w-4xl text-center">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-lime-500 sm:h-7 sm:w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75l2.317 4.694 5.183.753-3.75 3.656.885 5.164L12 15.5l-4.635 2.517.885-5.164-3.75-3.656 5.183-.753L12 3.75z"
              />
            </svg>
            Goleadores por Campeonato
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Goles y asistencias, torneo por torneo
          </p>
        </div>

        <div className="mx-auto w-full max-w-md px-2 sm:max-w-4xl">
          <div className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
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
        </div>

        {campeonatos.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay campeonatos registrados para este club.
          </p>
        ) : (
          <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-2 sm:max-w-4xl">
            {campeonatos.map((c, index) => (
              <CampeonatoStatsGroup
                key={c.key}
                torneo={c.torneo}
                temporada={c.temporada}
                matches={c.matches}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default GoleadoresCampeonatoPage
