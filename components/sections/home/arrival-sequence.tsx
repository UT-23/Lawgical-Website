'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING, DURATION } from '@/lib/motion'

const WORDS = ['Clarity.', 'Precision.', 'Results.']

export function ArrivalSequence({ onComplete }: { onComplete?: () => void }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (wordIndex < WORDS.length) {
      const t = setTimeout(() => {
        setWordIndex((i) => i + 1)
      }, 750)
      return () => clearTimeout(t)
    } else {
      setShowLogo(true)
      const t = setTimeout(() => {
        setDone(true)
        onComplete?.()
      }, 1600)
      return () => clearTimeout(t)
    }
  }, [wordIndex, onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="arrival"
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.slow, ease: EASING.exit }}
        >
          <AnimatePresence mode="wait">
            {!showLogo && wordIndex < WORDS.length ? (
              <motion.p
                key={`word-${wordIndex}`}
                className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASING.enter }}
              >
                {WORDS[wordIndex]}
              </motion.p>
            ) : showLogo ? (
              <motion.div
                key="logo-reveal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
              >
                {/* Real Company Logo Image */}
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-foreground/5 bg-[#0a0b0c] p-2 shadow-2xl">
                  <Image
                    src="/logo.png"
                    alt="Lawgical Group logo"
                    fill
                    className="object-contain p-1"
                    sizes="80px"
                    priority
                  />
                </div>

                {/* Animated Wordmark */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: EASING.enter }}
                  className="font-heading text-2xl font-bold tracking-tight text-foreground"
                >
                  Lawgical Group
                </motion.h1>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
