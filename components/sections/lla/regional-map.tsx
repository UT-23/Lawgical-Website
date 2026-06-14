'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapCanvas } from '@/components/canvas/map-canvas'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'
import { EASING, DURATION } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface LocationDetail {
  id: string
  name: string
  zone: string
  desc: string
  matters: string[]
}

const LOCATIONS: LocationDetail[] = [
  {
    id: 'uae',
    name: 'United Arab Emirates',
    zone: 'Dubai HQ, Abu Dhabi Affiliate',
    desc: 'Our primary headquarters, managing international arbitration (DIAC, ICC), DIFC/ADGM free zone litigation, and corporate structuring.',
    matters: ['DIFC & ADGM special court advocacy', 'DIAC and ICC arbitration proceedings', 'Corporate licensing & Free Zone setup'],
  },
  {
    id: 'ksa',
    name: 'Kingdom of Saudi Arabia',
    zone: 'Riyadh & Jeddah Affiliates',
    desc: 'Advising regional giants on Saudi Vision 2030 corporate transformations, foreign direct investment, and dispute strategy.',
    matters: ['MISA licensing & FDI consulting', 'Saudi judicial disputes & corporate setups', 'Vision 2030 joint venture vehicles'],
  },
  {
    id: 'qatar',
    name: 'Qatar',
    zone: 'Doha Affiliate',
    desc: 'Handling QFC-based regulatory setups, infrastructure dispute advisory, and regional trade contracts.',
    matters: ['QFC licensing & corporate entry', 'Infrastructure delay arbitration', 'Construction supply contracting'],
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
    zone: 'Kuwait City Affiliate',
    desc: 'Counseling clients on agency agreements, distribution channels, and commercial dispute resolution.',
    matters: ['Kuwaiti commercial agency laws', 'Local corporate setups & joint ventures', 'Trade debt recovery disputes'],
  },
  {
    id: 'bahrain',
    name: 'Bahrain',
    zone: 'Manama Affiliate',
    desc: 'Advising fintech and banking platforms on CBB regulatory requirements, commercial contracts, and GCC expansion.',
    matters: ['Fintech regulatory sandbox filings', 'Capital markets compliance', 'Commercial litigation management'],
  },
  {
    id: 'oman',
    name: 'Oman',
    zone: 'Muscat Affiliate',
    desc: 'Advising EPC contractors, maritime shipping lines, and developers on Omani commercial laws.',
    matters: ['Omani corporate joint ventures', 'Port & logistics contracting', 'Sohar Free Zone structuring'],
  },
  {
    id: 'egypt',
    name: 'Egypt',
    zone: 'Cairo Affiliate',
    desc: 'Providing GCC-Cairo corporate structuring, cross-border M&A counsel, and regional dispute coordination.',
    matters: ['Egypt-GCC holding company structuring', 'Cross-border M&A transactions', 'Dispute coordination across MENA'],
  },
]

export function RegionalMap() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeLoc = LOCATIONS[activeIdx]

  return (
    <section className="bg-background py-16 md:py-24 border-b border-foreground/5 overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <SectionLabel className="mb-12 block">Location Atlas</SectionLabel>
        
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
          
          {/* Left SVG map */}
          <div className="flex flex-col gap-6">
            <Reveal variant="fromLeft" className="w-full aspect-[5/4] border border-foreground/5 rounded-3xl bg-foreground/[0.01] p-4 flex items-center justify-center">
              <MapCanvas className="w-full h-full max-h-[420px]" />
            </Reveal>
            <div className="flex flex-wrap gap-2 justify-center">
              {LOCATIONS.map((loc, idx) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 outline-none',
                    idx === activeIdx ? 'bg-accent text-accent-foreground' : 'bg-foreground/5 text-foreground/50 hover:bg-foreground/10'
                  )}
                >
                  {loc.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Right Detail Pane */}
          <div className="min-h-[420px] rounded-3xl border border-foreground/5 bg-foreground/[0.01] p-8 md:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    Active Jurisdiction
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
                    {activeLoc.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-foreground/45">
                    {activeLoc.zone}
                  </p>
                  
                  <p className="mt-6 text-sm leading-relaxed text-foreground/60">
                    {activeLoc.desc}
                  </p>

                  <div className="mt-8">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/35">Operational Scenarios</p>
                    <ul className="mt-3 space-y-2.5">
                      {activeLoc.matters.map((m) => (
                        <li key={m} className="flex items-start gap-2.5 text-xs font-semibold text-foreground/80">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
