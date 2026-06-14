'use client'
import { useRef, useEffect, useState } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface PinProps {
  steps: number
  children: (step: number, progress: MotionValue<number>) => React.ReactNode
  className?: string
}

export function Pin({ steps, children, className }: PinProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const step = Math.min(steps - 1, Math.floor(v * steps))
      setActiveStep(step)
    })
  }, [scrollYProgress, steps])

  if (reduced) {
    return (
      <div className={className}>
        {children(activeStep, scrollYProgress)}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${steps * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(activeStep, scrollYProgress)}
      </div>
    </div>
  )
}
