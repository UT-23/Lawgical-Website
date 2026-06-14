'use client'
import { motion, Variants } from 'framer-motion'
import { EASING, DURATION, STAGGER, REVEAL_VARIANTS } from '@/lib/motion'
import { useInView } from '@/lib/hooks/use-in-view'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

type RevealVariant = keyof typeof REVEAL_VARIANTS

interface StaggerChildrenProps {
  children: React.ReactNode
  stagger?: number
  variant?: RevealVariant
  delay?: number
  threshold?: number
  className?: string
}

export function StaggerChildren({
  children,
  stagger = STAGGER.cards,
  variant = 'standard',
  delay = 0,
  threshold = 0.1,
  className,
}: StaggerChildrenProps) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, once: true })

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduced ? 0 : stagger,
      },
    },
  }

  const childVariants: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: REVEAL_VARIANTS[variant].hidden,
        visible: {
          ...REVEAL_VARIANTS[variant].visible,
          transition: { duration: DURATION.enter, ease: EASING.enter },
        },
      }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}
