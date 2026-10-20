import { useMemo, useState } from 'react'
import Accordion from './Accordion'
import CondicionTabs from './CondicionTabs'
import RachaCategoriaList from './RachaCategoriaList'
import JugadoresRachaGolTable from './JugadoresRachaGolTable'
import {
  buildRachasAvanzadas,
  buildAnotadoraCategoria,
  buildRecibeGolesCategoria,
  CATEGORIAS_EQUIPO,
} from '../utils/rachasAvanzadasStats'
import { formatDateDisplay } from '../utils/dateFormat'

const FIELD_CLASSES =
  'w-full rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/40 dark:bg-zinc-800 dark:text-zinc-100'

const LABEL_CLASSES = 'mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

const TODOS = ''

function filtrarPorCondicion(matches, condicion) {
  return condicion === 'general' ? matches : matches.filter((m) => m.condicion === condicion)
}

function EquipoCategoriaAccordion({ matchesBase, categoriaKey, label, descripcion }) {
  const [condicion, setCondicion] = useState('general')

  const matchesCondicion = useMemo(() => filtrarPorCondicion(matchesBase, condicion), [matchesBase, condicion])
  const data = useMemo(
    () => buildRachasAvanzadas(matchesCondicion).equipo[categoriaKey],
    [matchesCondicion, categoriaKey]
  )

  return (
    <Accordion title={label} subtitle={`${descripcion} (${data.totalEncontradas})`} className="w-full">
      <CondicionTabs value={condicion} onChange={setCondicion} />
      <RachaCategoriaList ultimos5={data.ultimos5} mensajeVacio={data.mensajeVacio} categoria={categoriaKey} />
    </Accordion>
  )
}

