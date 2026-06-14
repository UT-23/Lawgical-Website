'use client'
import { PageHeader } from '@/components/ui/page-header'
import { FeaturedArticle } from '@/components/sections/insights/featured-article'
import { ArticleGrid } from '@/components/sections/insights/article-grid'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <PageHeader
        eyebrow="Intelligence Hub"
        headline="Market intelligence that shapes counsel."
        description="Substantive analysis on corporate transaction guidelines, arbitration amendments, and regulatory frameworks affecting businesses building in the GCC."
        theme="light"
      />

      {/* Leading Editorial Article */}
      <FeaturedArticle />

      {/* Searchable/Filterable Grid of Non-Featured Articles */}
      <ArticleGrid />

      {/* Insights bottom CTA */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal variant="scale">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl text-background">
              A question raised by something you read?
            </h2>
            <p className="mt-4 text-base text-background/60 leading-relaxed max-w-2xl mx-auto">
              Our advocates are available to discuss the specifics of new regulations, DIFC judgments, or DIAC/ICC reform implications on your current transactions.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="primary" href="/contact" className="bg-accent text-accent-foreground border-transparent hover:bg-accent/90">
                Discuss with a Specialist
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
