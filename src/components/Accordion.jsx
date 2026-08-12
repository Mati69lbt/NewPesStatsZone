import { useState } from 'react'

function Accordion({ title, subtitle, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="w-full overflow-hidden rounded-xl border border-zinc-300 shadow-lg dark:border-zinc-700">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 border-b border-t-4 border-t-lime-400 border-b-zinc-200 bg-white px-5 py-4 text-left dark:border-b-zinc-700 dark:bg-zinc-800"
      >
        <div className="min-w-0">
          <h2 className="text-base font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">{title}</h2>
          {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
        </div>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform ${open ? '' : '-rotate-90'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && <div className="flex flex-col gap-4 bg-zinc-50 px-2 py-3 dark:bg-zinc-900 sm:gap-6 sm:px-5 sm:py-5">{children}</div>}
    </div>
  )
}

export default Accordion
