'use client'
import { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

export function useScrollProgress(): {
  ref: React.RefObject<HTMLDivElement>
  scrollYProgress: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  return { ref, scrollYProgress }
}

export function useParallax(
  scrollYProgress: MotionValue<number>,
  speed: number = 0.3,
  direction: 'up' | 'down' = 'up'
): MotionValue<string> {
  const factor = direction === 'up' ? -speed * 100 : speed * 100
  return useTransform(scrollYProgress, [0, 1], [`${0}%`, `${factor}%`])
}
