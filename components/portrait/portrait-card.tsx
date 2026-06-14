'use client'
import { useRef, useState } from 'react'
import { SafeImage } from '@/components/ui/safe-image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASING, DURATION } from '@/lib/motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface PortraitCardProps {
  src: string
  name: string
  role: string
  bio?: string
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
  className?: string
  objectPosition?: string
}

export function PortraitCard({ 
  src, 
  name, 
  role, 
  bio, 
  size = 'md', 
  priority = false, 
  className,
  objectPosition = 'center 15%'
}: PortraitCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), EASING.springLight)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), EASING.springLight)

  const heightMap = { sm: 'h-72', md: 'h-96 md:h-[28rem]', lg: 'h-[32rem] md:h-[36rem]' }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    if (reduced) return
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !reduced && setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={reduced ? {} : { rotateX, rotateY, transformPerspective: 800 }}
      data-cursor="portrait"
      className={cn('relative overflow-hidden rounded-lg cursor-none', heightMap[size], className)}
    >
      {/* Portrait image */}
      <SafeImage
        src={src}
        fallbackSrc="/placeholder-user.jpg"
        alt={name}
        fill
        priority={priority}
        style={{ objectPosition }}
        className={cn(
          'object-cover transition-transform duration-700',
          hovered && !reduced && 'scale-[1.04]'
        )}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Gradient overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t transition-opacity duration-300',
          hovered ? 'from-black/80 via-black/30 to-transparent' : 'from-black/65 via-black/20 to-transparent'
        )}
      />

      {/* Name + role + bio overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {bio && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={hovered && !reduced ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING.enter }}
            className="mb-2 text-sm leading-relaxed text-white/80"
          >
            {bio}
          </motion.p>
        )}

        <motion.div
          animate={hovered && !reduced ? { y: -4 } : { y: 0 }}
          transition={{ duration: DURATION.normal, ease: EASING.enter }}
        >
          <p className="font-heading text-base font-semibold text-white">{name}</p>
          <p className="mt-0.5 text-xs text-white/60">{role}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
