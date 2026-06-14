'use client'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { VideoCard } from '@/components/video/video-card'
import { VideoReel } from '@/components/video/video-reel'
import { useVideoModal } from '@/components/video/video-modal'
import { videoUrl } from '@/lib/video'

const FEATURED_REEL = {
  src: videoUrl('/videos/clients/collection-reel.mp4'),
  title: 'Advocacy in Action',
  description: 'A comprehensive collection of client perspectives across corporate structuring, cross-border dispute resolution, and litigation enforcement matters managed by Lawgical.',
}

const SUPPORTING_TESTIMONIALS = [
  {
    src: videoUrl('/videos/clients/jalpa-testimonial.mp4'),
    title: 'Jalpa',
    role: 'Managing Director',
    outcome: 'Corporate Restructuring & Compliance Advisory',
  },
  {
    src: videoUrl('/videos/clients/mostafa-testimonial.mp4'),
    title: 'Mostafa',
    role: 'Co-Founder & CEO',
    outcome: 'Cross-Border Intellectual Property & Structuring',
  },
  {
    src: videoUrl('/videos/clients/shadhad-testimonial.mp4'),
    title: 'Shadhad',
    role: 'Director of Developments',
    outcome: 'High-Value Dispute Resolution & DIAC Arbitration',
  },
  {
    src: videoUrl('/videos/clients/srinivas-singh-testimonial.mp4'),
    title: 'Srinivas Singh',
    role: 'Executive Director',
    outcome: 'UAE Corporate Entry & Joint Venture Setup',
  },
]

export function ClientImpactStories() {
  const { openModal } = useVideoModal()

  return (
    <section className="bg-background py-24 md:py-32 border-t border-foreground/5" id="clients">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <SectionLabel>Client Stories</SectionLabel>
          <Reveal variant="fromLeft" className="mt-4">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Real Work.<br />Real Results.
            </h2>
          </Reveal>
          <Reveal className="mt-5">
            <p className="text-base leading-relaxed text-foreground/55">
              Watch how our clients navigated complex legal challenges with Lawgical Group as their counsel.
            </p>
          </Reveal>
        </div>

        {/* Cinematic layout */}
        <div className="space-y-16">
          {/* Featured collection reel (Wide) */}
          <Reveal variant="scale" className="w-full">
            <div className="group relative overflow-hidden rounded-2xl border border-foreground/5 bg-foreground/[0.01]">
              <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-center p-6 md:p-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-foreground/5 shadow-2xl">
                  <VideoReel
                    src={FEATURED_REEL.src}
                    className="h-full w-full object-cover"
                  />
                  {/* Click overlay to launch full screen player */}
                  <div 
                    onClick={() => openModal(FEATURED_REEL.src, FEATURED_REEL.title)}
                    className="absolute inset-0 bg-black/10 hover:bg-black/20 flex items-center justify-center cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-transform duration-300 hover:scale-110 shadow-lg border border-white/20">
                      <Play className="h-6 w-6 fill-white text-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {FEATURED_REEL.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/50">
                    {FEATURED_REEL.description}
                  </p>
                  <button 
                    onClick={() => openModal(FEATURED_REEL.src, FEATURED_REEL.title)}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-xs font-semibold hover:bg-foreground/80 transition-colors"
                  >
                    Play Full Reel
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Supporting video cards underneath (Narrow grid) */}
          <div>
            <h4 className="font-mono text-xs text-accent font-semibold tracking-wider mb-8 uppercase">
              Individual Case Testimonials
            </h4>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SUPPORTING_TESTIMONIALS.map((video, i) => (
                <Reveal key={video.src} delay={0.08 * i} variant="standard">
                  <div className="flex flex-col h-full rounded-2xl border border-foreground/5 bg-foreground/[0.01] p-4 hover:border-foreground/15 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/[0.01]">
                    <VideoCard
                      src={video.src}
                      title={video.title}
                      description={`${video.role} — ${video.outcome}`}
                      aspectRatio="9/16"
                      hoverPreview
                      className="shadow-md rounded-xl"
                    />
                    <div className="mt-4 px-2">
                      <h5 className="font-heading text-base font-bold text-foreground">{video.title}</h5>
                      <p className="text-xs text-foreground/45 font-medium mt-0.5">{video.role}</p>
                      <p className="mt-3 text-xs leading-relaxed text-foreground/60">{video.outcome}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Reveal className="mt-16 text-center md:text-left">
          <Link
            href="/clients"
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            See all client stories
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
