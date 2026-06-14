'use client'
import { useRef, useState } from 'react'
import { Volume2, VolumeX, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useVideoAutoplay } from '@/lib/hooks/use-video-autoplay'

interface VideoReelProps {
  src: string
  poster?: string
  className?: string
}

export function VideoReel({ src, poster, className }: VideoReelProps) {
  const [muted, setMuted] = useState(true)
  const { ref } = useVideoAutoplay()

  const handleFullscreen = () => {
    ref.current?.requestFullscreen?.()
  }

  return (
    <div className={cn('group relative overflow-hidden rounded-lg bg-foreground/5', className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full"
      />

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <button
          onClick={handleFullscreen}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
          aria-label="Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
