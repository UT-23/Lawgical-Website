'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { SERVICES } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/ui/section-label'
import { EASING, DURATION } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function ServiceNavigator() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeService = SERVICES[activeIdx]
  const ActiveIcon = activeService.icon

  return (
    <section className="bg-background py-16 md:py-24 border-b border-foreground/5">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        
        {/* Desktop Split-Panel Explorer */}
        <div className="hidden lg:grid lg:grid-cols-[380px_1fr] lg:gap-16 lg:items-start">
          
          {/* Left Sticky Navigator */}
          <div className="sticky top-24 space-y-2">
            <SectionLabel className="mb-6 block">Capabilities</SectionLabel>
            {SERVICES.map((s, idx) => {
              const Icon = s.icon
              const isActive = idx === activeIdx
              return (
                <button
                  key={s.slug}
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    'group relative flex w-full items-center gap-4 rounded-2xl px-6 py-5 text-left transition-colors duration-200 outline-none',
                    isActive ? 'bg-foreground/[0.03] text-foreground' : 'text-foreground/50 hover:text-foreground hover:bg-foreground/[0.01]'
                  )}
                >
                  {/* Underline or active outline slider */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-0 rounded-2xl border border-foreground/5 bg-foreground/[0.02] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]"
                      transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                    />
                  )}
                  
                  <Icon className={cn('relative z-10 h-5 w-5 shrink-0 transition-colors', isActive ? 'text-accent' : 'text-foreground/35 group-hover:text-foreground/60')} />
                  <span className="relative z-10 font-heading text-base font-semibold tracking-tight">
                    {s.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Detail Panel */}
          <div className="min-h-[500px] rounded-3xl border border-foreground/5 bg-foreground/[0.01] p-10 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <ActiveIcon className="h-7 w-7 animate-pulse-slow" />
                  </div>
                  <h3 className="mt-8 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {activeService.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-foreground/60 max-w-3xl">
                    {activeService.description}
                  </p>

                  <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/35">Focus Areas</p>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                      {activeService.points.map((pt, i) => (
                        <li key={pt} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="text-xs text-foreground/40 font-medium">Have a specific case or query in this area?</p>
                    <p className="text-sm font-semibold text-foreground mt-1">Our specialists are available for consultation.</p>
                  </div>
                  <Button variant="primary" href={`/contact?service=${activeService.slug}`}>
                    Discuss your matter
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-4">
          <SectionLabel className="mb-4 block">Practice Areas</SectionLabel>
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
                      <Icon className={cn('h-5 w-5', isOpen ? 'text-accent' : 'text-foreground/40')} />
                      <span>{s.title}</span>
                    </div>
                    <span className="text-foreground/30 font-light text-2xl">
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
                          <p className="text-sm leading-relaxed text-foreground/60">
                            {s.description}
                          </p>
                          <ul className="space-y-2">
                            {s.points.map((pt) => (
                              <li key={pt} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                          <Button variant="primary" href={`/contact?service=${s.slug}`} size="sm" className="w-full mt-4">
                            Discuss matter
                          </Button>
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
