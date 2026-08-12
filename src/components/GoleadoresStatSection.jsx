import { useState } from 'react'
import Accordion from './Accordion'

const TABS = [
  { value: 'general', label: 'General' },
  { value: 'local', label: 'Local' },
  { value: 'visitante', label: 'Visitante' },
]

function GoleadoresStatSection({ title, dataPorCondicion, Table, defaultOpen }) {
  const [tab, setTab] = useState('general')

  return (
    <Accordion title={title} defaultOpen={defaultOpen}>
      <div className="flex flex-col gap-3">
        <div className="flex w-full overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`flex-1 px-2 py-2 text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
                tab === value
                  ? 'bg-lime-400 text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Table rows={dataPorCondicion[tab]} />
      </div>
    </Accordion>
  )
}

export default GoleadoresStatSection
