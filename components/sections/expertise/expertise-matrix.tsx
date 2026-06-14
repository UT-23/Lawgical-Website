'use client'
import { useState } from 'react'
import { SERVICES, INDUSTRIES } from '@/lib/content'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

// Detailed mapping of practice areas and industries. 
// Standard full-service firms intersect across all, but we highlight typical key advisory scenarios.
const MATTERS: Record<string, string> = {
  'corporate-law-Financial Services': 'Fintech setup, fund structuring & M&A',
  'corporate-law-Real Estate': 'Joint venture vehicles & property fund structures',
  'corporate-law-Construction': 'Consortium agreements & EPC structuring',
  'corporate-law-Technology': 'Founder agreements, funding rounds & licensing',
  'corporate-law-Family Offices': 'Succession setups, trust formation & holding vehicles',
  'arbitration-Real Estate': 'Property acquisition & development disputes',
  'arbitration-Construction': 'EPC delay claims & FIDIC contract arbitration',
  'arbitration-Energy': 'Oil concessions, infrastructure & power plant arbitration',
  'litigation-Real Estate': 'Land ownership trials, tenancy disputes & enforcement',
  'litigation-Construction': 'Contractor claims & payment enforcement trials',
  'litigation-Logistics': 'Trade disputes, customs claims & maritime litigation',
  'debt-collection-Financial Services': 'Credit recovery & delinquent portfolio collection',
  'debt-collection-Real Estate': 'Outstanding escrow & commercial rent recovery',
  'debt-collection-Retail & FMCG': 'Distributor invoices & trade receivables collection',
  'debt-collection-Logistics': 'Freight charges & supplier invoice recovery',
  'regulatory-compliance-Financial Services': 'AML/KYC audits & Central Bank compliance advisory',
  'regulatory-compliance-Technology': 'Data protection (DIFC/ADGM) & platform governance',
  'regulatory-compliance-Healthcare': 'MOHAP licensing audits & patient data compliance',
  'advisory-Financial Services': 'Board advisory on strategic risk & regulatory change',
  'advisory-Energy': 'Project finance risk structuring & JV advisory',
  'advisory-Family Offices': 'Governance charters & cross-border estate protection',
}

export function ExpertiseMatrix() {
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string } | null>(null)

  return (
    <section className="bg-background py-20 md:py-28 border-b border-foreground/5 overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <SectionLabel>Cross-Sector Integration</SectionLabel>
          <Reveal variant="fromLeft" className="mt-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Where Practice Meets Sector
            </h2>
          </Reveal>
          <Reveal className="mt-4">
            <p className="text-sm leading-relaxed text-foreground/50">
              Our capabilities are not siloed. Hover over the intersections to see how our practice areas address specific challenges within key industries.
            </p>
          </Reveal>
        </div>

        {/* Matrix Grid Container */}
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
          <div className="min-w-[900px] border border-foreground/5 rounded-2xl bg-foreground/[0.01]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-foreground/5">
                  {/* Empty top-left header */}
                  <th className="p-6 font-heading text-xs font-semibold uppercase tracking-wider text-foreground/45 bg-foreground/[0.02] w-[240px]">
                    Practice Area
                  </th>
                  {INDUSTRIES.map((ind) => (
                    <th
                      key={ind.name}
                      className={`p-4 font-heading text-xs font-semibold text-center uppercase tracking-wider transition-colors duration-150 min-w-[100px] ${
                        hoveredCell?.col === ind.name ? 'text-accent bg-accent/5' : 'text-foreground/35'
                      }`}
                    >
                      {ind.name.split(' & ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((serv) => (
                  <tr key={serv.slug} className="border-b border-foreground/5 hover:bg-foreground/[0.005] last:border-0">
                    {/* Row Header */}
                    <td
                      className={`p-6 font-heading text-sm font-bold transition-colors duration-150 bg-foreground/[0.02] ${
                        hoveredCell?.row === serv.slug ? 'text-accent bg-accent/5' : 'text-foreground'
                      }`}
                    >
                      {serv.title}
                    </td>
                    
                    {INDUSTRIES.map((ind) => {
                      const key = `${serv.slug}-${ind.name}`
                      const activeMatter = MATTERS[key]
                      const isHovered = hoveredCell?.row === serv.slug && hoveredCell?.col === ind.name

                      return (
                        <td
                          key={ind.name}
                          onMouseEnter={() => setHoveredCell({ row: serv.slug, col: ind.name })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`p-4 text-center cursor-pointer transition-all duration-150 ${
                            isHovered
                              ? 'bg-accent/10'
                              : hoveredCell?.row === serv.slug || hoveredCell?.col === ind.name
                              ? 'bg-foreground/[0.015]'
                              : ''
                          }`}
                        >
                          <div className="relative flex items-center justify-center h-8">
                            <span
                              className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                                activeMatter
                                  ? isHovered
                                    ? 'bg-accent scale-150 shadow-[0_0_8px_rgba(100,220,200,0.8)]'
                                    : 'bg-accent/40'
                                  : isHovered
                                  ? 'bg-foreground/50 scale-125'
                                  : 'bg-foreground/5'
                              }`}
                            />
                            
                            {/* Hover tooltip for active matters */}
                            {isHovered && activeMatter && (
                              <div className="absolute z-10 bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 rounded-xl border border-foreground/10 bg-background p-3 text-left shadow-xl animate-fade-in pointer-events-none">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Key Work Area</p>
                                <p className="mt-1 text-xs text-foreground/80 leading-normal font-medium">{activeMatter}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
