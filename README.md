# ◈ View Money — Precious Metals Tracker

Live precious metals dashboard — Gold, Silver, Platinum, Palladium.

## Tech Stack
- **React 18** + **Vite** (fast HMR, optimized builds)
- **Framer Motion** — page transitions, card animations
- **Recharts** — 24H area chart on detail screen
- **CSS Modules** — scoped component styles
- **Mock API** — swap for goldapi.io in production

---

## Getting Started (Local)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# Open http://localhost:5173
```

---

## Connect Real API (goldapi.io)

Replace `mockFetch` in `src/hooks/useMetalPrice.js`:

```js
// Create .env.local
VITE_GOLD_API_KEY=your_key_here

// In useMetalPrice.js, replace mockFetch with:
async function liveFetch(symbol) {
  const res = await fetch(`https://www.goldapi.io/api/${symbol}/USD`, {
    headers: { 'x-access-token': import.meta.env.VITE_GOLD_API_KEY }
  })
  if (!res.ok) throw new Error('API error')
  const d = await res.json()
  return {
    price: d.price,
    prevClose: d.prev_close_price,
    openPrice: d.open_price,
    high: d.high_price,
    low: d.low_price,
    ch: d.ch,
    chp: d.chp,
    spark: [], // goldapi doesn't provide spark — use a separate history endpoint
    timestamp: d.timestamp * 1000,
  }
}
```

---

## Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub
# Push to GitHub → import repo on vercel.com → auto-deploy
```

`vercel.json` is already configured for SPA routing.

---

## Project Structure

```
view-money/
├── src/
│   ├── components/
│   │   ├── MetalCard.jsx        # Individual metal card (own loader)
│   │   ├── MetalCard.module.css
│   │   ├── DetailScreen.jsx     # Full detail view with chart
│   │   ├── DetailScreen.module.css
│   │   └── SparkLine.jsx        # Mini SVG spark chart
│   ├── hooks/
│   │   └── useMetalPrice.js     # Per-metal data fetching hook
│   ├── constants.js             # Metal config, formatters
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Features

- ✅ Independent loader per metal (each fetches autonomously)
- ✅ Loading skeletons (per-card shimmer)
- ✅ Error states with Retry per card
- ✅ Live clock refreshing every second
- ✅ Mini sparkline chart on each card
- ✅ Detail screen: 24H area chart, day range bar, all price stats
- ✅ Framer Motion animations throughout
- ✅ Vercel-ready
