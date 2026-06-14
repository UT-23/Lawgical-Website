'use client'
import { motion } from 'framer-motion'
import { useInView } from '@/lib/hooks/use-in-view'
import { DURATION, EASING } from '@/lib/motion'

interface Region {
  name: string
  x: number  // percentage 0-100 within SVG viewBox
  y: number
  descriptor?: string
  primary?: boolean
}

const REGIONS: Region[] = [
  { name: 'UAE', x: 74, y: 55, descriptor: 'DIFC & ADGM courts', primary: true },
  { name: 'KSA', x: 45, y: 50, descriptor: 'Vision 2030 matters' },
  { name: 'Qatar', x: 58, y: 53, descriptor: 'QFC jurisdiction' },
  { name: 'Bahrain', x: 57, y: 49, descriptor: 'Financial centre' },
  { name: 'Kuwait', x: 55, y: 39, descriptor: 'Gulf commercial' },
  { name: 'Oman', x: 72, y: 65, descriptor: 'GCC transactions' },
  { name: 'Egypt', x: 22, y: 35, descriptor: 'MENA matters' },
]

// Simplified GCC region outline as SVG path (schematic, not geo-accurate)
const OUTLINE_PATH = `M 10 25 L 30 20 L 55 22 L 70 18 L 82 22 L 88 30 L 85 45
  L 80 52 L 78 65 L 72 72 L 65 68 L 60 58 L 56 54 L 52 52 L 45 56
  L 35 58 L 28 55 L 20 50 L 14 42 L 10 35 Z`

export function MapCanvas({ className }: { className?: string }) {
  const [ref, inView] = useInView<SVGSVGElement>({ threshold: 0.3, once: true })

  // Calculate a rough path length for stroke-dasharray
  const pathLength = 600

  return (
    <div className={className}>
      <svg
        ref={ref}
        viewBox="0 0 100 85"
        className="w-full h-full"
        fill="none"
        aria-hidden="true"
      >
        {/* Map fill */}
        <motion.path
          d={OUTLINE_PATH}
          fill="rgba(100,220,200,0.04)"
          stroke="rgba(100,220,200,0.3)"
          strokeWidth="0.4"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
          animate={inView ? { strokeDashoffset: 0, opacity: 1 } : { strokeDashoffset: pathLength, opacity: 0 }}
          initial={{ strokeDashoffset: pathLength, opacity: 0 }}
          transition={{ duration: DURATION.cinematic, ease: [0.4, 0, 0.6, 1] }}
        />

        {/* Region nodes */}
        {REGIONS.map((region, i) => (
          <motion.g
            key={region.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              delay: DURATION.cinematic + 0.2 + i * 0.06,
              duration: 0.3,
              ...EASING.springLight,
            }}
            style={{ transformOrigin: `${region.x}% ${region.y}%` }}
          >
            {/* Pulse ring */}
            <motion.circle
              cx={region.x}
              cy={region.y}
              r={region.primary ? 2.5 : 1.8}
              fill="none"
              stroke="rgba(100,220,200,0.35)"
              strokeWidth="0.3"
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: `${region.x}px ${region.y}px` }}
            />
            {/* Node dot */}
            <circle
              cx={region.x}
              cy={region.y}
              r={region.primary ? 1.6 : 1.0}
              fill={region.primary ? 'oklch(0.78 0.13 184)' : 'rgba(100,220,200,0.7)'}
            />
            {/* Label */}
            <text
              x={region.x + (region.primary ? 2.5 : 1.8)}
              y={region.y - 1.5}
              fontSize="3.2"
              fill="rgba(255,255,255,0.65)"
              fontFamily="Geist, sans-serif"
            >
              {region.name}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
