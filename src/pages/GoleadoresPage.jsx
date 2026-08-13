import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import GoleadoresHistoricoTable from '../components/GoleadoresHistoricoTable'
import GoleadoresStatSection from '../components/GoleadoresStatSection'
import MejoresAniosTable from '../components/MejoresAniosTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import useMatches from '../hooks/useMatches'
import { VISTAS } from '../utils/estadisticasVistas'
import {
  buildMejoresAniosGoleadores,
  buildTopAsistenciasHistorico,
  buildTopGoleadoresHistorico,
  buildTopPJHistorico,
  buildTopPromedioHistorico,
} from '../utils/goleadoresHistoricoStats'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const TODOS_CLUBES = 'Todos los clubes'

const FORMATOS = [
  { value: 'anual', label: 'Est. Anuales' },
  { value: 'europeo', label: 'Est. Europeo' },
]

const CONDICIONES = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

function GoleadoresPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const matches = useMatches(user?.uid)
  const navigate = useNavigate()

  const [selectedClub, setSelectedClub] = useState(TODOS_CLUBES)
  const [formato, setFormato] = useState('anual')

  const clubes = useMemo(() => {
    const set = new Set(matches.map((m) => m.club).filter(Boolean))
    if (club) set.add(club)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [matches, club])

  const clubMatches = useMemo(
    () => (selectedClub === TODOS_CLUBES ? matches : matches.filter((m) => m.club === selectedClub)),
    [matches, selectedClub]
  )

  const matchesPorCondicion = useMemo(
    () => ({
      general: clubMatches,
      local: clubMatches.filter((m) => m.condicion === 'local'),
      visitante: clubMatches.filter((m) => m.condicion === 'visitante'),
    }),
    [clubMatches]
  )

  const dataPorMetrica = useMemo(() => {
    const result = { topGoleadores: {}, topAsistencias: {}, topPromedio: {}, topPJ: {}, mejoresAnios: {} }
    for (const { value } of CONDICIONES) {
      const condicionMatches = matchesPorCondicion[value]
      result.topGoleadores[value] = buildTopGoleadoresHistorico(condicionMatches, formato)
      result.topAsistencias[value] = buildTopAsistenciasHistorico(condicionMatches, formato)
      result.topPromedio[value] = buildTopPromedioHistorico(condicionMatches, formato)
      result.topPJ[value] = buildTopPJHistorico(condicionMatches, formato)
      result.mejoresAnios[value] = buildMejoresAniosGoleadores(condicionMatches, formato)
    }
    return result
  }, [matchesPorCondicion, formato])

  const ACORDEONES = [
    { key: 'topGoleadores', title: 'Top 15 Goleadores', Table: GoleadoresHistoricoTable },
    {
      key: 'topAsistencias',
      title: 'Top 15 Asistencias',
      Table: GoleadoresHistoricoTable,
      tableProps: { valueKey: 'asistencias', valueLabel: 'A', promedioKey: 'promedioAsistencias' },
    },
    { key: 'topPromedio', title: 'Top 15 Promedio', Table: GoleadoresHistoricoTable },
    { key: 'topPJ', title: 'Top 15 Más PJ', Table: GoleadoresHistoricoTable },
    { key: 'mejoresAnios', title: 'Mejores Años Goleadores', Table: MejoresAniosTable },
  ]

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando goleadores…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden px-1 py-6 sm:px-4 sm:py-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 sm:gap-6">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-lime-500">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.75l2.317 4.694 5.183.753-3.75 3.656.885 5.164L12 15.5l-4.635 2.517.885-5.164-3.75-3.656 5.183-.753L12 3.75z"
                />
              </svg>
              Goleadores
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Estadísticas históricas de goleadores
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
                <label className={LABEL_CLASSES}>Ir a</label>
                <select value="/goleadores" onChange={(e) => navigate(e.target.value)} className={FIELD_CLASSES}>
                  {VISTAS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={LABEL_CLASSES}>Vista</label>
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
          </div>

          <div className="flex w-full flex-col gap-3">
            {ACORDEONES.map(({ key, title, Table, tableProps }, index) => (
              <GoleadoresStatSection
                key={key}
                title={title}
                Table={Table}
                dataPorCondicion={dataPorMetrica[key]}
                defaultOpen={index === 0}
                tableProps={tableProps}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default GoleadoresPage
