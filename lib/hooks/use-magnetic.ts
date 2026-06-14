'use client'
import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { EASING } from '@/lib/motion'

interface UseMagneticOptions {
  radius?: number
  magnitude?: number
}

export function useMagnetic({ radius = 80, magnitude = 8 }: UseMagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, EASING.spring)
  const springY = useSpring(y, EASING.spring)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
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
    },
    [radius, magnitude, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const bind = useCallback(() => {
    const el = ref.current
    if (!el) return () => {}
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return { ref, springX, springY, bind }
}
