'use client'
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { DURATION, EASING } from '@/lib/motion'

interface VideoModalContextValue {
  open: boolean
  src: string | null
  title: string | null
  openModal: (src: string, title: string) => void
  closeModal: () => void
}

const VideoModalContext = createContext<VideoModalContextValue>({
  open: false,
  src: null,
  title: null,
  openModal: () => {},
  closeModal: () => {},
})

export function useVideoModal() {
  return useContext(VideoModalContext)
}

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string | null>(null)
  const [title, setTitle] = useState<string | null>(null)

  const openModal = useCallback((s: string, t: string) => {
    setSrc(s)
    setTitle(t)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <VideoModalContext.Provider value={{ open, src, title, openModal, closeModal }}>
      {children}
      <VideoModal />
    </VideoModalContext.Provider>
  )
}

function VideoModal() {
  const { open, src, title, closeModal } = useVideoModal()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset video
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Keyboard close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, closeModal])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && src && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.88 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING.smooth }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-label={title ?? 'Video'}
            aria-modal="true"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: DURATION.normal, ease: EASING.enter }}
          >
            <div className="relative w-full max-w-4xl">
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>

              <video
                ref={videoRef}
                src={src}
                controls
                autoPlay
                className="w-full rounded-lg"
                style={{ maxHeight: '80vh' }}
                onCanPlay={() => videoRef.current?.play()}
              />

              {title && (
                <p className="mt-3 text-sm text-white/60">{title}</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
