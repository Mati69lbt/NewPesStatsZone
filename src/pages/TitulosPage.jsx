import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import TituloCard from '../components/TituloCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { buildPalmares, buildTitulos } from '../utils/palmaresStats'

function TitulosPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)
  const tournamentResults = useTournamentResults(user?.uid)

  const temporadas = useMemo(
    () => buildPalmares(matches, tournamentResults),
    [matches, tournamentResults]
  )

  const titulos = useMemo(() => buildTitulos(temporadas), [temporadas])

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando títulos…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <div className="w-full max-w-4xl">
          <Link
            to="/palmares"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 transition hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Volver a Palmarés
          </Link>
        </div>

        <div className="w-full max-w-4xl text-center">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            🏆 Vitrina de Títulos
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Solo campeonatos obtenidos
          </p>
        </div>

        {titulos.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Todavía no hay títulos registrados.
          </p>
        ) : (
          <div className="flex w-full max-w-4xl flex-col gap-8">
            {titulos.map(({ temporada, items }) => (
              <section key={temporada} className="flex flex-col gap-3">
                <h2 className="text-lg font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
                  {temporada}
                </h2>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <TituloCard
                      key={item.key}
                      torneo={item.torneo}
                      club={item.club}
                      partidosJugados={item.partidosJugados}
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

export default TitulosPage
