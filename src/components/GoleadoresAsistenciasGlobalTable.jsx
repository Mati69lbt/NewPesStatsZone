const NUM_TH_CLASSES = 'w-[10%] px-1 py-2 text-center text-[10px] md:w-12 md:px-2 md:py-3 md:text-[11px]'
const NUM_TD_CLASSES = 'w-[10%] px-1 py-2 text-center text-xs md:w-12 md:px-2 md:py-3 md:text-sm'

const MEDALLAS = ['🥇', '🥈', '🥉']

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function SortArrow({ active, dir }) {
  if (!active) return null
  return <span className="ml-0.5 text-[9px] md:ml-1 md:text-[10px]">{dir === 'desc' ? '▼' : '▲'}</span>
}

function SortableHeader({ label, sortKeyValue, sortKey, sortDir, onSort, className }) {
  const active = sortKey === sortKeyValue
  return (
    <th className={className}>
      <button
        type="button"
        onClick={() => onSort(sortKeyValue)}
        className={`flex w-full items-center justify-center gap-0.5 uppercase tracking-wide transition ${
          active ? 'text-lime-400' : 'text-zinc-400 hover:text-lime-300'
        }`}
      >
        {label}
        <SortArrow active={active} dir={sortDir} />
      </button>
    </th>
  )
}

function GoleadoresAsistenciasGlobalTable({ rows, modo, sortKey, sortDir, onSort }) {
  const isGoles = modo === 'goleadores'
  const valorLabel = isGoles ? 'G' : 'A'

  const totales = rows.reduce(
    (acc, row) => ({
      valor: acc.valor + row.valor,
      x2: acc.x2 + row.x2,
      x3: acc.x3 + row.x3,
    }),
    { valor: 0, x2: 0, x3: 0 }
  )

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        No hay jugadores que superen el mínimo seleccionado.
      </p>
    )
  }

  return (
    <div className="mx-auto w-full max-w-md px-2 md:max-w-3xl">
      <div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
        <table className="w-full table-fixed border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-700 bg-zinc-800 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-400 md:text-[11px]">
              <th className="w-[8%] px-1 py-2 text-center md:w-10 md:px-3 md:py-3">#</th>
              <SortableHeader
                label={valorLabel}
                sortKeyValue="valor"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
                className={NUM_TH_CLASSES}
              />
              <SortableHeader
                label="Jugador"
                sortKeyValue="nombre"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
                className="w-[32%] px-1 py-2 text-left md:px-3 md:py-3"
              />
              <SortableHeader
                label="PJ"
                sortKeyValue="pj"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
                className={NUM_TH_CLASSES}
              />
              <th className={NUM_TH_CLASSES}>D</th>
              <th className={NUM_TH_CLASSES}>T</th>
              <SortableHeader
                label="Prom"
                sortKeyValue="promedio"
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
                className={NUM_TH_CLASSES}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {rows.map((row, index) => (
              <tr
                key={`${row.nombre}-${row.club}`}
                className={`transition hover:bg-zinc-800/60 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/40'}`}
              >
                <td className="w-[8%] px-1 py-2 md:w-10 md:px-3 md:py-3">
                  <Posicion index={index} />
                </td>
                <td className={NUM_TD_CLASSES}>
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-zinc-950 px-1.5 py-0.5 text-[11px] font-bold text-lime-400 md:min-w-6 md:px-2 md:text-sm">
                    {row.valor}
                  </span>
                </td>
                <td className="break-words px-1 py-2 text-left md:px-3 md:py-3">
                  <div className="text-xs font-bold text-zinc-100 md:text-sm">{row.nombre}</div>
                  <div className="text-[11px] text-zinc-400 md:text-xs">{row.club}</div>
                </td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.pj}</td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.x2 || '-'}</td>
                <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{row.x3 || '-'}</td>
                <td className={`${NUM_TD_CLASSES} font-semibold text-zinc-200`}>{row.promedio.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-700 bg-zinc-800 text-[10px] font-bold uppercase text-zinc-300 md:text-xs">
              <td className="px-1 py-1.5 md:px-3 md:py-3" colSpan={3}>
                Totales
              </td>
              <td className={NUM_TD_CLASSES} />
              <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{totales.x2}</td>
              <td className={`${NUM_TD_CLASSES} text-zinc-300`}>{totales.x3}</td>
              <td className={NUM_TD_CLASSES} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default GoleadoresAsistenciasGlobalTable
