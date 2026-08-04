import { formatDateDisplay } from '../utils/dateFormat'

const CONDICION_LABELS = { local: 'LOCAL', visitante: 'VISITANTE', neutral: 'NEUTRAL' }

function ListOrDash({ items }) {
  if (items.length === 0) {
    return <p className="text-zinc-400 dark:text-zinc-600">—</p>
  }
  return (
    <ul className="space-y-0.5">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="truncate text-zinc-700 dark:text-zinc-300">
          {item}
        </li>
      ))}
    </ul>
  )
}

function MatchPreviewCard({
  fecha,
  condicion,
  torneo,
  capitanNombre,
  club,
  rival,
  golesClub,
  golesRival,
  goleadoresClub,
  goleadoresRival,
  expulsadosClub,
  expulsadosRival,
}) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        <span>{formatDateDisplay(fecha)}</span>
        <span>{CONDICION_LABELS[condicion]}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {torneo && (
          <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
            🏆 {torneo}
          </span>
        )}
        {capitanNombre && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            Capitán: {capitanNombre}
          </span>
        )}
      </div>

      <div className="mb-5 rounded-xl bg-zinc-100 p-4 text-center dark:bg-zinc-800">
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{club || 'Tu club'}</p>
        <p className="my-1 text-3xl font-black text-zinc-900 dark:text-zinc-100">
          {golesClub} - {golesRival}
        </p>
        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{rival || 'Rival'}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="mb-1 font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Goleadores {club || 'club'}
          </p>
          <ListOrDash items={goleadoresClub} />
        </div>
        <div>
          <p className="mb-1 font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Goleadores {rival || 'rival'}
          </p>
          <ListOrDash items={goleadoresRival} />
        </div>
        <div>
          <p className="mb-1 font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Expulsados {club || 'club'}
          </p>
          <ListOrDash items={expulsadosClub} />
        </div>
        <div>
          <p className="mb-1 font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Expulsados {rival || 'rival'}
          </p>
          <ListOrDash items={expulsadosRival} />
        </div>
      </div>
    </div>
  )
}

export default MatchPreviewCard
