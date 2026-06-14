'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/site'
import { EASING, DURATION, STAGGER } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 48)
  })

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[900] transition-colors duration-300',
          scrolled
            ? 'border-b border-foreground/8 bg-background/80 backdrop-blur-xl'
            : 'bg-transparent'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION.enter, ease: EASING.enter, delay: 0.1 }}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-foreground transition-opacity hover:opacity-70"
            aria-label="Lawgical Group home"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-md border border-foreground/5 shadow-sm">
              <Image
                src="/logo.png"
                alt="Lawgical Group logo"
                fill
                className="object-contain"
                sizes="28px"
                priority
              />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">Lawgical Group</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-foreground'
                    : 'text-foreground/60 hover:text-foreground'
                )}
              >
                {link.label}
                {(pathname === link.href || pathname.startsWith(link.href + '/')) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ duration: DURATION.normal, ease: EASING.smooth }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="group flex items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent hover:text-accent"
            >
              Get in Touch
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: DURATION.fast }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: DURATION.fast }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.normal }}
            className="fixed inset-0 z-[800] bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-12">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: DURATION.enter,
                      ease: EASING.enter,
                      delay: i * STAGGER.listItems,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block border-b border-foreground/8 py-5 font-heading text-2xl font-medium tracking-tight transition-colors',
                        pathname === link.href ? 'text-accent' : 'text-foreground hover:text-accent'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: DURATION.enter, ease: EASING.enter, delay: NAV_LINKS.length * STAGGER.listItems + 0.1 }}
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground"
                >
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
