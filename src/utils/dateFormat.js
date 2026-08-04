export function formatDateDisplay(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

export function formatDateShort(isoDate) {
  if (!isoDate) return ''
  const [, month, day] = isoDate.split('-')
  return `${day}/${month}`
}

export function getTemporadaLabel(isoDate, tipo) {
  if (!isoDate) return ''
  const [yearStr, monthStr] = isoDate.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr)

  if (tipo === 'europeo') {
    return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`
  }
  return `${year}`
}
