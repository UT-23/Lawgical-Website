import { Reveal } from '@/components/reveal'

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
        <Reveal>
          <p className="font-heading text-sm font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/75">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
