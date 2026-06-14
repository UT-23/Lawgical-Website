'use client'
import { SectionLabel } from '@/components/ui/section-label'
import { Reveal } from '@/components/ui/reveal'

const JURISDICTIONS = [
  { name: 'United Arab Emirates (UAE)', details: 'DIFC Courts, ADGM Courts, DIAC, local Emirate Courts (Dubai, Abu Dhabi).' },
  { name: 'Kingdom of Saudi Arabia (KSA)', details: 'Ministry of Investment (MISA), Board of Grievances, Riyadh commercial courts.' },
  { name: 'State of Qatar', details: 'Qatar Financial Centre (QFC), Doha commercial arbitration hubs.' },
  { name: 'State of Kuwait', details: 'Kuwait chamber of commerce, local commercial courts.' },
  { name: 'Kingdom of Bahrain', details: 'Central Bank of Bahrain compliance regulations, Manama civil courts.' },
  { name: 'Sultanate of Oman', details: 'Sohar Port authority legal guidelines, Muscat civil & arbitral tribunals.' },
  { name: 'Arab Republic of Egypt', details: 'Cairo regional M&A consulting, Suez Canal Free Zone commercial advisory.' },
]

export function JurisdictionsList() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        <SectionLabel className="mb-12 block font-mono">Jurisdictions Index</SectionLabel>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {JURISDICTIONS.map((j, idx) => (
            <Reveal key={j.name} variant="scale" delay={idx * 0.05}>
              <div className="h-full rounded-2xl border border-foreground/5 bg-foreground/[0.01] p-6 hover:border-foreground/10 transition-colors">
                <span className="font-mono text-xs text-accent">0{idx + 1}</span>
                <h4 className="font-heading text-lg font-bold text-foreground mt-3">{j.name}</h4>
                <p className="mt-2 text-xs leading-relaxed text-foreground/50">{j.details}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
