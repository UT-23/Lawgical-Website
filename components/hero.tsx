'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ParticleField } from '@/components/particle-field'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-primary text-primary-foreground">
      {/* Dubai skyline, built into the background */}
      <div className="absolute inset-0">
        <Image
          src="/dubai-skyline.png"
          alt="Dubai skyline at sunset"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      {/* subtle accent glow, used sparingly */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/60" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground/80"
        >
          Dubai · United Arab Emirates
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-4xl text-balance font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Legal Solutions, <span className="text-accent">Reimagined</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/75"
        >
          Trusted legal advisors for businesses worldwide. We blend deep regional
          expertise with a modern, technology-driven approach to deliver clarity
          where it matters most.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-white/10"
          >
            Explore our services
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 grid max-w-2xl grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {[
            { v: '20+', l: 'Years experience' },
            { v: '500+', l: 'Clients advised' },
            { v: '4', l: 'Core practices' },
            { v: '98%', l: 'Client retention' },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-heading text-3xl font-bold text-accent">
                {s.v}
              </dt>
              <dd className="mt-1 text-sm text-primary-foreground/70">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
