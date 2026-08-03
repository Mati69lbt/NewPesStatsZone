import { useState } from 'react'
import Navbar from '../components/Navbar'

function FormacionPage() {
  const [form, setForm] = useState({ nombre: '', posicion: '', nivel: '' })

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-neutral-50 dark:bg-neutral-950">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/60"
        >
          <h1 className="mb-1 text-center text-2xl font-black uppercase tracking-wide text-neutral-900 dark:text-white">
            Formación
          </h1>
          <p className="mb-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Completá tus datos deportivos
          </p>

          <div className="mb-4">
            <label htmlFor="nombre" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange('nombre')}
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="posicion" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Posición
            </label>
            <input
              id="posicion"
              type="text"
              value={form.posicion}
              onChange={handleChange('posicion')}
              placeholder="Ej: Delantero"
              className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="nivel" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Nivel
            </label>
            <select
              id="nivel"
              value={form.nivel}
              onChange={handleChange('nivel')}
              className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-neutral-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            >
              <option value="">Seleccioná un nivel</option>
              <option value="inicial">Inicial</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-lime-400 py-2.5 font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300"
          >
            Guardar
          </button>
        </form>
      </main>
    </div>
  )
}

export default FormacionPage
