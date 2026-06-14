'use client'
import { PageHeader } from '@/components/ui/page-header'
import { Reveal } from '@/components/ui/reveal'
import { ContactForm } from '@/components/contact-form'
import { CONTACT } from '@/lib/site'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const details = [
  { icon: MapPin, label: 'Office Address', value: CONTACT.address },
  { icon: Phone, label: 'Call Directly', value: CONTACT.phone },
  { icon: Mail, label: 'Email Address', value: CONTACT.email },
  { icon: Clock, label: 'Business Hours', value: CONTACT.hours },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Get in touch"
        headline="Let's discuss your matter."
        description="Whether you require regulatory counsel, commercial JV structuring, trade debt collection, or legal dispute representation — we are ready to assist."
        theme="light"
      />

      <section className="bg-background py-16 md:py-24 border-t border-foreground/5">
        <div className="mx-auto grid max-w-screen-2xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          
          {/* Left Side Details & Map */}
          <Reveal variant="fromLeft" className="flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-6">
              {details.map((d) => {
                const Icon = d.icon
                return (
                  <div key={d.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/35">
                        {d.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{d.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Embedded Google Map */}
            <div className="overflow-hidden rounded-3xl border border-foreground/5 bg-foreground/[0.01]">
              <iframe
                title="Lawgical Group headquarters location on map"
                src="https://www.google.com/maps?q=Boulevard+Plaza+Tower+1+Downtown+Dubai&output=embed"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Right Side Form */}
          <Reveal variant="fromRight" delay={0.1}>
            <div className="rounded-3xl border border-foreground/5 bg-foreground/[0.01] p-8 md:p-10">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6">Send a Confidential Enquiry</h3>
              <ContactForm />
            </div>
          </Reveal>

        </div>
      </section>
    </main>
  )
}
