import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { to: '/formacion', label: 'Formación' },
  { to: '/registrar-partido', label: 'Registrar Partido' },
  { to: '/partidos', label: 'Partidos' },
  { to: '/versus', label: 'Versus' },
  { to: '/next-match', label: 'Próximo Partido' },
  { to: '/temporadas', label: 'Temporadas' },
  { to: '/campeonatos', label: 'Campeonatos' },
  { to: '/ultimos-10', label: 'Últimos 10' },
  { to: '/capitanes', label: 'Capitanes' },
  { to: '/goleadores', label: 'Goleadores' },
  { to: '/asistencias', label: 'Asistencias' },
  { to: '/goleadores-campeonato', label: 'Goleadores por Campeonato' },
  { to: '/estadisticas-periodo', label: 'Estadísticas por Período' },
  { to: '/rachas-sequia', label: 'Rachas de Sequía' },
  { to: '/villanos', label: 'Villanos' },
]

const DROPDOWNS = [
  {
    key: 'partidos',
    label: 'Partidos',
    items: [
      { to: '/partidos', label: 'Partidos' },
      { to: '/next-match', label: 'Próximo Partido' },
      { to: '/versus', label: 'Versus' },
      { to: '/ultimos-10', label: 'Últimos 10' },
    ],
  },
  {
    key: 'estadisticas',
    label: 'Estadísticas',
    items: [
      { to: '/capitanes', label: 'Capitanes' },
      { to: '/temporadas', label: 'Temporadas' },
      { to: '/goleadores', label: 'Goleadores' },
      { to: '/asistencias', label: 'Asistencias' },
      { to: '/goleadores-campeonato', label: 'Goleadores por Campeonato' },
      { to: '/estadisticas-periodo', label: 'Estadísticas por Período' },
      { to: '/rachas-sequia', label: 'Rachas de Sequía' },
      { to: '/villanos', label: 'Villanos' },
    ],
  },
  {
    key: 'torneos',
    label: 'Torneos y Clubes',
    items: [
      { to: '/campeonatos', label: 'Campeonatos' },
      { to: '/clubes', label: 'Clubes' },
    ],
  },
]

function NavDropdown({ label, items, isActive, openKey, setOpenKey }) {
  const dropdownKey = label
  const isOpen = openKey === dropdownKey
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenKey(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setOpenKey])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpenKey(isOpen ? null : dropdownKey)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition ${
          isActive
            ? 'text-lime-500 dark:text-lime-400'
            : 'text-neutral-600 hover:text-lime-500 dark:text-neutral-300 dark:hover:text-lime-400'
        }`}
      >
        {label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 min-w-45 rounded-lg border border-neutral-800 bg-neutral-900 py-2 shadow-xl">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpenKey(null)}
              className={({ isActive: isItemActive }) =>
                `block px-4 py-2 text-sm font-medium transition ${
                  isItemActive ? 'text-lime-400' : 'text-neutral-300 hover:text-lime-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

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
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="text-lg font-black uppercase tracking-wide text-neutral-900 dark:text-white">
          PesStatsZone
        </span>

        <nav className="hidden items-center gap-6 md:flex">
          {DROPDOWNS.map((dropdown) => (
            <NavDropdown
              key={dropdown.key}
              label={dropdown.label}
              items={dropdown.items}
              isActive={dropdown.items.some((item) => location.pathname.startsWith(item.to))}
              openKey={openDropdown}
              setOpenKey={setOpenDropdown}
            />
          ))}
          <NavLinkItem to="/formacion" label="Formación" />
          <NavLink
            to="/registrar-partido"
            className="rounded-lg bg-lime-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-neutral-950 transition hover:bg-lime-400"
          >
            + Registrar Partido
          </NavLink>
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
