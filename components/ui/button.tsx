import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

// ─── SiteButton — magnetic, design-system aligned ────────────────────────────
import * as React from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASING, MAGNETIC } from '@/lib/motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

type SiteButtonVariant = 'primary' | 'secondary' | 'ghost'
type SiteButtonSize = 'sm' | 'default' | 'lg'

interface SiteButtonProps {
  variant?: SiteButtonVariant
  size?: SiteButtonSize
  href?: string
  magnetic?: boolean
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  showArrow?: boolean
}

const sbSize: Record<SiteButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  default: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

function SiteButton({
  variant = 'primary',
  size = 'default',
  href,
  magnetic: mag = variant !== 'ghost',
  onClick,
  disabled = false,
  children,
  className: cls,
  type = 'button',
  showArrow = false,
}: SiteButtonProps) {
  const reduced = useReducedMotion()
  const ref = React.useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, EASING.spring)
  const sy = useSpring(my, EASING.spring)
  const r = MAGNETIC.buttonRadius
  const mag2 = variant === 'secondary' ? 6 : MAGNETIC.buttonMagnitude

  React.useEffect(() => {
    if (!mag || reduced || disabled) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return
    const h = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < r) {
        const s = (1 - dist / r) * mag2
        mx.set((dx / dist) * s)
        my.set((dy / dist) * s)
      } else {
        mx.set(0); my.set(0)
      }
    }
    document.addEventListener('mousemove', h)
    return () => document.removeEventListener('mousemove', h)
  }, [mag, reduced, disabled, r, mag2, mx, my])

  const base = cn(
    'relative inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 select-none cursor-pointer',
    variant !== 'ghost' && sbSize[size],
    variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground border border-primary hover:border-accent',
    variant === 'secondary' && 'bg-transparent text-accent border border-accent hover:bg-accent/10',
    variant === 'ghost' && 'group bg-transparent text-accent border-0 p-0',
    disabled && 'opacity-40 pointer-events-none',
    cls
  )

  const inner = (
    <>
      {children}
      {(showArrow || variant === 'ghost') && (
        <ArrowRight className={cn('h-4 w-4 transition-transform duration-200', variant === 'ghost' && 'group-hover:translate-x-1')} />
      )}
      {variant === 'ghost' && (
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
      )}
    </>
  )

  const mProps = mag && !reduced ? { style: { x: sx, y: sy }, whileTap: { scale: 0.96 } } : {}

  if (href) {
    return (
      <motion.div className="inline-block" {...mProps}>
        <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={base}>{inner}</Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      {...mProps}
    >
      {inner}
    </motion.button>
  )
}

export { SiteButton }
