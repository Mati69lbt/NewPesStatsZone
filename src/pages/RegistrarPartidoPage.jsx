import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'
import MatchForm from '../components/MatchForm'
import MatchPreviewCard from '../components/MatchPreviewCard'
import useCurrentUser from '../hooks/useCurrentUser'
import useClub from '../hooks/useClub'
import usePlayers from '../hooks/usePlayers'
import useFormations from '../hooks/useFormations'
import useMatches from '../hooks/useMatches'
import { addMatch, updateMatch } from '../services/matchesService'
import { toTitleCase } from '../utils/textFormat'

const DEFAULT_DATE = '2018-07-31'

const EMPTY_INCIDENCIA_CLUB = {
  goles: 0,
  golMarcado: false,
  dobleteMarcado: false,
  hatTrickMarcado: false,
  expulsado: false,
  asistencias: 0,
}

function RegistrarPartidoPage() {
  const user = useCurrentUser()
  const club = useClub(user?.uid)
  const players = usePlayers(user?.uid)
  const formations = useFormations(user?.uid)
  const matches = useMatches(user?.uid)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editingMatchId = searchParams.get('matchId')
  const loadedMatchIdRef = useRef(null)

  const [fecha, setFecha] = useState(null)
  const displayedFecha = fecha ?? matches[0]?.fecha ?? DEFAULT_DATE
  const [rival, setRival] = useState('')
  const [torneo, setTorneo] = useState('')
  const [condicion, setCondicion] = useState('local')

  const [selectedFormationId, setSelectedFormationId] = useState('')
  const [capitanId, setCapitanId] = useState('')
  const [capitanNombre, setCapitanNombre] = useState('')
  const [titulares, setTitulares] = useState([])
  const [suplentes, setSuplentes] = useState([])
  const [incidenciasClub, setIncidenciasClub] = useState([])

  const [rivalScorerInput, setRivalScorerInput] = useState('')
  const [incidenciasRival, setIncidenciasRival] = useState([])

  const [saving, setSaving] = useState(false)

  const rivalSuggestions = useMemo(
    () => [...new Set(matches.map((m) => m.rival).filter(Boolean))],
    [matches]
  )
  const torneoSuggestions = useMemo(
    () => [...new Set(matches.map((m) => m.torneo).filter(Boolean))],
    [matches]
  )
  const rivalScorerSuggestions = useMemo(() => {
    if (!rival) return []
    const nombres = matches
      .filter((m) => m.rival?.toLowerCase() === rival.toLowerCase())
      .flatMap((m) => (m.incidenciasRival ?? []).map((i) => i.nombre))
    return [...new Set(nombres)]
  }, [matches, rival])

  const suplentesDisponibles = useMemo(
    () =>
      players
        .filter((p) => !titulares.some((t) => t.id === p.id) && !suplentes.some((s) => s.id === p.id))
        .sort((a, b) => a.nombre.localeCompare(b.nombre)),
    [players, titulares, suplentes]
  )

  const jugadoresDisponibles = useMemo(() => {
    const pool = [...titulares, ...suplentes]
    return pool
      .filter((p) => !incidenciasClub.some((i) => i.id === p.id))
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  }, [titulares, suplentes, incidenciasClub])

  const golesClub = incidenciasClub.reduce((sum, i) => sum + i.goles, 0)
  const golesRival = incidenciasRival.reduce((sum, i) => sum + i.goles, 0)
  const goleadoresClub = incidenciasClub
    .filter((i) => i.goles > 0)
    .map((i) => (i.goles > 1 ? `${i.nombre} (${i.goles})` : i.nombre))
  const goleadoresRival = incidenciasRival
    .filter((i) => i.goles > 0)
    .map((i) => (i.goles > 1 ? `${i.nombre} (${i.goles})` : i.nombre))
  const expulsadosClub = incidenciasClub.filter((i) => i.expulsado).map((i) => i.nombre)
  const expulsadosRival = incidenciasRival.filter((i) => i.expulsado).map((i) => i.nombre)
  const asistentesClub = incidenciasClub
    .filter((i) => i.asistencias > 0)
    .map((i) => (i.asistencias > 1 ? `${i.nombre} (${i.asistencias})` : i.nombre))
  const asistentesRival = []

  useEffect(() => {
    if (!editingMatchId || loadedMatchIdRef.current === editingMatchId) return
    const match = matches.find((m) => m.id === editingMatchId)
    if (!match) return

    setFecha(match.fecha)
    setRival(match.rival ?? '')
    setTorneo(match.torneo ?? '')
    setCondicion(match.condicion ?? 'local')
    setCapitanId(match.capitanId ?? '')
    setCapitanNombre(match.capitanNombre ?? '')
    setTitulares(match.titulares ?? [])
    setSuplentes(match.suplentes ?? [])
    setIncidenciasClub(match.incidenciasClub ?? [])
    setIncidenciasRival(match.incidenciasRival ?? [])
    const formation = formations.find((f) => f.capitanId === match.capitanId)
    setSelectedFormationId(formation?.id ?? '')
    loadedMatchIdRef.current = editingMatchId
  }, [editingMatchId, matches, formations])

  const handleRivalBlur = () => {
    if (rival.trim()) setRival(toTitleCase(rival))
  }

  const handleTorneoBlur = () => {
    if (torneo.trim()) setTorneo(toTitleCase(torneo))
  }

  const handleFormationChange = (formationId) => {
    const formation = formations.find((f) => f.id === formationId)
    setSelectedFormationId(formationId)
    setCapitanId(formation?.capitanId ?? '')
    setCapitanNombre(formation?.capitanNombre ?? '')
    setTitulares(formation?.jugadores ?? [])
    setSuplentes([])
    setIncidenciasClub([])
  }

  const handleAddSuplente = (player) => {
    setSuplentes((prev) => [...prev, player])
  }

  const handleRemoveSuplente = (playerId) => {
    setSuplentes((prev) => prev.filter((p) => p.id !== playerId))
    setIncidenciasClub((prev) => prev.filter((i) => i.id !== playerId))
  }

  const handleAddIncidenciaClub = (player) => {
    setIncidenciasClub((prev) => [...prev, { ...player, ...EMPTY_INCIDENCIA_CLUB }])
  }

  const handleUpdateIncidenciaClub = (playerId, patch) => {
    setIncidenciasClub((prev) => prev.map((i) => (i.id === playerId ? { ...i, ...patch } : i)))
  }

  const handleRemoveIncidenciaClub = (playerId) => {
    setIncidenciasClub((prev) => prev.filter((i) => i.id !== playerId))
  }

  const handleAddIncidenciaRival = (nombreCrudo) => {
    const nombre = toTitleCase(nombreCrudo)
    setIncidenciasRival((prev) => {
      const existente = prev.find((i) => i.nombre.toLowerCase() === nombre.toLowerCase())
      if (existente) {
        return prev.map((i) =>
          i.nombre.toLowerCase() === nombre.toLowerCase() ? { ...i, goles: i.goles + 1 } : i
        )
      }
      return [...prev, { nombre, goles: 1, expulsado: false }]
    })
    setRivalScorerInput('')
  }

  const handleUpdateIncidenciaRival = (index, patch) => {
    setIncidenciasRival((prev) => prev.map((i, idx) => (idx === index ? { ...i, ...patch } : i)))
  }

  const handleRemoveIncidenciaRival = (index) => {
    setIncidenciasRival((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    if (!capitanId || titulares.length !== 11) {
      toast.error('Seleccioná un capitán con formación completa')
      return
    }

    const data = {
      fecha: displayedFecha,
      rival: toTitleCase(rival),
      torneo: toTitleCase(torneo),
      condicion,
      club,
      capitanId,
      capitanNombre,
      titulares,
      suplentes,
      incidenciasClub,
      incidenciasRival,
      golesClub,
      golesRival,
    }

    setSaving(true)
    try {
      if (editingMatchId) {
        await updateMatch(user.uid, editingMatchId, data)
        toast.success('Partido actualizado')
      } else {
        await addMatch(user.uid, data)
        toast.success('Partido guardado')
      }
      navigate('/partidos')
    } catch {
      toast.error('No se pudo guardar el partido')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-zinc-100 dark:bg-zinc-950">
      <Navbar />

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-3xl font-black uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
            {editingMatchId ? 'Editar Partido' : 'Registrar Partido'}
          </h1>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Formulario de estadísticas
          </p>
        </div>

        {formations.length === 0 ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Necesitás al menos una formación guardada para registrar un partido.
          </p>
        ) : (
          <div className="flex w-full max-w-6xl flex-col items-start gap-8 lg:flex-row lg:justify-center">
            <MatchForm
              club={club}
              fecha={displayedFecha}
              onFechaChange={setFecha}
              rival={rival}
              onRivalChange={setRival}
              onRivalBlur={handleRivalBlur}
              rivalSuggestions={rivalSuggestions}
              torneo={torneo}
              onTorneoChange={setTorneo}
              onTorneoBlur={handleTorneoBlur}
              torneoSuggestions={torneoSuggestions}
              condicion={condicion}
              onCondicionChange={setCondicion}
              formations={formations}
              selectedFormationId={selectedFormationId}
              onFormationChange={handleFormationChange}
              titulares={titulares}
              suplentesDisponibles={suplentesDisponibles}
              suplentes={suplentes}
              onAddSuplente={handleAddSuplente}
              onRemoveSuplente={handleRemoveSuplente}
              jugadoresDisponibles={jugadoresDisponibles}
              incidenciasClub={incidenciasClub}
              onAddIncidenciaClub={handleAddIncidenciaClub}
              onUpdateIncidenciaClub={handleUpdateIncidenciaClub}
              onRemoveIncidenciaClub={handleRemoveIncidenciaClub}
              rivalScorerInput={rivalScorerInput}
              onRivalScorerInputChange={setRivalScorerInput}
              rivalScorerSuggestions={rivalScorerSuggestions}
              onAddIncidenciaRival={handleAddIncidenciaRival}
              incidenciasRival={incidenciasRival}
              onUpdateIncidenciaRival={handleUpdateIncidenciaRival}
              onRemoveIncidenciaRival={handleRemoveIncidenciaRival}
              onSubmit={handleSubmit}
              saving={saving}
            />

            <MatchPreviewCard
              fecha={displayedFecha}
              condicion={condicion}
              torneo={torneo}
              capitanNombre={capitanNombre}
              club={club}
              rival={rival}
              golesClub={golesClub}
              golesRival={golesRival}
              goleadoresClub={goleadoresClub}
              goleadoresRival={goleadoresRival}
              expulsadosClub={expulsadosClub}
              expulsadosRival={expulsadosRival}
              asistentesClub={asistentesClub}
              asistentesRival={asistentesRival}
            />
          </div>
        )}
      </main>

      <ToastContainer theme="dark" position="top-right" />
    </div>
  )
}

export default RegistrarPartidoPage
