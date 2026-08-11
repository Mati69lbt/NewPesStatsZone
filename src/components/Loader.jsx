function Loader({ label = 'Cargando…' }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-24">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-lime-400" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {label}
      </p>
    </div>
  )
}

export default Loader
