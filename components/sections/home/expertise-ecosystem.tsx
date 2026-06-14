'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { Button } from '@/components/ui/button'
import { Pin } from '@/components/motion/pin'
import { EASING, DURATION } from '@/lib/motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export function ExpertiseEcosystem() {
  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotion()

  return (
    <div id="expertise">
      {reduced ? (
        <ExpertiseStatic activeIdx={activeIdx} setActiveIdx={setActiveIdx} />
      ) : (
        <Pin steps={SERVICES.length}>
          {(step) => (
            <ExpertiseStatic activeIdx={step} setActiveIdx={setActiveIdx} />
          )}
        </Pin>
      )}
    </div>
  )
}

interface StaticProps {
  activeIdx: number
  setActiveIdx: (idx: number) => void
}

function ExpertiseStatic({ activeIdx, setActiveIdx }: StaticProps) {
  const activeService = SERVICES[activeIdx] || SERVICES[0]
  const ActiveIcon = activeService.icon

  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-background py-20 lg:py-0 border-b border-foreground/5">
      <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-16">
          <div>
            <SectionLabel>Practice Areas</SectionLabel>
            <Reveal variant="fromLeft" className="mt-4">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Deep Expertise.<br />Decisive Outcomes.
              </h2>
            </Reveal>
          </div>
          <Reveal variant="fromRight" className="md:max-w-sm">
            <p className="text-base leading-relaxed text-foreground/55">
              Six practice areas built for the pace of GCC commerce — from formation to resolution.
            </p>
          </Reveal>
        </div>

        {/* Desktop Split-Panel Explorer */}
        <div className="hidden lg:grid lg:grid-cols-[400px_1fr] lg:gap-16 lg:items-center min-h-[500px]">
          
          {/* Left Vertical List */}
          <div className="space-y-3">
            {SERVICES.map((s, idx) => {
              const isActive = idx === activeIdx
              return (
                <div
                  key={s.slug}
                  className="relative flex items-center"
                >
                  {/* Highlight bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-ecosystem-bg"
                      className="absolute inset-0 rounded-2xl border border-foreground/5 bg-foreground/[0.02] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]"
                      transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                    />
                  )}
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      'group relative flex w-full items-center gap-4 rounded-2xl px-6 py-5 text-left transition-colors duration-200 outline-none z-10',
                      isActive ? 'text-foreground' : 'text-foreground/40 hover:text-foreground'
                    )}
                  >
                    <s.icon className={cn('h-5 w-5 shrink-0 transition-colors', isActive ? 'text-accent' : 'text-foreground/35')} />
                    <span className="font-heading text-lg font-bold tracking-tight">
                      {s.title}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="relative min-h-[460px] rounded-3xl border border-foreground/5 bg-foreground/[0.01] p-10 md:p-12 overflow-hidden flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {activeService.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/55 max-w-2xl">
                    {activeService.description}
                  </p>

                  <div className="mt-8">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/35">Focus Points</p>
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                      {activeService.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2.5 text-xs font-semibold text-foreground/80">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-foreground/5 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={`/expertise#${activeService.slug}`}
                    className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent/80"
                  >
                    View capability detail
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Button variant="secondary" size="sm" href={`/contact?service=${activeService.slug}`}>
                    Discuss matter
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          <div className="divide-y divide-foreground/5 border-y border-foreground/5">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon
              const isOpen = idx === activeIdx
              return (
                <div key={s.slug} className="py-2">
                  <button
                    onClick={() => setActiveIdx(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between py-4 text-left font-heading text-lg font-bold text-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn('h-5 w-5', isOpen ? 'text-accent' : 'text-foreground/45')} />
                      <span>{s.title}</span>
                    </div>
                    <span className="text-foreground/30 font-light text-xl">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-2 space-y-4">
                          <p className="text-sm leading-relaxed text-foreground/55">
                            {s.description}
                          </p>
                          <ul className="space-y-2">
                            {s.points.map((pt) => (
                              <li key={pt} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                                <span className="h-1 w-1 rounded-full bg-accent" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex gap-4">
                            <Button variant="primary" href={`/contact?service=${s.slug}`} size="sm" className="w-full">
                              Contact team
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
