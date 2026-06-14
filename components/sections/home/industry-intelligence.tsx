'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { INDUSTRIES, type Industry } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

// Helper to expand descriptions with realistic legal context for each industry
const INDUSTRY_DETAILS: Record<string, string> = {
  'Financial Services': 'Regulatory compliance, fintech licensing, and structured finance advisory.',
  'Real Estate': 'Joint venture drafting, contractor agreements, and construction litigation.',
  'Construction': 'EPC contract advisory, delay claims, and DIAC/ICC arbitration.',
  'Energy': 'Oil, gas, and renewables project structuring and disputes.',
  'Technology': 'IP protection, venture capital advisory, and platform terms.',
  'Healthcare': 'Life sciences regulation, provider liability, and corporate transactions.',
  'Retail & FMCG': 'Distributor agreements, brand protection, and consumer disputes.',
  'Hospitality': 'Hotel management agreements, leasing, and franchise advisory.',
  'Logistics': 'Trade shipping, maritime law, and customs advisory.',
  'Manufacturing': 'Supply chain contracts, liability disputes, and industrial leasing.',
  'Media': 'Entertainment contracts, sponsorship agreements, and IP enforcement.',
  'Family Offices': 'Wealth management structuring, trusts, and succession planning.',
}

export function IndustryIntelligence() {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null)

  // Split the 12 industries into 3 rows
  const row1 = INDUSTRIES.slice(0, 4)
  const row2 = INDUSTRIES.slice(4, 8)
  const row3 = INDUSTRIES.slice(8, 12)

  // Repeat the items in each row to ensure seamless looping marquee
  // 5 repetitions provides enough length to cover wide screens
  const repeatArray = <T,>(arr: T[], count = 5): T[] => {
    let res: T[] = []
    for (let i = 0; i < count; i++) {
      res = [...res, ...arr]
    }
    return res
  }

  const marquee1 = repeatArray(row1)
  const marquee2 = repeatArray(row2)
  const marquee3 = repeatArray(row3)

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 border-t border-foreground/5" id="industries">
      {/* CSS stylesheet for the marquee loops */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-20%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-20%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track-left {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-left var(--speed, 35s) linear infinite;
        }
        .marquee-track-right {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee-right var(--speed, 35s) linear infinite;
        }
        .marquee-container:hover .marquee-track-left,
        .marquee-container:hover .marquee-track-right {
          animation-play-state: paused;
        }
        .marquee-track-paused .marquee-track-left,
        .marquee-track-paused .marquee-track-right {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <SectionLabel>Industries</SectionLabel>
          <Reveal variant="fromLeft" className="mt-4">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Sector Knowledge That Sharpens Every Argument
            </h2>
          </Reveal>
          <Reveal className="mt-5">
            <p className="text-base leading-relaxed text-foreground/55">
              Twelve industries. Deep sector fluency. We understand your business before we advise on your legal strategy. Click any card to expand inline.
            </p>
          </Reveal>
        </div>

        {/* Ribbons Container */}
        <div className={`marquee-container flex flex-col gap-6 md:gap-8 ${expandedIndustry ? 'marquee-track-paused' : ''}`}>
          {/* Row 1: Leftward, slow */}
          <div className="relative w-full overflow-hidden py-2 mask-linear-edges">
            <div className="marquee-track-left" style={{ '--speed': '30s' } as React.CSSProperties}>
              {marquee1.map((ind, idx) => (
                <IndustryCard
                  key={`r1-${ind.name}-${idx}`}
                  industry={ind}
                  index={idx % 4 + 1}
                  isExpanded={expandedIndustry === ind.name}
                  onClick={() => setExpandedIndustry(expandedIndustry === ind.name ? null : ind.name)}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Rightward, medium */}
          <div className="relative w-full overflow-hidden py-2 mask-linear-edges">
            <div className="marquee-track-right" style={{ '--speed': '25s' } as React.CSSProperties}>
              {marquee2.map((ind, idx) => (
                <IndustryCard
                  key={`r2-${ind.name}-${idx}`}
                  industry={ind}
                  index={idx % 4 + 5}
                  isExpanded={expandedIndustry === ind.name}
                  onClick={() => setExpandedIndustry(expandedIndustry === ind.name ? null : ind.name)}
                />
              ))}
            </div>
          </div>

          {/* Row 3: Leftward, fast */}
          <div className="relative w-full overflow-hidden py-2 mask-linear-edges">
            <div className="marquee-track-left" style={{ '--speed': '20s' } as React.CSSProperties}>
              {marquee3.map((ind, idx) => (
                <IndustryCard
                  key={`r3-${ind.name}-${idx}`}
                  industry={ind}
                  index={idx % 4 + 9}
                  isExpanded={expandedIndustry === ind.name}
                  onClick={() => setExpandedIndustry(expandedIndustry === ind.name ? null : ind.name)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Reveal className="mt-16 text-center md:text-left">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Deep dive by industry
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

interface IndustryCardProps {
  industry: Industry
  index: number
  isExpanded: boolean
  onClick: () => void
}

function IndustryCard({ industry, index, isExpanded, onClick }: IndustryCardProps) {
  const detailText = INDUSTRY_DETAILS[industry.name] || ''

  return (
    <motion.div
      layout
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`relative cursor-pointer select-none rounded-2xl border bg-card p-6 flex flex-col justify-between transition-all duration-300 ${
        isExpanded
          ? 'w-[360px] md:w-[420px] border-accent bg-accent/[0.02] shadow-lg shadow-accent/5'
          : 'w-72 md:w-80 border-foreground/5 hover:border-foreground/20 hover:bg-foreground/[0.01]'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-xs text-accent font-medium">
            {String(index).padStart(2, '0')}
          </span>
          <div className="rounded-full bg-foreground/[0.03] p-1 text-foreground/40 transition-colors duration-300 hover:text-accent">
            {isExpanded ? <X className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </div>
        </div>

        <h4 className="font-heading text-lg font-bold text-foreground transition-colors group-hover:text-accent">
          {industry.name}
        </h4>

        <p className="mt-2 text-xs leading-normal text-foreground/50">
          {industry.description}
        </p>

        {/* Expandable inline information */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-foreground/5 text-xs text-foreground/75 leading-relaxed bg-foreground/[0.01] p-3 rounded-lg">
                <p className="font-semibold text-accent mb-1">Key Focus Matters:</p>
                {detailText}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative slider on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent transition-transform duration-300 origin-left ${
        isExpanded ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`} />
    </motion.div>
  )
}

