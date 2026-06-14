'use client'
import { VideoReel } from '@/components/video/video-reel'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

export function FeaturedReel() {
  return (
    <section className="bg-background py-12 border-b border-foreground/5">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <SectionLabel className="mb-8 block">Collection Reel</SectionLabel>
        
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-center">
          <Reveal variant="fromLeft" className="w-full">
            <VideoReel
              src="/videos/clients/collection-reel.mp4"
              className="w-full shadow-2xl overflow-hidden aspect-video"
            />
          </Reveal>
          
          <Reveal variant="fromRight">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Advocacy in Action
              </h3>
              <p className="text-sm leading-relaxed text-foreground/50">
                This collection reel encapsulates client perspectives across multiple corporate structuring campaigns, cross-border dispute resolutions, and litigation enforcement matters managed by Lawgical.
              </p>
              <p className="text-xs text-foreground/40 leading-relaxed italic border-l-2 border-accent pl-4">
                "We measure our success solely by the security and growth of the enterprises we represent. Hear directly from the founders, directors, and executives who trust our counsel."
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
