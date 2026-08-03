import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'
import ClubForm from '../components/ClubForm'
import PlayerForm from '../components/PlayerForm'
import PlayerList from '../components/PlayerList'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import usePlayers from '../hooks/usePlayers'
import { updateClub } from '../services/clubService'
import { addPlayer, deletePlayer, updatePlayer } from '../services/playersService'
import { toTitleCase } from '../utils/textFormat'

const EMPTY_PLAYER_FORM = { nombre: '', dorsal: '', posicion: '' }

function FormacionPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const players = usePlayers(user?.uid)

  const [savingClub, setSavingClub] = useState(false)
  const [savingPlayer, setSavingPlayer] = useState(false)
  const [playerForm, setPlayerForm] = useState(EMPTY_PLAYER_FORM)
  const [editingPlayerId, setEditingPlayerId] = useState(null)

  const handleSaveClub = async (nombreClub) => {
    if (!user) return
    setSavingClub(true)
    try {
      await updateClub(user.uid, nombreClub)
      toast.success('Club actualizado')
    } catch {
      toast.error('No se pudo actualizar el club')
    } finally {
      setSavingClub(false)
    }
  }

  const handleEditPlayer = (player) => {
    setEditingPlayerId(player.id)
    setPlayerForm({ nombre: player.nombre, dorsal: String(player.dorsal), posicion: player.posicion })
  }

  const handleCancelEdit = () => {
    setEditingPlayerId(null)
    setPlayerForm(EMPTY_PLAYER_FORM)
  }

  const handleDeletePlayer = async (player) => {
    if (!user) return
    if (!window.confirm(`¿Eliminar a ${player.nombre}?`)) return

    try {
      await deletePlayer(user.uid, player.id)
      toast.success('Jugador eliminado')
      if (editingPlayerId === player.id) handleCancelEdit()
    } catch {
      toast.error('No se pudo eliminar el jugador')
    }
  }

  const handleSubmitPlayer = async (e) => {
    e.preventDefault()
    if (!user) return

    const data = {
      nombre: toTitleCase(playerForm.nombre),
      dorsal: Number(playerForm.dorsal),
      posicion: playerForm.posicion,
    }

    setSavingPlayer(true)
    try {
      if (editingPlayerId) {
        await updatePlayer(user.uid, editingPlayerId, data)
        toast.success('Jugador actualizado')
      } else {
        await addPlayer(user.uid, data)
        toast.success('Jugador agregado')
      }
      handleCancelEdit()
    } catch {
      toast.error('No se pudo guardar el jugador')
    } finally {
      setSavingPlayer(false)
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <ClubForm club={club} onSave={handleSaveClub} saving={savingClub} />

        <PlayerForm
          nombre={playerForm.nombre}
          dorsal={playerForm.dorsal}
          posicion={playerForm.posicion}
          onNombreChange={(nombre) => setPlayerForm((prev) => ({ ...prev, nombre }))}
          onDorsalChange={(dorsal) => setPlayerForm((prev) => ({ ...prev, dorsal }))}
          onPosicionChange={(posicion) => setPlayerForm((prev) => ({ ...prev, posicion }))}
          onSubmit={handleSubmitPlayer}
          saving={savingPlayer}
          isEditing={Boolean(editingPlayerId)}
          onCancelEdit={handleCancelEdit}
        />

        <div className="w-full max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            Plantel Profesional {club ? ` ${club}` : ' del club'}
          </h2>
          <PlayerList players={players} onEdit={handleEditPlayer} onDelete={handleDeletePlayer} />
        </div>
      </main>

      <ToastContainer theme="dark" position="top-right" />
    </div>
  )
}

export default FormacionPage
