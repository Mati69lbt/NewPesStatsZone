import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [view, setView] = useState('login')

  return view === 'login' ? (
    <LoginPage onSwitchToRegister={() => setView('register')} />
  ) : (
    <RegisterPage onSwitchToLogin={() => setView('login')} />
  )
}

export default App
