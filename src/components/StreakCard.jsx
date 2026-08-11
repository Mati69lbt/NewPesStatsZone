import StreakRow from './StreakRow'

const LABELS_FULL = {
  general: 'Últimos 10 Resultados (General)',
  local: 'Últimos 10 Resultados (Local)',
  visitante: 'Últimos 10 Resultados (Visitante)',
}

const LABELS_COMPACT = {
  general: 'General',
  local: 'Local',
  visitante: 'Visitante',
}

function StreakCard({ title, general, local, visitante, compact = false }) {
  const labels = compact ? LABELS_COMPACT : LABELS_FULL

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-700/50 dark:bg-zinc-800">
      {title && (
        <h3 className="text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">{title}</h3>
      )}
      <StreakRow label={labels.general} matches={general} />
      <StreakRow label={labels.local} matches={local} />
      <StreakRow label={labels.visitante} matches={visitante} />
    </div>
  )
}

export default StreakCard
