import { formatDateDisplay } from '../utils/dateFormat'
import { RESULT_CLASSES, buildGoleadoresLabel, getMatchResultado, getScoreboard } from '../utils/matchDisplay'

const BORDER_CLASSES = {
  victoria: 'border-emerald-500/70 dark:border-emerald-500/60',
  empate: 'border-amber-500/70 dark:border-amber-500/60',
  derrota: 'border-rose-500/70 dark:border-rose-500/60',
}

const RESULTADO_LABELS = { victoria: 'GANADO', empate: 'EMPATADO', derrota: 'PERDIDO' }
const CONDICION_LABELS = { local: 'LOCAL', visitante: 'VISITANTE', neutral: 'NEUTRO' }

function NextMatchCard({ match, temporada }) {
  const resultado = getMatchResultado(match)
  const { nombreLocal, golesLocal, golesVisitante, nombreVisitante } = getScoreboard(match)
  const goleadoresClub = buildGoleadoresLabel(match.incidenciasClub)
  const goleadoresRival = buildGoleadoresLabel(match.incidenciasRival)

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border-2 bg-white p-4 shadow dark:bg-zinc-900 ${BORDER_CLASSES[resultado]}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="truncate text-[11px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {match.torneo} {temporada}
        </span>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${RESULT_CLASSES[resultado]}`}
        >
          {RESULTADO_LABELS[resultado]}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
        <span>{formatDateDisplay(match.fecha)}</span>
        <span>{CONDICION_LABELS[match.condicion]}</span>
        <span className="truncate">CAP: {match.capitanNombre || '-'}</span>
      </div>

      <div className="rounded-xl bg-zinc-100 p-3 text-center dark:bg-zinc-800">
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          {nombreLocal}{' '}
          <span className="text-lg font-black">
            {golesLocal} - {golesVisitante}
          </span>{' '}
          {nombreVisitante}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="mb-1 truncate font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {match.club}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">{goleadoresClub}</p>
        </div>
        <div>
          <p className="mb-1 truncate font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {match.rival}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">{goleadoresRival}</p>
        </div>
      </div>
    </div>
  )
}

export default NextMatchCard
