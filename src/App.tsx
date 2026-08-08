import { useState, useEffect, useRef } from 'react'
import higherForHireImg from './imports/Untitled_-_August_06__2026_at_15.33.56.png'

// ── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Operations', href: '#operations' },
    { label: 'Briefings', href: '#briefings' },
    { label: 'Autopilot', href: '#autopilot' },
    { label: 'Flight Logs', href: '#flight-logs' },
    { label: 'About', href: '#about' },
  ]

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(2,8,20,0.97)' : 'rgba(2,8,20,0.7)',
        borderBottom: scrolled ? '1px solid rgba(0,212,232,0.15)' : '1px solid transparent',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        height: 64,
        display: 'flex', alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo — placeholder slot; replace inner div with <img src={logoAsset} /> when official asset is ready */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #f0177a, #00d4e8)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: '0.12em', color: 'white', lineHeight: 1 }}>FLIGHTDECK</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.2em', color: 'rgba(0,212,232,0.7)', marginTop: 2 }}>MARKET INTELLIGENCE</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href="#hire" className="btn-primary" style={{ fontSize: 11, padding: '8px 18px', textDecoration: 'none', display: 'block' }}>
            HIRE
          </a>

        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, height: 2, background: menuOpen ? '#f0177a' : '#00d4e8', marginBottom: 5, transition: 'all 0.2s' }} />
          <div style={{ width: 24, height: 2, background: menuOpen ? '#f0177a' : '#00d4e8', marginBottom: 5, transition: 'all 0.2s' }} />
          <div style={{ width: 18, height: 2, background: menuOpen ? '#f0177a' : '#00d4e8', transition: 'all 0.2s' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: 'rgba(2,8,20,0.98)',
          borderBottom: '1px solid rgba(0,212,232,0.2)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
          backdropFilter: 'blur(20px)', zIndex: 49,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontSize: 13 }} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#hire" className="btn-primary" style={{ fontSize: 11, padding: '10px 18px', textDecoration: 'none', textAlign: 'center' }} onClick={() => setMenuOpen(false)}>
            HIRE
          </a>
        </div>
      )}

    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${higherForHireImg})`,
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
      }} />
      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(2,8,20,0.88) 0%, rgba(5,13,31,0.75) 50%, rgba(2,8,20,0.82) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,8,20,1) 0%, transparent 40%)' }} />

      {/* HUD grid */}
      <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Corner HUD brackets */}
      <HudCorners />

      {/* Radar rings */}
      <div style={{ position: 'absolute', right: '8%', top: '20%', width: 300, height: 300, opacity: 0.15 }}>
        {[1, 0.7, 0.4].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            border: '1px solid #00d4e8', borderRadius: '50%',
            transform: `scale(${s})`,
            animation: `radar-pulse ${3 + i}s ease-in-out infinite ${i * 0.5}s`,
          }} />
        ))}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,212,232,0.3), transparent)',
          transform: 'translateY(-50%)',
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(0,212,232,0.3), transparent)',
          transform: 'translateX(-50%)',
        }} />
      </div>

      {/* HUD status bar top */}
      <div className="hud-coord-bar" style={{
        position: 'absolute', top: 80, left: 24, right: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(0,212,232,0.5)',
        letterSpacing: '0.15em',
      }}>
        <span>FLIGHTDECK MARKET INTELLIGENCE // flightdeckmarkets.com</span>
        <span>LAT: 40.7128°N // LON: 74.0060°W // ALT: FL350</span>
      </div>

      {/* Content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', width: '100%', padding: '120px 24px 80px' }}>
        <div style={{ maxWidth: 780 }}>
          <div className="section-label" style={{ marginBottom: 24 }}>
            MARKET INTELLIGENCE PLATFORM
          </div>

          <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(64px, 10vw, 130px)', lineHeight: 0.9, letterSpacing: '-0.01em', color: 'white', marginBottom: 24 }}>
            FLIGHT<span className="text-gradient-pink">DECK</span>
          </h1>

          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
            fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '0.15em',
            color: '#00d4e8', marginBottom: 32, textTransform: 'uppercase',
          }}>
            Turning Market Data Into Market Intelligence
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(226,232,240,0.8)', maxWidth: 580, marginBottom: 48 }}>
            A multi-market analytics and intelligence platform engineered to transform raw financial data into structured, actionable market intelligence.
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#platform" className="btn-primary" style={{ textDecoration: 'none', fontSize: 13 }}>
              EXPLORE FLIGHTDECK
            </a>
            <a href="#flight-logs" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 13 }}>
              VIEW FLIGHT LOGS
            </a>
          </div>

          {/* Status indicators */}
          <div className="hero-status" style={{ display: 'flex', gap: 24, marginTop: 56, flexWrap: 'wrap' }}>
            {[
              { dot: 'cyan', label: 'MULTI-MARKET COVERAGE' },
              { dot: 'pink', label: 'SIGNAL INTELLIGENCE' },
              { dot: 'green', label: 'ANALYTICS PIPELINE' },
            ].map(({ dot, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(226,232,240,0.6)' }}>
                <span className={`status-dot status-dot-${dot}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #020814, transparent)' }} />
    </section>
  )
}

// ── HUD corners decoration ────────────────────────────────────────────────────
function HudCorners() {
  const sz = 40
  const c = 'rgba(0,212,232,0.4)'
  const style = (pos: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute', width: sz, height: sz, ...pos,
  })
  return (
    <>
      <svg style={style({ top: 72, left: 16 })} viewBox="0 0 40 40" fill="none"><path d={`M0 ${sz} V0 H${sz}`} stroke={c} strokeWidth="1.5" /></svg>
      <svg style={style({ top: 72, right: 16 })} viewBox="0 0 40 40" fill="none"><path d={`M${sz} ${sz} V0 H0`} stroke={c} strokeWidth="1.5" /></svg>
      <svg style={style({ bottom: 24, left: 16 })} viewBox="0 0 40 40" fill="none"><path d={`M0 0 V${sz} H${sz}`} stroke={c} strokeWidth="1.5" /></svg>
      <svg style={style({ bottom: 24, right: 16 })} viewBox="0 0 40 40" fill="none"><path d={`M${sz} 0 V${sz} H0`} stroke={c} strokeWidth="1.5" /></svg>
    </>
  )
}

