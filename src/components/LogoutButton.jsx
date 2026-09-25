import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../config/firebase'

function LogoutButton({ variant = 'icon', className = '', onAfterLogout }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Sesión cerrada correctamente')
      onAfterLogout?.()
      navigate('/login', { replace: true })
    } catch {
      toast.error('No se pudo cerrar sesión')
    }
  }

  const icon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m9 0l-3-3m3 3l-3 3" />
    </svg>
  )

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className={`flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 py-2 text-sm font-semibold uppercase tracking-wide text-neutral-700 transition hover:border-red-400 hover:text-red-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400 ${className}`}
      >
        {icon}
        Cerrar sesión
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Cerrar sesión"
      title="Cerrar sesión"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition hover:border-red-400 hover:text-red-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400 ${className}`}
    >
      {icon}
    </button>
  )
}

export default LogoutButton
