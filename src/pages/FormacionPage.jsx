import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Confirm } from 'notiflix'
import 'notiflix/dist/notiflix-3.2.8.min.css'
import Navbar from '../components/Navbar'
import ClubForm from '../components/ClubForm'
import PlayerForm from '../components/PlayerForm'
import PlayerList from '../components/PlayerList'
import FormationEditor from '../components/FormationEditor'
import FormationCard from '../components/FormationCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import usePlayers from '../hooks/usePlayers'
import useFormations from '../hooks/useFormations'
import { updateClub } from '../services/clubService'
import { addPlayer, deletePlayer, updatePlayer } from '../services/playersService'
import { addFormation, deleteFormation, updateFormation } from '../services/formationsService'
import { toTitleCase } from '../utils/textFormat'

const EMPTY_PLAYER_FORM = { nombre: '', dorsal: '', posicion: '' }

function FormacionPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const players = usePlayers(user?.uid)
  const formations = useFormations(user?.uid)

  const [savingClub, setSavingClub] = useState(false)
  const [savingPlayer, setSavingPlayer] = useState(false)
  const [playerForm, setPlayerForm] = useState(EMPTY_PLAYER_FORM)
  const [editingPlayerId, setEditingPlayerId] = useState(null)

  const [showFormationEditor, setShowFormationEditor] = useState(false)
  const [editingFormationId, setEditingFormationId] = useState(null)
  const [capitanId, setCapitanId] = useState('')
  const [capitanNombre, setCapitanNombre] = useState('')
  const [titulares, setTitulares] = useState([])
  const [savingFormation, setSavingFormation] = useState(false)

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

  const handleDeletePlayer = (player) => {
    if (!user) return

    Confirm.show(
      'Eliminar jugador',
      `¿Eliminar a ${player.nombre}?`,
      'Eliminar',
      'Cancelar',
      async () => {
        try {
          await deletePlayer(user.uid, player.id)
          toast.success('Jugador eliminado')
          if (editingPlayerId === player.id) handleCancelEdit()
        } catch {
          toast.error('No se pudo eliminar el jugador')
        }
      },
      undefined,
      { titleColor: '#dc2626', okButtonBackground: '#dc2626' }
    )
  }

  const handleSubmitPlayer = async (e) => {
    e.preventDefault()
    if (!user) return

    const data = {
      nombre: toTitleCase(playerForm.nombre),
      dorsal: Number(playerForm.dorsal),
      posicion: playerForm.posicion,
    }

    const nombreDuplicado = players.some(
      (player) => player.id !== editingPlayerId && player.nombre.toLowerCase() === data.nombre.toLowerCase()
    )
    if (nombreDuplicado) {
      toast.error('Ya existe un jugador con ese nombre')
      return
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

  const handleOpenNewFormation = () => {
    setEditingFormationId(null)
    setCapitanId('')
    setCapitanNombre('')
    setTitulares([])
    setShowFormationEditor(true)
  }

  const handleCancelFormation = () => {
    setShowFormationEditor(false)
    setEditingFormationId(null)
    setCapitanId('')
    setCapitanNombre('')
    setTitulares([])
  }

  const handleCaptainChange = (playerId) => {
    const player = players.find((p) => p.id === playerId)
    setCapitanId(playerId)
    setCapitanNombre(player?.nombre ?? '')

    if (player && !titulares.some((t) => t.id === player.id) && titulares.length < 11) {
      setTitulares((prev) => [
        ...prev,
        { id: player.id, nombre: player.nombre, dorsal: player.dorsal, posicion: player.posicion },
      ])
    }
  }

  const handleAddTitular = (player) => {
    if (titulares.length >= 11) return
    setTitulares((prev) => [
      ...prev,
      { id: player.id, nombre: player.nombre, dorsal: player.dorsal, posicion: player.posicion },
    ])
  }

  const handleRemoveTitular = (playerId) => {
    setTitulares((prev) => prev.filter((p) => p.id !== playerId))
    if (playerId === capitanId) {
      setCapitanId('')
      setCapitanNombre('')
    }
  }

  const handleEditFormation = (formation) => {
    setEditingFormationId(formation.id)
    setCapitanId(formation.capitanId ?? '')
    setCapitanNombre(formation.capitanNombre ?? '')
    setTitulares(formation.jugadores ?? [])
    setShowFormationEditor(true)
  }

  const handleDeleteFormation = (formation) => {
    if (!user) return

    Confirm.show(
      'Eliminar formación',
      '¿Eliminar esta formación?',
      'Eliminar',
      'Cancelar',
      async () => {
        try {
          await deleteFormation(user.uid, formation.id)
          toast.success('Formación eliminada')
          if (editingFormationId === formation.id) handleCancelFormation()
        } catch {
          toast.error('No se pudo eliminar la formación')
        }
      },
      undefined,
      { titleColor: '#dc2626', okButtonBackground: '#dc2626' }
    )
  }

  const handleSaveFormation = async () => {
    if (!user || !capitanId || titulares.length === 0) return

    const data = { capitanId, capitanNombre, jugadores: titulares }

    setSavingFormation(true)
    try {
      if (editingFormationId) {
        await updateFormation(user.uid, editingFormationId, data)
        toast.success('Formación actualizada')
      } else {
        await addFormation(user.uid, data)
        toast.success('Formación guardada')
      }
      handleCancelFormation()
    } catch {
      toast.error('No se pudo guardar la formación')
    } finally {
      setSavingFormation(false)
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
            Plantel Profesional {club ? ` ${club}` : ' del club'}{' '}
            <span className="text-zinc-400 dark:text-zinc-500">({players.length} jugadores)</span>
          </h2>
          <PlayerList players={players} onEdit={handleEditPlayer} onDelete={handleDeletePlayer} />
        </div>

        <div className="w-full max-w-5xl">
          <div className="mb-4 flex items-center justify-center gap-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Formaciones
            </h2>
            {!showFormationEditor && (
              <button
                type="button"
                onClick={handleOpenNewFormation}
                className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-lime-300"
              >
                Nueva formación
              </button>
            )}
          </div>

          {showFormationEditor && (
            <div className="mb-8 flex justify-center">
              <FormationEditor
                players={players}
                capitanId={capitanId}
                titulares={titulares}
                onCaptainChange={handleCaptainChange}
                onAddPlayer={handleAddTitular}
                onRemovePlayer={handleRemoveTitular}
                onSave={handleSaveFormation}
                onCancel={handleCancelFormation}
                saving={savingFormation}
                isEditing={Boolean(editingFormationId)}
              />
            </div>
          )}

          {formations.length === 0 ? (
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Todavía no hay formaciones guardadas.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {formations.map((formation) => (
                <FormationCard
                  key={formation.id}
                  formation={formation}
                  onEdit={handleEditFormation}
                  onDelete={handleDeleteFormation}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ToastContainer theme="dark" position="top-right" />
    </div>
  )
}

export default FormacionPage
