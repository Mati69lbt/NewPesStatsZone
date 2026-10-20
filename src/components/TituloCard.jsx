function TituloCard({ torneo, club, partidosJugados }) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 px-4 py-3 shadow-lg sm:px-5 sm:py-4 dark:from-amber-500/15">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-black text-zinc-100 sm:text-base">{torneo}</h3>
        <p className="truncate text-xs font-semibold text-zinc-400">{club || 'Sin club'}</p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
          {partidosJugados} {partidosJugados === 1 ? 'partido' : 'partidos'}
        </p>
      </div>

      <span className="flex-shrink-0 text-3xl" aria-hidden="true">
        🏆
      </span>
    </div>
  )
}

export default TituloCard
