import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  theme?: 'light' | 'dark'
}

export function SectionLabel({ children, className, theme = 'light' }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-semibold uppercase tracking-[0.14em]',
        theme === 'light' ? 'text-accent' : 'text-accent/80',
        className
      )}
    >
      {children}
    </span>
  )
}
