import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { NAV_LINKS, CONTACT } from '@/lib/site'
import { SERVICES } from '@/lib/content'

const PRACTICE_AREAS = SERVICES.slice(0, 6).map((s) => ({ label: s.title, href: `/expertise#${s.slug}` }))

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-foreground/8 bg-background">
      {/* Main grid */}
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 text-foreground transition-opacity hover:opacity-70">
            <div className="relative h-8 w-8 overflow-hidden rounded-md border border-foreground/5 shadow-sm">
              <Image
                src="/logo.png"
                alt="Lawgical Group logo"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">Lawgical Group</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/50">
            A premier law firm headquartered in Dubai, delivering strategic legal counsel across the GCC and beyond.
          </p>

          {/* Social / accreditation placeholder */}
          <div className="mt-8 flex items-center gap-1">
            <span className="inline-block h-px flex-1 bg-foreground/10" />
            <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
              Dubai · UAE
            </span>
            <span className="inline-block h-px flex-1 bg-foreground/10" />
          </div>
        </div>

        {/* Navigate column */}
        <div>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-foreground/40">Navigate</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-1 text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="group flex items-center gap-1 text-sm text-foreground/60 transition-colors hover:text-foreground"
              >
                Contact
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Practice areas column */}
        <div>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-foreground/40">Practice Areas</p>
          <ul className="space-y-3">
            {PRACTICE_AREAS.map((area) => (
              <li key={area.href}>
                <Link
                  href={area.href}
                  className="group flex items-center gap-1 text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  {area.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-foreground/40">Contact</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-foreground/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="leading-relaxed">{CONTACT.address}</span>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm text-foreground/60 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-sm text-foreground/60 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-foreground/60">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 border-t border-foreground/8 px-6 py-6 text-xs text-foreground/30 sm:flex-row md:px-10">
        <span>© {year} Lawgical Group. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="transition-colors hover:text-foreground/60">Privacy Policy</Link>
          <Link href="/terms" className="transition-colors hover:text-foreground/60">Terms of Use</Link>
          <Link href="/sitemap" className="transition-colors hover:text-foreground/60">Sitemap</Link>
        </div>
      </div>
    </footer>
  )
}
