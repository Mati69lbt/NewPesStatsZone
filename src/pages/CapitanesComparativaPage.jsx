import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import CapitanComparativaTable from '../components/CapitanComparativaTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { computeStats } from '../utils/versusStats'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const CONDICIONES = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

function buildCapitanStats(matches, capitan, condicion) {
  const capitanMatches = matches.filter((m) => m.capitanNombre === capitan)
  const filtered = condicion === 'general' ? capitanMatches : capitanMatches.filter((m) => m.condicion === condicion)
  const stats = computeStats(filtered)
  const pct = stats.ptsPosibles > 0 ? Math.round((stats.pts / stats.ptsPosibles) * 100) : 0
  const promGf = stats.pj > 0 ? stats.gf / stats.pj : 0
  const promGc = stats.pj > 0 ? stats.gc / stats.pj : 0
  return { ...stats, pct, promGf, promGc }
}

function CapitanesComparativaPage() {
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

  const clubMatches = useMemo(() => matches.filter((m) => m.club === clubActivo), [matches, clubActivo])

  const capitanes = useMemo(
    () => [...new Set(clubMatches.map((m) => m.capitanNombre).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [clubMatches]
  )

  const [condicion, setCondicion] = useState('general')

  const capitanesPorPj = useMemo(() => {
    return capitanes
      .map((capitan) => ({ capitan, pj: clubMatches.filter((m) => m.capitanNombre === capitan).length }))
      .sort((a, b) => b.pj - a.pj || a.capitan.localeCompare(b.capitan))
  }, [capitanes, clubMatches])

  const capitanAActivo = capitanesPorPj[0]?.capitan || ''
  const capitanBActivo = capitanesPorPj[1]?.capitan || ''

  const statsA = useMemo(
    () => buildCapitanStats(clubMatches, capitanAActivo, condicion),
    [clubMatches, capitanAActivo, condicion]
  )
  const statsB = useMemo(
    () => buildCapitanStats(clubMatches, capitanBActivo, condicion),
    [clubMatches, capitanBActivo, condicion]
  )

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando comparativa…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4">
          <div>
            <Link
              to="/capitanes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 transition hover:text-lime-500 dark:text-zinc-400 dark:hover:text-lime-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Volver a Capitanes
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Comparativa de Capitanes
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Cara a cara dentro de un mismo club
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:flex-row sm:items-end sm:justify-center">
            <div className="w-full sm:w-64">
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

            <div className="flex flex-col items-center gap-1">
              <label className={LABEL_CLASSES}>Condición</label>
              <div className="flex w-fit flex-wrap justify-center overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
                {CONDICIONES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCondicion(value)}
                    className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
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

          {capitanes.length < 2 ? (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Este club necesita al menos dos capitanes registrados para comparar.
            </p>
          ) : (
            <CapitanComparativaTable capitanA={capitanAActivo} statsA={statsA} capitanB={capitanBActivo} statsB={statsB} />
          )}
        </div>
      </main>
    </div>
  )
}

export default CapitanesComparativaPage
