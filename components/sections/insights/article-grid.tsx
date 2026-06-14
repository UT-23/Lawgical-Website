'use client'
import { useState } from 'react'
import { SafeImage } from '@/components/ui/safe-image'
import Link from 'next/link'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { ARTICLES } from '@/lib/content'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Arbitration', 'Corporate', 'Litigation', 'Debt Collection', 'Compliance']

export function ArticleGrid() {
  const [selectedCat, setSelectedCat] = useState('All')
  
  // Filter out featured article, then filter by category
  const filteredArticles = ARTICLES.filter((a) => {
    if (selectedCat === 'All') return !a.featured
    return !a.featured && a.category.toLowerCase() === selectedCat.toLowerCase()
  })

  // Split filtered articles into Main Stream (horizontal) and Briefings Stack (text-only sidebar)
  const mainStream = filteredArticles.slice(0, 3)
  const briefingsStack = filteredArticles.slice(3)

  return (
    <section id="archive-grid" className="bg-background py-16 md:py-24 border-t border-foreground/5 scroll-mt-20">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        
        {/* Category Filters */}
        <div className="mb-16 flex flex-wrap gap-4 items-center justify-between border-b border-foreground/5 pb-8">
          <SectionLabel className="font-mono text-[10px] tracking-widest text-foreground/45 uppercase">
            Legal Archive Feed
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 outline-none border',
                  selectedCat === cat
                    ? 'bg-accent text-accent-foreground border-transparent'
                    : 'bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30 hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine Grid Layout */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Primary Columns: Main horizontal stream (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-8">
              <h4 className="font-mono text-[10px] text-accent uppercase tracking-wider font-semibold border-b border-foreground/5 pb-2 mb-6">
                Briefings & Analysis
              </h4>
              
              {mainStream.map((art, idx) => (
                <Reveal key={art.slug} variant="scale" delay={idx * 0.05}>
                  <Link
                    href={`/contact?inquire=article&title=${encodeURIComponent(art.title)}`}
                    data-cursor="insights"
                    className="group flex flex-col md:flex-row gap-6 p-4 rounded-2xl border border-foreground/5 bg-foreground/[0.005] hover:border-foreground/15 hover:bg-foreground/[0.01] hover:shadow-lg transition-all duration-300 cursor-none"
                  >
                    {/* Image panel */}
                    <div className="relative aspect-[16/10] md:w-2/5 md:aspect-auto overflow-hidden rounded-xl bg-muted min-h-[160px] shadow-sm">
                      <SafeImage
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>
                    
                    {/* Content details */}
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-accent">
                          <span>{art.category}</span>
                          <span className="h-1 w-1 rounded-full bg-foreground/10" />
                          <span className="text-foreground/45 font-medium flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {art.readTime}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-foreground/55 line-clamp-3 font-light">
                          {art.excerpt}
                        </p>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-foreground/5 pt-4">
                        <span className="text-[10px] font-mono text-foreground/35">{art.date}</span>
                        <span className="text-xs font-semibold text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Consult Briefing <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Secondary Column: Text briefings sidebar (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6 lg:pl-6 lg:border-l lg:border-foreground/5">
              <h4 className="font-mono text-[10px] text-foreground/45 uppercase tracking-wider font-semibold border-b border-foreground/5 pb-2 mb-6">
                Archived Reports
              </h4>
              
              {briefingsStack.length > 0 ? (
                <div className="space-y-6">
                  {briefingsStack.map((art, idx) => (
                    <Reveal key={art.slug} variant="scale" delay={idx * 0.08}>
                      <Link
                        href={`/contact?inquire=article&title=${encodeURIComponent(art.title)}`}
                        data-cursor="insights"
                        className="group block p-5 rounded-xl border border-foreground/5 bg-foreground/[0.005] hover:border-foreground/15 hover:bg-foreground/[0.01] transition-all duration-300 cursor-none"
                      >
                        <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-wider text-accent">
                          <span>{art.category}</span>
                          <span>·</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h4 className="mt-2 font-heading text-sm font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="mt-2 text-[11px] leading-relaxed text-foreground/50 line-clamp-2">
                          {art.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-foreground/5 pt-3 text-[10px] text-foreground/30 font-mono">
                          <span>{art.date}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center rounded-xl border border-dashed border-foreground/5 bg-foreground/[0.002]">
                  <p className="text-xs text-foreground/40 font-mono">End of Feed</p>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl border border-dashed border-foreground/10 bg-foreground/[0.005]">
            <p className="text-sm text-foreground/45">No articles found in this category.</p>
          </div>
        )}

      </div>
    </section>
  )
}
