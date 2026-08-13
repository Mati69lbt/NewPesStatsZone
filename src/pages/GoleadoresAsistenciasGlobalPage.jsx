import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import GoleadoresAsistenciasGlobalTable from '../components/GoleadoresAsistenciasGlobalTable'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import { buildAsistenciasGlobalRows, buildGoleadoresGlobalRows } from '../utils/goleadoresAsistenciasGlobalStats'
import { VISTAS } from '../utils/estadisticasVistas'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-2 py-1.5 text-xs text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100 sm:px-3 sm:py-2 sm:text-sm'

const LABEL_CLASSES =
  'mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:mb-1 sm:text-xs'

const MODOS = [
  { value: 'goleadores', label: '⚽ ' },
  { value: 'asistencias', label: '🎯' },
]

function sortRows(rows, sortKey, sortDir) {
  const sorted = [...rows].sort((a, b) => {
    if (sortKey === 'nombre') return a.nombre.localeCompare(b.nombre)
    return b[sortKey] - a[sortKey] || a.nombre.localeCompare(b.nombre)
  })
  return sortDir === 'desc' ? sorted : sorted.reverse()
}

function GoleadoresAsistenciasGlobalPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)
  const navigate = useNavigate()

  const [modo, setModo] = useState('goleadores')
  const [minimo, setMinimo] = useState(5)
  const [sortKey, setSortKey] = useState('valor')
  const [sortDir, setSortDir] = useState('desc')

  const isGoles = modo === 'goleadores'

  const goleadoresRows = useMemo(() => buildGoleadoresGlobalRows(matches), [matches])
  const asistenciasRows = useMemo(() => buildAsistenciasGlobalRows(matches), [matches])
  const rows = isGoles ? goleadoresRows : asistenciasRows

  const filteredRows = useMemo(() => rows.filter((row) => row.valor >= minimo), [rows, minimo])
  const sortedRows = useMemo(() => sortRows(filteredRows, sortKey, sortDir), [filteredRows, sortKey, sortDir])

  function handleModo(value) {
    setModo(value)
    setSortKey('valor')
    setSortDir('desc')
  }

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
        <Navbar />
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <Loader label="Cargando estadísticas globales…" />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full max-w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex w-full max-w-full flex-1 flex-col items-center overflow-x-hidden px-2 py-10 sm:px-4">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 md:max-w-3xl">
          <div className="text-center">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-lime-500 sm:h-7 sm:w-7">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.75l2.317 4.694 5.183.753-3.75 3.656.885 5.164L12 15.5l-4.635 2.517.885-5.164-3.75-3.656 5.183-.753L12 3.75z"
                />
              </svg>
              Goleadores y Asistencias Global
            </h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {sortedRows.length} {sortedRows.length === 1 ? 'jugador' : 'jugadores'}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow dark:border-zinc-700/50 dark:bg-zinc-800 sm:p-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div>
                <label className={LABEL_CLASSES}>{isGoles ? 'Mín. goles' : 'Mín. asist.'}</label>
                <input
                  type="number"
                  min="0"
                  value={minimo}
                  onChange={(e) => setMinimo(Number(e.target.value) || 0)}
                  className={FIELD_CLASSES}
                />
              </div>

              <div>
                <label className={LABEL_CLASSES}>Modo</label>
                <div className="flex w-full overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
                  {MODOS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleModo(value)}
                      title={label}
                      className={`flex-1 truncate px-1 py-1.5 text-[10px] font-bold uppercase tracking-wide transition sm:px-2 sm:py-2 sm:text-xs ${
                        modo === value
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
                <label className={LABEL_CLASSES}>Vista</label>
                <select value="/goleadores-global" onChange={(e) => navigate(e.target.value)} className={FIELD_CLASSES}>
                  {VISTAS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <GoleadoresAsistenciasGlobalTable rows={sortedRows} modo={modo} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
        </div>
      </main>
    </div>
  )
}

export default GoleadoresAsistenciasGlobalPage
