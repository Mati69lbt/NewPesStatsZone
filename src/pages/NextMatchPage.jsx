import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import VersusSummaryMatrix from '../components/VersusSummaryMatrix'
import ScorersTable from '../components/ScorersTable'
import NextMatchCard from '../components/NextMatchCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { computeStats, buildScorersRows } from '../utils/versusStats'
import { getTemporadaLabel } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const TODOS_RIVALES = 'Todos los rivales'

function NextMatchPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const tournamentResults = useTournamentResults(user?.uid)

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  const [selectedClub, setSelectedClub] = useState('')
  const [selectedRival, setSelectedRival] = useState(TODOS_RIVALES)

  const clubActivo = selectedClub || club || clubes[0] || ''

  const clubMatches = useMemo(() => matches.filter((m) => m.club === clubActivo), [matches, clubActivo])

  const rivales = useMemo(
    () => [...new Set(clubMatches.map((m) => m.rival).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [clubMatches]
  )

  const rivalActivo = selectedRival === TODOS_RIVALES ? '' : selectedRival

  const partidosFiltrados = useMemo(
    () => (rivalActivo ? clubMatches.filter((m) => m.rival === rivalActivo) : clubMatches),
    [clubMatches, rivalActivo]
  )

  const partidosOrdenados = useMemo(
    () => [...partidosFiltrados].sort((a, b) => b.fecha.localeCompare(a.fecha)),
    [partidosFiltrados]
  )

  const stats = useMemo(
    () => ({
      general: computeStats(partidosFiltrados),
      local: computeStats(partidosFiltrados.filter((m) => m.condicion === 'local')),
      visitante: computeStats(partidosFiltrados.filter((m) => m.condicion === 'visitante')),
      neutral: computeStats(partidosFiltrados.filter((m) => m.condicion === 'neutral')),
    }),
    [partidosFiltrados]
  )

  const goleadoresClub = useMemo(() => buildScorersRows(partidosFiltrados, 'incidenciasClub'), [partidosFiltrados])
  const goleadoresRival = useMemo(() => buildScorersRows(partidosFiltrados, 'incidenciasRival'), [partidosFiltrados])

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando próximo partido…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <div className="w-full max-w-6xl text-center">
          <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            Próximo Partido
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Historial de enfrentamientos y goleadores
          </p>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:grid-cols-2">
          <div>
            <label className={LABEL_CLASSES}>Club</label>
            <select value={clubActivo} onChange={(e) => setSelectedClub(e.target.value)} className={FIELD_CLASSES}>
              {clubes.length === 0 && <option value="">Sin clubes</option>}
              {clubes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL_CLASSES}>Rival</label>
            <select value={selectedRival} onChange={(e) => setSelectedRival(e.target.value)} className={FIELD_CLASSES}>
              <option value={TODOS_RIVALES}>{TODOS_RIVALES}</option>
              {rivales.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full max-w-6xl flex-col items-center gap-6">
          <VersusSummaryMatrix stats={stats} />

          {rivalActivo && (
            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
              <ScorersTable title={`Goleadores ${clubActivo || 'Mi club'}`} rows={goleadoresClub} showPJ />
              <ScorersTable title={`Goleadores ${rivalActivo}`} rows={goleadoresRival} showPJ={false} />
            </div>
          )}
        </div>

        <div className="w-full max-w-6xl">
          <h2 className="mb-4 text-lg font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            {rivalActivo ? `Partidos vs ${rivalActivo}` : 'Todos los partidos'}
          </h2>

          {partidosOrdenados.length === 0 ? (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              No hay partidos registrados con los filtros seleccionados.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partidosOrdenados.map((match) => {
                const tipo = tournamentResults[match.torneo]?.tipo || 'europeo'
                const temporada = getTemporadaLabel(match.fecha, tipo)
                return <NextMatchCard key={match.id} match={match} temporada={temporada} />
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default NextMatchPage
