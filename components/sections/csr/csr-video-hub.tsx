'use client'
import { VideoCard } from '@/components/video/video-card'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'
import { videoUrl } from '@/lib/video'

const CAMPAIGNS = [
  {
    src: videoUrl('/videos/csr/breast-cancer-awareness.mov'),
    title: 'Breast Cancer Awareness Campaign',
    category: 'Health & Wellness',
    desc: 'Observing global health initiatives through local corporate wellness and educational briefings.',
    aspect: '16/9' as const,
  },
  {
    src: videoUrl('/videos/csr/education-day.mp4'),
    title: 'International Day of Education',
    category: 'Education & Youth',
    desc: 'Supporting regional access to literacy, corporate training modules, and youth legal seminars.',
    aspect: '16/9' as const,
  },
  {
    src: videoUrl('/videos/csr/stress-awareness-day.mp4'),
    title: 'International Stress Awareness Day',
    category: 'Mental Wellbeing',
    desc: 'Promoting healthy work practices, mental resilience, and balanced legal workspaces across the region.',
    aspect: '16/9' as const,
  },
  {
    src: videoUrl('/videos/csr/un-post.mov'),
    title: 'United Nations Social Advocacy',
    category: 'Global Citizenship',
    desc: 'Supporting international human rights, trade equity, and the UN Sustainable Development Goals.',
    aspect: '16/9' as const,
  },
  {
    src: videoUrl('/videos/csr/world-gratitude-day.mov'),
    title: 'World Gratitude Day Initiatives',
    category: 'Community Support',
    desc: 'Spreading community appreciation, local worker support campaigns, and volunteer pro-bono setups.',
    aspect: '16/9' as const,
  },
]

export function CsrVideoHub() {
  return (
    <section className="bg-background py-16 md:py-24 border-b border-foreground/5">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <SectionLabel className="mb-12 block">CSR Initiatives</SectionLabel>
        
        {/* CSR Videos Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPAIGNS.map((c, idx) => (
            <Reveal key={c.src} variant="scale" delay={idx * 0.08} className={idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}>
              <div className="flex flex-col h-full rounded-2xl border border-foreground/5 bg-foreground/[0.01] p-4 hover:border-foreground/15 transition-all">
                <VideoCard
                  src={c.src}
                  title={c.title}
                  description={c.desc}
                  aspectRatio={c.aspect}
                  hoverPreview
                  className="shadow-md"
                />
                <div className="mt-4 px-2">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {c.category}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-foreground mt-3">{c.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/50">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
