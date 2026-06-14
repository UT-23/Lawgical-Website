'use client'
import { TEAM } from '@/lib/content'
import { PortraitCard } from '@/components/portrait/portrait-card'
import { Reveal } from '@/components/ui/reveal'
import { SectionLabel } from '@/components/ui/section-label'

export function LeadershipGallery() {
  const leaderKishore = TEAM[0]
  const leaderEssa = TEAM[1]
  const otherPartners = TEAM.slice(2, 5) // Fathima Salam, Asaf Rizvi, Sara Essam
  const associates = TEAM.slice(5) // Amira, AbdelRehman, Muskan, Dosa, Malak, Meera

  return (
    <section className="bg-background py-16 md:py-24 border-b border-foreground/5">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10">
        
        {/* Dual Leadership Featured Section */}
        <div className="mb-24 space-y-24">
          <SectionLabel className="mb-8 block">Leadership Spotlight</SectionLabel>
          
          {/* Leader A: Kishore Mulani (Text Left, Image Right) */}
          <div className="grid gap-8 lg:grid-cols-[1fr_450px] lg:items-center">
            <Reveal variant="fromLeft">
              <div className="max-w-2xl">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Managing Partner</p>
                <h3 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  {leaderKishore.name}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-foreground/60">
                  {leaderKishore.bio}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                  Kishore leads the firm’s strategic advisory practice, aligning legal frameworks with high-value commercial initiatives across the GCC. He regularly counsels multinational boards, foreign trade commissions, and sovereign desks on regulatory structuring and investment setups.
                </p>
              </div>
            </Reveal>
            <Reveal variant="scale" className="w-full">
              <PortraitCard
                src={leaderKishore.image}
                name={leaderKishore.name}
                role={leaderKishore.role}
                objectPosition={leaderKishore.objectPosition}
                size="lg"
                priority
                className="w-full shadow-2xl"
              />
            </Reveal>
          </div>

          {/* Leader B: Dr. Essa Al Nuaimi (Image Left, Text Right) */}
          <div className="grid gap-8 lg:grid-cols-[450px_1fr] lg:items-center">
            {/* Image on left for desktop */}
            <div className="order-2 lg:order-1">
              <Reveal variant="scale" className="w-full">
                <PortraitCard
                  src={leaderEssa.image}
                  name={leaderEssa.name}
                  role={leaderEssa.role}
                  objectPosition={leaderEssa.objectPosition}
                  size="lg"
                  className="w-full shadow-2xl"
                />
              </Reveal>
            </div>
            
            {/* Text on right for desktop */}
            <div className="order-1 lg:order-2">
              <Reveal variant="fromRight">
                <div className="max-w-2xl lg:pl-10">
                  <p className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Partner · UAE Advocate</p>
                  <h3 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                    {leaderEssa.name}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-foreground/60">
                    {leaderEssa.bio}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/50">
                    Dr. Essa is a registered advocate with right of audience before local UAE courts, federal appellate courts, and DIFC courts. He leads the disputes practice, specialising in high-value commercial litigation, regulatory compliance checks, and domestic arbitration enforcement.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Partners Grid (Fathima, Asaf, Sara) */}
        <div className="mb-24">
          <SectionLabel className="mb-8 block">Partners & Operations</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherPartners.map((member, i) => (
              <Reveal key={member.name} variant="scale" delay={i * 0.08}>
                <PortraitCard
                  src={member.image}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  objectPosition={member.objectPosition}
                  size="md"
                  className="shadow-lg"
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Associates & Counsel Grid */}
        <div>
          <SectionLabel className="mb-8 block">Associates & Counsel</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {associates.map((member, i) => (
              <Reveal key={member.name} variant="scale" delay={i * 0.05} className="xl:col-span-2">
                <PortraitCard
                  src={member.image}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  objectPosition={member.objectPosition}
                  size="sm"
                  className="shadow-md"
                />
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
