'use client'
import { PageHeader } from '@/components/ui/page-header'
import { CsrVideoHub } from '@/components/sections/csr/csr-video-hub'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { SectionLabel } from '@/components/ui/section-label'

export default function CsrPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Corporate Social Responsibility"
        headline="Law with a conscience."
        description="We believe that legal excellence and social responsibility are inseparable. Our advocacy campaigns and pro-bono work aim to build a more equitable, aware region."
        theme="light"
      />

      {/* CSR Interactive Video Grid */}
      <CsrVideoHub />

      {/* Causes we Champion */}
      <section className="bg-foreground/[0.02] py-20 border-b border-foreground/5">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <Reveal variant="fromLeft">
              <div>
                <SectionLabel className="mb-4">Our Commitment</SectionLabel>
                <h3 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Initiatives built around sustainability and wellness.
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-foreground/50">
                  Through partnerships, workshops, and volunteer hours, the Lawgical Group team is committed to advancing community wellbeing. We regularly structure and fund local programs targeting public health, stress management, mental clarity, and accessibility.
                </p>
              </div>
            </Reveal>

            <div className="space-y-8 border-l border-foreground/10 pl-6 lg:pl-10">
              {[
                { title: 'Pro-Bono Representation', desc: 'Offering legal consulting and dispute advice to eligible micro-enterprises, startups, and community stakeholders.' },
                { title: 'Environmental Governance Integration', desc: 'Working with our commercial clients to help them structure ESG-compliant contracting templates and corporate bylaws.' },
                { title: 'Active Health & Awareness Days', desc: 'Direct involvement and educational campaign sponsorships during global awareness movements.' },
              ].map((item, i) => (
                <Reveal key={item.title} variant="standard" delay={i * 0.08}>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/50">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CSR bottom CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal variant="scale">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Interested in partnering on social impact?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/50 max-w-2xl mx-auto">
            We welcome opportunities to collaborate with NGOs, educational institutions, and corporate groups on community welfare and legal literacy campaigns in the UAE and the wider GCC.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="primary" href="/contact">
              Get in Touch
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
