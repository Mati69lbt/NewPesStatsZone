import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import StreakCard from '../components/StreakCard'
import Accordion from '../components/Accordion'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { buildStreakTrio } from '../utils/streakStats'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

function Ultimos10Page() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  const [selectedClub, setSelectedClub] = useState('')
  const clubActivo = selectedClub || club || clubes[0] || ''

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
    const nombres = [...new Set(clubMatches.map((m) => m.torneo).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    )
    return nombres.map((torneo) => {
      const torneoMatches = clubMatches.filter((m) => m.torneo === torneo)
      const capitanesTorneo = [...new Set(torneoMatches.map((m) => m.capitanNombre).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
      )
      return {
        torneo,
        ...buildStreakTrio(torneoMatches),
        capitanes: capitanesTorneo.map((capitan) => ({
          capitan,
          ...buildStreakTrio(torneoMatches.filter((m) => m.capitanNombre === capitan)),
        })),
      }
    })
  }, [clubMatches])

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

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Últimos 10
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
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

              <Accordion title="Capitanes" defaultOpen>
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

              <Accordion title="Torneos">
                {torneos.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Sin torneos registrados.</p>
                ) : (
                  torneos.map(({ torneo, general, local, visitante, capitanes: capitanesTorneo }) => (
                    <div key={torneo} className="flex flex-col gap-4">
                      <StreakCard title={torneo} general={general} local={local} visitante={visitante} compact />
                      {capitanesTorneo.length > 0 && (
                        <div className="flex flex-col gap-4 border-l-2 border-lime-400/40 pl-4">
                          {capitanesTorneo.map(({ capitan, general: gCap, local: lCap, visitante: vCap }) => (
                            <StreakCard
                              key={capitan}
                              title={`${torneo} · ${capitan}`}
                              general={gCap}
                              local={lCap}
                              visitante={vCap}
                              compact
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
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
