'use client'
import { PageHeader } from '@/components/ui/page-header'
import { LeadershipGallery } from '@/components/sections/people/leadership-gallery'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Our Advocates & Advisors"
        headline="The team behind the strategy."
        description="A collective of credentialed legal advisors, UAE local advocates, and cross-border consultants dedicated to securing your commercial outcomes."
        theme="light"
      />

      {/* Editorial gallery of all 11 partners & associates */}
      <LeadershipGallery />

      {/* Firm Culture / Standard of Engagement */}
      <section className="bg-foreground/[0.02] py-20 border-b border-foreground/5">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="fromLeft">
              <div className="max-w-xl">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Our Standard</p>
                <h3 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Legal precision paired with commercial intuition.
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-foreground/50">
                  Our practitioners are not just legal scholars. They are commercial thinkers. Every dispute strategy we build and every contract we structure is evaluated through the lens of your business objectives and risk tolerance.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {[
                { title: 'Local Advocacy & Rights of Audience', desc: 'Direct representation before local and federal UAE courts, DIFC courts, and major arbitration forums.' },
                { title: 'Cross-Border Execution Strength', desc: 'Active capabilities across KSA, Qatar, Kuwait, Bahrain, Oman, and the wider MENA region.' },
                { title: 'Clear & Actionable Advisory', desc: 'We deliver transparent counsel and clear recommendations, not lengthy legal disclaimers.' },
              ].map((item, i) => (
                <Reveal key={item.title} variant="standard" delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-heading text-base font-bold text-foreground">{item.title}</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* People CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal variant="scale">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Discuss your case with an advocate.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/50 max-w-2xl mx-auto">
            Schedule a confidential consultation with Kishore Mulani or one of our practice leads. Initial consultations are fully protected by attorney-client privilege.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button variant="primary" href="/contact">
              Schedule Consultation
            </Button>
            <Button variant="secondary" href="/contact?advocate=direct">
              Send Direct Message
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
