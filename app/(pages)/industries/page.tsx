'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { INDUSTRIES } from '@/lib/content'

export default function IndustriesPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Sectors We Serve"
        headline="Sector knowledge that sharpens advice."
        description="We combine precise legal expertise with deep commercial intelligence in the key sectors driving the GCC and MENA economies."
        stats={[
          { value: 12, label: 'Industries served' },
          { value: 500, suffix: '+', label: 'Matters handled' },
          { value: 15, suffix: '+', label: 'Years combined practice' },
        ]}
        theme="light"
      />

      {/* Industries Grid */}
      <section className="bg-background py-16 md:py-24 border-t border-foreground/5">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <SectionLabel className="mb-12 block">Sectors Index</SectionLabel>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {INDUSTRIES.map((ind, i) => {
              const isHovered = hoveredIdx === i
              return (
                <Reveal key={ind.name} variant="scale" delay={(i % 4) * 0.05}>
                  <div
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group relative flex flex-col justify-between h-56 rounded-2xl border border-foreground/5 bg-foreground/[0.01] p-6 hover:border-accent hover:bg-accent/[0.01] transition-all duration-300"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/10 transition-colors group-hover:bg-accent" />
                    </div>
                    
                    <div>
                      <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {ind.name}
                      </h4>
                      <p className="mt-2 text-xs leading-normal text-foreground/55">
                        {ind.description}
                      </p>
                    </div>

                    {/* Faint accent slider at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sector Deep Dive Text Narrative */}
      <section className="bg-foreground/[0.02] py-20 border-t border-foreground/5">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            
            <Reveal variant="fromLeft">
              <div>
                <SectionLabel className="mb-4">Fluency</SectionLabel>
                <h3 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  We understand your market before building your strategy.
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-foreground/50">
                  Legal advice delivered in a vacuum is rarely effective. Our lawyers undergo continuous commercial training and follow regional market flows to ensure that their advice respects the realities of your sector. From energy EPC delay claims in Oman to fintech regulatory filings in Bahrain, we speak your sector's language.
                </p>
              </div>
            </Reveal>

            <Reveal variant="fromRight" className="grid gap-6">
              <div className="rounded-2xl border border-foreground/5 bg-background p-6">
                <h4 className="font-heading text-sm font-bold text-foreground">GCC Real Estate & Infrastructure</h4>
                <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                  We draft consortium setups, joint venture agreements, and represent contractors/developers in DIAC and ICC construction disputes.
                </p>
              </div>
              <div className="rounded-2xl border border-foreground/5 bg-background p-6">
                <h4 className="font-heading text-sm font-bold text-foreground">Digital Assets & Fintech Platforms</h4>
                <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                  We structure compliance pathways, represent founders in corporate transactions, and draft standard terms under DIFC and ADGM legal frameworks.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </main>
  )
}
