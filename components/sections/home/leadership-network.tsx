import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TEAM } from '@/lib/content'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { PortraitGallery } from '@/components/portrait/portrait-gallery'

export function LeadershipNetwork() {
  const people = TEAM.map((member) => ({
    ...member,
    src: member.image,
  }))

  return (
    <section className="py-24 md:py-32" id="people">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Our People</SectionLabel>
            <Reveal variant="fromLeft" className="mt-4">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Counsel You Can<br />Count On
              </h2>
            </Reveal>
          </div>
          <div className="md:max-w-sm">
            <Reveal variant="fromRight">
              <p className="text-base leading-relaxed text-foreground/55">
                A team of senior practitioners who bring both legal precision and commercial intuition to every matter.
              </p>
            </Reveal>
            <Reveal className="mt-6">
              <Link
                href="/people"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                Meet the full team
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Portrait gallery */}
        <PortraitGallery people={people} layout="row" maxVisible={3} size="lg" />
      </div>
    </section>
  )
}
