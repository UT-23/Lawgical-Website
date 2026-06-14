'use client'
import { AnimatePresence as FramerPresence } from 'framer-motion'

interface PresenceProps {
  children: React.ReactNode
  mode?: 'wait' | 'sync' | 'popLayout'
}

export function Presence({ children, mode = 'wait' }: PresenceProps) {
  return <FramerPresence mode={mode}>{children}</FramerPresence>
}
