import { formatDateShort } from '../utils/dateFormat'
import { RESULT_CLASSES, buildGoleadoresLabel, getMatchResultado, getScoreboard } from '../utils/matchDisplay'

function MatchCardMobile({ match, jornada, onEdit, onDelete }) {
  const resultado = getMatchResultado(match)
  const { nombreLocal, golesLocal, golesVisitante, nombreVisitante } = getScoreboard(match)
  const goleadoresPropios = buildGoleadoresLabel(match.incidenciasClub)
  const goleadoresRivales = buildGoleadoresLabel(match.incidenciasRival)

  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{formatDateShort(match.fecha)}</span>
        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Fecha: {jornada}</span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(match)}
            aria-label="Editar partido"
            title="Editar"
            className="rounded p-1 text-zinc-400 transition hover:text-lime-500 dark:hover:text-lime-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 18.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(match)}
            aria-label="Eliminar partido"
            title="Eliminar"
            className="rounded p-1 text-zinc-400 transition hover:text-red-500"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">{match.capitanNombre || '-'}</span>
        <span
          className={`flex-1 truncate rounded-full px-2.5 py-1 text-center text-xs font-bold ${RESULT_CLASSES[resultado]}`}
        >
          {nombreLocal} {golesLocal} - {golesVisitante} {nombreVisitante}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-center">
        <div>
          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            Goles {match.club}
          </p>
          <p className="truncate text-xs text-zinc-700 dark:text-zinc-300">{goleadoresPropios}</p>
        </div>
        <div>
          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            Goles {match.rival}
          </p>
          <p className="truncate text-xs text-zinc-700 dark:text-zinc-300">{goleadoresRivales}</p>
        </div>
      </div>
    </div>
  )
}

export default MatchCardMobile
