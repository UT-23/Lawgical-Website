'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useVideoModal } from './video-modal'
import { DURATION, EASING } from '@/lib/motion'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'
import { useVideoAutoplay } from '@/lib/hooks/use-video-autoplay'

interface VideoCardProps {
  src: string
  poster?: string
  title: string
  description?: string
  aspectRatio?: '16/9' | '9/16' | '4/3'
  hoverPreview?: boolean
  className?: string
}

export function VideoCard({
  src,
  poster,
  title,
  description,
  aspectRatio = '9/16',
  className,
}: VideoCardProps) {
  const { openModal } = useVideoModal()
  // Autoplays (muted) whenever the card scrolls into view, pauses when it leaves.
  const { ref: videoRef, isPlaying } = useVideoAutoplay()
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  const paddingMap = {
    '16/9': 'pb-[56.25%]',
    '9/16': 'pb-[177.78%]',
    '4/3': 'pb-[75%]',
  }

  const handleClick = () => openModal(src, title)

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor="video"
      className={cn(
        'group relative block w-full overflow-hidden rounded-lg bg-foreground/5 text-left',
        className
      )}
      whileHover={reduced ? {} : { scale: 1.02 }}
      transition={{ duration: DURATION.fast, ease: EASING.smooth }}
      aria-label={`Play ${title}`}
    >
      <div className={`relative w-full ${paddingMap[aspectRatio]}`}>
        {/* Poster image — fades out once the video starts playing */}
        {poster && (
          <Image
            src={poster}
            alt={title}
            fill
            className={cn(
              'object-cover transition-opacity duration-500',
              isPlaying && !reduced ? 'opacity-0' : 'opacity-100'
            )}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Video — always rendered, plays automatically when in view */}
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play hint — dims once playing, brightens on hover (click = open with sound) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : isPlaying ? 0 : 0.7 }}
          transition={{ duration: DURATION.fast }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
          </div>
        </motion.div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className={cn(
          'font-medium text-white transition-colors duration-200',
          hovered ? 'text-accent' : 'text-white'
        )}>
          {title}
        </p>
        {description && (
          <p className="mt-1 text-xs text-white/60 line-clamp-2">{description}</p>
        )}
      </div>
    </motion.button>
  )
}
