'use client'
import { createContext, useContext } from 'react'

export type CursorMode = 'default' | 'link' | 'cta' | 'people' | 'video' | 'logo' | 'insights' | 'map'

export interface CursorState {
  mode: CursorMode
  label?: string
}

export interface CursorContextValue {
  state: CursorState
  setCursorMode: (mode: CursorMode, label?: string) => void
  resetCursorMode: () => void
}

export const CursorContext = createContext<CursorContextValue>({
  state: { mode: 'default' },
  setCursorMode: () => {},
  resetCursorMode: () => {},
})

export function useCursor() {
  return useContext(CursorContext)
}
