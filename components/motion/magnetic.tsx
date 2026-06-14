'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { EASING, MAGNETIC } from '@/lib/motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: React.ReactNode
  radius?: number
  magnitude?: number
  className?: string
}

export function Magnetic({
  children,
  radius = MAGNETIC.buttonRadius,
  magnitude = MAGNETIC.buttonMagnitude,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, EASING.spring)
  const springY = useSpring(y, EASING.spring)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < radius) {
        const strength = (1 - dist / radius) * magnitude
        x.set((dx / dist) * strength)
        y.set((dy / dist) * strength)
      }
    }

    const handleLeave = () => {
      x.set(0)
      y.set(0)
    }

    // Listen on a wider area by attaching to document while mouse is near
    const handleDocMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > radius * 1.5) {
        x.set(0)
        y.set(0)
      } else {
        handleMove(e)
      }
    }

    document.addEventListener('mousemove', handleDocMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      document.removeEventListener('mousemove', handleDocMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [radius, magnitude, reduced, x, y])

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}
