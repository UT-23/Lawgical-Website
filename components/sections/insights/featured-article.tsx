'use client'
import { SafeImage } from '@/components/ui/safe-image'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { ARTICLES } from '@/lib/content'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

export function FeaturedArticle() {
  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0]

  return (
    <section className="bg-background py-16 md:py-24 border-b border-foreground/5">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <SectionLabel className="mb-12 block font-mono text-[10px] tracking-widest text-accent uppercase">
          Featured Intelligence
        </SectionLabel>
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Featured Image (Col-span-7) */}
          <Reveal variant="fromLeft" className="lg:col-span-7 w-full">
            <div data-cursor="insights" className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-3xl border border-foreground/5 bg-muted shadow-2xl group cursor-none">
              <SafeImage
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {/* Subtle glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
            </div>
          </Reveal>
          
          {/* Editorial Content (Col-span-5) */}
          <Reveal variant="fromRight" className="lg:col-span-5 space-y-6 lg:pl-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-block rounded px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-accent border border-accent/20 bg-accent/[0.01]">
                  {featured.category}
                </span>
                <span className="text-[10px] font-mono text-foreground/40">{featured.date}</span>
                <span className="text-[10px] font-mono text-foreground/30">·</span>
                <span className="text-[10px] font-mono text-foreground/40 flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {featured.readTime}
                </span>
              </div>
              
              <h3 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl leading-[1.15] text-pretty">
                {featured.title}
              </h3>
              
              <p className="text-sm md:text-base leading-relaxed text-foreground/60 font-light text-pretty pt-2">
                {featured.excerpt}
              </p>
            </div>
            
            <div className="pt-6 border-t border-foreground/5 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?inquire=article&title=${encodeURIComponent(featured.title)}`}
                data-cursor="cta"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-xs font-semibold hover:bg-foreground/80 transition-colors"
              >
                Discuss this brief
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('archive-grid')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 text-foreground/75 px-6 py-3.5 text-xs font-semibold hover:border-foreground/30 hover:text-foreground transition-all"
              >
                Read other briefs
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
