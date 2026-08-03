import useDarkMode from '../hooks/useDarkMode'

function ThemeToggle() {
  const { theme, toggleTheme } = useDarkMode()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition hover:border-lime-400 hover:text-lime-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-lime-400 dark:hover:text-lime-400"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 4a5 5 0 100 10 5 5 0 000-10zm9 5a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM4 12a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm14.657-6.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.464 17.536a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm11.193 1.414a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707a1 1 0 010 1.414zM6.757 6.757a1 1 0 01-1.414 0l-.707-.707A1 1 0 116.05 4.636l.707.707a1 1 0 010 1.414zM12 19a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.752 15.002A9.718 9.718 0 0112 21.75C6.615 21.75 2.25 17.385 2.25 12S6.615 2.25 12 2.25c.11 0 .219.002.328.006a.75.75 0 01.44 1.34A7.5 7.5 0 0020.404 14.23a.75.75 0 011.35.441 9.68 9.68 0 01-.002.33z" />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
