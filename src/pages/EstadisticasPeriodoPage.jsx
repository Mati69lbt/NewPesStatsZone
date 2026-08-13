import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import EstadisticaPeriodoGroup from '../components/EstadisticaPeriodoGroup'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { buildPeriodoGroups } from '../utils/periodoStats'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const TODOS_CLUBES = 'Todos los clubes'

const FORMATOS = [
  { value: 'anual', label: 'Año Calendario' },
  { value: 'europeo', label: 'Temporada Europea' },
]

const METRICAS = [
  { value: 'goleadores', label: '⚽ Goleadores' },
  { value: 'asistencias', label: '🎯 Asistencias' },
]

const CONDICIONES = [
  { value: 'general', label: 'Gral' },
  { value: 'local', label: 'Loc' },
  { value: 'visitante', label: 'Vis' },
]

function EstadisticasPeriodoPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)

  const [selectedClub, setSelectedClub] = useState(TODOS_CLUBES)
  const [formato, setFormato] = useState('anual')
  const [metrica, setMetrica] = useState('goleadores')
  const [condicion, setCondicion] = useState('general')

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  const clubMatches = useMemo(
    () => (selectedClub === TODOS_CLUBES ? matches : matches.filter((m) => m.club === selectedClub)),
    [matches, selectedClub]
  )

  const condicionMatches = useMemo(
    () => (condicion === 'general' ? clubMatches : clubMatches.filter((m) => m.condicion === condicion)),
    [clubMatches, condicion]
  )

  const periodos = useMemo(() => buildPeriodoGroups(condicionMatches, formato), [condicionMatches, formato])

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando estadísticas…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-6 px-2 py-10 sm:px-4">
        <div className="mx-auto w-full max-w-md text-center sm:max-w-3xl">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-lime-500 sm:h-7 sm:w-7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75l2.317 4.694 5.183.753-3.75 3.656.885 5.164L12 15.5l-4.635 2.517.885-5.164-3.75-3.656 5.183-.753L12 3.75z"
              />
            </svg>
            Estadísticas por Período
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Goleadores y asistidores, período por período
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:max-w-3xl">
          <div>
            <label className={LABEL_CLASSES}>Club</label>
            <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className={FIELD_CLASSES}>
              <option value={TODOS_CLUBES}>{TODOS_CLUBES}</option>
              {clubes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL_CLASSES}>Período</label>
            <div className="flex w-full overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
              {FORMATOS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormato(value)}
                  className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                    formato === value
                      ? 'bg-lime-400 text-zinc-900'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={LABEL_CLASSES}>Métrica</label>
            <div className="flex w-full overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
              {METRICAS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMetrica(value)}
                  className={`flex-1 px-3 py-2 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                    metrica === value
                      ? 'bg-lime-400 text-zinc-900'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={LABEL_CLASSES}>Condición</label>
            <div className="grid w-full grid-cols-3 overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
              {CONDICIONES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCondicion(value)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                    condicion === value
                      ? 'bg-lime-400 text-zinc-900'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {periodos.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay partidos registrados para esta selección.
          </p>
        ) : (
          <div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:max-w-3xl">
            {periodos.map((p, index) => (
              <EstadisticaPeriodoGroup
                key={p.periodo}
                periodo={p.periodo}
                matches={p.matches}
                metrica={metrica}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default EstadisticasPeriodoPage
