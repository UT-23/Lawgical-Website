'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { CursorContext, CursorMode } from '@/lib/hooks/use-cursor'

const COMPASS_SIZE = 36

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<CursorMode>('default')
  const [label, setLabel] = useState<string | undefined>()
  const [visible, setVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Motion values for instant mouse tracking
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring values for outer compass ring lag
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 30, mass: 0.8 })
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 30, mass: 0.8 })

  useEffect(() => {
    // Check if the device matches touch-only query.
    // However, we still listen to mouse movements dynamically to support hybrids.
    const touchQuery = window.matchMedia('(pointer: coarse)')
    if (touchQuery.matches) {
      setIsTouchDevice(true)
    }

    let firstMove = true

    const handleMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        ringX.set(e.clientX)
        ringY.set(e.clientY)
        firstMove = false
      } else {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
      setIsTouchDevice(false) // If mouse moves, it is operated as desktop
      setVisible(true)
    }

    const handleTouchStart = () => {
      setIsTouchDevice(true)
      setVisible(false)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    // Unconditionally add listeners to avoid media query hydration mismatch bugs
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, ringX, ringY, visible])

  // Global mouseover detector
  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor]') as HTMLElement | null
      if (!interactive) return

      const cursorAttr = interactive.getAttribute('data-cursor') as string | null
      if (cursorAttr) {
        if (cursorAttr === 'video') setMode('video')
        else if (cursorAttr === 'portrait' || cursorAttr === 'people') setMode('people')
        else if (cursorAttr === 'insights' || cursorAttr === 'read') setMode('insights')
        else if (cursorAttr === 'map' || cursorAttr === 'explore') setMode('map')
        else if (cursorAttr === 'logo' || cursorAttr === 'client') setMode('logo')
        else if (cursorAttr === 'cta') setMode('cta')
        else if (cursorAttr === 'link') setMode('link')
        else setMode('default')

        setLabel(interactive.getAttribute('data-cursor-label') || undefined)
      } else {
        if (interactive.closest('#logos')) {
          setMode('logo')
        } else if (interactive.closest('[data-cursor="portrait"]')) {
          setMode('people')
        } else if (interactive.tagName === 'A') {
          if (interactive.closest('nav') || interactive.closest('footer')) {
            setMode('link')
          } else {
            setMode('cta')
          }
        } else if (interactive.tagName === 'BUTTON') {
          setMode('cta')
        }
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor]') as HTMLElement | null
      if (!interactive) return

      setMode('default')
      setLabel(undefined)
    }

    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [isTouchDevice])

  const setCursorMode = useCallback((m: CursorMode, l?: string) => {
    setMode(m)
    setLabel(l)
  }, [])

  const resetCursorMode = useCallback(() => {
    setMode('default')
    setLabel(undefined)
  }, [])

  const config = {
    default: { ringScale: 1, ringOpacity: 0.5, dotScale: 1, ringBg: 'transparent', ringBorder: 'border-accent/40' },
    link: { ringScale: 1.3, ringOpacity: 0.8, dotScale: 1, ringBg: 'transparent', ringBorder: 'border-accent' },
    cta: { ringScale: 1.15, ringOpacity: 0.8, dotScale: 0, ringBg: 'rgba(oklch(0.78 0.13 184) / 0.05)', ringBorder: 'border-accent' },
    people: { ringScale: 1.25, ringOpacity: 0.9, dotScale: 0, ringBg: 'var(--color-background)', ringBorder: 'border-accent bg-background/95 shadow-md shadow-accent/5' },
    video: { ringScale: 1.25, ringOpacity: 0.9, dotScale: 0, ringBg: 'var(--color-background)', ringBorder: 'border-accent bg-background/95 shadow-md shadow-accent/5' },
    logo: { ringScale: 1.4, ringOpacity: 0.8, dotScale: 0, ringBg: 'transparent', ringBorder: 'border-accent bg-accent/5 shadow-lg shadow-accent/5' },
    insights: { ringScale: 1.25, ringOpacity: 0.9, dotScale: 0, ringBg: 'var(--color-background)', ringBorder: 'border-accent bg-background/95 shadow-md shadow-accent/5' },
    map: { ringScale: 1.25, ringOpacity: 0.9, dotScale: 0, ringBg: 'var(--color-background)', ringBorder: 'border-accent bg-background/95 shadow-md shadow-accent/5' },
  }

  const current = config[mode]
  const showCoreDot = mode === 'default' || mode === 'link'

  return (
    <CursorContext.Provider value={{ state: { mode, label }, setCursorMode, resetCursorMode }}>
      {children}

      {!isTouchDevice && (
        <>
          {/* 1. INSTANT WRAPPER: Tracks mouse precisely without spring delay for Core Dot and icons */}
          <motion.div
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 999999, // Render above all elements, including navbars, modals and players
              top: 0,
              left: 0,
              x: mouseX,
              y: mouseY,
              willChange: 'transform',
            }}
            className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          >
            {/* Red Test Dot & Accent Core Dot combined (Highly visible 6px–8px core dot) */}
            <motion.div
              style={{
                width: mode === 'link' ? 8 : 6,
                height: mode === 'link' ? 8 : 6,
              }}
              animate={{
                scale: showCoreDot ? 1 : 0,
                opacity: visible && showCoreDot ? 1 : 0,
              }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="rounded-full bg-accent shadow-sm"
            />

            {/* Upright Center Icons/Texts (non-rotating) */}
            <div className="absolute flex items-center justify-center">
              <AnimatePresence mode="wait">
                {mode === 'link' && (
                  <motion.div
                    key="link-underline"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.85 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    className="h-[1.5px] w-2 bg-accent rounded-full absolute -bottom-3"
                  />
                )}

                {mode === 'cta' && (
                  <motion.svg
                    key="cta-arrow"
                    initial={{ scale: 0.4, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.4, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </motion.svg>
                )}

                {mode === 'video' && (
                  <motion.svg
                    key="video-play"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-accent"
                  >
                    <path d="M8 5v14l11-7z" />
                  </motion.svg>
                )}

                {mode === 'people' && (
                  <motion.span
                    key="people-view"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-[6.5px] font-mono font-bold tracking-widest text-accent leading-none"
                  >
                    VIEW
                  </motion.span>
                )}

                {mode === 'insights' && (
                  <motion.span
                    key="insights-read"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-[6.5px] font-mono font-bold tracking-widest text-accent leading-none"
                  >
                    READ
                  </motion.span>
                )}

                {mode === 'map' && (
                  <motion.svg
                    key="map-explore"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 2. SPRING WRAPPER: Tracks mouse with slight lag, handles outer compass ring */}
          <motion.div
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 999998, // Placed slightly underneath the core dot but above website content
              top: 0,
              left: 0,
              x: ringX,
              y: ringY,
              willChange: 'transform',
            }}
            className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          >
            {/* Outer Compass Ring Dial (translates scale and opacity states) */}
            <motion.div
              style={{
                width: COMPASS_SIZE,
                height: COMPASS_SIZE,
              }}
              animate={{
                scale: visible ? current.ringScale : 0,
                opacity: visible ? current.ringOpacity : 0,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`rounded-full border flex items-center justify-center transition-colors duration-300 ${current.ringBorder}`}
            >
              {/* Rotating Ticks and Cardinal markers */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-accent/60 stroke-current absolute inset-0">
                  {/* Cardinal Points Ticks (N, E, S, W) */}
                  <line x1="18" y1="1" x2="18" y2="3.5" strokeWidth="0.8" />
                  <line x1="32.5" y1="18" x2="35" y2="18" strokeWidth="0.8" />
                  <line x1="18" y1="32.5" x2="18" y2="35" strokeWidth="0.8" />
                  <line x1="1" y1="18" x2="3.5" y2="18" strokeWidth="0.8" />

                  {/* Microscopic directional letters */}
                  <text x="18" y="7.2" textAnchor="middle" fontSize="4.2" className="fill-accent/45 font-mono select-none font-bold" stroke="none">N</text>
                  <text x="28.8" y="19.5" textAnchor="middle" fontSize="4.2" className="fill-accent/45 font-mono select-none font-bold" stroke="none">E</text>
                  <text x="18" y="31.8" textAnchor="middle" fontSize="4.2" className="fill-accent/45 font-mono select-none font-bold" stroke="none">S</text>
                  <text x="7.2" y="19.5" textAnchor="middle" fontSize="4.2" className="fill-accent/45 font-mono select-none font-bold" stroke="none">W</text>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </CursorContext.Provider>
  )
}
