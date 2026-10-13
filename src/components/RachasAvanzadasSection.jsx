import { useMemo, useState } from 'react'
import Accordion from './Accordion'
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

const CONDICIONES = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

const TODOS = ''

function RachasAvanzadasSection({ matches, allMatches }) {
  const [clubFiltro, setClubFiltro] = useState(TODOS)
  const [condicion, setCondicion] = useState('general')
  const [torneoFiltro, setTorneoFiltro] = useState(TODOS)
  const [capitanFiltro, setCapitanFiltro] = useState(TODOS)
  const [anotadoraMinGoles, setAnotadoraMinGoles] = useState(1)
  const [recibeGolesMinGoles, setRecibeGolesMinGoles] = useState(1)

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

  const matchesFiltrados = useMemo(() => {
    return matchesAmbito.filter((m) => {
      if (torneoEfectivo && m.torneo !== torneoEfectivo) return false
      if (capitanEfectivo && m.capitanNombre !== capitanEfectivo) return false
      if (condicion !== 'general' && m.condicion !== condicion) return false
      return true
    })
  }, [matchesAmbito, torneoEfectivo, capitanEfectivo, condicion])

  const { equipo, jugadores } = useMemo(() => buildRachasAvanzadas(matchesFiltrados), [matchesFiltrados])

  const anotadora = useMemo(
    () => buildAnotadoraCategoria(matchesFiltrados, anotadoraMinGoles),
    [matchesFiltrados, anotadoraMinGoles]
  )

  const recibeGoles = useMemo(
    () => buildRecibeGolesCategoria(matchesFiltrados, recibeGolesMinGoles),
    [matchesFiltrados, recibeGolesMinGoles]
  )

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

      <div className="flex overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
        {CONDICIONES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setCondicion(value)}
            className={`flex-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
              condicion === value
                ? 'bg-lime-400 text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {matchesFiltrados.length === 0 ? (
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          No hay partidos para esta combinación de filtros.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:items-start">
            {CATEGORIAS_EQUIPO.map(({ key, label, descripcion }) => {
              if (key === 'anotadora') {
                return (
                  <Accordion
                    key={key}
                    title={label}
                    subtitle={`Convirtiendo al menos ${anotadoraMinGoles} gol${anotadoraMinGoles > 1 ? 'es' : ''} (${anotadora.totalEncontradas})`}
                    className="w-full"
                  >
                    <div className="flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAnotadoraMinGoles(n)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                            anotadoraMinGoles === n
                              ? 'bg-lime-400 text-zinc-900'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                          }`}
                        >
                          +{n}
                        </button>
                      ))}
                    </div>
                    <RachaCategoriaList ultimos5={anotadora.ultimos5} mensajeVacio={anotadora.mensajeVacio} categoria={key} />
                  </Accordion>
                )
              }

              if (key === 'recibeGoles') {
                return (
                  <Accordion
                    key={key}
                    title={label}
                    subtitle={`Con al menos ${recibeGolesMinGoles} gol${recibeGolesMinGoles > 1 ? 'es' : ''} en contra (${recibeGoles.totalEncontradas})`}
                    className="w-full"
                  >
                    <div className="flex gap-2">
                      {[1, 2, 3].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRecibeGolesMinGoles(n)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                            recibeGolesMinGoles === n
                              ? 'bg-lime-400 text-zinc-900'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                          }`}
                        >
                          +{n}
                        </button>
                      ))}
                    </div>
                    <RachaCategoriaList ultimos5={recibeGoles.ultimos5} mensajeVacio={recibeGoles.mensajeVacio} categoria={key} />
                  </Accordion>
                )
              }

              return (
                <Accordion
                  key={key}
                  title={label}
                  subtitle={`${descripcion} (${equipo[key].totalEncontradas})`}
                  className="w-full"
                >
                  <RachaCategoriaList ultimos5={equipo[key].ultimos5} mensajeVacio={equipo[key].mensajeVacio} categoria={key} />
                </Accordion>
              )
            })}
          </div>

          <Accordion title="Jugadores en Racha Goleadora" className="w-full">
            <JugadoresRachaGolTable rows={jugadores} />
          </Accordion>
        </>
      )}
    </Accordion>
  )
}

export default RachasAvanzadasSection
