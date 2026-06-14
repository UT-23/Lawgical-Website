'use client'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { Button } from '@/components/ui/button'

const VALUES = [
  {
    t: 'Integrity',
    d: 'We give honest, considered advice — even when it is not what you hoped to hear.',
  },
  {
    t: 'Client focus',
    d: 'Your commercial objectives shape every strategy we build.',
  },
  {
    t: 'Precision',
    d: 'Rigorous, detail-driven work that stands up to scrutiny.',
  },
  {
    t: 'Innovation',
    d: 'Technology and modern process to make legal work faster and clearer.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="About Lawgical Group"
        headline="Modern legal consulting, rooted in Dubai."
        description="We are a boutique firm with the bench strength of a global practice — advising businesses across the region with clarity, precision, and care."
        theme="light"
      />

      {/* Story Narrative */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="fromLeft">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/8 bg-muted md:aspect-[16/11]">
              <Image
                src="/about-office.png"
                alt="Lawgical Group offices overlooking the Downtown Dubai skyline"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal variant="instant">
              <SectionLabel className="mb-4">Our story</SectionLabel>
            </Reveal>
            <Reveal variant="standard" delay={0.08}>
              <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Trusted counsel for a fast-moving region.
              </h2>
            </Reveal>
            <Reveal variant="standard" delay={0.16}>
              <div className="mt-6 space-y-4 text-pretty leading-relaxed text-foreground/60">
                <p>
                  Lawgical Group is a Dubai-based law firm specializing in
                  corporate law, arbitration, litigation, and debt collection,
                  delivering tailored legal solutions with integrity. We founded
                  the firm on a simple belief: that great legal advice should be
                  clear, commercial and accessible.
                </p>
                <p>
                  From multinationals entering the GCC to ambitious local
                  enterprises, our clients rely on us to navigate complexity and
                  protect what they have built. We combine deep regional knowledge
                  with a modern, technology-driven way of working.
                </p>
              </div>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {[
                'Decades of combined regional experience',
                'Recognised arbitration and disputes practice',
                'Transparent, fixed-fee options available',
              ].map((item, i) => (
                <Reveal key={item} variant="standard" delay={0.24 + i * 0.05}>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground/85">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values Module */}
      <section className="bg-foreground/[0.02] py-24 border-y border-foreground/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal variant="standard">
            <h2 className="max-w-2xl text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The principles behind every engagement.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} variant="scale" delay={0.05 * i}>
                <div className="h-full rounded-2xl border border-foreground/8 bg-background p-7 transition-colors hover:border-accent">
                  <span className="font-heading text-3xl font-bold text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                    {v.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/50">
                    {v.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet People CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal variant="scale">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-foreground/8 bg-background p-10 md:flex-row md:items-center hover:border-foreground/15">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Meet the people behind the practice.
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                A team of specialists committed to your success.
              </p>
            </div>
            <Button variant="primary" href="/people" className="shrink-0">
              View our team
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
