'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'
import { cn } from '@/lib/utils'

const LOGO_CLUSTERS = [
  {
    name: 'Real Estate & Development',
    logos: [
      { name: 'Danube', src: '/all_25_client_logos/danube.png' },
      { name: 'Chestertons', src: '/all_25_client_logos/chestertons.png' },
      { name: 'Christies', src: '/all_25_client_logos/christies.png' },
      { name: 'Al Seeb', src: '/all_25_client_logos/al-seeb.png' },
      { name: 'Johnson Arabia', src: '/all_25_client_logos/johnson-arabia.png' },
    ],
  },
  {
    name: 'Industrials & Engineering',
    logos: [
      { name: 'Konecranes', src: '/all_25_client_logos/konecranes.png' },
      { name: 'Link Middle East', src: '/all_25_client_logos/link-middle-east.png' },
      { name: 'Saveto', src: '/all_25_client_logos/saveto.png' },
      { name: 'SEG', src: '/all_25_client_logos/seg.png' },
      { name: 'Sibca', src: '/all_25_client_logos/sibca.png' },
      { name: 'Sika', src: '/all_25_client_logos/sika.png' },
      { name: 'Transwill', src: '/all_25_client_logos/transwill.png' },
    ],
  },
  {
    name: 'Retail & Consumer Goods',
    logos: [
      { name: 'Britannia', src: '/all_25_client_logos/britannia.png' },
      { name: 'Fleurs', src: '/all_25_client_logos/fleurs.png' },
      { name: 'Union Coop', src: '/all_25_client_logos/union-coop.png' },
      { name: 'Pidilite', src: '/all_25_client_logos/pidilite.png' },
      { name: 'Culligan', src: '/all_25_client_logos/culligan.png' },
    ],
  },
  {
    name: 'Logistics, Fintech & Services',
    logos: [
      { name: 'First Flight', src: '/all_25_client_logos/first-flight.png' },
      { name: 'Aims', src: '/all_25_client_logos/aims.png' },
      { name: 'Aipl', src: '/all_25_client_logos/aipl.png' },
      { name: 'Beehive', src: '/all_25_client_logos/beehive.png' },
      { name: 'C1 Water', src: '/all_25_client_logos/c1-water.png' },
      { name: 'ECS', src: '/all_25_client_logos/ecs.png' },
      { name: 'Falcon Group', src: '/all_25_client_logos/falcon-group.png' },
      { name: 'Nova', src: '/all_25_client_logos/nova.png' },
    ],
  },
]

export function TrustConstellation() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-foreground/5 relative overflow-hidden" id="logos">
      {/* Subtle background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-accent/3 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <SectionLabel>Client Network</SectionLabel>
          <Reveal variant="fromLeft" className="mt-4">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Partnering With Regional Leaders
            </h2>
          </Reveal>
          <Reveal className="mt-5">
            <p className="text-base leading-relaxed text-foreground/55">
              We represent a diverse trust network of multinational corporations, real estate groups, and fast-growth platforms driving growth across the GCC.
            </p>
          </Reveal>
        </div>

        {/* Constellation Clusters (Trust Network) */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {LOGO_CLUSTERS.map((cluster, cIdx) => (
            <Reveal key={cluster.name} variant="scale" delay={cIdx * 0.1}>
              <ClusterNetwork cluster={cluster} cIdx={cIdx} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}

function ClusterNetwork({ cluster, cIdx }: { cluster: typeof LOGO_CLUSTERS[0]; cIdx: number }) {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)

  return (
    <motion.div
      animate={hoveredLogo ? { 
        borderColor: 'rgba(oklch(0.78 0.13 184) / 0.35)', 
        backgroundColor: 'rgba(oklch(0.78 0.13 184) / 0.008)',
        boxShadow: '0 0 30px rgba(oklch(0.78 0.13 184) / 0.025)'
      } : {}}
      className={cn(
        "rounded-3xl border border-foreground/8 bg-foreground/[0.005] p-8 md:p-10 space-y-8 flex flex-col justify-between h-full hover:border-foreground/15 transition-all duration-300 relative overflow-visible"
      )}
    >
      {/* Cluster Metadata */}
      <div className="flex items-center justify-between border-b border-foreground/8 pb-4">
        <h3 className="font-heading text-sm font-bold text-foreground">
          {cluster.name}
        </h3>
        <span className={cn(
          "font-mono text-[10px] border rounded px-2.5 py-0.5 transition-all duration-300",
          hoveredLogo
            ? "text-accent border-accent/40 bg-accent/5 shadow-sm shadow-accent/5"
            : "text-foreground/60 border-foreground/15 bg-foreground/5"
        )}>
          {cluster.logos.length} partners
        </span>
      </div>

      {/* Network Mosaic Grid */}
      <div className="flex flex-wrap gap-5 items-center justify-center py-6 min-h-[160px]">
        {cluster.logos.map((logo, lIdx) => {
          const isHovered = hoveredLogo === logo.name
          const isAnyHovered = hoveredLogo !== null
          const isOtherHovered = isAnyHovered && !isHovered

          // Floating animation variables to make them float organically when not hovered
          const floatDelay = (cIdx * 3 + lIdx) * 0.15
          const floatDuration = 4 + (lIdx % 3) * 1.2

          return (
            <div key={logo.name} className="relative overflow-visible">
              <motion.div
                animate={
                  isHovered 
                    ? { y: -3, scale: 1.08 } 
                    : isOtherHovered 
                    ? { y: 2, scale: 0.94 } 
                    : { y: [0, -4, 0] }
                }
                transition={
                  isAnyHovered 
                    ? { type: 'spring', stiffness: 350, damping: 22 }
                    : {
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: floatDelay,
                      }
                }
                onMouseEnter={() => setHoveredLogo(logo.name)}
                onMouseLeave={() => setHoveredLogo(null)}
                data-cursor="logo"
                className={cn(
                  "relative cursor-pointer select-none rounded-2xl border bg-card p-4 flex flex-col items-center justify-center h-20 w-36 shadow-sm transition-all duration-300 cursor-none",
                  isHovered 
                    ? "border-accent shadow-md shadow-accent/5 ring-1 ring-accent" 
                    : isOtherHovered 
                    ? "border-foreground/5 opacity-55 scale-95" 
                    : "border-foreground/10 opacity-100"
                )}
              >
                {/* Client Logo Image (Highly visible default: 100% opacity, no heavy grayscale) */}
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    fill
                    className="object-contain p-2 grayscale-0 opacity-100"
                    sizes="120px"
                    priority
                  />
                </div>
              </motion.div>

              {/* Company name reveal tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 8, x: '-50%' }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-1/2 -bottom-7 z-30 pointer-events-none whitespace-nowrap bg-background border border-accent/40 rounded px-2.5 py-1 shadow-lg shadow-accent/5"
                  >
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-accent leading-none block">
                      {logo.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Connection info */}
      <div className="flex justify-between items-center text-[10px] text-foreground/30 font-mono pt-4 border-t border-foreground/8">
        <span>NETWORK_DESK // 0{cIdx + 1}</span>
        <span className={cn(
          "h-1.5 w-1.5 rounded-full transition-all duration-300",
          hoveredLogo ? "bg-accent animate-ping" : "bg-foreground/25"
        )} />
        <span>JURIS // GCC_NET</span>
      </div>
    </motion.div>
  )
}
