'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/lib/hooks/use-in-view'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  delay?: number
  className?: string
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1200,
  delay = 0,
  className,
}: StatCounterProps) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5, once: true })
  const [count, setCount] = useState(reduced ? value : 0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    if (reduced) {
      setCount(value)
      return
    }
    started.current = true

    const startTime = performance.now() + delay
    let raf: number

    const animate = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(animate)
        return
      }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out: fast at start, slow at end
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, delay, reduced])

  return (
    <div ref={ref} className={cn('flex flex-col items-start', className)}>
      <span className="font-heading text-4xl font-800 leading-none text-foreground">
        {prefix}{count}{suffix}
      </span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
