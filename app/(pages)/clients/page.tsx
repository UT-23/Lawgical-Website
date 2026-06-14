'use client'
import { PageHeader } from '@/components/ui/page-header'
import { FeaturedReel } from '@/components/sections/clients/featured-reel'
import { TestimonialsGrid } from '@/components/sections/clients/testimonials-grid'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Client Relationships"
        headline="Trusted by businesses across the region."
        description="Our clients range from early-stage technology platforms to multinational conglomerates and sovereign funds. See how they describe working with us."
        stats={[
          { value: 500, suffix: '+', label: 'Clients advised' },
          { value: 98, suffix: '%', label: 'Client retention' },
          { value: 20, suffix: '+', label: 'Years combined practice' },
        ]}
        theme="light"
      />

      {/* Featured Autoplay Reel */}
      <FeaturedReel />

      {/* Testimonials Video Grid */}
      <TestimonialsGrid />

      {/* Join Clients CTA */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal variant="scale">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl text-background">
              Ready to partner with Lawgical Group?
            </h2>
            <p className="mt-4 text-base text-background/60 leading-relaxed max-w-2xl mx-auto">
              Join over 500 commercial entities, founders, and compliance leads who depend on our strategic counsel to navigate GCC regulatory and litigation scenarios.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button variant="primary" href="/contact" className="bg-accent text-accent-foreground border-transparent hover:bg-accent/90">
                Book a Consultation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
