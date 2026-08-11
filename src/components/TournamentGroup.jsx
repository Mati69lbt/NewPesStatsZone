import { useState } from 'react'
import { getTemporadaLabel } from '../utils/dateFormat'
import MatchCardMobile from './MatchCardMobile'
import MatchRow from './MatchRow'

const RESULTADOS = ['En Curso', 'Campeón', 'Subcampeón', 'Semifinal', 'Cuartos de Final', 'Fase de Grupos', "Octavos de Final", "Fase de Grupos", "Tercero", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Lejos"]

const TIPOS = [
  { value: 'anual', label: 'Anual' },
  { value: 'europeo', label: 'Europeo' },
]

function TournamentGroup({
  torneo,
  matches,
  resultado,
  tipo,
  onResultadoChange,
  onTipoChange,
  onEdit,
  onDelete,
  onDateChange,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const isCampeon = resultado === 'Campeón'
  const tipoActual = tipo || 'europeo'

  const fechaCounts = matches.reduce((counts, m) => {
    counts.set(m.fecha, (counts.get(m.fecha) || 0) + 1)
    return counts
  }, new Map())

  const primeraFecha = matches.reduce(
    (min, m) => (!min || m.fecha < min ? m.fecha : min),
    null
  )
  const temporada = getTemporadaLabel(primeraFecha, tipoActual)

  return (
    <div
      className={`w-full overflow-hidden rounded-xl border shadow-lg ${
        isCampeon
          ? 'border-emerald-500/30 dark:border-emerald-500/40'
          : 'border-zinc-300 dark:border-zinc-700'
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-b border-t-4 px-5 py-4 ${
          isCampeon
            ? 'border-t-emerald-500 border-b-emerald-500/20 bg-emerald-50 dark:border-b-emerald-500/20 dark:bg-emerald-500/10'
            : 'border-t-blue-500/70 border-b-zinc-200 bg-white dark:border-b-zinc-700 dark:bg-zinc-800'
        }`}
      >
        <div className="min-w-0">
          <h2 className="max-w-[55vw] truncate text-base font-black text-zinc-900 dark:text-zinc-100 sm:max-w-none">
            {torneo} {temporada}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {matches.length} {matches.length === 1 ? 'partido jugado' : 'partidos jugados'}
          </p>
        </div>

        <div className="flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
          {TIPOS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onTipoChange(torneo, value)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                tipoActual === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Resultado
            </label>
            <select
              value={resultado || ''}
              onChange={(e) => onResultadoChange(torneo, e.target.value)}
              className="rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-900 outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            >
              <option value="">Sin definir</option>
              {RESULTADOS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? 'Expandir torneo' : 'Colapsar torneo'}
            className="rounded p-1 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-4 w-4 transition-transform ${collapsed ? '-rotate-90' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="bg-zinc-50 dark:bg-zinc-900">
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <th className="px-3 py-2">Fecha</th>
                  <th className="px-3 py-2">Resultado</th>
                  <th className="px-3 py-2" />
                  <th className="px-3 py-2">Capitán</th>
                  <th className="px-3 py-2">Goleadores Propios</th>
                  <th className="px-3 py-2">Goles del Rival</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <MatchRow
                    key={match.id}
                    match={match}
                    isDuplicateDate={fechaCounts.get(match.fecha) > 1}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDateChange={onDateChange}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-700 md:hidden">
            {matches.map((match, index) => (
              <MatchCardMobile
                key={match.id}
                match={match}
                jornada={matches.length - index}
                isDuplicateDate={fechaCounts.get(match.fecha) > 1}
                onEdit={onEdit}
                onDelete={onDelete}
                onDateChange={onDateChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentGroup
