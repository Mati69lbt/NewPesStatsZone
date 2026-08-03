import { getPositionColorClasses } from '../utils/positionColors'
import { sortByPosition } from '../utils/positionOrder'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 disabled:opacity-60 dark:bg-zinc-800 dark:text-zinc-100'

function FormationEditor({
  players,
  capitanId,
  titulares,
  onCaptainChange,
  onAddPlayer,
  onRemovePlayer,
  onSave,
  onCancel,
  saving,
  isEditing,
}) {
  const availableToAdd = players.filter((p) => !titulares.some((t) => t.id === p.id))
  const ordered = sortByPosition(titulares)

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-4 text-center text-xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
        {isEditing ? 'Editar formación' : 'Nueva formación'}
      </h2>

      <div className="mb-4">
        <label htmlFor="capitan" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Capitán
        </label>
        <select
          id="capitan"
          value={capitanId}
          onChange={(e) => onCaptainChange(e.target.value)}
          className={FIELD_CLASSES}
        >
          <option value="">Seleccioná capitán</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="titular" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Jugadores titulares ({titulares.length}/11)
        </label>
        <select
          id="titular"
          disabled={titulares.length >= 11}
          value=""
          onChange={(e) => {
            const player = players.find((p) => p.id === e.target.value)
            if (player) onAddPlayer(player)
          }}
          className={FIELD_CLASSES}
        >
          <option value="">Seleccioná jugador</option>
          {availableToAdd.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.posicion})
            </option>
          ))}
        </select>
      </div>

      {ordered.length > 0 && (
        <ul className="mb-6 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
          {ordered.map((player) => (
            <li key={player.id} className="flex items-center justify-between gap-2 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold uppercase ${getPositionColorClasses(player.posicion)}`}>
                  {player.posicion}
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{player.nombre}</span>
                {player.id === capitanId && (
                  <span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900">
                    C
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemovePlayer(player.id)}
                className="text-xs font-semibold text-red-500 hover:text-red-600"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving || !capitanId || titulares.length === 0}
          className="w-full rounded-lg bg-lime-400 py-2.5 font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Guardando...' : isEditing ? 'Actualizar formación' : 'Guardar formación'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="whitespace-nowrap rounded-lg border border-zinc-700 px-4 py-2.5 font-bold uppercase tracking-wide text-zinc-500 transition hover:text-zinc-300 dark:text-zinc-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default FormationEditor
