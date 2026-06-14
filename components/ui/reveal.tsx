'use client'
import { motion } from 'framer-motion'
import { EASING, DURATION, REVEAL_VARIANTS } from '@/lib/motion'
import { useInView } from '@/lib/hooks/use-in-view'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

type RevealVariant = keyof typeof REVEAL_VARIANTS

interface RevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  once?: boolean
  threshold?: number
  className?: string
  duration?: number
}

export function Reveal({
  children,
  variant = 'standard',
  delay = 0,
  once = true,
  threshold = 0.2,
  className,
  duration,
}: RevealProps) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, once })

  const resolvedVariant = reduced ? REVEAL_VARIANTS.instant : REVEAL_VARIANTS[variant]
  const resolvedDuration = reduced ? DURATION.fast : (duration ?? DURATION.enter)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: resolvedVariant.hidden,
        visible: {
          ...resolvedVariant.visible,
          transition: { duration: resolvedDuration, ease: EASING.enter, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
