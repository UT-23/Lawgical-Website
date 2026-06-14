import { SafeImage } from '@/components/ui/safe-image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '@/lib/content'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href="/news"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SafeImage
          src={article.image || '/placeholder.svg'}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-accent/10 px-3 py-1 font-medium text-accent">
            {article.category}
          </span>
          <span className="text-muted-foreground">{article.readTime}</span>
        </div>
        <h3 className="mt-4 text-balance font-serif text-xl leading-snug text-foreground">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">{article.date}</span>
          <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}
