// Motion system tokens — single source of truth for all animation values.
// No raw numbers appear in component files. Always import from here.

export const EASING = {
  enter: [0.22, 1, 0.36, 1] as [number, number, number, number],
  exit: [0.55, 0, 1, 0.45] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 280, damping: 28 },
  springLight: { type: 'spring' as const, stiffness: 180, damping: 24 },
  springFluid: { type: 'spring' as const, stiffness: 120, damping: 14 },
} as const

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  enter: 0.5,
  slow: 0.7,
  cinematic: 1.2,
  epic: 1.8,
} as const

export const STAGGER = {
  textLines: 0.08,
  characters: 0.03,
  words: 0.06,
  cards: 0.08,
  portraits: 0.12,
  listItems: 0.06,
  mapNodes: 0.06,
} as const

export const REVEAL_VARIANTS = {
  standard: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  slow: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fromLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  fromRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  instant: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
} as const

export const MAGNETIC = {
  buttonRadius: 80,
  buttonMagnitude: 8,
  portraitRadius: 80,
  portraitMagnitude: 4,
} as const

export const PARTICLE = {
  desktopCount: 80,
  tabletCount: 50,
  connectionDist: 120,
  repulsionRadius: 100,
} as const
