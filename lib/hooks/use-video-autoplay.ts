'use client'
import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from './use-reduced-motion'

export function useVideoAutoplay() {
  const ref = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video || reduced) return

    // Muted, inline videos are allowed to autoplay on mobile too, so we no
    // longer bail out on touch devices — every in-view video plays.
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
          setIsPlaying(true)
        }
      },
      { threshold: 0.5 }
    )

    const pauseObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.1 }
    )

    playObserver.observe(video)
    pauseObserver.observe(video)

    return () => {
      playObserver.disconnect()
      pauseObserver.disconnect()
    }
  }, [reduced])

  return { ref, isPlaying }
}
