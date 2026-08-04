import { sortByPosition } from '../utils/positionOrder'
import MatchPlayerIncidentCard from './MatchPlayerIncidentCard'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const CONDICIONES = [
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
  { value: 'neutral', label: 'Neutral' },
]

function MatchForm({
  club,
  fecha,
  onFechaChange,
  rival,
  onRivalChange,
  onRivalBlur,
  rivalSuggestions,
  torneo,
  onTorneoChange,
  onTorneoBlur,
  torneoSuggestions,
  condicion,
  onCondicionChange,
  formations,
  selectedFormationId,
  onFormationChange,
  titulares,
  suplentesDisponibles,
  suplentes,
  onAddSuplente,
  onRemoveSuplente,
  jugadoresDisponibles,
  incidenciasClub,
  onAddIncidenciaClub,
  onUpdateIncidenciaClub,
  onRemoveIncidenciaClub,
  rivalScorerInput,
  onRivalScorerInputChange,
  rivalScorerSuggestions,
  onAddIncidenciaRival,
  incidenciasRival,
  onUpdateIncidenciaRival,
  onRemoveIncidenciaRival,
  onSubmit,
  saving,
}) {
  const ordenados = sortByPosition(incidenciasClub)

  const handleAddRivalScorer = () => {
    const nombre = rivalScorerInput.trim()
    if (!nombre) return
    onAddIncidenciaRival(nombre)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-lg font-black uppercase tracking-wide text-lime-600 dark:text-lime-400">
          {club || 'Tu club'}
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="fecha" className={LABEL_CLASSES}>
          Fecha del partido
        </label>
        <input
          id="fecha"
          type="date"
          required
          value={fecha}
          onChange={(e) => onFechaChange(e.target.value)}
          className={FIELD_CLASSES}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rival" className={LABEL_CLASSES}>
          Rival
        </label>
        <input
          id="rival"
          type="text"
          required
          list="rival-suggestions"
          value={rival}
          onChange={(e) => onRivalChange(e.target.value)}
          onBlur={onRivalBlur}
          placeholder="Nombre del rival"
          className={FIELD_CLASSES}
        />
        <datalist id="rival-suggestions">
          {rivalSuggestions.map((nombre) => (
            <option key={nombre} value={nombre} />
          ))}
        </datalist>
      </div>

      <div className="mb-4">
        <label htmlFor="torneo" className={LABEL_CLASSES}>
          Torneo
        </label>
        <input
          id="torneo"
          type="text"
          required
          list="torneo-suggestions"
          value={torneo}
          onChange={(e) => onTorneoChange(e.target.value)}
          onBlur={onTorneoBlur}
          placeholder="Nombre del torneo"
          className={FIELD_CLASSES}
        />
        <datalist id="torneo-suggestions">
          {torneoSuggestions.map((nombre) => (
            <option key={nombre} value={nombre} />
          ))}
        </datalist>
      </div>

      <div className="mb-4">
        <p className={LABEL_CLASSES}>¿Dónde se jugó?</p>
        <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-zinc-700">
          {CONDICIONES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onCondicionChange(value)}
              className={`py-2.5 text-sm font-bold uppercase tracking-wide transition ${
                condicion === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="capitan" className={LABEL_CLASSES}>
          Capitán
        </label>
        <select
          id="capitan"
          required
          value={selectedFormationId}
          onChange={(e) => onFormationChange(e.target.value)}
          className={FIELD_CLASSES}
        >
          <option value="">Seleccioná capitán</option>
          {formations.map((formation) => (
            <option key={formation.id} value={formation.id}>
              {formation.capitanNombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="suplentes" className={LABEL_CLASSES}>
          Suplentes
        </label>
        <select
          id="suplentes"
          value=""
          disabled={titulares.length === 0}
          onChange={(e) => {
            const player = suplentesDisponibles.find((p) => p.id === e.target.value)
            if (player) onAddSuplente(player)
          }}
          className={FIELD_CLASSES}
        >
          <option value="">Lista de Suplentes</option>
          {suplentesDisponibles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.posicion})
            </option>
          ))}
        </select>

        {suplentes.length > 0 && (
          <ul className="mt-2 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
            {suplentes.map((player) => (
              <li key={player.id} className="flex items-center justify-between gap-2 px-3 py-2">
                <span className="text-sm text-zinc-900 dark:text-zinc-100">
                  {player.nombre} ({player.posicion})
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveSuplente(player.id)}
                  className="text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="goleadores-propios" className={LABEL_CLASSES}>
          Goleadores e Incidencias
        </label>
        <select
          id="goleadores-propios"
          value=""
          disabled={titulares.length === 0}
          onChange={(e) => {
            const player = jugadoresDisponibles.find((p) => p.id === e.target.value)
            if (player) onAddIncidenciaClub(player)
          }}
          className={FIELD_CLASSES}
        >
          <option value="">Seleccioná jugador</option>
          {jugadoresDisponibles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} ({p.posicion})
            </option>
          ))}
        </select>

        {ordenados.length > 0 && (
          <div className="mt-3 space-y-2">
            {ordenados.map((incidencia) => (
              <MatchPlayerIncidentCard
                key={incidencia.id}
                incidencia={incidencia}
                onUpdate={onUpdateIncidenciaClub}
                onRemove={onRemoveIncidenciaClub}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="goleadores-rivales" className={LABEL_CLASSES}>
          Goleadores / Incidencias Rivales
        </label>
        <div className="flex gap-2">
          <input
            id="goleadores-rivales"
            type="text"
            list="rival-scorer-suggestions"
            value={rivalScorerInput}
            onChange={(e) => onRivalScorerInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddRivalScorer()
              }
            }}
            placeholder="Apellido (usa Rival como club)"
            className={FIELD_CLASSES}
          />
          <button
            type="button"
            onClick={handleAddRivalScorer}
            className="whitespace-nowrap rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-600 transition hover:text-lime-500 dark:text-zinc-400"
          >
            Agregar
          </button>
        </div>
        <datalist id="rival-scorer-suggestions">
          {rivalScorerSuggestions.map((nombre) => (
            <option key={nombre} value={nombre} />
          ))}
        </datalist>

        {incidenciasRival.length > 0 && (
          <ul className="mt-2 divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
            {incidenciasRival.map((incidencia, index) => (
              <li key={`${incidencia.nombre}-${index}`} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{incidencia.nombre}</span>
                <div className="flex items-center gap-3 text-xs text-zinc-700 dark:text-zinc-300">
                  <label className="flex items-center gap-1.5">
                    Goles
                    <select
                      value={incidencia.goles}
                      onChange={(e) => onUpdateIncidenciaRival(index, { goles: Number(e.target.value) })}
                      className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-1 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
                    >
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={incidencia.expulsado}
                      onChange={() => onUpdateIncidenciaRival(index, { expulsado: !incidencia.expulsado })}
                    />
                    Expulsión
                  </label>
                  <button
                    type="button"
                    onClick={() => onRemoveIncidenciaRival(index)}
                    className="font-semibold text-red-500 hover:text-red-600"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-lime-400 py-2.5 font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}

export default MatchForm
