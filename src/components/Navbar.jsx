import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { to: '/formacion', label: 'Formación' },
  { to: '/registrar-partido', label: 'Registrar Partido' },
  { to: '/partidos', label: 'Partidos' },
  { to: '/versus', label: 'Versus' },
  { to: '/next-match', label: 'Próximo Partido' },
  { to: '/temporadas', label: 'Temporadas' },
  { to: '/ultimos-10', label: 'Últimos 10' },
  { to: '/capitanes', label: 'Capitanes' },
]

function NavLinkItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-semibold uppercase tracking-wide transition ${
          isActive
            ? 'text-lime-500 dark:text-lime-400'
            : 'text-neutral-600 hover:text-lime-500 dark:text-neutral-300 dark:hover:text-lime-400'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-white">
          PesStatsZone
        </span>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLinkItem key={link.to} {...link} />
          ))}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.to} {...link} onClick={() => setIsOpen(false)} />
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
