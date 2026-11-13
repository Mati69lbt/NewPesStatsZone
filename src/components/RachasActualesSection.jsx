import { useMemo, useState } from 'react'
import Accordion from './Accordion'
import CondicionTabs from './CondicionTabs'
import RachaActualCard from './RachaActualCard'
import {
  CATEGORIAS_ACTUALES,
  getRachaActual,
  getCapitanEnTurno,
  getRachaActualCapitan,
} from '../utils/rachasActualesStats'
import { formatDateDisplay } from '../utils/dateFormat'

function filtrarPorCondicion(matches, condicion) {
  return condicion === 'general' ? matches : matches.filter((m) => m.condicion === condicion)
}

function CategoriaActualAccordion({ matches, categoriaKey, label, descripcion, clubActivo }) {
  const [condicion, setCondicion] = useState('general')

  const matchesCondicion = useMemo(() => filtrarPorCondicion(matches, condicion), [matches, condicion])

  const rachaGeneral = useMemo(
    () => getRachaActual(matchesCondicion, categoriaKey),
    [matchesCondicion, categoriaKey]
  )

  const capitanEnTurno = useMemo(() => getCapitanEnTurno(matchesCondicion), [matchesCondicion])

  const rachaCapitan = useMemo(
    () => getRachaActualCapitan(matchesCondicion, categoriaKey, capitanEnTurno),
    [matchesCondicion, capitanEnTurno, categoriaKey]
  )

  const rachasTorneos = useMemo(() => {
    const torneos = [...new Set(matchesCondicion.map((m) => m.torneo).filter(Boolean))]
    return torneos
      .map((torneo) => ({
        torneo,
        racha: getRachaActual(
          matchesCondicion.filter((m) => m.torneo === torneo),
          categoriaKey
        ),
      }))
      .filter((t) => t.racha)
      .sort((a, b) => b.racha.partidos - a.racha.partidos)
  }, [matchesCondicion, categoriaKey])

  const totalActivas = (rachaGeneral ? 1 : 0) + (rachaCapitan ? 1 : 0) + rachasTorneos.length

  return (
    <Accordion title={label} subtitle={descripcion} badge={totalActivas} className="w-full">
      <CondicionTabs value={condicion} onChange={setCondicion} />

      {totalActivas === 0 ? (
        <p className="py-3 text-center text-xs text-zinc-400 dark:text-zinc-600">
          Sin rachas vigentes mayores a 3 partidos.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {rachaGeneral && (
            <RachaActualCard
              label={clubActivo}
              subtitle="General del club"
              categoria={categoriaKey}
              racha={rachaGeneral}
            />
          )}

          {rachaCapitan && (
            <RachaActualCard
              label={capitanEnTurno}
              subtitle="Capitán en turno"
              categoria={categoriaKey}
              racha={rachaCapitan}
            />
          )}

          {rachasTorneos.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Por campeonato
              </p>
              {rachasTorneos.map(({ torneo, racha }) => (
                <RachaActualCard key={torneo} label={torneo} subtitle="Torneo" categoria={categoriaKey} racha={racha} />
              ))}
            </div>
          )}
        </div>
      )}
    </Accordion>
  )
}

function RachasActualesSection({ matches, clubActivo }) {
  const ultimoPartido = useMemo(
    () => matches.reduce((max, m) => (m.fecha && (!max || m.fecha > max) ? m.fecha : max), ''),
    [matches]
  )

  return (
    <Accordion title="Rachas Actuales" subtitle={`Rachas vigentes de ${clubActivo || 'tu club'}`}>
      {ultimoPartido && (
        <div className="rounded-lg border border-lime-400/40 bg-lime-50 px-3 py-2 text-center text-xs font-bold text-lime-700 dark:border-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300">
          Último partido registrado: {formatDateDisplay(ultimoPartido)}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 lg:items-start">
        {CATEGORIAS_ACTUALES.map(({ key, label, descripcion }) => (
          <CategoriaActualAccordion
            key={key}
            matches={matches}
            categoriaKey={key}
            label={label}
            descripcion={descripcion}
            clubActivo={clubActivo}
          />
        ))}
      </div>
    </Accordion>
  )
}

export default RachasActualesSection
