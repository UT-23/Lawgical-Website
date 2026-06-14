'use client'
import { VideoCard } from '@/components/video/video-card'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

const TESTIMONIALS = [
  {
    src: '/videos/clients/jalpa-testimonial.mp4',
    title: 'Jalpa',
    desc: 'Managing Director',
    details: 'Feedback on Corporate Restructuring & Compliance Advisory',
    aspect: '9/16' as const,
  },
  {
    src: '/videos/clients/mostafa-testimonial.mp4',
    title: 'Mostafa',
    desc: 'Co-Founder & CEO',
    details: 'Review on Cross-Border Intellectual Property & Structuring',
    aspect: '9/16' as const,
  },
  {
    src: '/videos/clients/shadhad-testimonial.mp4',
    title: 'Shadhad',
    desc: 'Director of Developments',
    details: 'Advisory on High-Value Dispute Resolution & DIAC Arbitration',
    aspect: '9/16' as const,
  },
  {
    src: '/videos/clients/srinivas-singh-testimonial.mp4',
    title: 'Srinivas Singh',
    desc: 'Executive Director',
    details: 'Consultation on UAE Corporate Entry & Joint Venture Setup',
    aspect: '9/16' as const,
  },
]

export function TestimonialsGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <SectionLabel className="mb-12 block">Client Voices</SectionLabel>
        
        {/* Testimonial Videos Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={t.src} variant="scale" delay={idx * 0.08}>
              <div className="flex flex-col h-full rounded-2xl border border-foreground/5 bg-foreground/[0.01] p-4 hover:border-foreground/15 transition-all">
                <VideoCard
                  src={t.src}
                  title={t.title}
                  description={`${t.desc} — ${t.details}`}
                  aspectRatio={t.aspect}
                  hoverPreview
                  className="shadow-lg"
                />
                <div className="mt-4 px-2">
                  <h4 className="font-heading text-lg font-bold text-foreground">{t.title}</h4>
                  <p className="text-xs text-foreground/45 font-medium mt-0.5">{t.desc}</p>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/60">{t.details}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
