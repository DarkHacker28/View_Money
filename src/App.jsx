import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MetalCard from './components/MetalCard'
import DetailScreen from './components/DetailScreen'

/* ─── Metal Config ─── */
const METALS = [
  {
    id: 'gold', symbol: 'XAU', name: 'Gold', karat: '24K', unit: 'troy oz',
    color: '#FFB829', colorDim: '#A87520',
    icon: '✦',
    iconBg: 'linear-gradient(135deg,#2A1E00,#1A1200)',
    cardBg: 'radial-gradient(ellipse at 100% 0%, rgba(255,184,41,0.08) 0%, transparent 60%)',
    borderColor: 'rgba(255,184,41,0.18)',
    glowColor: 'rgba(255,184,41,0.1)',
    tag: 'Most Traded',
  },
  {
    id: 'silver', symbol: 'XAG', name: 'Silver', karat: '999', unit: 'troy oz',
    color: '#C8CCDD', colorDim: '#7A80A0',
    icon: '◈',
    iconBg: 'linear-gradient(135deg,#161826,#0E1020)',
    cardBg: 'radial-gradient(ellipse at 100% 0%, rgba(200,204,221,0.07) 0%, transparent 60%)',
    borderColor: 'rgba(200,204,221,0.15)',
    glowColor: 'rgba(200,204,221,0.08)',
    tag: 'Industrial',
  },
  {
    id: 'platinum', symbol: 'XPT', name: 'Platinum', karat: '950', unit: 'troy oz',
    color: '#7DD3FC', colorDim: '#3A88B8',
    icon: '◇',
    iconBg: 'linear-gradient(135deg,#001A2A,#001018)',
    cardBg: 'radial-gradient(ellipse at 100% 0%, rgba(125,211,252,0.08) 0%, transparent 60%)',
    borderColor: 'rgba(125,211,252,0.16)',
    glowColor: 'rgba(125,211,252,0.08)',
    tag: 'Rare',
  },
  {
    id: 'palladium', symbol: 'XPD', name: 'Palladium', karat: '999.5', unit: 'troy oz',
    color: '#FBBF24', colorDim: '#A87520',
    icon: '⬟',
    iconBg: 'linear-gradient(135deg,#201400,#150D00)',
    cardBg: 'radial-gradient(ellipse at 100% 0%, rgba(251,191,36,0.08) 0%, transparent 60%)',
    borderColor: 'rgba(251,191,36,0.16)',
    glowColor: 'rgba(251,191,36,0.08)',
    tag: 'Auto Catalyst',
  },
]

/* ─── Live Clock ─── */
function LiveClock() {
  const [t, setT] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
      {t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

/* ─── Market Summary Bar ─── */
function MarketBar() {
  const items = [
    { label: 'COMEX', value: 'OPEN', color: '#00E5BE' },
    { label: 'NYSE', value: 'OPEN', color: '#00E5BE' },
    { label: 'MCX', value: 'CLOSED', color: 'rgba(255,255,255,0.25)' },
    { label: 'USD/INR', value: '84.12', color: '#EEF0FF' },
  ]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 12, overflow: 'hidden', marginBottom: 20,
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          flex: 1, padding: '9px 8px', textAlign: 'center',
          borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: item.color, fontWeight: 500 }}>{item.value}</div>
        </div>
      ))}
    </div>
  )
}

