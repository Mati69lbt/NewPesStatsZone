import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [view, setView] = useState('login')

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-neutral-50 dark:bg-neutral-950">
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      {view === 'login' ? (
        <LoginPage onSwitchToRegister={() => setView('register')} />
      ) : (
        <RegisterPage onSwitchToLogin={() => setView('login')} />
      )}
    </div>
  )
}

export default App
