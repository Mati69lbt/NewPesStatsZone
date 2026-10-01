import { useMemo, useState } from 'react'

const MEDALLAS = ['🥇', '🥈', '🥉']

function Posicion({ index }) {
  const medalla = MEDALLAS[index]
  return (
    <span className="flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 md:text-sm">
      {medalla ?? index + 1}
    </span>
  )
}

function formatPromedio(value) {
  return value.toFixed(2)
}

const TH_NUM_CLASSES =
  'w-12 px-1 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:w-16 md:px-3 md:py-3 md:text-[11px]'
const TD_NUM_CLASSES = 'w-12 whitespace-nowrap px-1 py-2 text-center text-xs md:w-16 md:px-3 md:py-3 md:text-sm'

function SortableHeader({ column, sortKey, sortDir, onSort, className, accentColorClass }) {
  const active = sortKey === column.key
  return (
    <th
      className={`${className} cursor-pointer select-none transition hover:text-lime-500 dark:hover:text-lime-400 ${
        active ? accentColorClass : ''
      }`}
      onClick={() => onSort(column.key)}
    >
      <span className="inline-flex items-center gap-0.5">
        {column.label}
        {active && <span className="text-[10px]">{sortDir === 'desc' ? '↓' : '↑'}</span>}
      </span>
    </th>
  )
}

function MejoresAniosTable({
  rows,
  valueKey = 'goles',
  valueLabel = 'Goles',
  valueColorClass = 'text-lime-600 dark:text-lime-400',
}) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('desc')

  const columnas = useMemo(
    () => [
      { key: 'periodo', label: 'Año', getValue: (row) => Number.parseInt(row.periodo, 10) || 0 },
      { key: 'pj', label: 'PJ', getValue: (row) => row.pj },
      { key: valueKey, label: valueLabel, getValue: (row) => row[valueKey] },
      { key: 'promedio', label: 'Prom.', getValue: (row) => row.promedio },
    ],
    [valueKey, valueLabel]
  )

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((dir) => (dir === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows
    const columna = columnas.find((c) => c.key === sortKey)
    if (!columna) return rows
    const factor = sortDir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => factor * (columna.getValue(a) - columna.getValue(b)))
  }, [rows, sortKey, sortDir, columnas])

  if (rows.length === 0) {
    return (
      <p className="w-full py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
        No hay datos registrados para esta selección.
      </p>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-auto w-fit max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <table className="border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800">
              <th className="w-8 px-1 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:w-10 md:px-3 md:py-3 md:text-[11px]">
                Pos
              </th>
              <SortableHeader
                column={columnas[0]}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                accentColorClass="text-lime-600 dark:text-lime-400"
                className="whitespace-nowrap px-1 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 md:px-3 md:py-3 md:text-[11px]"
              />
              <SortableHeader
                column={columnas[1]}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                accentColorClass="text-lime-600 dark:text-lime-400"
                className={TH_NUM_CLASSES}
              />
              <SortableHeader
                column={columnas[2]}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                accentColorClass={valueColorClass}
                className={TH_NUM_CLASSES}
              />
              <SortableHeader
                column={columnas[3]}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={handleSort}
                accentColorClass="text-lime-600 dark:text-lime-400"
                className={TH_NUM_CLASSES}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {sortedRows.map((row, index) => (
              <tr
                key={row.periodo}
                className="odd:bg-white even:bg-gray-100 transition hover:bg-lime-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800 dark:hover:bg-zinc-700/70"
              >
                <td className="w-8 px-1 py-2 text-center md:w-10 md:px-3 md:py-3">
                  <Posicion index={index} />
                </td>
                <td className="whitespace-nowrap px-1 py-2 text-left text-xs font-bold text-zinc-900 dark:text-zinc-100 md:px-3 md:py-3 md:text-sm">
                  {row.periodo}
                </td>
                <td className={`${TD_NUM_CLASSES} text-zinc-600 dark:text-zinc-300`}>{row.pj}</td>
                <td className={`${TD_NUM_CLASSES} font-bold ${valueColorClass}`}>{row[valueKey]}</td>
                <td className={`${TD_NUM_CLASSES} font-semibold text-zinc-700 dark:text-zinc-200`}>{formatPromedio(row.promedio)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MejoresAniosTable
