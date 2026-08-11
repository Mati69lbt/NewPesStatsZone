import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import TemporadaGroup from '../components/TemporadaGroup'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { computeStats } from '../utils/versusStats'
import { getTemporadaLabel } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const TODOS_CLUBES = 'Todos los clubes'

const FORMATOS = [
  { value: 'anual', label: 'Anual' },
  { value: 'europeo', label: 'Europeo' },
]

function buildBlockStats(matches) {
  return {
    general: computeStats(matches),
    local: computeStats(matches.filter((m) => m.condicion === 'local')),
    visitante: computeStats(matches.filter((m) => m.condicion === 'visitante')),
    neutral: computeStats(matches.filter((m) => m.condicion === 'neutral')),
  }
}

function temporadaSortKey(temporada) {
  const year = Number.parseInt(temporada, 10)
  return Number.isNaN(year) ? 0 : year
}

function TemporadasPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)

  const [formato, setFormato] = useState('europeo')
  const [selectedClub, setSelectedClub] = useState(TODOS_CLUBES)

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  const clubMatches = useMemo(
    () => (selectedClub === TODOS_CLUBES ? matches : matches.filter((m) => m.club === selectedClub)),
    [matches, selectedClub]
  )

  const temporadas = useMemo(() => {
    const groups = new Map()

    for (const match of clubMatches) {
      if (!match.club || !match.fecha) continue
      const temporada = getTemporadaLabel(match.fecha, formato)
      const key = `${temporada}::${match.club}`
      if (!groups.has(key)) groups.set(key, { temporada, club: match.club, matches: [] })
      groups.get(key).matches.push(match)
    }

    const rows = [...groups.values()].map(({ temporada, club: groupClub, matches: groupMatches }) => {
      const capitanNombres = [...new Set(groupMatches.map((m) => m.capitanNombre).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
      )
      const captains = capitanNombres.map((capitan) => ({
        capitan,
        stats: buildBlockStats(groupMatches.filter((m) => m.capitanNombre === capitan)),
      }))

      return {
        key: `${temporada}::${groupClub}`,
        temporada,
        club: groupClub,
        teamStats: buildBlockStats(groupMatches),
        captains,
      }
    })

    return rows.sort((a, b) => {
      const diff = temporadaSortKey(b.temporada) - temporadaSortKey(a.temporada)
      return diff !== 0 ? diff : a.club.localeCompare(b.club)
    })
  }, [clubMatches, formato])

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando temporadas…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
        <div className="w-full max-w-6xl text-center">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-7 w-7 text-lime-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 5.25h15a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V6a.75.75 0 01.75-.75z"
              />
            </svg>
            Temporadas
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Rendimiento por año y club dirigido
          </p>
        </div>

        <div className="flex w-full max-w-6xl flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label className={LABEL_CLASSES}>Formato</label>
            <div className="flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
              {FORMATOS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormato(value)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
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

          <div className="w-full sm:w-64">
            <label className={LABEL_CLASSES}>Clubes</label>
            <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className={FIELD_CLASSES}>
              <option value={TODOS_CLUBES}>{TODOS_CLUBES}</option>
              {clubes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {temporadas.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay partidos registrados para armar temporadas.
          </p>
        ) : (
          <div className="flex w-full max-w-6xl flex-col gap-4">
            {temporadas.map((t, index) => (
              <TemporadaGroup
                key={t.key}
                temporada={t.temporada}
                club={t.club}
                teamStats={t.teamStats}
                captains={t.captains}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default TemporadasPage
