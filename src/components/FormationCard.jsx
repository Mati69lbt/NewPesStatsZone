import { getPositionColorClasses } from '../utils/positionColors'
import { sortByPosition } from '../utils/positionOrder'

function FormationCard({ formation, onEdit, onDelete }) {
  const ordered = sortByPosition(formation.jugadores ?? [])

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="truncate text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
          {formation.capitanNombre ? `${formation.capitanNombre}` : 'Formación'}
        </h3>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onEdit(formation)}
            aria-label="Modificar formación"
            title="Modificar"
            className="rounded p-1 text-zinc-400 transition hover:text-lime-500 dark:hover:text-lime-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 18.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(formation)}
            aria-label="Eliminar formación"
            title="Eliminar"
            className="rounded p-1 text-zinc-400 transition hover:text-red-500"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <ul className="divide-y divide-zinc-100 dark:divide-zinc-700">
        {ordered.map((player) => (
          <li key={player.id} className="grid grid-cols-[25px_25px_1fr_auto] items-center gap-3 py-1.5">
            <span
              className={`flex w-8 items-center justify-center rounded-full py-0.5 text-center text-[10px] font-bold uppercase ${getPositionColorClasses(player.posicion)}`}
            >
              {player.posicion}
            </span>
            <span className="w-8 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              #{player.dorsal}
            </span>
            <span className="truncate text-left text-sm text-zinc-900 dark:text-zinc-100">{player.nombre}</span>
            {player.id === formation.capitanId ? (
              <span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900">
                C
              </span>
            ) : (
              <span />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FormationCard
