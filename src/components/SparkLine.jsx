import React, { useMemo } from 'react'

export default function SparkLine({ data = [], color = '#00E5BE', width = 80, height = 36 }) {
  const { linePath, areaPath } = useMemo(() => {
    if (!data || data.length < 2) return { linePath: '', areaPath: '' }
    const vals = data.map(d => d.v)
    const min = Math.min(...vals)
    const max = Math.max(...vals)
    const range = max - min || 1
    const pts = vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * width
      const y = height - ((v - min) / range) * (height * 0.78) - height * 0.11
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    const lp = 'M' + pts.join('L')
    return { linePath: lp, areaPath: `${lp}L${width},${height}L0,${height}Z` }
  }, [data, width, height])

  if (!linePath) return null
  const gid = `g${Math.abs(color.split('').reduce((a, c) => a + c.charCodeAt(0), 0))}`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
