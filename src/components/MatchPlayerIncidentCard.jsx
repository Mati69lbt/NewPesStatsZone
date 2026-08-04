function MatchPlayerIncidentCard({ incidencia, onUpdate, onRemove }) {
  const setGoles = (value) => onUpdate(incidencia.id, { goles: incidencia.goles === value ? 0 : value })

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{incidencia.nombre}</span>
        <button
          type="button"
          onClick={() => onRemove(incidencia.id)}
          aria-label={`Quitar a ${incidencia.nombre}`}
          title="Quitar"
          className="rounded p-1 text-red-500 transition hover:text-red-600"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-700 dark:text-zinc-300">
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={incidencia.goles === 1} onChange={() => setGoles(1)} />
          Gol
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={incidencia.goles === 2} onChange={() => setGoles(2)} />
          Doblete
        </label>
        <label className="flex items-center gap-1.5">
          <input type="checkbox" checked={incidencia.goles === 3} onChange={() => setGoles(3)} />
          Hat Trick
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={incidencia.expulsado}
            onChange={() => onUpdate(incidencia.id, { expulsado: !incidencia.expulsado })}
          />
          Expulsión
        </label>
        <label className="flex items-center gap-1.5">
          Asistencias
          <select
            value={incidencia.asistencias}
            onChange={(e) => onUpdate(incidencia.id, { asistencias: Number(e.target.value) })}
            className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-1 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default MatchPlayerIncidentCard
