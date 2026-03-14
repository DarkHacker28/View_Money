import React from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fmt = n => n != null
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
  : '—'
const fmtTime = ts => ts
  ? new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  : '—'
const fmtDate = ts => ts
  ? new Date(ts).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  : '—'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#12122A', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12, padding: '10px 16px',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#EEF0FF',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      {fmt(payload[0]?.value)}
    </div>
  )
}

function Row({ label, value, valueColor, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '15px 20px',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.05)',
    }}>
      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: valueColor || '#EEF0FF', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ margin: '0 16px 16px' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10, paddingLeft: 4 }}>
        {title}
      </div>
      <div style={{ background: 'linear-gradient(145deg,#0E0E22,#0A0A18)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

export default function DetailScreen({ metal, data, onBack }) {
  const up     = (data?.ch ?? 0) >= 0
  const sign   = up ? '+' : ''
  const chClr  = up ? '#00E5BE' : '#FF5C7A'
  const badgeBg = up ? 'rgba(0,229,190,0.12)' : 'rgba(255,92,122,0.12)'
  const low    = data?.low   ?? 0
  const high   = data?.high  ?? 1
  const price  = data?.price ?? 0
  const pct    = high > low ? Math.max(2, Math.min(98, ((price - low) / (high - low)) * 100)) : 50

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', inset: 0, background: '#060610', zIndex: 300, overflowY: 'auto', overflowX: 'hidden' }}
    >
      {/* ambient orb */}
      <div style={{
        position: 'fixed', top: -160, right: -160, width: 420, height: 420,
        borderRadius: '50%', background: metal.color,
        filter: 'blur(120px)', opacity: 0.07, pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: -100, left: -100, width: 300, height: 300,
        borderRadius: '50%', background: metal.color,
        filter: 'blur(100px)', opacity: 0.04, pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ─── Header ─── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '56px 20px 20px' }}>
        <button onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12, padding: '9px 18px', color: 'rgba(255,255,255,0.7)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 28,
          backdropFilter: 'blur(10px)',
        }}>← Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 18, flexShrink: 0,
            background: metal.iconBg, border: `1.5px solid ${metal.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, boxShadow: `0 8px 32px ${metal.color}25`,
          }}>{metal.icon}</div>
          <div>
            <div style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: '#FFFFFF', lineHeight: 1 }}>{metal.name}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 6, letterSpacing: '0.06em' }}>
              {metal.symbol} · {metal.karat} · per {metal.unit}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Price Hero ─── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 20px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 54, fontWeight: 700, letterSpacing: '-0.05em', color: '#FFFFFF', lineHeight: 1, marginBottom: 14 }}
        >
          {fmt(data?.price)}
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, padding: '5px 14px', borderRadius: 10, background: badgeBg, color: chClr, fontWeight: 500 }}>
            {sign}{fmt(data?.ch)} ({sign}{data?.chp?.toFixed(3)}%)
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>today vs prev. close</span>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
          {fmtDate(data?.timestamp)} · {fmtTime(data?.timestamp)}
        </div>
      </div>

      {/* ─── Chart ─── */}
      <div style={{ margin: '0 16px 16px', background: 'linear-gradient(145deg,#0E0E22,#0A0A18)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '18px 10px 10px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 14, paddingLeft: 10 }}>24H Movement</div>
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={data?.spark} margin={{ top: 5, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id={`detail_${metal.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={chClr} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chClr} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis domain={['auto','auto']} hide />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
            <Area type="monotone" dataKey="v" stroke={chClr} strokeWidth={2.5} fill={`url(#detail_${metal.id})`} dot={false} activeDot={{ r: 5, fill: chClr, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ─── Day Range ─── */}
      <div style={{ margin: '0 16px 16px', background: 'linear-gradient(145deg,#0E0E22,#0A0A18)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '18px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>Day Range</div>

        {/* track */}
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', position: 'relative', marginBottom: 10 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, borderRadius: 3, background: `linear-gradient(90deg, ${metal.colorDim}, ${chClr})`, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
          <motion.div
            initial={{ left: '50%' }}
            animate={{ left: `${pct}%` }}
            transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
            style={{ position: 'absolute', top: '50%', width: 14, height: 14, borderRadius: '50%', background: chClr, border: '2.5px solid #060610', transform: 'translate(-50%,-50%)', boxShadow: `0 0 10px ${chClr}80` }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          <span>Low: {fmt(data?.low)}</span>
          <span style={{ color: chClr }}>{fmt(data?.price)}</span>
          <span>High: {fmt(data?.high)}</span>
        </div>
      </div>

      {/* ─── Price Details ─── */}
      <Section title="Price Details">
        <Row label="Current Price"  value={fmt(data?.price)}    valueColor={metal.color} />
        <Row label="Previous Close" value={fmt(data?.prevClose)} />
        <Row label="Open Price"     value={fmt(data?.openPrice)} />
        <Row label="Day High"       value={fmt(data?.high)}     valueColor="#00E5BE" />
        <Row label="Day Low"        value={fmt(data?.low)}      valueColor="#FF5C7A" last />
      </Section>

      {/* ─── Change Metrics ─── */}
      <Section title="Change Metrics">
        <Row label="Change (USD)"  value={`${sign}${fmt(data?.ch)}`}           valueColor={chClr} />
        <Row label="Change (%)"    value={`${sign}${data?.chp?.toFixed(3)}%`}  valueColor={chClr} />
        <Row label="Prev. Close"   value={fmt(data?.prevClose)}                 last />
      </Section>

      <div style={{ height: 40 }} />
    </motion.div>
  )
}
