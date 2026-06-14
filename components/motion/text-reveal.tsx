'use client'
import { motion, Variants } from 'framer-motion'
import { EASING, DURATION, STAGGER } from '@/lib/motion'
import { useInView } from '@/lib/hooks/use-in-view'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

type TextRevealMode = 'characters' | 'words' | 'lines'
type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface TextRevealProps {
  text: string
  mode?: TextRevealMode
  tag?: TagType
  stagger?: number
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  threshold?: number
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function TextReveal({
  text,
  mode = 'words',
  tag = 'span',
  stagger,
  delay = 0,
  duration,
  className,
  once = true,
  threshold = 0.3,
}: TextRevealProps) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInView<HTMLElement>({ threshold, once })

  const resolvedStagger = stagger ?? (mode === 'characters' ? STAGGER.characters : mode === 'words' ? STAGGER.words : STAGGER.textLines)
  const resolvedDuration = duration ?? DURATION.enter

  if (reduced) {
    const Tag = tag as keyof JSX.IntrinsicElements
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: DURATION.fast }}
      >
        <Tag ref={ref as any} className={className}>{text}</Tag>
      </motion.div>
    )
  }

  const parts = mode === 'characters' ? text.split('') : mode === 'words' ? text.split(' ') : [text]
  const Tag = tag as keyof JSX.IntrinsicElements
  const variants = mode === 'characters' ? charVariants : wordVariants

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: resolvedStagger,
      },
    },
  }

  return (
    <motion.div
      ref={ref as any}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={cn('overflow-hidden', className)}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          variants={variants}
          transition={{ duration: resolvedDuration, ease: EASING.enter }}
          className="inline-block"
        >
          {part}
          {mode === 'words' && i < parts.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  )
}
