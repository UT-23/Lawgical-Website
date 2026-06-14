'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ParticleField } from '@/components/canvas/particle-field'
import { TextReveal } from '@/components/motion/text-reveal'
import { EASING, DURATION, STAGGER } from '@/lib/motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

const STATS = [
  { value: '20+', label: 'Years of practice' },
  { value: '500+', label: 'Cases resolved' },
  { value: '12', label: 'Industries served' },
  { value: 'GCC', label: 'Regional reach' },
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Particle background */}
      <ParticleField className="absolute inset-0 z-0" />

      {/* Parallax content */}
      <motion.div
        className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-center px-6 pt-24 pb-20 text-center md:px-10"
        style={reduced ? {} : { y, opacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.enter, ease: EASING.enter, delay: 0.3 }}
        >
          Premium Legal Counsel · Dubai · UAE
        </motion.p>

        {/* Headline */}
        <TextReveal
          text="Law That Moves At The Speed Of Business"
          tag="h1"
          mode="words"
          stagger={STAGGER.words}
          className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl xl:text-7xl"
          delay={0.4}
        />

        {/* Sub */}
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/55 md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.enter, ease: EASING.enter, delay: 0.9 }}
        >
          Lawgical Group delivers precise, commercially-minded legal advice to businesses building across the GCC. Strategic. Practical. Decisive.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.enter, ease: EASING.enter, delay: 1.1 }}
        >
          <Link
            href="/expertise"
            data-cursor="cta"
            className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-foreground transition-all duration-200 hover:opacity-90"
          >
            Explore Our Expertise
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            data-cursor="cta"
            className="flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 font-medium text-foreground transition-all duration-200 hover:border-foreground/40"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.enter, ease: EASING.enter, delay: 1.3 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.enter, ease: EASING.enter, delay: 1.3 + i * STAGGER.cards }}
            >
              <span className="font-heading text-3xl font-bold text-foreground md:text-4xl">{stat.value}</span>
              <span className="text-xs text-foreground/40">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.normal, delay: 1.8 }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Scroll</span>
          <ArrowDown className="h-4 w-4 text-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
