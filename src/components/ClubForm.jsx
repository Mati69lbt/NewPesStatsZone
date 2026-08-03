import { useEffect, useState } from 'react'

function ClubForm({ club, onSave, saving }) {
  const [value, setValue] = useState(club)

  useEffect(() => setValue(club), [club])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-xl sm:p-8 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="mb-4 text-center text-xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
        Club a dirigir
      </h2>

      <label htmlFor="club" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Nombre del club
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="club"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ej: River Plate"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
        />
        <button
          type="submit"
          disabled={saving}
          className="whitespace-nowrap rounded-lg bg-lime-400 px-5 py-2.5 font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default ClubForm
