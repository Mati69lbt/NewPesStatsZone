import VersusStatCell from './VersusStatCell'

const NIVELES = [
  { key: 'general', label: 'General' },
  { key: 'local', label: 'Local' },
  { key: 'visitante', label: 'Visitante' },
  { key: 'neutral', label: 'Neutral' },
]

function VersusSummaryMatrix({ stats, showPoints = false }) {
  return (
    <div className="grid w-full grid-cols-2 place-items-center gap-3 sm:flex sm:flex-row sm:flex-wrap sm:justify-center">
      {NIVELES.map(({ key, label }) => (
        <VersusStatCell key={key} label={label} stats={stats[key]} showPoints={showPoints} />
      ))}
    </div>
  )
}

export default VersusSummaryMatrix
