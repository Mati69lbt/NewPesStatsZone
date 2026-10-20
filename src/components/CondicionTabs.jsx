const CONDICIONES = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

function CondicionTabs({ value, onChange }) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
      {CONDICIONES.map(({ value: v, label }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
            value === v
              ? 'bg-lime-400 text-zinc-900'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default CondicionTabs
