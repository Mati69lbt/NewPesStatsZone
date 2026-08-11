import InlineDateEditor from './InlineDateEditor'
import {
  RESULT_CLASSES,
  buildAsistentesLabel,
  buildGoleadoresLabel,
  getMatchResultado,
  getScoreboard,
} from '../utils/matchDisplay'

function MatchRow({ match, isDuplicateDate, onEdit, onDelete, onDateChange }) {
  const resultado = getMatchResultado(match)
  const { nombreLocal, golesLocal, golesVisitante, nombreVisitante } = getScoreboard(match)
  const goleadoresPropios = buildGoleadoresLabel(match.incidenciasClub)
  const asistentesPropios = buildAsistentesLabel(match.incidenciasClub)
  const goleadoresRivales = buildGoleadoresLabel(match.incidenciasRival)

  return (
    <tr className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
      <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
        <InlineDateEditor
          fecha={match.fecha}
          isDuplicate={isDuplicateDate}
          onSave={(newFecha) => onDateChange(match, newFecha)}
        />
      </td>
      <td className="px-3 py-3">
        <span
          className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${RESULT_CLASSES[resultado]}`}
        >
          {nombreLocal} {golesLocal} - {golesVisitante} {nombreVisitante}
        </span>
      </td>
      <td className="px-3 py-3">
        <button
          type="button"
          onClick={() => onEdit(match)}
          aria-label="Editar partido"
          title="Editar"
          className="rounded p-1 text-zinc-400 transition hover:text-lime-500 dark:hover:text-lime-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 18.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z" />
          </svg>
        </button>
      </td>
      <td className="px-3 py-3 text-sm text-zinc-700 dark:text-zinc-300">{match.capitanNombre || '-'}</td>
      <td className="px-3 py-3 text-sm text-zinc-700 dark:text-zinc-300">
        <p>{goleadoresPropios}</p>
        {asistentesPropios && (
          <p className="mt-0.5 text-xs font-normal text-zinc-400 dark:text-zinc-500">
            🎯 {asistentesPropios}
          </p>
        )}
      </td>
      <td className="px-3 py-3 text-sm text-zinc-700 dark:text-zinc-300">{goleadoresRivales}</td>
      <td className="px-3 py-3">
        <button
          type="button"
          onClick={() => onDelete(match)}
          aria-label="Eliminar partido"
          title="Eliminar"
          className="rounded p-1 text-zinc-400 transition hover:text-red-500"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default MatchRow
