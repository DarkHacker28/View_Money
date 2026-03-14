import { useState, useCallback } from 'react'

const BASE = { XAU: 2341.50, XAG: 29.87, XPT: 953.20, XPD: 1024.60 }
const drifts = { XAU: 0, XAG: 0, XPT: 0, XPD: 0 }

function mockFetch(symbol) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.04) return reject(new Error('Network timeout'))
      const base = BASE[symbol]
      drifts[symbol] += (Math.random() - 0.49) * base * 0.002
      drifts[symbol] = Math.max(-base * 0.03, Math.min(base * 0.03, drifts[symbol]))
      const price = +(base + drifts[symbol]).toFixed(2)
      const prevClose = +(base * (1 + (Math.random() - 0.52) * 0.008)).toFixed(2)
      const openPrice = +(prevClose + (Math.random() - 0.5) * 4).toFixed(2)
      const high = +(price + Math.random() * base * 0.007).toFixed(2)
      const low  = +(price - Math.random() * base * 0.007).toFixed(2)
      const ch   = +(price - prevClose).toFixed(2)
      const chp  = +(ch / prevClose * 100).toFixed(3)
      const spark = Array.from({ length: 30 }, (_, i) => ({
        t: i,
        v: +(prevClose + (price - prevClose) * (i / 29) + (Math.random() - 0.5) * base * 0.005).toFixed(2),
      }))
      resolve({ price, prevClose, openPrice, high, low, ch, chp, spark, timestamp: Date.now() })
    }, 500 + Math.random() * 1000)
  })
}

export function useMetalPrice(symbol) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const refetch = useCallback(() => {
    setLoading(true); setError(null)
    mockFetch(symbol)
      .then(d  => { setData(d);          setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [symbol])
  return { data, loading, error, refetch }
}
