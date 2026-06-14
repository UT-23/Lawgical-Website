'use client'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion'

interface IntelNode {
  label: string
  gridX: number
  gridY: number
  pulse: number
}

const INTEL_NODES: IntelNode[] = [
  { label: 'DXB // 25.2048', gridX: 3, gridY: 2, pulse: 0 },
  { label: 'RUH // 24.7136', gridX: 6, gridY: 4, pulse: 0.3 },
  { label: 'DOH // 25.2854', gridX: 4, gridY: 5, pulse: 0.6 },
  { label: 'MCT // 23.5880', gridX: 8, gridY: 3, pulse: 0.1 },
  { label: 'KWI // 29.3759', gridX: 2, gridY: 4, pulse: 0.8 },
  { label: 'AUH // 24.4539', gridX: 5, gridY: 2, pulse: 0.5 },
]

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -999, y: -999, active: false })
  const animRef = useRef<number>(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let gridOffset = 0

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Visibility gate
    let visible = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Packet state
    const packets = [
      { start: 0, end: 1, progress: 0, speed: 0.003 },
      { start: 1, end: 2, progress: 0, speed: 0.002 },
      { start: 2, end: 3, progress: 0, speed: 0.004 },
      { start: 4, end: 5, progress: 0, speed: 0.002 },
      { start: 5, end: 0, progress: 0, speed: 0.0035 },
    ]

    const draw = () => {
      animRef.current = requestAnimationFrame(draw)
      if (!visible) return

      // Determine theme colors dynamically
      const isDark = document.documentElement.classList.contains('dark')
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.012)' : 'rgba(0, 0, 0, 0.012)'
      const subGridColor = isDark ? 'rgba(255, 255, 255, 0.006)' : 'rgba(0, 0, 0, 0.006)'
      const accentColor = 'oklch(0.78 0.13 184)' // Teal accent
      const nodeColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      const textColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'

      ctx.clearRect(0, 0, width, height)

      // Move grid slowly for dynamic parallax feel
      gridOffset = (gridOffset + 0.15) % 80
      const gridSize = 80
      const subGridSize = 20

      // 1. Draw Blueprint Legal Grid
      ctx.lineWidth = 0.5
      
      // Draw subgrid (very thin lines)
      ctx.strokeStyle = subGridColor
      for (let x = gridOffset % subGridSize; x < width; x += subGridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = gridOffset % subGridSize; y < height; y += subGridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw primary grid lines
      ctx.strokeStyle = gridColor
      for (let x = gridOffset; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw subtle intersection markers
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
      for (let x = gridOffset; x < width; x += gridSize) {
        for (let y = gridOffset; y < height; y += gridSize) {
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }

      // 2. Compute Node Positions relative to canvas size and grid
      const nodePositions = INTEL_NODES.map((node) => {
        // Distribute coordinates uniformly using grid positions
        const x = (width / 10) * node.gridX + (gridOffset * 0.2)
        const y = (height / 6) * node.gridY
        return { x, y, label: node.label }
      })

      // 3. Draw Connecting Intelligence Lines
      ctx.beginPath()
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(0, 0, 0, 0.025)'
      ctx.lineWidth = 0.7
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          // Only connect nearby nodes to avoid clutter
          const dx = nodePositions[i].x - nodePositions[j].x
          const dy = nodePositions[i].y - nodePositions[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 400) {
            ctx.moveTo(nodePositions[i].x, nodePositions[i].y)
            ctx.lineTo(nodePositions[j].x, nodePositions[j].y)
          }
        }
      }
      ctx.stroke()

      // 4. Draw Traveling Data Packets along connections
      packets.forEach((packet) => {
        packet.progress += packet.speed
        if (packet.progress > 1) {
          packet.progress = 0
        }

        const pStart = nodePositions[packet.start]
        const pEnd = nodePositions[packet.end]
        if (pStart && pEnd) {
          const x = pStart.x + (pEnd.x - pStart.x) * packet.progress
          const y = pStart.y + (pEnd.y - pStart.y) * packet.progress
          
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = accentColor
          ctx.shadowColor = accentColor
          ctx.shadowBlur = 4
          ctx.fill()
          ctx.shadowBlur = 0 // Reset
        }
      })

      // 5. Draw Pulse Rings and Node Coordinates
      nodePositions.forEach((node, idx) => {
        // Increment node pulse
        INTEL_NODES[idx].pulse += 0.005
        if (INTEL_NODES[idx].pulse > 1) {
          INTEL_NODES[idx].pulse = 0
        }

        const pulse = INTEL_NODES[idx].pulse
        const r = 24 * pulse
        const opacity = (1 - pulse) * 0.15

        // Drawing outer pulsing ring
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(100, 220, 200, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Drawing core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
        ctx.fill()

        // Typographic Label
        ctx.fillStyle = textColor
        ctx.font = '8px monospace'
        ctx.fillText(node.label, node.x + 8, node.y + 3)
      })

      // 6. Interactive Spotlight effect (Mouse attraction)
      if (mouseRef.current.active) {
        const { x: mx, y: my } = mouseRef.current
        const grad = ctx.createRadialGradient(mx, my, 10, mx, my, 220)
        
        // Spotlight highlights the grid subtly
        grad.addColorStop(0, isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)')
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mx, my, 220, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
