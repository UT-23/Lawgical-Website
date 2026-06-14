'use client'
import { useState } from 'react'
import { ArrivalSequence } from '@/components/sections/home/arrival-sequence'
import { Hero } from '@/components/sections/home/hero'
import { FirmPositioning } from '@/components/sections/home/firm-positioning'
import { ExpertiseEcosystem } from '@/components/sections/home/expertise-ecosystem'
import { IndustryIntelligence } from '@/components/sections/home/industry-intelligence'
import { LeadershipNetwork } from '@/components/sections/home/leadership-network'
import { ClientImpactStories } from '@/components/sections/home/client-impact-stories'
import { TrustConstellation } from '@/components/sections/home/trust-constellation'
import { CsrImpactEngine } from '@/components/sections/home/csr-impact-engine'
import { RegionalPresence } from '@/components/sections/home/regional-presence'
import { InsightsHub } from '@/components/sections/home/insights-hub'
import { ContactExperience } from '@/components/sections/home/contact-experience'

export default function HomePage() {
  const [arrived, setArrived] = useState(false)

  return (
    <main>
      <ArrivalSequence onComplete={() => setArrived(true)} />
      <Hero />
      <FirmPositioning />
      <ExpertiseEcosystem />
      <IndustryIntelligence />
      <LeadershipNetwork />
      <ClientImpactStories />
      <TrustConstellation />
      <CsrImpactEngine />
      <RegionalPresence />
      <InsightsHub />
      <ContactExperience />
    </main>
  )
}

