import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import StreakCard from '../components/StreakCard'
import StreakRow from '../components/StreakRow'
import Accordion from '../components/Accordion'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { buildStreakTrio } from '../utils/streakStats'
import { getTemporadaLabel } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const CONDICIONES = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

function temporadaSortKey(temporada) {
  const year = Number.parseInt(temporada, 10)
  return Number.isNaN(year) ? 0 : year
}

function Ultimos10Page() {
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

  const [condicion, setCondicion] = useState('general')
  const [torneoActivo, setTorneoActivo] = useState('')

  const clubMatches = useMemo(
    () => matches.filter((m) => m.club === clubActivo),
    [matches, clubActivo]
  )

  const historial = useMemo(() => buildStreakTrio(clubMatches), [clubMatches])

  const capitanes = useMemo(() => {
    const nombres = [...new Set(clubMatches.map((m) => m.capitanNombre).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    )
    return nombres.map((capitan) => ({
      capitan,
      ...buildStreakTrio(clubMatches.filter((m) => m.capitanNombre === capitan)),
    }))
  }, [clubMatches])

  const torneos = useMemo(() => {
    const groups = new Map()
    for (const match of clubMatches) {
      if (!match.torneo || !match.fecha) continue
      const tipo = tournamentResults[match.torneo]?.tipo || 'europeo'
      const temporada = getTemporadaLabel(match.fecha, tipo)
      const key = `${match.torneo}::${temporada}`
      if (!groups.has(key)) groups.set(key, { torneo: match.torneo, temporada, matches: [] })
      groups.get(key).matches.push(match)
    }

    return [...groups.values()]
      .map(({ torneo, temporada, matches: torneoMatches }) => {
        const capitanesTorneo = [...new Set(torneoMatches.map((m) => m.capitanNombre).filter(Boolean))].sort(
          (a, b) => a.localeCompare(b)
        )
        return {
          key: `${torneo}::${temporada}`,
          torneo,
          temporada,
          ...buildStreakTrio(torneoMatches),
          capitanes: capitanesTorneo.map((capitan) => ({
            capitan,
            ...buildStreakTrio(torneoMatches.filter((m) => m.capitanNombre === capitan)),
          })),
        }
      })
      .sort((a, b) => {
        const diff = temporadaSortKey(b.temporada) - temporadaSortKey(a.temporada)
        return diff !== 0 ? diff : a.torneo.localeCompare(b.torneo)
      })
  }, [clubMatches, tournamentResults])

  useEffect(() => {
    if (torneos.length === 0) {
      setTorneoActivo('')
      return
    }
    if (!torneos.some((t) => t.key === torneoActivo)) {
      setTorneoActivo(torneos[0].key)
    }
  }, [torneos, torneoActivo])

  const torneoSeleccionado = torneos.find((t) => t.key === torneoActivo) || null

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando racha…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden py-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4">
          <div className="py-2 text-center">
            <h1 className="my-1 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Últimos 10
            </h1>
            <p className="my-1 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Racha reciente del club
            </p>
          </div>

          <div className="w-full rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
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

          {clubMatches.length === 0 ? (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              No hay partidos registrados para este club.
            </p>
          ) : (
            <>
              <StreakCard {...historial} />

              <Accordion key={`capitanes-${clubActivo}`} title="Capitanes">
                {capitanes.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Sin capitanes registrados.</p>
                ) : (
                  capitanes.map(({ capitan, general, local, visitante }) => (
                    <StreakCard
                      key={capitan}
                      title={`Últimos 10 con ${capitan}`}
                      general={general}
                      local={local}
                      visitante={visitante}
                      compact
                    />
                  ))
                )}
              </Accordion>

              <Accordion key={`torneos-${clubActivo}`} title="Torneos">
                {torneos.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Sin torneos registrados.</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className={LABEL_CLASSES}>Competencia</label>
                      <select
                        value={torneoActivo}
                        onChange={(e) => setTorneoActivo(e.target.value)}
                        className={FIELD_CLASSES}
                      >
                        {torneos.map(({ key, torneo, temporada }) => (
                          <option key={key} value={key}>
                            {torneo} {temporada}
                          </option>
                        ))}
                      </select>
                    </div>

                    {torneoSeleccionado && (
                      <div className="flex flex-col gap-3">
                        <div className="flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
                          {CONDICIONES.map(({ value, label }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setCondicion(value)}
                              className={`flex-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                                condicion === value
                                  ? 'bg-lime-400 text-zinc-900'
                                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>

                        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
                          <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                            {torneoSeleccionado.torneo} {torneoSeleccionado.temporada}
                          </h3>
                          <StreakRow
                            label={CONDICIONES.find((c) => c.value === condicion).label}
                            matches={torneoSeleccionado[condicion]}
                          />
                        </div>

                        {torneoSeleccionado.capitanes.length > 0 && (
                          <div className="flex flex-col gap-2">
                            {torneoSeleccionado.capitanes.map(({ capitan, ...trio }) => (
                              <div
                                key={capitan}
                                className="rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800"
                              >
                                <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                  {capitan}
                                </h4>
                                <StreakRow
                                  label={CONDICIONES.find((c) => c.value === condicion).label}
                                  matches={trio[condicion]}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Accordion>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Ultimos10Page
