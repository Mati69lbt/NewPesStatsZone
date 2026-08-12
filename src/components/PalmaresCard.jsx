import { getResultadoBadgeClasses } from '../utils/palmaresStats'

function PalmaresCard({ torneo, club, partidosJugados, resultado }) {
  const isCampeon = resultado === 'Campeón'

  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 shadow-lg sm:px-5 sm:py-4 ${
        isCampeon
          ? 'border-emerald-500/50 bg-gradient-to-r from-emerald-500/10 via-zinc-900 to-zinc-900 dark:from-emerald-500/15'
          : 'border-zinc-700 bg-zinc-900'
      }`}
    >
      <div className="min-w-0">
        <h3 className="truncate text-sm font-black text-zinc-100 sm:text-base">{torneo}</h3>
        <p className="truncate text-xs font-semibold text-zinc-400">{club || 'Sin club'}</p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
          {partidosJugados} {partidosJugados === 1 ? 'partido' : 'partidos'}
        </p>
      </div>

      <span
        className={`flex-shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${getResultadoBadgeClasses(
          resultado
        )}`}
      >
        {resultado || 'Sin definir'}
      </span>
    </div>
  )
}

export default PalmaresCard
