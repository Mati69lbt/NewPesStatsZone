import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Confirm } from 'notiflix'
import 'notiflix/dist/notiflix-3.2.8.min.css'
import Navbar from '../components/Navbar'
import TournamentGroup from '../components/TournamentGroup'
import useCurrentUser from '../hooks/useCurrentUser'
import useMatches from '../hooks/useMatches'
import useTournamentResults from '../hooks/useTournamentResults'
import { deleteMatch, updateMatch } from '../services/matchesService'
import { updateTournamentResult, updateTournamentTipo } from '../services/tournamentsService'

function PartidosPage() {
  const user = useCurrentUser()
  const matches = useMatches(user?.uid)
  const tournamentResults = useTournamentResults(user?.uid)
  const navigate = useNavigate()

  const groupedTournaments = useMemo(() => {
    const groups = new Map()
    for (const match of matches) {
      const torneo = match.torneo || 'Sin torneo'
      if (!groups.has(torneo)) groups.set(torneo, [])
      groups.get(torneo).push(match)
    }

    return [...groups.entries()]
      .map(([torneo, torneoMatches]) => ({
        torneo,
        matches: [...torneoMatches].sort((a, b) => b.fecha.localeCompare(a.fecha)),
      }))
      .sort((a, b) => b.matches[0].fecha.localeCompare(a.matches[0].fecha))
  }, [matches])

  const handleResultadoChange = async (torneo, resultado) => {
    if (!user) return
    try {
      await updateTournamentResult(user.uid, torneo, resultado)
      toast.success('Resultado del torneo actualizado')
    } catch {
      toast.error('No se pudo guardar el resultado del torneo')
    }
  }

  const handleTipoChange = async (torneo, tipo) => {
    if (!user) return
    try {
      await updateTournamentTipo(user.uid, torneo, tipo)
      toast.success('Tipo de temporada actualizado')
    } catch {
      toast.error('No se pudo guardar el tipo de temporada')
    }
  }

  const handleDateChange = async (match, fecha) => {
    if (!user) return
    try {
      await updateMatch(user.uid, match.id, { fecha })
      toast.success('Fecha actualizada')
    } catch {
      toast.error('No se pudo actualizar la fecha')
    }
  }

  const handleEdit = (match) => {
    navigate(`/registrar-partido?matchId=${match.id}`)
  }

  const handleDelete = (match) => {
    if (!user) return

    Confirm.show(
      'Eliminar partido',
      `¿Eliminar el partido vs ${match.rival}?`,
      'Eliminar',
      'Cancelar',
      async () => {
        try {
          await deleteMatch(user.uid, match.id)
          toast.success('Partido eliminado')
        } catch {
          toast.error('No se pudo eliminar el partido')
        }
      },
      undefined,
      { titleColor: '#dc2626', okButtonBackground: '#dc2626' }
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            Historial de Partidos
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Registro por torneo
          </p>
        </div>

        {groupedTournaments.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Todavía no hay partidos registrados.
          </p>
        ) : (
          <div className="flex w-full max-w-5xl flex-col gap-8">
            {groupedTournaments.map(({ torneo, matches: torneoMatches }) => (
              <TournamentGroup
                key={torneo}
                torneo={torneo}
                matches={torneoMatches}
                resultado={tournamentResults[torneo]?.resultado}
                tipo={tournamentResults[torneo]?.tipo}
                onResultadoChange={handleResultadoChange}
                onTipoChange={handleTipoChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDateChange={handleDateChange}
              />
            ))}
          </div>
        )}
      </main>

      <ToastContainer theme="dark" position="top-right" />
    </div>
  )
}

export default PartidosPage
