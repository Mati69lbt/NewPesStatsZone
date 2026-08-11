import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FormacionPage from './pages/FormacionPage'
import RegistrarPartidoPage from './pages/RegistrarPartidoPage'
import PartidosPage from './pages/PartidosPage'
import VersusPage from './pages/VersusPage'
import NextMatchPage from './pages/NextMatchPage'
import TemporadasPage from './pages/TemporadasPage'
import ClubesPage from './pages/ClubesPage'
import Ultimos10Page from './pages/Ultimos10Page'
import CapitanesPage from './pages/CapitanesPage'
import CapitanesResumenPage from './pages/CapitanesResumenPage'
import CampeonatosPage from './pages/CampeonatosPage'
import GoleadoresPage from './pages/GoleadoresPage'

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
        <Route path="/clubes" element={<ClubesPage />} />
        <Route path="/ultimos-10" element={<Ultimos10Page />} />
        <Route path="/capitanes" element={<CapitanesPage />} />
        <Route path="/capitanes/resumen" element={<CapitanesResumenPage />} />
        <Route path="/campeonatos" element={<CampeonatosPage />} />
        <Route path="/goleadores" element={<GoleadoresPage />} />
      </Routes>
    </div>
  )
}

export default App