// ── Section: Platform ─────────────────────────────────────────────────────────
function PlatformSection() {
  const ref = useReveal()
  const markets = [
    {
      id: 'FOREX',
      label: 'FX',
      title: 'Forex Intelligence',
      desc: 'MetaTrader 5 data pipelines powering multi-pair market intelligence, session tracking, and currency strength analysis.',
      pairs: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'],
      color: '#00d4e8',
    },
    {
      id: 'STOCKS',
      label: 'EQ',
      title: 'S&P 500 Scanner',
      desc: 'Systematic scanning across the S&P 500 universe. Signal detection, momentum analysis, and market breadth intelligence.',
      pairs: ['SPY', 'AAPL', 'NVDA', 'MSFT'],
      color: '#f0177a',
    },
    {
      id: 'ETF WATCH',
      label: 'ETF',
      title: 'ETF Monitoring',
      desc: 'Cross-market ETF analysis covering sectors, thematic strategies, and macro-level capital flow intelligence.',
      pairs: ['QQQ', 'IWM', 'XLK', 'GLD'],
      color: '#00d4e8',
    },
    {
      id: 'OPTIONS',
      label: 'OPT',
      title: 'Options Intelligence',
      desc: 'Options market activity monitoring. Unusual flow detection, open interest analysis, and derivatives market intelligence.',
      pairs: ['Calls', 'Puts', 'Flow', 'OI'],
      color: '#f0177a',
    },
  ]

  return (
    <section id="platform" style={{ padding: '100px 0', background: '#020814', position: 'relative' }}>
      <div className="hud-grid-fine" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>MARKET COVERAGE</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(40px,6vw,72px)', color: 'white', letterSpacing: '-0.01em', lineHeight: 1 }}>
            ONE PLATFORM.<br /><span className="text-gradient-cyan">MULTIPLE MARKETS.</span>
          </h2>
          <p style={{ marginTop: 20, color: 'rgba(226,232,240,0.6)', maxWidth: 540, margin: '20px auto 0', lineHeight: 1.7 }}>
            FlightDeck analyzes multiple financial markets through dedicated intelligence engines — each purpose-built for its market's unique structure.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {markets.map((m) => (
            <div key={m.id} className="panel-card corner-bracket" style={{ padding: 0, '--bracket-color': m.color } as React.CSSProperties}>
              <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
                    color: m.color, letterSpacing: '0.2em',
                    border: `1px solid ${m.color}40`,
                    padding: '4px 8px',
                  }}>
                    {m.label}
                  </div>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.color, boxShadow: `0 0 8px ${m.color}` }} />
                </div>
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '0.05em', marginBottom: 4 }}>
                  {m.id}
                </h3>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(226,232,240,0.4)', letterSpacing: '0.15em', marginBottom: 16 }}>
                  {m.title.toUpperCase()}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.65)', lineHeight: 1.6 }}>{m.desc}</p>
              </div>
              <div style={{ padding: '14px 24px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {m.pairs.map(p => (
                  <span key={p} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: 'rgba(226,232,240,0.5)', letterSpacing: '0.1em',
                    background: 'rgba(255,255,255,0.04)', padding: '3px 8px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: Operations Center ────────────────────────────────────────────────
function OperationsSection() {
  const ref = useReveal()

  const pipeline = [
    { id: 'MARKET DATA', icon: '◈', desc: 'Market data from MetaTrader 5, Schwab API & supplemental market sources.', color: '#00d4e8' },
    { id: 'DATA PIPELINE', icon: '⟳', desc: 'Python ETL processes normalize & validate', color: '#f0177a' },
    { id: 'POSTGRESQL', icon: '◉', desc: 'Structured storage in time-series schemas', color: '#00d4e8' },
    { id: 'ANALYTICS', icon: '◎', desc: 'Indicators, scoring, pattern recognition', color: '#f0177a' },
    { id: 'INTELLIGENCE', icon: '◆', desc: 'Structured market intelligence generated', color: '#00d4e8' },
    { id: 'BRIEFINGS', icon: '▶', desc: 'Alerts, reports & Telegram notifications', color: '#f0177a' },
  ]

  const intel = [
    { label: 'MARKET BIAS', values: ['BULLISH', 'BEARISH', 'NEUTRAL'], active: 0, color: '#00e87a' },
    { label: 'SIGNAL TIER', values: ['HALL OF FAME', 'TIER 1', 'TIER 2'], active: 0, color: '#f0177a' },
    { label: 'MKT STRUCTURE', values: ['BULLISH', 'BEARISH', 'MIXED'], active: 2, color: '#ffc107' },
    { label: 'TRADE POSTURE', values: ['FAVORABLE', 'CONDITIONAL', 'WAIT'], active: 0, color: '#00d4e8' },
  ]

  const tech = ['Python', 'PostgreSQL', 'MetaTrader 5', 'Schwab API', 'Azure', 'Telegram']

  return (
    <section id="operations" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #020814 0%, #050d1f 50%, #020814 100%)', position: 'relative' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>SECTION 02</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: 'white', letterSpacing: '-0.01em' }}>
            FLIGHTDECK <span className="text-gradient-pink">OPERATIONS CENTER</span>
          </h2>
          <p style={{ marginTop: 16, color: 'rgba(226,232,240,0.6)', fontSize: 15 }}>Where market data becomes market intelligence.</p>
        </div>

        <div className="ops-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Pipeline */}
          <div className="panel-card" style={{ padding: 28 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00d4e8', letterSpacing: '0.2em', marginBottom: 24 }}>DATA PIPELINE // ARCHITECTURE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {pipeline.map((step, i) => (
                <div key={step.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
                    <div style={{
                      width: 36, height: 36, flexShrink: 0,
                      border: `1px solid ${step.color}40`,
                      background: `${step.color}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, color: step.color,
                    }}>{step.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600, color: step.color, letterSpacing: '0.1em' }}>{step.id}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(226,232,240,0.5)', marginTop: 2 }}>{step.desc}</div>
                    </div>
                  </div>
                  {i < pipeline.length - 1 && (
                    <div style={{ marginLeft: 18, width: 1, height: 16, background: 'linear-gradient(to bottom, rgba(0,212,232,0.3), rgba(0,212,232,0.1))', position: 'relative' }}>
                      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: '5px solid rgba(0,212,232,0.3)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Intel cards */}
            <div className="panel-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00d4e8', letterSpacing: '0.2em' }}>INTELLIGENCE OUTPUT</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(255,193,7,0.7)', letterSpacing: '0.1em', padding: '2px 8px', border: '1px solid rgba(255,193,7,0.25)', background: 'rgba(255,193,7,0.07)' }}>SAMPLE</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {intel.map((item) => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '12px 14px' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(226,232,240,0.4)', letterSpacing: '0.15em', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 16, color: item.color, letterSpacing: '0.05em' }}>
                      {item.values[item.active]}
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                      {item.values.map((v, i) => (
                        <div key={v} style={{
                          height: 3, flex: 1,
                          background: i === item.active ? item.color : 'rgba(255,255,255,0.1)',
                        }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="panel-card" style={{ padding: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00d4e8', letterSpacing: '0.2em', marginBottom: 16 }}>TECHNOLOGY STACK</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {tech.map(t => (
                  <span key={t} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                    color: 'rgba(226,232,240,0.7)',
                    border: '1px solid rgba(0,212,232,0.2)',
                    padding: '6px 12px',
                    background: 'rgba(0,212,232,0.05)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

// ── Section: Briefings ────────────────────────────────────────────────────────
function BriefingsSection() {
  const ref = useReveal()

  type BriefingPayload = {
    type: 'takeoff' | 'landing'
    title: string
    tagline: string
    published_at: string
    briefing: string
    airspace?: string
    market_weather?: string
    closing_weather?: string
    flight_assessment?: string
  }

  const [takeoff, setTakeoff] = useState<BriefingPayload | null>(null)
  const [landing, setLanding] = useState<BriefingPayload | null>(null)

  const [takeoffError, setTakeoffError] = useState(false)
  const [landingError, setLandingError] = useState(false)

  const [takeoffOpen, setTakeoffOpen] = useState(false)
  const [landingOpen, setLandingOpen] = useState(false)

  useEffect(() => {
    let active = true

    const loadBriefings = async () => {
      try {
        const response = await fetch(
          `/briefings/takeoff_latest.json?t=${Date.now()}`,
          {
            cache: 'no-store',
          }
        )

        if (!response.ok) {
          throw new Error(
            `Takeoff briefing request failed: ${response.status}`
          )
        }

        const data = await response.json()

        if (active) {
          setTakeoff(data)
          setTakeoffError(false)
        }
      } catch (error) {
        console.error(
          'Unable to load Takeoff Briefing:',
          error
        )

        if (active) {
          setTakeoffError(true)
        }
      }

      try {
        const response = await fetch(
          `/briefings/landing_latest.json?t=${Date.now()}`,
          {
            cache: 'no-store',
          }
        )

        if (!response.ok) {
          throw new Error(
            `Landing briefing request failed: ${response.status}`
          )
        }

        const data = await response.json()

        if (active) {
          setLanding(data)
          setLandingError(false)
        }
      } catch (error) {
        console.error(
          'Unable to load Landing Briefing:',
          error
        )

        if (active) {
          setLandingError(true)
        }
      }
    }

    loadBriefings()

    return () => {
      active = false
    }
  }, [])

  const formatPublished = (
    value?: string
  ) => {
    if (!value) {
      return 'AWAITING LIVE DATA'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return value
    }

    return date.toLocaleString(
      'en-US',
      {
        timeZone: 'America/New_York',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      }
    )
  }

  const liveStatus = (
    payload: BriefingPayload | null,
    error: boolean
  ) => {
    if (error) {
      return {
        label: 'FEED UNAVAILABLE',
        color: '#ffc107',
      }
    }

    if (!payload) {
      return {
        label: 'LOADING',
        color: '#ffc107',
      }
    }

    return {
      label: 'LIVE',
      color: '#00e87a',
    }
  }

  const takeoffStatus = liveStatus(
    takeoff,
    takeoffError
  )

  const landingStatus = liveStatus(
    landing,
    landingError
  )

  return (
    <section
      id="briefings"
      style={{
        padding: '100px 0',
        background: '#020814',
        position: 'relative',
      }}
    >
      <div
        className="hud-grid"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
        }}
      />

      <div
        ref={ref}
        className="reveal"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          <div
            className="section-label"
            style={{
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            SECTION 03
          </div>

          <h2
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(36px,5vw,64px)',
              color: 'white',
            }}
          >
            MISSION{' '}
            <span className="text-gradient-cyan">
              BRIEFINGS
            </span>
          </h2>

          <p
            style={{
              marginTop: 16,
              color: 'rgba(226,232,240,0.55)',
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            Live executive market intelligence from the
            FlightDeck Operations Center.
          </p>
        </div>

        <div
          className="briefing-timeline"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            marginBottom: 40,
            justifyContent: 'center',
          }}
        >
          {[
            'TAKEOFF',
            'MARKET SESSION',
            'LANDING',
          ].map((label, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  fontWeight: 600,
                  color:
                    i === 1
                      ? 'rgba(226,232,240,0.4)'
                      : i === 0
                        ? '#f0177a'
                        : '#00d4e8',
                  letterSpacing: '0.15em',
                  padding: '6px 16px',
                  border:
                    `1px solid ${
                      i === 1
                        ? 'rgba(255,255,255,0.1)'
                        : i === 0
                          ? 'rgba(240,23,122,0.3)'
                          : 'rgba(0,212,232,0.3)'
                    }`,
                  background:
                    i === 1
                      ? 'rgba(255,255,255,0.03)'
                      : i === 0
                        ? 'rgba(240,23,122,0.08)'
                        : 'rgba(0,212,232,0.08)',
                }}
              >
                {label}
              </div>

              {i < 2 && (
                <div
                  className="briefing-arrow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                  }}
                >
                  <div
                    style={{
                      height: 1,
                      width: 40,
                      background:
                        'rgba(255,255,255,0.15)',
                    }}
                  />

                  <div
                    style={{
                      borderLeft:
                        '5px solid rgba(255,255,255,0.2)',
                      borderTop:
                        '4px solid transparent',
                      borderBottom:
                        '4px solid transparent',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="briefings-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          {/* TAKEOFF */}

          <div
            className="panel-card"
            style={{
              padding: 0,
              borderColor:
                'rgba(240,23,122,0.25)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                borderBottom:
                  '1px solid rgba(240,23,122,0.15)',
                padding: '20px 28px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'JetBrains Mono, monospace',
                    fontSize: 10,
                    color: '#f0177a',
                    letterSpacing: '0.2em',
                  }}
                >
                  PRE-MARKET // DAILY
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: takeoffStatus.color,
                      boxShadow:
                        `0 0 10px ${takeoffStatus.color}`,
                      display: 'inline-block',
                    }}
                  />

                  <span
                    style={{
                      fontFamily:
                        'JetBrains Mono, monospace',
                      fontSize: 9,
                      color: takeoffStatus.color,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {takeoffStatus.label}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: 28 }}>
              <h3
                style={{
                  fontFamily:
                    'Barlow Condensed, sans-serif',
                  fontWeight: 800,
                  fontSize: 32,
                  color: 'white',
                  letterSpacing: '0.05em',
                  marginBottom: 4,
                }}
              >
                TAKEOFF BRIEFING
              </h3>

              <div
                style={{
                  width: 40,
                  height: 2,
                  background: '#f0177a',
                  marginBottom: 20,
                }}
              />

              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(226,232,240,0.7)',
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                The pre-market executive intelligence briefing.
                FlightDeck evaluates market conditions,
                qualifying signals, risk, and overall trade
                posture before the trading session begins.
              </p>

              <div
                style={{
                  border:
                    '1px solid rgba(240,23,122,0.18)',
                  background:
                    'rgba(240,23,122,0.04)',
                  padding: 18,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'JetBrains Mono, monospace',
                    fontSize: 9,
                    color:
                      'rgba(226,232,240,0.35)',
                    letterSpacing: '0.15em',
                    marginBottom: 12,
                  }}
                >
                  LATEST FLIGHT CONDITIONS
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontFamily:
                        'JetBrains Mono, monospace',
                      fontSize: 9,
                      color:
                        'rgba(226,232,240,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    AIRSPACE
                  </div>

                  <div
                    style={{
                      fontFamily:
                        'Barlow Condensed, sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#f0177a',
                    }}
                  >
                    {takeoff?.airspace ??
                      'Awaiting live intelligence'}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily:
                        'JetBrains Mono, monospace',
                      fontSize: 9,
                      color:
                        'rgba(226,232,240,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    MARKET WEATHER
                  </div>

                  <div
                    style={{
                      fontFamily:
                        'Barlow Condensed, sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#00d4e8',
                    }}
                  >
                    {takeoff?.market_weather ??
                      'Awaiting live intelligence'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily:
                    'JetBrains Mono, monospace',
                  fontSize: 9,
                  color:
                    'rgba(226,232,240,0.35)',
                  letterSpacing: '0.08em',
                  marginBottom: 18,
                }}
              >
                PUBLISHED:{' '}
                {formatPublished(
                  takeoff?.published_at
                )}
              </div>

              {takeoffError && (
                <div
                  style={{
                    fontFamily:
                      'JetBrains Mono, monospace',
                    fontSize: 10,
                    color: '#ffc107',
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  Live Takeoff feed is temporarily unavailable.
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  setTakeoffOpen(!takeoffOpen)
                }
                disabled={!takeoff}
                className="btn-secondary"
                style={{
                  width: '100%',
                  cursor:
                    takeoff
                      ? 'pointer'
                      : 'not-allowed',
                  fontSize: 11,
                  opacity:
                    takeoff
                      ? 1
                      : 0.45,
                }}
              >
                {takeoffOpen
                  ? 'CLOSE BRIEFING'
                  : 'READ LATEST TAKEOFF'}
              </button>

              {takeoffOpen &&
                takeoff?.briefing && (
                  <div
                    style={{
                      marginTop: 20,
                      borderTop:
                        '1px solid rgba(240,23,122,0.15)',
                      paddingTop: 20,
                    }}
                  >
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        fontFamily:
                          'JetBrains Mono, monospace',
                        fontSize: 11,
                        lineHeight: 1.7,
                        color:
                          'rgba(226,232,240,0.72)',
                      }}
                    >
                      {takeoff.briefing}
                    </pre>
                  </div>
                )}
            </div>
          </div>

          {/* LANDING */}

          <div
            className="panel-card"
            style={{
              padding: 0,
              borderColor:
                'rgba(0,212,232,0.25)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                borderBottom:
                  '1px solid rgba(0,212,232,0.15)',
                padding: '20px 28px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'JetBrains Mono, monospace',
                    fontSize: 10,
                    color: '#00d4e8',
                    letterSpacing: '0.2em',
                  }}
                >
                  POST-MARKET // DAILY
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: landingStatus.color,
                      boxShadow:
                        `0 0 10px ${landingStatus.color}`,
                      display: 'inline-block',
                    }}
                  />

                  <span
                    style={{
                      fontFamily:
                        'JetBrains Mono, monospace',
                      fontSize: 9,
                      color: landingStatus.color,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {landingStatus.label}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: 28 }}>
              <h3
                style={{
                  fontFamily:
                    'Barlow Condensed, sans-serif',
                  fontWeight: 800,
                  fontSize: 32,
                  color: 'white',
                  letterSpacing: '0.05em',
                  marginBottom: 4,
                }}
              >
                LANDING BRIEFING
              </h3>

              <div
                style={{
                  width: 40,
                  height: 2,
                  background: '#00d4e8',
                  marginBottom: 20,
                }}
              />

              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(226,232,240,0.7)',
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                The post-market executive debrief. FlightDeck
                evaluates the closing environment, compares
                Takeoff with Landing conditions, reviews
                department intelligence, and prepares
                tomorrow's radar.
              </p>

              <div
                style={{
                  border:
                    '1px solid rgba(0,212,232,0.18)',
                  background:
                    'rgba(0,212,232,0.04)',
                  padding: 18,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      'JetBrains Mono, monospace',
                    fontSize: 9,
                    color:
                      'rgba(226,232,240,0.35)',
                    letterSpacing: '0.15em',
                    marginBottom: 12,
                  }}
                >
                  LATEST LANDING CONDITIONS
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontFamily:
                        'JetBrains Mono, monospace',
                      fontSize: 9,
                      color:
                        'rgba(226,232,240,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    CLOSING WEATHER
                  </div>

                  <div
                    style={{
                      fontFamily:
                        'Barlow Condensed, sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#00d4e8',
                    }}
                  >
                    {landing?.closing_weather ??
                      'Awaiting live intelligence'}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily:
                        'JetBrains Mono, monospace',
                      fontSize: 9,
                      color:
                        'rgba(226,232,240,0.4)',
                      letterSpacing: '0.12em',
                      marginBottom: 4,
                    }}
                  >
                    FLIGHT ASSESSMENT
                  </div>

                  <div
                    style={{
                      fontFamily:
                        'Barlow Condensed, sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#f0177a',
                    }}
                  >
                    {landing?.flight_assessment ??
                      'Awaiting live intelligence'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily:
                    'JetBrains Mono, monospace',
                  fontSize: 9,
                  color:
                    'rgba(226,232,240,0.35)',
                  letterSpacing: '0.08em',
                  marginBottom: 18,
                }}
              >
                PUBLISHED:{' '}
                {formatPublished(
                  landing?.published_at
                )}
              </div>

              {landingError && (
                <div
                  style={{
                    fontFamily:
                      'JetBrains Mono, monospace',
                    fontSize: 10,
                    color: '#ffc107',
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  Live Landing feed is temporarily unavailable.
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  setLandingOpen(!landingOpen)
                }
                disabled={!landing}
                className="btn-secondary"
                style={{
                  width: '100%',
                  cursor:
                    landing
                      ? 'pointer'
                      : 'not-allowed',
                  fontSize: 11,
                  opacity:
                    landing
                      ? 1
                      : 0.45,
                }}
              >
                {landingOpen
                  ? 'CLOSE BRIEFING'
                  : 'READ LATEST LANDING'}
              </button>

              {landingOpen &&
                landing?.briefing && (
                  <div
                    style={{
                      marginTop: 20,
                      borderTop:
                        '1px solid rgba(0,212,232,0.15)',
                      paddingTop: 20,
                    }}
                  >
                    <pre
                      style={{
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        fontFamily:
                          'JetBrains Mono, monospace',
                        fontSize: 11,
                        lineHeight: 1.7,
                        color:
                          'rgba(226,232,240,0.72)',
                      }}
                    >
                      {landing.briefing}
                    </pre>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: '12px 16px',
            border:
              '1px solid rgba(0,212,232,0.1)',
            background:
              'rgba(0,212,232,0.025)',
            fontFamily:
              'JetBrains Mono, monospace',
            fontSize: 9,
            lineHeight: 1.6,
            color:
              'rgba(226,232,240,0.35)',
            letterSpacing: '0.06em',
            textAlign: 'center',
          }}
        >
          LIVE BRIEFING DATA // GENERATED BY FLIGHTDECK
          OPERATIONS CENTER // INFORMATIONAL AND EDUCATIONAL
          USE ONLY
        </div>
      </div>
    </section>
  )
}

// ── Section: Autopilot ────────────────────────────────────────────────────────
function AutopilotSection() {
  const ref = useReveal()
  const [status, setStatus] = useState<'STANDBY' | 'CLEARED FOR TAKEOFF' | 'IN FLIGHT'>('STANDBY')
  const statuses: ('STANDBY' | 'CLEARED FOR TAKEOFF' | 'IN FLIGHT')[] = ['STANDBY', 'CLEARED FOR TAKEOFF', 'IN FLIGHT']
  const statusColors = { 'STANDBY': '#ffc107', 'CLEARED FOR TAKEOFF': '#f0177a', 'IN FLIGHT': '#00e87a' }

  const checklist = [
    { label: 'Hall of Fame or Tier 1 signal confirmed', done: true },
    { label: 'Intelligence Bias confirmed', done: true },
    { label: 'Trade Posture confirmed', done: true },
    { label: 'Market structure aligned', done: true },
    { label: 'Risk parameters verified', done: true },
    { label: 'Position limits verified', done: true },
    { label: 'Static Stop Loss attached', done: true },
    { label: 'Static Take Profit attached', done: true },
  ]

  return (
    <section id="autopilot" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #020814 0%, #050d1f 100%)', position: 'relative' }}>
      <div className="hud-grid-fine" style={{ position: 'absolute', inset: 0 }} />
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div className="autopilot-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>SECTION 04</div>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: 'white', lineHeight: 1, marginBottom: 16 }}>
              FLIGHTDECK<br /><span className="text-gradient-pink">AUTOPILOT</span>
            </h2>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 18, color: '#00d4e8', letterSpacing: '0.1em', marginBottom: 24 }}>
              "Rules-based execution. No emotion. No improvisation."
            </p>
            <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.7)', lineHeight: 1.7, marginBottom: 32 }}>
              FlightDeck Autopilot is an automated execution layer designed to act exclusively on the platform's highest-quality qualifying signals. Every trade is governed by a strict pre-flight checklist — no exceptions, no overrides.
            </p>

            {/* Status control */}
            <div className="panel-card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(226,232,240,0.4)', letterSpacing: '0.15em', marginBottom: 12 }}>AUTOPILOT STATUS</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {statuses.map(s => (
                  <button key={s} onClick={() => setStatus(s)} style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    letterSpacing: '0.1em', padding: '6px 12px', cursor: 'pointer',
                    border: `1px solid ${status === s ? statusColors[s] : 'rgba(255,255,255,0.1)'}`,
                    background: status === s ? `${statusColors[s]}15` : 'transparent',
                    color: status === s ? statusColors[s] : 'rgba(226,232,240,0.4)',
                    transition: 'all 0.2s',
                  }}>{s}</button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: statusColors[status],
                  boxShadow: `0 0 12px ${statusColors[status]}`,
                  animation: status === 'IN FLIGHT' ? 'glow-pulse-cyan 1.5s infinite' : 'none',
                }} />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: 20, color: statusColors[status], letterSpacing: '0.1em' }}>
                  {status}
                </span>
              </div>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '6px 14px', border: '1px solid rgba(255,193,7,0.3)', background: 'rgba(255,193,7,0.07)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffc107', flexShrink: 0, display: 'inline-block', animation: 'blink 2s ease infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#ffc107', letterSpacing: '0.15em' }}>AUTOPILOT V1 // DEVELOPMENT &amp; TESTING</span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(226,232,240,0.35)', lineHeight: 1.6 }}>
              FlightDeck Autopilot V1 is currently in development and testing. Autopilot execution is subject to qualifying signal criteria. Historical performance does not guarantee future results.
            </p>
          </div>

          {/* Checklist */}
          <div className="panel-card" style={{ padding: 0 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(0,212,232,0.1)' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00d4e8', letterSpacing: '0.2em' }}>
                PRE-FLIGHT CHECKLIST
              </div>
            </div>
            <div>
              {checklist.map((item, i) => (
                <div key={i} className="check-item">
                  <div style={{
                    width: 18, height: 18, flexShrink: 0,
                    border: '1px solid rgba(0,232,122,0.4)',
                    background: 'rgba(0,232,122,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: '#00e87a',
                  }}>✓</div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,212,232,0.1)', background: 'rgba(0,232,122,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00e87a', marginBottom: 6 }}>
                <span style={{ fontSize: 14 }}>✓</span>
                ALL SYSTEMS GO — CHECKLIST COMPLETE
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(226,232,240,0.3)', letterSpacing: '0.1em' }}>
                EXAMPLE — AUTOPILOT ACTIVATES ONLY WHEN ALL CRITERIA ARE MET
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

// ── Section: Flight Logs ──────────────────────────────────────────────────────
function FlightLogsSection() {
  const ref = useReveal()
  const [filter, setFilter] = useState<'ALL' | 'IN FLIGHT' | 'LANDED'>('ALL')

  const stats = [
    { label: 'TOTAL FLIGHTS', value: '—', sub: 'Awaiting flight data' },
    { label: 'SUCCESSFUL LANDINGS', value: '—', sub: 'Awaiting flight data' },
    { label: 'WIN RATE', value: '—', sub: 'Awaiting flight data', color: '#00e87a' },
    { label: 'NET PIPS', value: '—', sub: 'Awaiting flight data', color: '#00d4e8' },
    { label: 'AVG GAIN', value: '—', sub: 'Pips per winner' },
    { label: 'AVG LOSS', value: '—', sub: 'Pips per loser', color: '#f0177a' },
    { label: 'MAX DRAWDOWN', value: '—', sub: 'Awaiting flight data', color: '#ffc107' },
  ]

  const logs: { id: string; date: string; symbol: string; dir: string; tier: string; entry: string; exit: string; time: string; result: string; status: string }[] = []

  const filtered = filter === 'ALL' ? logs : logs.filter(l => l.status === filter)

  return (
    <section id="flight-logs" style={{ padding: '100px 0', background: '#020814', position: 'relative' }}>
      <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>SECTION 05</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: 'white' }}>
            FLIGHT <span className="text-gradient-cyan">LOGS</span>
          </h2>
          <p style={{ marginTop: 12, color: 'rgba(226,232,240,0.6)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em' }}>
            AUTOPILOT MISSION HISTORY
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '6px 16px', border: '1px solid rgba(255,193,7,0.3)', background: 'rgba(255,193,7,0.07)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffc107', display: 'inline-block' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#ffc107', letterSpacing: '0.15em' }}>AUTOPILOT V1 // FLIGHT TESTING</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="flight-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} className="panel-card" style={{ padding: '16px 18px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(226,232,240,0.4)', letterSpacing: '0.15em', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 28, color: s.color ?? 'white', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(226,232,240,0.3)', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['ALL', 'IN FLIGHT', 'LANDED'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em',
              padding: '7px 16px', cursor: 'pointer', border: '1px solid',
              borderColor: filter === f ? '#00d4e8' : 'rgba(255,255,255,0.1)',
              background: filter === f ? 'rgba(0,212,232,0.1)' : 'transparent',
              color: filter === f ? '#00d4e8' : 'rgba(226,232,240,0.4)',
              transition: 'all 0.2s',
            }}>{f}</button>
          ))}
        </div>

        {/* Table */}
        <div className="panel-card flight-table-wrapper" style={{ padding: 0 }}>
          <table className="flight-table">
            <thead>
              <tr>
                {['FLIGHT #', 'DATE', 'SYMBOL', 'DIR', 'TIER', 'TAKEOFF', 'LANDING', 'FLIGHT TIME', 'RESULT', 'STATUS'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '40px 16px', color: 'rgba(226,232,240,0.35)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em' }}>
                    AWAITING FLIGHT DATA — Verified Flight Logs will populate as FlightDeck Autopilot completes live and controlled test missions.
                  </td>
                </tr>
              ) : filtered.map(row => (
                <tr key={row.id}>
                  <td style={{ color: '#00d4e8' }}>{row.id}</td>
                  <td>{row.date}</td>
                  <td style={{ fontWeight: 600, color: 'white' }}>{row.symbol}</td>
                  <td style={{ color: row.dir === 'LONG' ? '#00e87a' : '#f0177a' }}>{row.dir}</td>
                  <td>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                      padding: '2px 7px', border: '1px solid',
                      borderColor: row.tier === 'HOF' ? 'rgba(240,23,122,0.4)' : 'rgba(0,212,232,0.3)',
                      color: row.tier === 'HOF' ? '#f0177a' : '#00d4e8',
                      background: row.tier === 'HOF' ? 'rgba(240,23,122,0.08)' : 'rgba(0,212,232,0.08)',
                    }}>{row.tier}</span>
                  </td>
                  <td>{row.entry}</td>
                  <td>{row.exit}</td>
                  <td>{row.time}</td>
                  <td style={{ color: row.result === '—' ? 'rgba(226,232,240,0.4)' : (row.result.startsWith('+') ? '#00e87a' : '#f0177a'), fontWeight: 600 }}>
                    {row.result !== '—' ? row.result + (row.symbol.includes('/') ? ' pips' : '') : row.result}
                  </td>
                  <td>
                    <span style={{ color: row.status === 'IN FLIGHT' ? '#ffc107' : '#00e87a', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                      {row.status === 'IN FLIGHT' ? '● ' : '✓ '}{row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 20, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(226,232,240,0.3)', lineHeight: 1.6 }}>
          Historical performance does not guarantee future results. FlightDeck Autopilot results are presented for informational purposes only and should not be considered financial advice.
        </p>
      </div>
    </section>
  )
}

// ── Section: How It Works ─────────────────────────────────────────────────────
function HowItWorksSection() {
  const ref = useReveal()
  const steps = [
    { num: '01', label: 'COLLECT', desc: 'Market data enters FlightDeck from live feeds, APIs, and MetaTrader 5.' },
    { num: '02', label: 'STORE', desc: 'Financial data is stored and organized in structured PostgreSQL schemas.' },
    { num: '03', label: 'ANALYZE', desc: 'Python analytics evaluate indicators, price action, structure, and conditions.' },
    { num: '04', label: 'SCORE', desc: 'Opportunities receive standardized scores, tiers, and classification labels.' },
    { num: '05', label: 'INTERPRET', desc: 'FlightDeck converts raw analytics into readable, structured market intelligence.' },
    { num: '06', label: 'EXECUTE', desc: 'Qualified signals can be acted on manually or via the Autopilot system.' },
    { num: '07', label: 'REPORT', desc: 'Briefings, alerts, and Flight Logs document the full intelligence cycle.' },
  ]

  return (
    <section id="how" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #050d1f, #020814)', position: 'relative' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>SECTION 06</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: 'white' }}>
            FROM RAW DATA TO<br /><span className="text-gradient-pink">MARKET INTELLIGENCE</span>
          </h2>
        </div>

        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0, position: 'relative' }}>
          {/* Connecting line */}
          <div style={{ position: 'absolute', top: 36, left: '7%', right: '7%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,212,232,0.3) 10%, rgba(0,212,232,0.3) 90%, transparent)', zIndex: 0, display: 'none' }} className="step-line" />

          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', position: 'relative', zIndex: 1 }}>
              {/* Connector arrow between steps */}
              {i > 0 && (
                <div className="step-connector" style={{
                  position: 'absolute', top: 32, left: -1,
                  width: 16, height: 1,
                  background: 'rgba(0,212,232,0.3)',
                }} />
              )}

              {/* Icon circle */}
              <div style={{
                width: 64, height: 64, flexShrink: 0,
                border: `1px solid ${i % 2 === 0 ? 'rgba(0,212,232,0.35)' : 'rgba(240,23,122,0.35)'}`,
                background: `${i % 2 === 0 ? 'rgba(0,212,232,0.06)' : 'rgba(240,23,122,0.06)'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
                position: 'relative',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(226,232,240,0.3)', marginBottom: 2 }}>{step.num}</div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 13, color: i % 2 === 0 ? '#00d4e8' : '#f0177a', letterSpacing: '0.1em' }}>{step.label}</div>
              </div>

              <p style={{ fontSize: 12, color: 'rgba(226,232,240,0.55)', lineHeight: 1.5, textAlign: 'center' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Section: Higher for Hire ──────────────────────────────────────────────────
function HireSection() {
  const ref = useReveal()
  const skills = ['Python', 'SQL / PostgreSQL', 'Data Pipelines', 'REST APIs', 'Automation', 'Financial Analytics', 'Data Visualization', 'Cloud Infrastructure']

  return (
    <section id="hire" style={{ padding: '100px 0', background: '#020814', position: 'relative', overflow: 'hidden' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div className="hire-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>

          {/* Image */}
          <div className="hire-image" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -1,
              background: 'linear-gradient(135deg, rgba(240,23,122,0.3), rgba(0,212,232,0.3))',
              zIndex: 0,
            }} />
            <img
              src={higherForHireImg}
              alt="Higher For Hire — FlightDeck command center with financial charts and city sunset"
              style={{ width: '100%', display: 'block', position: 'relative', zIndex: 1 }}
            />
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20, borderTop: '2px solid #f0177a', borderLeft: '2px solid #f0177a', zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 12, right: 12, width: 20, height: 20, borderBottom: '2px solid #00d4e8', borderRight: '2px solid #00d4e8', zIndex: 2 }} />
          </div>

          {/* Content */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>SECTION 07</div>

            {/* Visually hidden h2 for SEO heading hierarchy */}
            <h2 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
              Higher For Hire — Harold Pelzer, Data Analytics and Financial Intelligence
            </h2>

            {/* HIGHER FOR HIRE typeset */}
            <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, lineHeight: 1, marginBottom: 24 }}>
              <div style={{ fontSize: 'clamp(48px,6vw,80px)', color: '#f0177a', letterSpacing: '-0.01em' }}>HIGHER</div>
              <div style={{ fontSize: 'clamp(48px,6vw,80px)', color: 'white', letterSpacing: '-0.01em' }}>FOR</div>
              <div style={{ fontSize: 'clamp(48px,6vw,80px)', color: '#00d4e8', letterSpacing: '-0.01em' }}>HIRE</div>
            </div>

            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 24, color: 'white', letterSpacing: '0.05em', marginBottom: 16 }}>
              BUILT FROM THE GROUND UP.
            </h3>

            <p style={{ fontSize: 14, color: 'rgba(226,232,240,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
              FlightDeck is an independent data analytics and financial market intelligence project designed and developed by <strong style={{ color: 'white' }}>Harold Pelzer</strong>. Built entirely from scratch — every data pipeline, scoring engine, and intelligence layer.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {skills.map(s => (
                <span key={s} style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                  color: 'rgba(226,232,240,0.65)',
                  border: '1px solid rgba(0,212,232,0.2)',
                  background: 'rgba(0,212,232,0.05)',
                  padding: '5px 12px',
                }}>{s}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://github.com/haroldpelzer30/FlightDeck-Analytics-Platform" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11 }}>VIEW GITHUB</a>
              {/* TODO: replace href with resume URL before launch */}
              <a href="#" className="btn-secondary" style={{ textDecoration: 'none', fontSize: 11 }}>VIEW RESUME</a>
              <a href="https://www.linkedin.com/in/harold-pelzer-5a485743" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', fontSize: 11 }}>CONNECT ON LINKEDIN</a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

// ── Section: About ────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useReveal()

  return (
    <section id="about" style={{ padding: '100px 0', background: 'linear-gradient(180deg, #020814, #050d1f)', position: 'relative' }}>
      <div className="hud-grid" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div ref={ref} className="reveal" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>SECTION 08</div>
          <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 'clamp(36px,5vw,64px)', color: 'white', marginBottom: 32 }}>
            THE <span className="text-gradient-cyan">MISSION</span>
          </h2>

          <p style={{ fontSize: 15, color: 'rgba(226,232,240,0.75)', lineHeight: 1.8, marginBottom: 28 }}>
            Financial markets produce enormous amounts of raw data every second. Most of it is noise. FlightDeck was created to cut through that noise — to collect, organize, analyze, and transform raw market data into clear, structured, actionable intelligence.
          </p>

          <p style={{ fontSize: 15, color: 'rgba(226,232,240,0.75)', lineHeight: 1.8, marginBottom: 48 }}>
            Every component of this platform was engineered with purpose: from the data pipelines and scoring algorithms to the briefing formats and Autopilot execution layer. Nothing was assembled off-the-shelf. FlightDeck is a ground-up intelligence system.
          </p>

          <div className="tagline-box" style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800,
            fontSize: 'clamp(18px,3.5vw,34px)', color: '#00d4e8',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '28px 40px',
            border: '1px solid rgba(0,212,232,0.25)',
            background: 'rgba(0,212,232,0.05)',
            marginBottom: 56, lineHeight: 1.3,
          }}>
            TURNING MARKET DATA INTO MARKET INTELLIGENCE
          </div>

          {/* Creator */}
          <div className="panel-card" style={{ padding: 32, textAlign: 'left' }}>
            <div className="creator-card-inner" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{
                width: 56, height: 56, flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(240,23,122,0.3), rgba(0,212,232,0.3))',
                border: '1px solid rgba(0,212,232,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 22, color: 'white',
              }}>HP</div>
              <div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 22, color: 'white', letterSpacing: '0.05em' }}>HAROLD PELZER</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00d4e8', letterSpacing: '0.15em', marginBottom: 12 }}>DATA ANALYTICS // FINANCIAL INTELLIGENCE // PYTHON DEVELOPMENT</div>
                <p style={{ fontSize: 13, color: 'rgba(226,232,240,0.65)', lineHeight: 1.7 }}>
                  Data analytics and financial market research professional focused on building practical, end-to-end intelligence systems. FlightDeck represents the convergence of Python engineering, database design, financial market knowledge, and systematic analysis — built as a real production platform, not a portfolio exercise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const socialLinks = [
    { icon: '⌥', label: 'GitHub',   href: 'https://github.com/haroldpelzer30/FlightDeck-Analytics-Platform', external: true },
    { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/harold-pelzer-5a485743', external: true },
    { icon: '✉',  label: 'Email',    href: 'mailto:harold@flightdeckmarkets.com', external: false },
  ]

  return (
    <footer style={{ background: '#020814', borderTop: '1px solid rgba(0,212,232,0.1)', padding: '56px 0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 40, marginBottom: 40, alignItems: 'start' }} className="footer-top">
          {/* Brand block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 26, height: 26, flexShrink: 0,
                background: 'linear-gradient(135deg, #f0177a, #00d4e8)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }} />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '0.12em', color: 'white' }}>FLIGHTDECK</span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(0,212,232,0.6)', letterSpacing: '0.1em', lineHeight: 1.7, maxWidth: 220 }}>
              MARKET INTELLIGENCE<br />
              TURNING MARKET DATA INTO MARKET INTELLIGENCE
            </div>
            <a
              href="https://flightdeckmarkets.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(240,23,122,0.7)', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0177a')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,23,122,0.7)')}
            >
              flightdeckmarkets.com
            </a>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center', paddingTop: 4 }}>
            {[
              { label: 'Operations', href: '#operations' },
              { label: 'Briefings', href: '#briefings' },
              { label: 'Autopilot', href: '#autopilot' },
              { label: 'Flight Logs', href: '#flight-logs' },
              { label: 'About', href: '#about' },
              { label: 'Hire', href: '#hire' },
            ].map(l => (
              <a key={l.href} href={l.href} className="nav-link" style={{ fontSize: 10 }}>{l.label}</a>
            ))}
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  height: 34,
                  padding: '0 14px',
                  border: '1px solid rgba(0,212,232,0.2)',
                  background: 'rgba(0,212,232,0.05)',
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                  fontWeight: 500, letterSpacing: '0.12em',
                  color: 'rgba(226,232,240,0.55)',
                  textDecoration: 'none', transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = '#00d4e8'
                  el.style.color = '#00d4e8'
                  el.style.background = 'rgba(0,212,232,0.1)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'rgba(0,212,232,0.2)'
                  el.style.color = 'rgba(226,232,240,0.55)'
                  el.style.background = 'rgba(0,212,232,0.05)'
                }}
              >
                <span style={{ fontSize: 12, lineHeight: 1 }}>{s.icon}</span>
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(226,232,240,0.3)', letterSpacing: '0.1em' }}>
            © 2026 FlightDeck Market Intelligence — Harold Pelzer
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(226,232,240,0.25)', lineHeight: 1.7, maxWidth: 580, textAlign: 'right' }}>
            FlightDeck is an independent analytics and research project. Information on this website is for educational and informational purposes only and should not be considered financial advice. Historical performance does not guarantee future results.
          </p>
        </div>
      </div>

    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#020814' }}>
      <Nav />
      <Hero />
      <PlatformSection />
      <OperationsSection />
      <BriefingsSection />
      <AutopilotSection />
      <FlightLogsSection />
      <HowItWorksSection />
      <HireSection />
      <AboutSection />
      <Footer />
    </div>
  )
}
