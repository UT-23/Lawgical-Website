import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '@/lib/content'

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <Link
      href="/services"
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-semibold text-card-foreground">
        {service.title}
      </h3>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
    </Link>
  )
}
