import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMetalPrice } from '../hooks/useMetalPrice'
import SparkLine from './SparkLine'

const fmt = n => n != null
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
  : '—'
const fmtTime = ts => ts
  ? new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  : '—'

/* ─── Shimmer Skeleton ─── */
function Skeleton({ metal }) {
  const S = ({ w, h, r = 6, mt = 0 }) => (
    <motion.div
      animate={{ opacity: [0.25, 0.55, 0.25] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: w, height: h, borderRadius: r, background: 'rgba(255,255,255,0.06)', marginTop: mt }}
    />
  )
  return (
    <div style={{
      borderRadius: 24, padding: 22, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(145deg, #0E0E1F 0%, #0A0A18 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: metal.cardBg, pointerEvents: 'none', borderRadius: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <S w={42} h={42} r={13} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
          <S w={54} h={10} /> <S w={36} h={8} />
        </div>
      </div>
      <S w="45%" h={13} /> <S w="68%" h={32} mt={8} /> <S w="100%" h={36} mt={14} />
    </div>
  )
}

/* ─── Error ─── */
function ErrorCard({ metal, onRetry }) {
  return (
    <div style={{
      borderRadius: 24, padding: 22,
      background: 'linear-gradient(145deg,#1A080A,#0E0608)',
      border: '1px solid rgba(255,75,75,0.2)',
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{ width: 42, height: 42, borderRadius: 13, background: 'rgba(255,75,75,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⚠️</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#EEF0FF' }}>{metal.name}</div>
        <div style={{ fontSize: 11, color: '#FF6B6B', marginTop: 2, fontFamily: 'JetBrains Mono, monospace' }}>Feed unavailable</div>
      </div>
      <button onClick={onRetry} style={{
        marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 10, padding: '8px 14px', color: '#EEF0FF', fontSize: 12, fontWeight: 600, cursor: 'pointer',
      }}>↺ Retry</button>
    </div>
  )
}

/* ─── Main Card ─── */
export default function MetalCard({ metal, index, onClick }) {
  const { data, loading, error, refetch } = useMetalPrice(metal.symbol)
  useEffect(() => { refetch() }, [])

  const anim = {
    initial: { opacity: 0, y: 28, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  if (loading && !data) return <motion.div {...anim}><Skeleton metal={metal} /></motion.div>
  if (error && !data)   return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ErrorCard metal={metal} onRetry={refetch} /></motion.div>

  const up     = (data?.ch ?? 0) >= 0
  const sign   = up ? '+' : ''
  const chClr  = up ? '#00E5BE' : '#FF5C7A'
  const badgeBg = up ? 'rgba(0,229,190,0.12)' : 'rgba(255,92,122,0.12)'

  return (
    <motion.div
      {...anim}
      whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      onClick={() => data && onClick(metal, data)}
      style={{
        borderRadius: 24, padding: 22, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(145deg, #0E0E1F 0%, #0A0A18 100%)',
        border: `1px solid ${metal.borderColor}`,
        cursor: 'pointer',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 0 ${metal.glowColor}`,
        transition: 'box-shadow 0.3s',
      }}
      onHoverStart={e => {}}
    >
      {/* card glow bg */}
      <div style={{ position: 'absolute', inset: 0, background: metal.cardBg, pointerEvents: 'none', borderRadius: 24 }} />
      {/* top shimmer line */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, ${metal.color}55, transparent)`, borderRadius: 1 }} />

      {/* TOP ROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' }}>
        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: metal.iconBg,
          border: `1.5px solid ${metal.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 21,
          boxShadow: `0 4px 16px ${metal.color}20`,
        }}>
          {metal.icon}
        </div>
        {/* Symbol + karat */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>{metal.symbol}</div>
          <div style={{ display: 'inline-block', marginTop: 4, background: `${metal.color}18`, border: `1px solid ${metal.color}30`, borderRadius: 6, padding: '2px 7px', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: metal.color, letterSpacing: '0.08em' }}>{metal.karat}</div>
        </div>
      </div>

      {/* NAME */}
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4, position: 'relative' }}>
        {metal.name}
      </div>

      {/* PRICE + BADGE */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={data?.price}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1 }}
          >
            {fmt(data?.price)}
          </motion.div>
        </AnimatePresence>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: chClr, background: badgeBg, padding: '4px 9px', borderRadius: 8, fontWeight: 500 }}>
            {sign}{data?.chp?.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* BOTTOM: change + sparkline */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative',
      }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: chClr, fontWeight: 500 }}>
            {sign}{fmt(data?.ch)}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3 }}>
            {fmtTime(data?.timestamp)}
          </div>
        </div>
        <SparkLine data={data?.spark} color={chClr} width={80} height={36} />
      </div>
    </motion.div>
  )
}
