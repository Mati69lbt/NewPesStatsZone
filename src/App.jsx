import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FormacionPage from './pages/FormacionPage'
import RegistrarPartidoPage from './pages/RegistrarPartidoPage'
import PartidosPage from './pages/PartidosPage'
import VersusPage from './pages/VersusPage'
import NextMatchPage from './pages/NextMatchPage'
import TemporadasPage from './pages/TemporadasPage'

function App() {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-neutral-50 dark:bg-neutral-950">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/formacion" element={<FormacionPage />} />
        <Route path="/registrar-partido" element={<RegistrarPartidoPage />} />
        <Route path="/partidos" element={<PartidosPage />} />
        <Route path="/versus" element={<VersusPage />} />
        <Route path="/next-match" element={<NextMatchPage />} />
        <Route path="/temporadas" element={<TemporadasPage />} />
      </Routes>
    </div>
  )
}

export default App
