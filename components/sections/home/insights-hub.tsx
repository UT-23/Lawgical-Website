import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SafeImage } from '@/components/ui/safe-image'
import { ARTICLES } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'

export function InsightsHub() {
  const [featured, ...rest] = ARTICLES

  return (
    <section className="py-24 md:py-32" id="insights">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Insights</SectionLabel>
            <Reveal variant="fromLeft" className="mt-4">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Intelligence That<br />Informs Strategy
              </h2>
            </Reveal>
          </div>
          <Reveal variant="fromRight">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              View all insights
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Featured + grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Featured article */}
          {featured && (
            <Reveal variant="fromLeft">
              <Link
                href={`/insights/${featured.slug}`}
                className="group relative flex h-full min-h-[400px] flex-col justify-end overflow-hidden rounded-xl"
              >
                <SafeImage
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative p-8">
                  <Tag className="mb-4">{featured.category}</Tag>
                  <h3 className="font-heading text-2xl font-bold leading-snug text-white md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/60 line-clamp-2">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-white/40">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Secondary articles */}
          <div className="flex flex-col gap-4">
            {rest.slice(0, 4).map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.07}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-foreground/8 p-5 transition-all duration-200 hover:border-foreground/16 hover:bg-foreground/[0.02]"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <SafeImage
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Tag variant="outline" className="text-[10px]">{article.category}</Tag>
                    </div>
                    <h3 className="mt-1.5 font-heading text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-accent line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-foreground/35">
                      <span>{article.date}</span>
                      <svg width="4" height="4" viewBox="0 0 10 10" fill="currentColor" className="text-foreground/25">
                        <polygon points="5 0, 9.3 2.5, 9.3 7.5, 5 10, 0.7 7.5, 0.7 2.5" />
                      </svg>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-foreground/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
