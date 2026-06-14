'use client'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { CONTACT } from '@/lib/site'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

export function ContactExperience() {
  const reduced = useReducedMotion()
  const headline = 'Ready to talk strategy?'
  
  // Split into words, then each word into characters, to prevent wrapping issues on spaces
  const words = headline.split(' ')

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  }

  const charVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-[#0a0b0c] text-white py-28 md:py-36 border-t border-white/5" id="contact">
      {/* Subtle background glow */}
      <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 lg:items-center">
          
          {/* Left - Headline & Info */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <SectionLabel className="text-accent border-accent/30 bg-accent/5">Get In Touch</SectionLabel>
              
              {/* Character by character reveal */}
              {reduced ? (
                <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl text-white">
                  {headline}
                </h2>
              ) : (
                <motion.h2 
                  variants={containerVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: '-100px' }}
                  className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl text-white flex flex-wrap gap-x-3 gap-y-1"
                >
                  {words.map((word, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                      {word.split('').map((char, cIdx) => (
                        <motion.span
                          key={cIdx}
                          variants={charVariants}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.h2>
              )}

              <Reveal className="mt-6" delay={0.3}>
                <p className="text-base md:text-lg leading-relaxed text-white/55 max-w-xl">
                  Whether you are navigating a complex commercial deal, managing a dispute, or structuring GCC corporate operations — we welcome the opportunity to understand your objectives.
                </p>
              </Reveal>
            </div>

            {/* Premium details block */}
            <div className="grid gap-8 sm:grid-cols-2 pt-6 border-t border-white/5">
              <Reveal delay={0.4}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-accent">
                    <MapPin className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80">Corporate HQ</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed pl-7">
                    {CONTACT.address}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-accent">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80">Working Hours</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed pl-7">
                    {CONTACT.hours}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right - High-trust conversion cards */}
          <div className="lg:col-span-5">
            <Reveal variant="fromRight" delay={0.2}>
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 space-y-8 backdrop-blur-md">
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Direct Channels
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Choose your preferred channel. A senior member of our team will respond within one business day.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Email */}
                  <a 
                    href={`mailto:${CONTACT.email}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/35">Direct Email</p>
                        <p className="text-sm text-white font-medium mt-0.5">{CONTACT.email}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                  </a>

                  {/* Phone */}
                  <a 
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/35">Direct Phone</p>
                        <p className="text-sm text-white font-medium mt-0.5">{CONTACT.phone}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <Link
                    href="/contact"
                    data-cursor="cta"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-black hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/10"
                  >
                    Submit Strategy Enquiry
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}

