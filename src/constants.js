export const METALS = [
  {
    id: 'gold',
    symbol: 'XAU',
    name: 'Gold',
    karat: '24K',
    unit: 'troy oz',
    color: '#F5C842',
    colorDim: '#A8881E',
    colorGlow: 'rgba(245,200,66,0.12)',
    bg: 'radial-gradient(ellipse at top right, rgba(245,200,66,0.08) 0%, transparent 60%)',
    icon: '⬡',
    rank: 1,
  },
  {
    id: 'silver',
    symbol: 'XAG',
    name: 'Silver',
    karat: '999',
    unit: 'troy oz',
    color: '#D8D8EC',
    colorDim: '#8888AA',
    colorGlow: 'rgba(216,216,236,0.10)',
    bg: 'radial-gradient(ellipse at top right, rgba(216,216,236,0.07) 0%, transparent 60%)',
    icon: '◈',
    rank: 2,
  },
  {
    id: 'platinum',
    symbol: 'XPT',
    name: 'Platinum',
    karat: '950',
    unit: 'troy oz',
    color: '#A8D8F0',
    colorDim: '#5588A8',
    colorGlow: 'rgba(168,216,240,0.10)',
    bg: 'radial-gradient(ellipse at top right, rgba(168,216,240,0.08) 0%, transparent 60%)',
    icon: '◇',
    rank: 3,
  },
  {
    id: 'palladium',
    symbol: 'XPD',
    name: 'Palladium',
    karat: '999.5',
    unit: 'troy oz',
    color: '#E8C898',
    colorDim: '#A8885A',
    colorGlow: 'rgba(232,200,152,0.10)',
    bg: 'radial-gradient(ellipse at top right, rgba(232,200,152,0.08) 0%, transparent 60%)',
    icon: '⬟',
    rank: 4,
  },
]

export const fmt = (n, decimals = 2) =>
  n != null
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n)
    : '—'

export const fmtTime = (ts) =>
  ts
    ? new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '—'

export const fmtDate = (ts) =>
  ts
    ? new Date(ts).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '—'
