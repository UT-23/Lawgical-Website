'use client'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, HeartHandshake, Eye, Cpu } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We give honest, considered advice — even when it is not what you hoped to hear.',
  },
  {
    icon: HeartHandshake,
    title: 'Client Focus',
    description: 'Your commercial objectives shape every legal strategy we design and execute.',
  },
  {
    icon: Eye,
    title: 'Precision',
    description: 'Rigorous, detail-driven drafting and representation that stands up to regional scrutiny.',
  },
  {
    icon: Cpu,
    title: 'Innovation',
    description: 'Leveraging digital platforms and modern legal processes to execute mandates with speed and clarity.',
  },
]

export function FirmPositioning() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-foreground/5" id="positioning">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        
        {/* Upper Grid: Narrative & Headline */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionLabel>Firm Positioning</SectionLabel>
            <Reveal variant="fromLeft" className="mt-4">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Boutique Attention.<br />Global Calibre.
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 flex flex-col justify-between">
            <Reveal variant="fromRight">
              <p className="text-lg leading-relaxed text-foreground/75 font-normal">
                Lawgical Group combines the thorough, hands-on partner attention of a premier boutique with the strategic bench strength and cross-border capability of a global practice. Headquartered in Dubai, we are structured to respond instantly to corporate demands.
              </p>
            </Reveal>
            
            <Reveal className="mt-6" delay={0.1}>
              <p className="text-sm leading-relaxed text-foreground/50">
                From foreign multinationals expanding into UAE markets to ambitious regional founders protecting intellectual property, our advocates collaborate across practices to resolve disputes and secure transactions.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Lower Grid: Values Stagger Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((val, i) => {
            const Icon = val.icon
            return (
              <Reveal key={val.title} variant="scale" delay={0.08 * i}>
                <div className="group h-full rounded-2xl border border-foreground/5 bg-foreground/[0.01] p-6 hover:border-accent hover:bg-accent/[0.01] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/5 bg-background text-foreground group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
                      {val.title}
                    </h3>
                    
                    <p className="mt-2 text-xs leading-relaxed text-foreground/50">
                      {val.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-foreground/5 pt-4">
                    <span className="font-mono text-[10px] text-foreground/30">0{i + 1}</span>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="text-foreground/25 group-hover:text-accent stroke-current transition-colors">
                      <polygon points="5 1, 9 3.3, 9 7.7, 5 10, 1 7.7, 1 3.3" strokeWidth="1.3" />
                    </svg>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* CTA link to dedicated about */}
        <Reveal className="mt-12 text-center md:text-left">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Learn more about our heritage
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>

      </div>
    </section>
  )
}
