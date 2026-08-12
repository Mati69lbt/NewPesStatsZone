import { useMemo } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import PalmaresCard from '../components/PalmaresCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { buildPalmares } from '../utils/palmaresStats'

function PalmaresPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)
  const tournamentResults = useTournamentResults(user?.uid)

  const temporadas = useMemo(
    () => buildPalmares(matches, tournamentResults),
    [matches, tournamentResults]
  )

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando palmarés…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <div className="w-full max-w-4xl text-center">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-amber-400">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 5.25l3.75 3 3-4.5 3 4.5 3-4.5 3 4.5 3.75-3-1.5 12.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5L2.25 5.25z"
              />
            </svg>
            Palmarés
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Historial de títulos y participaciones
          </p>
        </div>

        {temporadas.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay competencias registradas todavía.
          </p>
        ) : (
          <div className="flex w-full max-w-4xl flex-col gap-8">
            {temporadas.map(({ temporada, items }) => (
              <section key={temporada} className="flex flex-col gap-3">
                <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                  {temporada}
                </h2>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <PalmaresCard
                      key={item.key}
                      torneo={item.torneo}
                      club={item.club}
                      partidosJugados={item.partidosJugados}
                      resultado={item.resultado}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default PalmaresPage
