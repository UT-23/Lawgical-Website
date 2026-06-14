import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline'
  className?: string
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-secondary text-secondary-foreground',
        variant === 'accent' && 'bg-accent/15 text-accent',
        variant === 'outline' && 'border border-border text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  )
}