/* ─── Portfolio Summary ─── */
function PortfolioSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.5 }}
      style={{
        background: 'linear-gradient(135deg, #0F1628 0%, #0A0E1E 50%, #060812 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: '20px 22px', marginBottom: 20, position: 'relative', overflow: 'hidden',
      }}
    >
      {/* decorative grid lines */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px', borderRadius: 20, pointerEvents: 'none' }} />
      {/* glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, position: 'relative' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Market Portfolio</div>
          <div style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 30, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1 }}>4 Metals</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Tracking</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#00E5BE', boxShadow: '0 0 8px rgba(0,229,190,0.8)' }}
            />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00E5BE', fontWeight: 500 }}>LIVE</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', position: 'relative' }}>
        {METALS.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: `${m.color}12`, border: `1px solid ${m.color}28`, borderRadius: 20 }}>
            <span style={{ fontSize: 12 }}>{m.icon}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: m.color, letterSpacing: '0.06em' }}>{m.symbol}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── App ─── */
export default function App() {
  const [selected, setSelected]     = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [spinning, setSpinning]     = useState(false)

  const handleRefresh = () => {
    setSpinning(true)
    setRefreshKey(k => k + 1)
    setTimeout(() => setSpinning(false), 700)
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#060610', position: 'relative', display: 'flex', flexDirection: 'column' }}>

      {/* ── Background mesh ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden', maxWidth: 480, margin: '0 auto' }}>
        {/* top left orb */}
        <div style={{ position: 'absolute', top: -120, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        {/* top right gold */}
        <div style={{ position: 'absolute', top: 80, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,184,41,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        {/* mid teal */}
        <div style={{ position: 'absolute', top: '45%', left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,190,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        {/* bottom */}
        <div style={{ position: 'absolute', bottom: -80, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(125,211,252,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        {/* subtle grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.015, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ── Top Nav Bar ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(20px)', background: 'rgba(6,6,16,0.8)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #00E5BE, #0099CC)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, boxShadow: '0 4px 16px rgba(0,229,190,0.35)',
          }}>◈</div>
          <div>
            <div style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>ViewMoney</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Metals Tracker</div>
          </div>
        </div>
        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(0,229,190,0.08)', border: '1px solid rgba(0,229,190,0.2)', borderRadius: 20 }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E5BE' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00E5BE', fontWeight: 500 }}>Live</span>
          </div>
          <motion.button
            animate={spinning ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            onClick={handleRefresh}
            style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >↻</motion.button>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1, padding: '24px 16px 0' }}>

        {/* Hero headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ padding: '0 4px 24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 2, background: 'linear-gradient(90deg, #00E5BE, transparent)', borderRadius: 1 }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00E5BE', fontWeight: 500 }}>Live Market Data</span>
          </div>
          <h1 style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 34, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#FFFFFF', marginBottom: 8 }}>
            Precious Metals<br />
            <span style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #FFB829, #FF8C00)' }}>at a Glance</span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, fontWeight: 400 }}>
            Real-time prices for Gold, Silver, Platinum &amp; Palladium — updated live.
          </p>
        </motion.div>

        {/* Market status bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <MarketBar />
        </motion.div>

        {/* Portfolio chip */}
        <PortfolioSummary />

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>All Metals</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <LiveClock />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 6 }}>NYSE · COMEX</span>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div key={refreshKey} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {METALS.map((metal, i) => (
            <MetalCard
              key={`${metal.id}-${refreshKey}`}
              metal={metal}
              index={i}
              onClick={(m, d) => setSelected({ metal: m, data: d })}
            />
          ))}
        </div>

        {/* ── Info Banner ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(0,229,190,0.05))',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 16, padding: '14px 18px', marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          <div style={{ fontSize: 22, flexShrink: 0 }}>💡</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#EEF0FF', marginBottom: 3 }}>Tap any metal for full details</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>See day range, open/close prices, 24H chart and more.</div>
          </div>
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
        {/* Divider glow */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,229,190,0.3), rgba(99,102,241,0.3), transparent)', margin: '0 16px' }} />

        {/* Footer main */}
        <div style={{ padding: '24px 20px 16px' }}>
          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9,
                background: 'linear-gradient(135deg, #00E5BE, #0099CC)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, boxShadow: '0 4px 12px rgba(0,229,190,0.25)',
              }}>◈</div>
              <div>
                <div style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 15, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>ViewMoney</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Precious Metals</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Gold', 'Silver', 'Platinum', 'Palladium'].map((_, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                  {METALS[i].icon}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, marginBottom: 20, fontWeight: 400 }}>
            ViewMoney provides live precious metals tracking for Gold, Silver, Platinum and Palladium. Built for traders, investors and enthusiasts who want clean, real-time data.
          </p>

          {/* Links row */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            {['About', 'Privacy', 'Terms', 'API Docs'].map(link => (
              <span key={link} style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontWeight: 500, transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#00E5BE'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
              >{link}</span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

          {/* Bottom copyright row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
              © {new Date().getFullYear()} ViewMoney. All rights reserved.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 12 }}
              >❤️</motion.span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>by</span>
              <span style={{ fontFamily: 'Familjen Grotesk, sans-serif', fontSize: 12, fontWeight: 700, color: '#00E5BE', letterSpacing: '-0.01em' }}>Himanshu Singh</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
              ⚠ DISCLAIMER: Prices shown are for demonstration purposes only. This is not financial advice. Connect a live API (goldapi.io) for real market data before making investment decisions.
            </div>
          </div>
        </div>
      </footer>

      {/* ── Detail Screen overlay ── */}
      <AnimatePresence>
        {selected && (
          <DetailScreen
            key="detail"
            metal={selected.metal}
            data={selected.data}
            onBack={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
