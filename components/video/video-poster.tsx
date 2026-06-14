'use client'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoPosterProps {
  src: string
  title: string
  onClick: () => void
  aspectRatio?: '16/9' | '9/16'
  className?: string
}

export function VideoPoster({ src, title, onClick, aspectRatio = '9/16', className }: VideoPosterProps) {
  const paddingTop = aspectRatio === '16/9' ? 'pb-[56.25%]' : 'pb-[177.78%]'

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative block w-full overflow-hidden rounded-lg bg-foreground/10',
        className
      )}
      aria-label={`Play ${title}`}
    >
      <div className={`relative w-full ${paddingTop}`}>
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <Play className="h-5 w-5 fill-white text-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
    </button>
  )
}
