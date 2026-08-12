const GOLES_POR_MARCADOR = { golMarcado: 1, dobleteMarcado: 2, hatTrickMarcado: 3 }

function MatchPlayerIncidentCard({ incidencia, onUpdate, onRemove }) {
  const toggleMarcador = (key) => {
    const marcadores = {
      golMarcado: incidencia.golMarcado,
      dobleteMarcado: incidencia.dobleteMarcado,
      hatTrickMarcado: incidencia.hatTrickMarcado,
      [key]: !incidencia[key],
    }
    const goles = Object.entries(marcadores).reduce(
      (sum, [k, activo]) => sum + (activo ? GOLES_POR_MARCADOR[k] : 0),
      0
    )
    onUpdate(incidencia.id, { ...marcadores, goles })
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          {incidencia.nombre}
          {incidencia.goles > 0 && (
            <span className="ml-2 rounded-full bg-lime-100 px-2 py-0.5 text-[11px] font-bold text-lime-700 dark:bg-lime-500/20 dark:text-lime-300">
              {incidencia.goles} {incidencia.goles === 1 ? 'gol' : 'goles'}
            </span>
          )}
        </span>
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
          <input type="checkbox" checked={!!incidencia.golMarcado} onChange={() => toggleMarcador('golMarcado')} />
          Gol
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={!!incidencia.dobleteMarcado}
            onChange={() => toggleMarcador('dobleteMarcado')}
          />
          Doblete
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={!!incidencia.hatTrickMarcado}
            onChange={() => toggleMarcador('hatTrickMarcado')}
          />
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
