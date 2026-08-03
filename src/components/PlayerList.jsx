import { getPositionColorClasses } from '../utils/positionColors'

function PlayerList({ players, onEdit, onDelete }) {
  if (players.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Todavía no hay jugadores registrados.
      </p>
    )
  }

  return (
    <div className="grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {players.map((player) => (
        <div
          key={player.id}
          className="relative flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-center shadow dark:border-zinc-700 dark:bg-zinc-800"
        >
          <div className="absolute right-2 top-2 flex gap-1">
            <button
              type="button"
              onClick={() => onEdit(player)}
              aria-label="Editar jugador"
              title="Editar"
              className="rounded p-1 text-zinc-400 transition hover:text-lime-500 dark:hover:text-lime-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 18.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.862 4.487z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onDelete(player)}
              aria-label="Eliminar jugador"
              title="Eliminar"
              className="rounded p-1 text-zinc-400 transition hover:text-red-500"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${getPositionColorClasses(player.posicion)}`}
          >
            {player.posicion} - #{player.dorsal}
          </span>
          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {player.nombre}
          </p>
        </div>
      ))}
    </div>
  )
}

export default PlayerList
