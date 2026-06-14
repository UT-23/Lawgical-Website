'use client'
import { PageHeader } from '@/components/ui/page-header'
import { RegionalMap } from '@/components/sections/lla/regional-map'
import { JurisdictionsList } from '@/components/sections/lla/jurisdictions-list'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import { CONTACT } from '@/lib/site'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function LlaPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Legal Location Atlas"
        headline="Regional reach. Local depth."
        description="Lawgical Group operates an integrated network of affiliate legal desks, advocates, and investigators across the GCC and wider MENA jurisdictions."
        stats={[
          { value: 7, label: 'GCC jurisdictions' },
          { value: 12, label: 'Industries represented' },
          { value: 130, suffix: '+', label: 'Countries covered via global desk' },
        ]}
        theme="light"
      />

      {/* Interactive SVG Regional Map */}
      <RegionalMap />

      {/* Jurisdictions Listing Grid */}
      <JurisdictionsList />

      {/* Primary Office Section */}
      <section className="bg-foreground/[0.02] py-20 border-b border-foreground/5">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <Reveal variant="fromLeft">
              <div>
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Headquarters</p>
                <h3 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Downtown Dubai Office
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                  Our central coordination desk is situated in Downtown Dubai, overlooking the Burj Khalifa. We manage all international filings, regional litigation instructions, and corporate accounts directly from this hub.
                </p>
                
                {/* Location details */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3 text-sm text-foreground/70">
                    <MapPin className="h-5 w-5 text-accent shrink-0" />
                    <span>{CONTACT.address}</span>
                  </div>
                  <div className="flex gap-3 text-sm text-foreground/70">
                    <Phone className="h-5 w-5 text-accent shrink-0" />
                    <span>{CONTACT.phone}</span>
                  </div>
                  <div className="flex gap-3 text-sm text-foreground/70">
                    <Mail className="h-5 w-5 text-accent shrink-0" />
                    <span>{CONTACT.email}</span>
                  </div>
                  <div className="flex gap-3 text-sm text-foreground/70">
                    <Clock className="h-5 w-5 text-accent shrink-0" />
                    <span>{CONTACT.hours}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal variant="scale">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-foreground/5 bg-muted">
                <iframe
                  title="Lawgical Group office location map"
                  src="https://www.google.com/maps?q=Boulevard+Plaza+Tower+1+Downtown+Dubai&output=embed"
                  className="h-full w-full grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* LLA bottom CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal variant="scale">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Operating across borders? We're already there.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/50 max-w-2xl mx-auto">
            Discuss your cross-border joint venture, trade claim, or DIAC/ICC arbitration with our regional team.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="primary" href="/contact">
              Discuss Cross-Border Matter
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
