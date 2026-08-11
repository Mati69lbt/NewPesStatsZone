import { useState } from 'react'
import { formatDateShort } from '../utils/dateFormat'

function InlineDateEditor({ fecha, isDuplicate, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(fecha)
  const [saving, setSaving] = useState(false)

  if (editing) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <input
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          className="w-32 rounded border border-zinc-300 bg-white px-1 py-0.5 text-xs text-zinc-900 outline-none focus:border-lime-400 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
        />
        <button
          type="button"
          aria-label="Confirmar fecha"
          title="Confirmar"
          disabled={saving || !value}
          onClick={async () => {
            setSaving(true)
            await onSave(value)
            setSaving(false)
            setEditing(false)
          }}
          className="rounded p-1 text-lime-500 transition hover:text-lime-600 disabled:opacity-50"
        >
          ✓
        </button>
        <button
          type="button"
          aria-label="Cancelar edición"
          title="Cancelar"
          disabled={saving}
          onClick={() => {
            setValue(fecha)
            setEditing(false)
          }}
          className="rounded p-1 text-zinc-400 transition hover:text-red-500"
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      title="Editar fecha"
      className="inline-flex items-center gap-1 rounded hover:underline"
    >
      {formatDateShort(fecha)}
      {isDuplicate && <span title="Fecha duplicada en este torneo">⚠️</span>}
    </button>
  )
}

export default InlineDateEditor
