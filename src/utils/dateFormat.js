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

export function diffDays(isoStart, isoEnd) {
  if (!isoStart || !isoEnd) return null
  const start = new Date(`${isoStart}T00:00:00`)
  const end = new Date(`${isoEnd}T00:00:00`)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  return Math.round((end - start) / 86400000)
}

export function formatDuracionDias(dias) {
  if (dias == null) return { desglose: '—', total: '' }
  if (dias < 30) return { desglose: `${dias} Días`, total: '' }
  const meses = Math.floor(dias / 30)
  const restoDias = dias % 30
  const mesesLabel = `${meses} ${meses === 1 ? 'Mes' : 'Meses'}`
  const desglose = restoDias === 0 ? mesesLabel : `${mesesLabel} ${restoDias} Días`
  return { desglose, total: `${dias} Días` }
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
