'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down'
  className?: string
}

export function Parallax({
  children,
  speed = 0.3,
  direction = 'up',
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const factor = direction === 'up' ? -speed * 100 : speed * 100
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${factor}%`])

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
