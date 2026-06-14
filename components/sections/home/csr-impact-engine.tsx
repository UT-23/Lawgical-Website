'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, HeartHandshake } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { VideoCard } from '@/components/video/video-card'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { videoUrl } from '@/lib/video'

const CSR_VIDEOS = [
  { src: videoUrl('/videos/csr/un-post.mov'), title: 'United Nations Compliance Partnership', category: 'Pro Bono', desc: 'Partnering with global entities to enforce regulatory frameworks and promote compliance standards.' },
  { src: videoUrl('/videos/csr/education-day.mp4'), title: 'Youth Legal Education Program', category: 'Education', desc: 'Cultivating the next generation of legal talent by hosting interactive workshops and school visits.' },
  { src: videoUrl('/videos/csr/breast-cancer-awareness.mov'), title: 'Healthcare Advocacy & Awareness', category: 'Community', desc: 'Sponsoring healthcare research campaigns and regional clinical outreach initiatives.' },
  { src: videoUrl('/videos/csr/stress-awareness-day.mp4'), title: 'Stress & Mental Health Forum', category: 'Wellbeing', desc: 'Promoting work-life balance and mental health programs within the high-pressure professional sector.' },
  { src: videoUrl('/videos/csr/world-gratitude-day.mov'), title: 'World Gratitude Day Outreach', category: 'Community', desc: 'Supporting local families and volunteers during community enhancement events.' },
]

const PILLARS = [
  { title: 'Pro Bono Advocacy', description: 'Extending professional representation to vulnerable communities and non-profit initiatives.' },
  { title: 'Empowering Education', description: 'Spreading fundamental legal literacy and compliance logic across academic institutions.' },
  { title: 'Community Alignment', description: 'Cooperating with municipal entities to support medical research and civic action.' },
  { title: 'Internal Wellness', description: 'Maintaining internal initiatives to guard the physical and mental wellbeing of our advocates.' },
]

export function CsrImpactEngine() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Track scroll position of the section to drive parallax scroll on the right column
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Apply parallax translation on desktop only
  const yOffset = useTransform(scrollYProgress, [0, 1], [120, -120])
  const y = reduced ? 0 : yOffset

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 border-t border-foreground/5" id="csr">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Pinned/Sticky Narrative */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-10">
              <div>
                <SectionLabel>Corporate Social Responsibility</SectionLabel>
                <Reveal variant="fromLeft" className="mt-4">
                  <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                    Law as a Force<br />for Good
                  </h2>
                </Reveal>
                <Reveal className="mt-6">
                  <p className="text-base leading-relaxed text-foreground/55 max-w-lg">
                    We believe legal excellence carries a responsibility that extends beyond the boardroom. Our CSR initiatives establish real social impact across the communities we call home.
                  </p>
                </Reveal>
              </div>

              {/* Pinned Pillars Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {PILLARS.map((pillar, i) => (
                  <Reveal key={pillar.title} delay={i * 0.05} variant="fromLeft">
                    <div className="group relative pl-6 border-l border-foreground/10 hover:border-accent transition-colors duration-300">
                      <h4 className="font-heading text-sm font-bold text-foreground group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-300" />
                        {pillar.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/50">
                        {pillar.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTA */}
              <Reveal className="pt-4">
                <Link
                  href="/csr"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  Explore our CSR programmes
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Right Column - Film-Strip Scroll Parallax */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <motion.div 
              style={{ y }}
              className="space-y-8 md:space-y-12"
            >
              {CSR_VIDEOS.map((video, idx) => (
                <div 
                  key={video.src}
                  className="rounded-2xl border border-foreground/5 bg-foreground/[0.01] overflow-hidden p-6 hover:border-foreground/15 transition-all duration-300"
                >
                  <div className="grid gap-6 md:grid-cols-12 md:items-center">
                    {/* Video Card (Col-Span-7) */}
                    <div className="md:col-span-7 shadow-lg shadow-black/5">
                      <VideoCard
                        src={video.src}
                        title={video.title}
                        description={video.category}
                        aspectRatio="16/9"
                        hoverPreview
                      />
                    </div>

                    {/* Metadata & Description (Col-Span-5) */}
                    <div className="md:col-span-5 space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/20 rounded px-2 py-0.5 bg-accent/[0.02] inline-block">
                        {video.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {video.title}
                      </h3>
                      <p className="text-xs text-foreground/50 leading-relaxed">
                        {video.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

