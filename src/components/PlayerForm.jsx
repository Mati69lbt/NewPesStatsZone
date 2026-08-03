const POSICIONES = ['PT', 'DEF', 'LD', 'LI', 'MCD', 'MC', 'MO', 'EXI', 'EXD', 'CD', 'SD']

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500'

function PlayerForm({
  nombre,
  dorsal,
  posicion,
  onNombreChange,
  onDorsalChange,
  onPosicionChange,
  onSubmit,
  saving,
  isEditing,
  onCancelEdit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="mb-4 text-center text-xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
        Registro de jugadores
      </h2>

      <div className="mb-4">
        <label htmlFor="jugador-nombre" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Nombre del jugador
        </label>
        <input
          id="jugador-nombre"
          type="text"
          required
          value={nombre}
          onChange={(e) => onNombreChange(e.target.value)}
          placeholder="Nombre completo"
          className={FIELD_CLASSES}
        />
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="jugador-dorsal" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Dorsal
          </label>
          <input
            id="jugador-dorsal"
            type="number"
            required
            min="1"
            value={dorsal}
            onChange={(e) => onDorsalChange(e.target.value)}
            placeholder="Ej: 10"
            className={FIELD_CLASSES}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="jugador-posicion" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Posición
          </label>
          <select
            id="jugador-posicion"
            required
            value={posicion}
            onChange={(e) => onPosicionChange(e.target.value)}
            className={FIELD_CLASSES}
          >
            <option value="">Seleccioná</option>
            {POSICIONES.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-lime-400 py-2.5 font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Guardando...' : isEditing ? 'Actualizar jugador' : 'Guardar jugador'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="whitespace-nowrap rounded-lg border border-zinc-700 px-4 py-2.5 font-bold uppercase tracking-wide text-zinc-500 transition hover:text-zinc-300 dark:text-zinc-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default PlayerForm
