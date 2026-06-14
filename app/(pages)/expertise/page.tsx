'use client'
import { PageHeader } from '@/components/ui/page-header'
import { ServiceNavigator } from '@/components/sections/expertise/service-navigator'
import { ExpertiseMatrix } from '@/components/sections/expertise/expertise-matrix'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'

export default function ExpertisePage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Our Capabilities"
        headline="Strategic legal counsel. Decisive outcomes."
        description="Full-service expertise across the core disciplines that matter most to commercial entities operating in the UAE, the wider GCC, and internationally."
        theme="light"
      />

      {/* Interactive explorer for the 6 services */}
      <ServiceNavigator />

      {/* Row-Column cross-intersect matrix */}
      <ExpertiseMatrix />

      {/* Bottom CTA Diagnostic */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal variant="scale">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl text-background">
              Not sure which practice fits your situation?
            </h2>
            <p className="mt-4 text-base text-background/60 leading-relaxed max-w-2xl mx-auto">
              Tell us about the commercial challenge or dispute you are facing. We will connect you directly with the specialists best suited to outline your options.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="primary" href="/contact" className="bg-accent text-accent-foreground border-transparent hover:bg-accent/90">
                Book a Consultation
              </Button>
              <Button variant="secondary" href="/contact?diagnostic=true" className="border-background/25 text-background hover:bg-background/5">
                Take Legal Diagnosis
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
