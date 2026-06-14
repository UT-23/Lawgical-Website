import { cn } from '@/lib/utils'
import { SectionLabel } from './section-label'
import { Reveal } from './reveal'
import { StatCounter } from './stat-counter'

interface Stat {
  value: number
  suffix?: string
  label: string
}

interface PageHeaderProps {
  eyebrow?: string
  headline: string
  description?: string
  stats?: Stat[]
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  className?: string
}

export function PageHeader({
  eyebrow,
  headline,
  description,
  stats,
  align = 'left',
  theme = 'light',
  className,
}: PageHeaderProps) {
  const isDark = theme === 'dark'

  return (
    <section
      className={cn(
        'relative px-6 py-24 md:px-12 lg:px-20',
        isDark ? 'bg-foreground text-background' : 'bg-background',
        className
      )}
    >
      <div className={cn('mx-auto max-w-6xl', align === 'center' && 'text-center')}>
        {eyebrow && (
          <Reveal variant="instant" delay={0}>
            <SectionLabel theme={isDark ? 'dark' : 'light'} className="mb-4 block">
              {eyebrow}
            </SectionLabel>
          </Reveal>
        )}
        <Reveal variant="standard" delay={0.08}>
          <h1
            className={cn(
              'font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl',
              isDark ? 'text-background' : 'text-foreground'
            )}
          >
            {headline}
          </h1>
        </Reveal>
        {description && (
          <Reveal variant="standard" delay={0.16}>
            <p
              className={cn(
                'mt-6 max-w-2xl text-lg leading-relaxed',
                isDark ? 'text-background/70' : 'text-muted-foreground',
                align === 'center' && 'mx-auto'
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
        {stats && stats.length > 0 && (
          <Reveal variant="standard" delay={0.24}>
            <div className="mt-12 flex flex-wrap gap-12">
              {stats.map((s, i) => (
                <StatCounter
                  key={i}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={i * 100}
                />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
