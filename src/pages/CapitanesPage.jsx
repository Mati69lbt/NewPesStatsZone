import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import Accordion from '../components/Accordion'
import CapitanCard from '../components/CapitanCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { computeStats } from '../utils/versusStats'
import { getTemporadaLabel } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

function buildCapitanStats(matches) {
  return {
    general: computeStats(matches),
    local: computeStats(matches.filter((m) => m.condicion === 'local')),
    visitante: computeStats(matches.filter((m) => m.condicion === 'visitante')),
    neutral: computeStats(matches.filter((m) => m.condicion === 'neutral')),
  }
}

function buildCapitanes(matches) {
  const nombres = [...new Set(matches.map((m) => m.capitanNombre).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  )
  return nombres.map((capitan) => ({
    capitan,
    stats: buildCapitanStats(matches.filter((m) => m.capitanNombre === capitan)),
  }))
}

function CapitanesPage() {
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
  const clubActivo = selectedClub || club || clubes[0] || ''

  const clubMatches = useMemo(() => matches.filter((m) => m.club === clubActivo), [matches, clubActivo])

  const capitanesGenerales = useMemo(() => buildCapitanes(clubMatches), [clubMatches])

  const torneos = useMemo(() => {
    const groups = new Map()
    for (const match of clubMatches) {
      const torneo = match.torneo || 'Sin torneo'
      const tipo = tournamentResults[torneo]?.tipo || 'europeo'
      const temporada = getTemporadaLabel(match.fecha, tipo)
      const key = `${torneo}|||${temporada}`
      if (!groups.has(key)) groups.set(key, { torneo, temporada, matches: [] })
      groups.get(key).matches.push(match)
    }

    return [...groups.values()]
      .map(({ torneo, temporada, matches: torneoMatches }) => ({
        key: `${torneo}|||${temporada}`,
        torneo,
        temporada,
        capitanes: buildCapitanes(torneoMatches),
        ultimaFecha: torneoMatches.reduce((max, m) => (!max || m.fecha > max ? m.fecha : max), ''),
      }))
      .sort((a, b) => b.ultimaFecha.localeCompare(a.ultimaFecha))
  }, [clubMatches, tournamentResults])

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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Análisis de Capitanes
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Rendimiento del club según la cinta de capitán
            </p>
          </div>

          <div className="flex w-full flex-row items-end justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
            <div className="min-w-0 flex-1 sm:w-64 sm:flex-none">
              <label className={LABEL_CLASSES}>Club</label>
              <select
                value={clubActivo}
                onChange={(e) => setSelectedClub(e.target.value)}
                className={FIELD_CLASSES}
              >
                {clubes.length === 0 && <option value="">Sin clubes</option>}
                {clubes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex shrink-0 overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
              <Link
                to="/capitanes/resumen"
                className="px-2 py-2 text-[11px] font-bold uppercase tracking-wide text-zinc-600 transition hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-600 sm:px-4 sm:text-xs"
              >
                🔎 Resumen
              </Link>
              <span className="bg-lime-400 px-2 py-2 text-[11px] font-bold uppercase tracking-wide text-zinc-900 sm:px-4 sm:text-xs">
                🖐️ Capitanes
              </span>
            </div>
          </div>

          {clubMatches.length === 0 ? (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              No hay partidos registrados para este club.
            </p>
          ) : (
            <>
              <Accordion
                key={`totales-${clubActivo}`}
                title="Totales Generales"
                subtitle={`${capitanesGenerales.length} ${
                  capitanesGenerales.length === 1 ? 'capitán' : 'capitanes'
                }`}
              >
                {capitanesGenerales.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Sin capitanes registrados.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {capitanesGenerales.map(({ capitan, stats }) => (
                      <CapitanCard key={capitan} capitan={capitan} stats={stats} />
                    ))}
                  </div>
                )}
              </Accordion>

              <div className="flex w-full flex-col gap-4">
                <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                  Desglose por Torneos
                </h2>
                {torneos.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Sin torneos registrados.</p>
                ) : (
                  torneos.map(({ key, torneo, temporada, capitanes }) => (
                    <Accordion
                      key={key}
                      title={`${torneo} ${temporada}`}
                      subtitle={`${capitanes.length} ${capitanes.length === 1 ? 'capitán' : 'capitanes'}`}
                    >
                      {capitanes.length === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Sin capitanes registrados.</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          {capitanes.map(({ capitan, stats }) => (
                            <CapitanCard key={capitan} capitan={capitan} stats={stats} />
                          ))}
                        </div>
                      )}
                    </Accordion>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default CapitanesPage
