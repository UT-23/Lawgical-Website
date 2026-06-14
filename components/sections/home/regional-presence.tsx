import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { MapCanvas } from '@/components/canvas/map-canvas'

const REGIONS = [
  { name: 'United Arab Emirates', detail: 'Headquarters · Dubai & Abu Dhabi', primary: true },
  { name: 'Saudi Arabia', detail: 'Riyadh & Jeddah', primary: false },
  { name: 'Qatar', detail: 'Doha', primary: false },
  { name: 'Kuwait', detail: 'Kuwait City', primary: false },
  { name: 'Bahrain', detail: 'Manama', primary: false },
  { name: 'Oman', detail: 'Muscat', primary: false },
]

export function RegionalPresence() {
  return (
    <section className="bg-foreground/[0.02] py-24 md:py-32" id="regions">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <SectionLabel>Regional Reach</SectionLabel>
          <Reveal variant="fromLeft" className="mt-4">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Present Across<br />the GCC
            </h2>
          </Reveal>
          <Reveal className="mt-5">
            <p className="text-base leading-relaxed text-foreground/55">
              Strategic presence in every major GCC market, allowing us to advise on cross-border matters with genuine on-the-ground knowledge.
            </p>
          </Reveal>
        </div>

        {/* Map + region list */}
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-center">
          {/* Map */}
          <Reveal variant="fromLeft">
            <MapCanvas className="w-full" />
          </Reveal>

          {/* Region list */}
          <div className="space-y-1">
            {REGIONS.map((region, i) => (
              <Reveal key={region.name} delay={i * 0.07}>
                <div className="flex items-start gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-foreground/5">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${region.primary ? 'bg-accent' : 'bg-foreground/25'}`}
                  />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {region.name}
                      {region.primary && (
                        <span className="ml-2 text-[10px] font-medium uppercase tracking-widest text-accent">HQ</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-foreground/40">{region.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal className="mt-6 px-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                Get in touch with a local team
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
