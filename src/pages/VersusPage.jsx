import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import VersusStatCell from '../components/VersusStatCell'
import Loader from '../components/Loader'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import useFormations from '../hooks/useFormations'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-1.5 py-1.5 text-[11px] text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100 sm:px-3 sm:py-2 sm:text-sm'

const LABEL_CLASSES =
  'mb-1 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-xs'

const AMBITOS_BASE = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

const CAMPOS = [
  { value: 'nombre', label: 'Nombre' },
  { value: 'pj', label: 'PJ' },
  { value: 'g', label: 'G' },
  { value: 'e', label: 'E' },
  { value: 'p', label: 'P' },
  { value: 'gp', label: 'G/P' },
  { value: 'gf', label: 'GF' },
  { value: 'gc', label: 'GC' },
  { value: 'df', label: 'DF' },
]

function computeStats(matches) {
  let g = 0
  let e = 0
  let p = 0
  let gf = 0
  let gc = 0

  for (const match of matches) {
    const golesClub = match.golesClub ?? 0
    const golesRival = match.golesRival ?? 0
    gf += golesClub
    gc += golesRival
    if (golesClub > golesRival) g += 1
    else if (golesClub < golesRival) p += 1
    else e += 1
  }

  return { g, e, p, pj: matches.length, gf, gc, df: gf - gc, gp: g - p }
}

function SortButton({ value, label, active, orden, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`inline-flex w-full items-center justify-center gap-1 rounded-full border px-1 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider transition sm:text-xs ${
        active
          ? 'border-lime-400 bg-lime-400/10 text-lime-500 dark:text-lime-400'
          : 'border-zinc-300 text-zinc-500 hover:border-lime-400/60 dark:border-zinc-600 dark:text-zinc-400'
      }`}
    >
      {label}
      {active && <span>{orden === 'asc' ? '↑' : '↓'}</span>}
    </button>
  )
}

function VersusPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const formations = useFormations(user?.uid)

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  const [selectedClub, setSelectedClub] = useState('')
  const [ambito, setAmbito] = useState('general')
  const [sort, setSort] = useState({ campo: 'nombre', orden: 'asc' })
  const [campeonato, setCampeonato] = useState('todos')
  const { campo, orden } = sort

  const handleSort = (field) => {
    setSort((prev) =>
      prev.campo === field
        ? { campo: field, orden: prev.orden === 'desc' ? 'asc' : 'desc' }
        : { campo: field, orden: 'desc' }
    )
  }

  const clubActivo = selectedClub || club || clubes[0] || ''

  const clubMatches = useMemo(
    () => matches.filter((m) => m.club === clubActivo),
    [matches, clubActivo]
  )

  const campeonatos = useMemo(
    () => [...new Set(clubMatches.map((m) => m.torneo).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [clubMatches]
  )

  const ambitoMatches = useMemo(() => {
    if (ambito === 'general') return clubMatches
    if (ambito.startsWith('capitan:')) {
      const capitanNombre = ambito.slice('capitan:'.length)
      return clubMatches.filter((m) => m.capitanNombre === capitanNombre)
    }
    return clubMatches.filter((m) => m.condicion === ambito)
  }, [clubMatches, ambito])

  const filteredMatches = useMemo(
    () => (campeonato === 'todos' ? ambitoMatches : ambitoMatches.filter((m) => m.torneo === campeonato)),
    [ambitoMatches, campeonato]
  )

  const capitanes = useMemo(
    () => [...new Set(formations.map((f) => f.capitanNombre).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [formations]
  )

  const AMBITOS = useMemo(
    () => [
      ...AMBITOS_BASE,
      ...capitanes.map((capitan) => ({ value: `capitan:${capitan}`, label: capitan })),
    ],
    [capitanes]
  )

  const rivales = useMemo(() => {
    const rivalNames = [...new Set(filteredMatches.map((m) => m.rival).filter(Boolean))]

    const rows = rivalNames.map((rival) => {
      const rivalMatches = filteredMatches.filter((m) => m.rival === rival)
      const general = computeStats(rivalMatches)
      const local = computeStats(rivalMatches.filter((m) => m.condicion === 'local'))
      const visitante = computeStats(rivalMatches.filter((m) => m.condicion === 'visitante'))
      const porCapitan = capitanes.map((capitan) => ({
        capitan,
        stats: computeStats(rivalMatches.filter((m) => m.capitanNombre === capitan)),
      }))

      return { rival, general, local, visitante, porCapitan }
    })

    const direction = orden === 'asc' ? 1 : -1
    return rows.sort((a, b) => {
      if (campo === 'nombre') return a.rival.localeCompare(b.rival) * direction
      return (a.general[campo] - b.general[campo]) * direction
    })
  }, [filteredMatches, capitanes, campo, orden])

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

      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
        <div className="w-full max-w-6xl text-center">
          <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            Estadísticas Versus
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Historial de enfrentamientos por rival
          </p>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-3 gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:gap-3 sm:p-4">
          <div>
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

          <div>
            <label className={LABEL_CLASSES}>Ámbito</label>
            <select value={ambito} onChange={(e) => setAmbito(e.target.value)} className={FIELD_CLASSES}>
              {AMBITOS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL_CLASSES}>Campeonato</label>
            <select
              value={campeonato}
              onChange={(e) => setCampeonato(e.target.value)}
              className={FIELD_CLASSES}
            >
              <option value="todos">Todos</option>
              {campeonatos.map((torneo) => (
                <option key={torneo} value={torneo}>
                  {torneo}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-3">
            <label className={LABEL_CLASSES}>Ordenar por</label>
            <div className="flex flex-col gap-1.5">
              <div className="grid grid-cols-4 gap-1.5">
                {CAMPOS.slice(0, 4).map(({ value, label }) => (
                  <SortButton
                    key={value}
                    value={value}
                    label={label}
                    active={campo === value}
                    orden={orden}
                    onClick={handleSort}
                  />
                ))}
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {CAMPOS.slice(4).map(({ value, label }) => (
                  <SortButton
                    key={value}
                    value={value}
                    label={label}
                    active={campo === value}
                    orden={orden}
                    onClick={handleSort}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {rivales.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay enfrentamientos registrados con los filtros seleccionados.
          </p>
        ) : (
          <div className="relative w-full max-w-6xl overflow-auto rounded-xl border border-zinc-200 shadow dark:border-zinc-700/50" style={{ maxHeight: '70vh' }}>
            <table className="w-full border-separate border-spacing-0 bg-white dark:bg-zinc-900">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <th className="sticky left-0 top-0 z-30 w-36 max-w-[150px] border-b border-zinc-200 bg-zinc-100 px-3 py-3 text-left dark:border-zinc-700/50 dark:bg-zinc-800">
                    Rival
                  </th>
                  <th className="sticky top-0 z-20 min-w-[132px] border-b border-zinc-200 bg-zinc-100 px-2 py-3 text-center dark:border-zinc-700/50 dark:bg-zinc-800">
                    General
                  </th>
                  <th className="sticky top-0 z-20 min-w-[132px] border-b border-zinc-200 bg-zinc-100 px-2 py-3 text-center dark:border-zinc-700/50 dark:bg-zinc-800">
                    Local
                  </th>
                  <th className="sticky top-0 z-20 min-w-[132px] border-b border-zinc-200 bg-zinc-100 px-2 py-3 text-center dark:border-zinc-700/50 dark:bg-zinc-800">
                    Visitante
                  </th>
                  {capitanes.map((capitan) => (
                    <th
                      key={capitan}
                      className="sticky top-0 z-20 min-w-[132px] border-b border-zinc-200 bg-zinc-100 px-2 py-3 text-center dark:border-zinc-700/50 dark:bg-zinc-800"
                    >
                      {capitan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700/50">
                {rivales.map(({ rival, general, local, visitante, porCapitan }, index) => (
                  <tr key={rival}>
                    <td className="sticky left-0 z-10 w-36 max-w-[150px] whitespace-normal break-words bg-white px-3 py-3 text-sm font-bold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
                      {index + 1}. {rival}
                    </td>
                    <td className="px-2 py-2">
                      <VersusStatCell stats={general} />
                    </td>
                    <td className="px-2 py-2">
                      <VersusStatCell stats={local} />
                    </td>
                    <td className="px-2 py-2">
                      <VersusStatCell stats={visitante} />
                    </td>
                    {porCapitan.map(({ capitan, stats }) => (
                      <td key={capitan} className="px-2 py-2">
                        <VersusStatCell stats={stats} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

export default VersusPage