function MinGolesCategoriaAccordion({ matchesBase, categoriaKey, label, buildCategoria, sufijo }) {
  const [condicion, setCondicion] = useState('general')
  const [minGoles, setMinGoles] = useState(1)

  const matchesCondicion = useMemo(() => filtrarPorCondicion(matchesBase, condicion), [matchesBase, condicion])
  const data = useMemo(
    () => buildCategoria(matchesCondicion, minGoles),
    [matchesCondicion, minGoles, buildCategoria]
  )

  return (
    <Accordion
      key={categoriaKey}
      title={label}
      subtitle={`Con al menos ${minGoles} gol${minGoles > 1 ? 'es' : ''} ${sufijo} (${data.totalEncontradas})`}
      className="w-full"
    >
      <CondicionTabs value={condicion} onChange={setCondicion} />
      <div className="flex gap-2">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setMinGoles(n)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
              minGoles === n
                ? 'bg-lime-400 text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
            }`}
          >
            +{n}
          </button>
        ))}
      </div>
      <RachaCategoriaList ultimos5={data.ultimos5} mensajeVacio={data.mensajeVacio} categoria={categoriaKey} />
    </Accordion>
  )
}

function JugadoresAccordion({ matchesBase }) {
  const [condicion, setCondicion] = useState('general')

  const matchesCondicion = useMemo(() => filtrarPorCondicion(matchesBase, condicion), [matchesBase, condicion])
  const jugadores = useMemo(() => buildRachasAvanzadas(matchesCondicion).jugadores, [matchesCondicion])

  return (
    <Accordion title="Jugadores en Racha Goleadora" className="w-full">
      <CondicionTabs value={condicion} onChange={setCondicion} />
      <JugadoresRachaGolTable rows={jugadores} />
    </Accordion>
  )
}

function RachasAvanzadasSection({ matches, allMatches }) {
  const [clubFiltro, setClubFiltro] = useState(TODOS)
  const [torneoFiltro, setTorneoFiltro] = useState(TODOS)
  const [capitanFiltro, setCapitanFiltro] = useState(TODOS)

  const baseMatches = allMatches || matches

  const clubes = useMemo(
    () => [...new Set(baseMatches.map((m) => m.club).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [baseMatches]
  )

  const clubEfectivo = clubFiltro && clubes.includes(clubFiltro) ? clubFiltro : TODOS

  const matchesAmbito = useMemo(
    () => (clubEfectivo ? baseMatches.filter((m) => m.club === clubEfectivo) : baseMatches),
    [baseMatches, clubEfectivo]
  )

  const ultimoPartido = useMemo(() => {
    return matchesAmbito.reduce((max, m) => (m.fecha && (!max || m.fecha > max) ? m.fecha : max), '')
  }, [matchesAmbito])

  const torneos = useMemo(
    () => [...new Set(matchesAmbito.map((m) => m.torneo).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [matchesAmbito]
  )

  const capitanes = useMemo(
    () => [...new Set(matchesAmbito.map((m) => m.capitanNombre).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [matchesAmbito]
  )

  const torneoEfectivo = torneoFiltro && torneos.includes(torneoFiltro) ? torneoFiltro : TODOS
  const capitanEfectivo = capitanFiltro && capitanes.includes(capitanFiltro) ? capitanFiltro : TODOS

  const matchesBase = useMemo(() => {
    return matchesAmbito.filter((m) => {
      if (torneoEfectivo && m.torneo !== torneoEfectivo) return false
      if (capitanEfectivo && m.capitanNombre !== capitanEfectivo) return false
      return true
    })
  }, [matchesAmbito, torneoEfectivo, capitanEfectivo])

  return (
    <Accordion title="Rachas Estadísticas Avanzadas" subtitle="Rachas récord y actuales del equipo y jugadores">
      {ultimoPartido && (
        <div className="rounded-lg border border-lime-400/40 bg-lime-50 px-3 py-2 text-center text-xs font-bold text-lime-700 dark:border-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300">
          Último partido registrado: {formatDateDisplay(ultimoPartido)}
        </div>
      )}

      <div>
        <label className={LABEL_CLASSES}>Club / Equipo</label>
        <select value={clubEfectivo} onChange={(e) => setClubFiltro(e.target.value)} className={FIELD_CLASSES}>
          <option value={TODOS}>Todos los clubes</option>
          {clubes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <div className="flex-1">
          <label className={LABEL_CLASSES}>Torneo / Campeonato</label>
          <select value={torneoEfectivo} onChange={(e) => setTorneoFiltro(e.target.value)} className={FIELD_CLASSES}>
            <option value={TODOS}>Todos</option>
            {torneos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className={LABEL_CLASSES}>Capitán</label>
          <select value={capitanEfectivo} onChange={(e) => setCapitanFiltro(e.target.value)} className={FIELD_CLASSES}>
            <option value={TODOS}>Todos</option>
            {capitanes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {matchesBase.length === 0 ? (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          No hay partidos para esta combinación de filtros.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:items-start">
            {CATEGORIAS_EQUIPO.map(({ key, label, descripcion }) => {
              if (key === 'anotadora') {
                return (
                  <MinGolesCategoriaAccordion
                    key={key}
                    matchesBase={matchesBase}
                    categoriaKey={key}
                    label={label}
                    buildCategoria={buildAnotadoraCategoria}
                    sufijo="convertidos"
                  />
                )
              }

              if (key === 'recibeGoles') {
                return (
                  <MinGolesCategoriaAccordion
                    key={key}
                    matchesBase={matchesBase}
                    categoriaKey={key}
                    label={label}
                    buildCategoria={buildRecibeGolesCategoria}
                    sufijo="en contra"
                  />
                )
              }

              return (
                <EquipoCategoriaAccordion
                  key={key}
                  matchesBase={matchesBase}
                  categoriaKey={key}
                  label={label}
                  descripcion={descripcion}
                />
              )
            })}
          </div>

          <JugadoresAccordion matchesBase={matchesBase} />
        </>
      )}
    </Accordion>
  )
}

export default RachasAvanzadasSection
