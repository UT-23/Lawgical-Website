# Build Architecture — Lawgical Group
**Sources:** Repository-Audit.md · 01-Site-Architecture-V2.md · 02-Homepage-Blueprint-V2.md · 03-Motion-System-V2.md  
**Principle:** Every file has one job. Every component is the smallest thing that can do its job. No file does two jobs.  
**Date:** 2026-06-10

---

## 1. Final Folder Structure

```
lawgical-group-website (1)/
│
├── app/                                    # Next.js App Router — pages only
│   ├── (pages)/                            # Route group — shares layout
│   │   ├── expertise/
│   │   │   └── page.tsx
│   │   ├── industries/
│   │   │   └── page.tsx
│   │   ├── people/
│   │   │   └── page.tsx
│   │   ├── clients/
│   │   │   └── page.tsx
│   │   ├── csr/
│   │   │   └── page.tsx
│   │   ├── lla/
│   │   │   └── page.tsx
│   │   ├── insights/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx                          # Root layout — Navbar + Footer + cursor + analytics
│   └── page.tsx                            # Homepage
│
├── components/
│   │
│   ├── global/                             # Rendered once, live in root layout
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── cursor.tsx                      # Custom cursor — desktop only
│   │
│   ├── sections/                           # Full-width homepage/page sections
│   │   ├── home/
│   │   │   ├── arrival-sequence.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── expertise-ecosystem.tsx
│   │   │   ├── industry-intelligence.tsx
│   │   │   ├── leadership-network.tsx
│   │   │   ├── client-impact-stories.tsx
│   │   │   ├── csr-impact-engine.tsx
│   │   │   ├── regional-presence.tsx
│   │   │   ├── insights-hub.tsx
│   │   │   ├── contact-experience.tsx
│   │   │   └── footer-experience.tsx
│   │   ├── expertise/
│   │   │   ├── service-navigator.tsx
│   │   │   └── expertise-matrix.tsx
│   │   ├── industries/
│   │   │   └── industries-grid.tsx
│   │   ├── people/
│   │   │   └── leadership-gallery.tsx
│   │   ├── clients/
│   │   │   ├── featured-reel.tsx
│   │   │   └── testimonials-grid.tsx
│   │   ├── csr/
│   │   │   └── csr-video-hub.tsx
│   │   ├── lla/
│   │   │   ├── regional-map.tsx
│   │   │   └── jurisdictions-list.tsx
│   │   └── insights/
│   │       ├── featured-article.tsx
│   │       └── article-grid.tsx
│   │
│   ├── ui/                                 # Atomic, reusable across all pages
│   │   ├── button.tsx                      # Primary / secondary / ghost variants
│   │   ├── page-header.tsx                 # Eyebrow + headline + description
│   │   ├── reveal.tsx                      # Scroll-triggered wrapper
│   │   ├── stat-counter.tsx                # Animated number count-up
│   │   ├── tag.tsx                         # Category badge / label chip
│   │   ├── section-label.tsx               # Eyebrow / overline text
│   │   └── divider.tsx                     # Section separator line
│   │
│   ├── motion/                             # Pure animation primitives — no content
│   │   ├── magnetic.tsx                    # Magnetic wrapper for any child
│   │   ├── parallax.tsx                    # Scroll-driven y-transform wrapper
│   │   ├── pin.tsx                         # Scroll-pinned section wrapper
│   │   ├── text-reveal.tsx                 # Character / word / line stagger
│   │   ├── stagger-children.tsx            # Wraps children, staggers their reveal
│   │   └── presence.tsx                    # AnimatePresence wrapper with defaults
│   │
│   ├── canvas/                             # All canvas / WebGL rendering
│   │   ├── particle-field.tsx              # Hero particle canvas
│   │   └── map-canvas.tsx                  # Regional map SVG/canvas
│   │
│   ├── video/                              # All video rendering
│   │   ├── video-card.tsx                  # Poster + hover preview + click-to-modal
│   │   ├── video-modal.tsx                 # Full-screen overlay player
│   │   ├── video-reel.tsx                  # Autoplay muted reel (collection video)
│   │   └── video-poster.tsx                # Static poster with play button
│   │
│   └── portrait/                           # All portrait image rendering
│       ├── portrait-card.tsx               # Tilt + bio reveal + name overlay
│       └── portrait-gallery.tsx            # Row/grid of portrait-cards
│
├── lib/
│   ├── content.ts                          # SERVICES, INDUSTRIES, TEAM, ARTICLES
│   ├── site.ts                             # NAV_LINKS, CONTACT_DETAILS
│   ├── utils.ts                            # cn() and general utilities
│   ├── motion.ts                           # Motion token constants (easing, duration)
│   └── hooks/
│       ├── use-magnetic.ts                 # Magnetic displacement logic
│       ├── use-cursor.ts                   # Global cursor state
│       ├── use-scroll-progress.ts          # Scroll progress within a container
│       ├── use-reduced-motion.ts           # prefers-reduced-motion detection
│       ├── use-in-view.ts                  # IntersectionObserver wrapper
│       └── use-video-autoplay.ts           # Autoplay gating logic
│
├── public/
│   ├── news/
│   │   ├── article-1.png
│   │   ├── article-2.png
│   │   ├── article-3.png
│   │   ├── article-4.png
│   │   └── article-featured.png
│   ├── team/
│   │   ├── partner-1.png … partner-6.png   # Temporary placeholders
│   ├── about-office.png
│   ├── apple-icon.png
│   ├── dubai-skyline.png
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   ├── icon.svg
│   ├── logo.png
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
│
├── Potraits/                               # Real team portraits — not yet in public/
│   ├── AbdelRehman Atef Barakat.png
│   ├── Amira Siddiqui.png
│   ├── Asaf Rizvi.png
│   ├── Dosa Mohamed.png
│   ├── Dr. Essa Al Nuaimi UAE Advocate.png
│   ├── Fathima Salam.png
│   ├── Kishore Mulani MD.png
│   ├── Malak Al Dairi.png
│   ├── Meera Mohan.png
│   ├── Muskan Bangani.png
│   └── Sara Essam.png
│
├── videos/
│   ├── Clients/
│   │   ├── Collection_Video-1.mp4
│   │   ├── Jalpa_Testimonial.mp4
│   │   ├── Mostafa_Testimonial.mp4
│   │   ├── Shadhad_testimonial.mp4
│   │   └── Srinivas_Singh.mp4
│   └── CSR/
│       ├── Breast-Cancer-Awareness.mov
│       ├── International Stress Awareness Day-UK-Horizontal.mp4
│       ├── UN-Post-1.mov
│       ├── Website-International-Day-of-Education.mp4
│       └── World Gratitude Day.mov
│
├── components.json
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── tsconfig.json
```

---

## 2. Route Structure

### Route Table

| URL | File | Type | Notes |
|-----|------|------|-------|
| `/` | `app/page.tsx` | Static | Homepage — 11 sections |
| `/expertise` | `app/(pages)/expertise/page.tsx` | Static | Replaces `/services` |
| `/industries` | `app/(pages)/industries/page.tsx` | Static | Elevated from existing |
| `/people` | `app/(pages)/people/page.tsx` | Static | Replaces `/team` |
| `/clients` | `app/(pages)/clients/page.tsx` | Static | New |
| `/csr` | `app/(pages)/csr/page.tsx` | Static | New |
| `/lla` | `app/(pages)/lla/page.tsx` | Static | New |
| `/insights` | `app/(pages)/insights/page.tsx` | Static | Replaces `/news` |
| `/contact` | `app/(pages)/contact/page.tsx` | Static | Existing, elevated |

### Routes Retired (Redirects Needed)

| Old Route | New Route | Method |
|-----------|-----------|--------|
| `/services` | `/expertise` | `next.config.mjs` permanent redirect |
| `/team` | `/people` | `next.config.mjs` permanent redirect |
| `/news` | `/insights` | `next.config.mjs` permanent redirect |
| `/about` | `/` | `next.config.mjs` permanent redirect (about content now lives on homepage) |

### No Dynamic Routes in V1

Individual service detail pages (`/expertise/[slug]`), article pages (`/insights/[slug]`), and people profile pages (`/people/[slug]`) are not built in V1. All content is surfaced on the listing pages. This avoids the need for full article body content and individual bios that do not yet exist.

---

## 3. Component Hierarchy

### Root Layout (`app/layout.tsx`)

```
RootLayout
  ├── CursorProvider          # Provides cursor state context (cursor.tsx)
  ├── Navbar                  # Fixed header
  ├── <main id="main-content">
  │   └── {children}          # Page content
  └── Footer
```

**Note:** The Navbar, Footer, and Cursor are rendered once at the root layout level. They are never re-instantiated on page navigation.

---

### Homepage (`app/page.tsx`)

```
HomePage
  ├── ArrivalSequence                     # Temporal overlay — renders once on mount
  ├── HeroSection
  │   ├── ParticleField                   # canvas/particle-field.tsx
  │   ├── TextReveal                      # motion/text-reveal.tsx (word-by-word)
  │   ├── StaggerChildren                 # motion/stagger-children.tsx (CTAs + stats)
  │   ├── MagneticWrapper × 2             # motion/magnetic.tsx (both CTAs)
  │   └── StatCounter × 4                # ui/stat-counter.tsx
  │
  ├── ExpertiseEcosystem
  │   ├── Pin                             # motion/pin.tsx — scroll pin controller
  │   ├── ProgressBar                     # Inline — thin vertical fill line
  │   ├── PracticeAreaList                # Left panel — 6 names
  │   └── PracticeAreaDetail              # Right panel — transitions on active change
  │       ├── Reveal                      # motion/reveal.tsx (icon entrance)
  │       └── StaggerChildren             # motion/stagger-children.tsx (key points)
  │
  ├── IndustryIntelligence
  │   ├── Reveal                          # ui/reveal.tsx (headline)
  │   ├── IndustryRibbon                  # Three scrolling rows
  │   │   └── IndustryRibbonRow × 3      # Each row with speed + direction props
  │   └── StatCounter × 3                # ui/stat-counter.tsx
  │
  ├── LeadershipNetwork
  │   ├── Reveal                          # ui/reveal.tsx (headline)
  │   ├── Parallax                        # motion/parallax.tsx (portrait row wrapper)
  │   └── PortraitCard × 3               # portrait/portrait-card.tsx
  │
  ├── ClientImpactStories
  │   ├── Reveal                          # ui/reveal.tsx (headline + stats)
  │   ├── VideoReel                       # video/video-reel.tsx (collection video)
  │   ├── StaggerChildren                 # motion/stagger-children.tsx (4 video cards)
  │   └── VideoCard × 4                  # video/video-card.tsx
  │       └── VideoModal                  # video/video-modal.tsx (portal — renders in body)
  │
  ├── CsrImpactEngine
  │   ├── Pin                             # motion/pin.tsx (left column pinned)
  │   ├── CsrTextColumn                   # Left — eyebrow, headline, body, CTA
  │   └── CsrFilmStrip                    # Right — parallax film strip
  │       └── VideoCard × 4              # video/video-card.tsx
  │
  ├── RegionalPresence
  │   ├── Reveal                          # ui/reveal.tsx (headline)
  │   ├── MapCanvas                       # canvas/map-canvas.tsx
  │   └── OfficeDetail                    # Address + contact info
  │
  ├── InsightsHub
  │   ├── Reveal                          # ui/reveal.tsx (headline)
  │   ├── Parallax                        # motion/parallax.tsx (featured image)
  │   ├── FeaturedArticleBlock            # Large editorial left block
  │   └── ArticleRow × 3                  # Compact right-column rows
  │
  ├── ContactExperience
  │   ├── TextReveal                      # motion/text-reveal.tsx (character-by-character)
  │   ├── MagneticWrapper                 # motion/magnetic.tsx (CTA button)
  │   └── DirectContactLinks              # Email + phone
  │
  └── FooterExperience                    # Same as global Footer but with homepage context
```

---

### Inner Page Structure (Shared Pattern)

Every page below the homepage follows this structure:

```
PageName
  ├── PageHeader                          # ui/page-header.tsx
  └── [Section Components]
      ├── Reveal (on each section entry)
      └── [Content components]
```

---

## 4. Shared Animation System (`lib/motion.ts`)

This file exports all motion tokens as typed constants. No raw numbers appear anywhere in component files — always import from `lib/motion.ts`.

### Exports

```
EASING
  enter     [0.22, 1, 0.36, 1]
  exit      [0.55, 0, 1, 0.45]
  smooth    [0.4, 0, 0.2, 1]
  spring    { type: "spring", stiffness: 280, damping: 28 }
  springLight { type: "spring", stiffness: 180, damping: 24 }
  springFluid { type: "spring", stiffness: 120, damping: 14 }

DURATION (in seconds, for Framer Motion)
  instant   0.1
  fast      0.2
  normal    0.35
  enter     0.5
  slow      0.7
  cinematic 1.2
  epic      1.8

STAGGER
  textLines   0.08
  characters  0.03
  words       0.06
  cards       0.08
  portraits   0.12
  listItems   0.06
  mapNodes    0.06

REVEAL_VARIANTS (Framer Motion variant objects)
  standard  { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
  slow      { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
  fromLeft  { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }
  fromRight { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } }
  scale     { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } }
  instant   { hidden: { opacity: 0 }, visible: { opacity: 1 } }

MAGNETIC
  buttonRadius    80
  buttonMagnitude 8
  portraitRadius  80
  portraitMagnitude 4

PARTICLE
  desktopCount  80
  tabletCount   50
  connectionDist 120
  repulsionRadius 100
```

---

## 5. Shared Section System

### `components/ui/page-header.tsx`

The PageHeader component is used at the top of every inner page.

**Props:**
```
eyebrow: string
headline: string
description?: string
stats?: Array<{ value: string; label: string }>
align?: "left" | "center"          default: "left"
theme?: "light" | "dark"           default: "light"
```

**Data source:** Hardcoded per page (each page defines its own strings)  
**Animation dependencies:** `motion/text-reveal.tsx` (headline), `ui/stat-counter.tsx` (stats if present), `ui/reveal.tsx` (description)

---

### `components/ui/reveal.tsx`

The universal scroll-triggered reveal wrapper. Wraps any child and applies entrance animation when it enters the viewport.

**Props:**
```
variant?: "standard" | "slow" | "fromLeft" | "fromRight" | "scale" | "instant"
  default: "standard"
delay?: number                     default: 0 (seconds)
once?: boolean                     default: true
threshold?: number                 default: 0.2
children: React.ReactNode
```

**Data source:** None — purely structural  
**Animation dependencies:** Framer Motion `motion.div`, `useInView` hook, `lib/motion.ts` REVEAL_VARIANTS and DURATION

---

### `components/motion/stagger-children.tsx`

Wraps multiple children and staggers their individual reveal animations.

**Props:**
```
stagger?: number                   default: STAGGER.cards (0.08s)
variant?: RevealVariant            default: "standard"
delay?: number                     default: 0
threshold?: number                 default: 0.2
children: React.ReactNode
```

**Data source:** None  
**Animation dependencies:** Framer Motion `motion` container with `staggerChildren` variant config, `lib/motion.ts`

---

### `components/motion/pin.tsx`

Scroll-pinning wrapper. Pins the section while an internal scroll progress value advances from 0 to 1 over a configurable scroll distance.

**Props:**
```
steps: number                      # Number of discrete states (e.g., 6 for Expertise)
scrollMultiplier?: number          default: 1.0  # Multiplied by viewport height per step
onStepChange?: (step: number) => void
children: (progress: number, step: number) => React.ReactNode
```

**Data source:** None  
**Animation dependencies:** `lib/hooks/use-scroll-progress.ts`, Framer Motion `useScroll`, `useTransform`

---

### `components/motion/parallax.tsx`

Wraps a child and applies a scroll-driven y-transform.

**Props:**
```
speed?: number                     default: 0.3  # Fraction of scroll speed (0.3 = 30%)
direction?: "up" | "down"          default: "up"
clamp?: boolean                    default: true  # Prevent overflow beyond container
children: React.ReactNode
```

**Data source:** None  
**Animation dependencies:** Framer Motion `useScroll`, `useTransform`, `motion.div`

---

### `components/ui/stat-counter.tsx`

Animated number counter.

**Props:**
```
value: number                      # Target number
suffix?: string                    # e.g., "+" or "%"
label: string                      # e.g., "Years experience"
prefix?: string                    # e.g., "$"
duration?: number                  default: DURATION.cinematic (1.2s)
delay?: number                     default: 0
```

**Data source:** Caller provides values; source data comes from site stats (`lib/site.ts` or hardcoded per section)  
**Animation dependencies:** `lib/hooks/use-in-view.ts` (trigger), `requestAnimationFrame` count-up loop, `lib/hooks/use-reduced-motion.ts` (skip count if reduced)

---

## 6. Shared Typography System

### `components/motion/text-reveal.tsx`

Handles all three text animation modes: character-by-character, word-by-word, and line-by-line.

**Props:**
```
text: string
mode: "characters" | "words" | "lines"
stagger?: number                   default: derived from STAGGER map per mode
delay?: number                     default: 0
duration?: number                  default: DURATION.enter
easing?: EasingToken               default: "enter"
tag?: "h1" | "h2" | "h3" | "p" | "span"   default: "span"
className?: string
```

**Behavior:** Splits `text` into spans at the appropriate granularity. Each span is a `motion.span`. The parent `motion.div` uses Framer Motion's `staggerChildren` variant. The component respects `useReducedMotion` — when reduced motion is active, the entire text appears as a single unit with opacity-only fade.

**Data source:** Text string passed by the calling section  
**Animation dependencies:** Framer Motion `motion`, `lib/motion.ts`, `lib/hooks/use-reduced-motion.ts`

---

### Typography Scales (defined in `globals.css`, not in components)

These are not components — they are CSS custom properties referenced via Tailwind classes.

| Role | Class | Size (desktop) | Weight |
|------|-------|----------------|--------|
| Display | `.text-display` | clamp(3.5rem, 7vw, 7rem) | 700 |
| Headline 1 | `.text-h1` | clamp(2.5rem, 5vw, 5rem) | 700 |
| Headline 2 | `.text-h2` | clamp(2rem, 3.5vw, 3.5rem) | 600 |
| Headline 3 | `.text-h3` | clamp(1.5rem, 2.5vw, 2.5rem) | 600 |
| Body Large | `.text-body-lg` | 1.25rem | 400 |
| Body | `.text-body` | 1rem | 400 |
| Caption | `.text-caption` | 0.875rem | 400 |
| Eyebrow | `.text-eyebrow` | 0.75rem | 600, letter-spacing: 0.12em, uppercase |

**Font families:**
- Headings (display through h3): `Sora` (Google Font, preloaded)
- Body: `Geist` (local, preloaded)
- Mono: `Geist Mono` (local, preloaded)

---

## 7. Shared Button System

### `components/ui/button.tsx`

Single button component with three variants. Built on the existing `@base-ui/react` foundation.

**Props:**
```
variant: "primary" | "secondary" | "ghost"
size?: "sm" | "default" | "lg"              default: "default"
href?: string                               # If provided, renders as <Link>
magnetic?: boolean                          default: true for primary, false for ghost
onClick?: () => void
disabled?: boolean                          default: false
children: React.ReactNode
className?: string
```

**Behavior by variant:**

| Variant | Rest | Hover | Active |
|---------|------|-------|--------|
| primary | Navy bg, white text | Accent bg, magnetic 8px | scale: 0.96 |
| secondary | Transparent, accent border | Accent bg 10%, magnetic 6px | scale: 0.96 |
| ghost | Transparent, accent text | Underline draw, arrow +4px | Arrow +8px |

**When `magnetic: true`:** The button is automatically wrapped in `components/motion/magnetic.tsx` with radius 80px and magnitude 8px for primary, 6px for secondary.

**Data source:** None — content provided via `children`  
**Animation dependencies:** `motion/magnetic.tsx` (when magnetic prop is true), Framer Motion `motion.button`, `lib/motion.ts`

---

## 8. Shared Cursor System

### `components/global/cursor.tsx`

The custom cursor renders a dot and trailing ring that follow the mouse. It is rendered once in the root layout and controlled via context.

**Renders:** Nothing on touch/mobile breakpoints (detected via `window.matchMedia("(pointer: coarse)")`). On mobile, the component returns null and the OS cursor is used.

**Context API (`lib/hooks/use-cursor.ts`):**

```
CursorState:
  mode: "default" | "text" | "button" | "media" | "drag"
  label?: string                   # Used in media mode — "PLAY" or "VIEW"

Methods:
  setCursorMode(mode, label?)
  resetCursorMode()
```

**Any component that needs to change the cursor mode calls `setCursorMode` on hover/enter and `resetCursorMode` on hover/leave.** This keeps cursor logic out of individual components.

**Dot spec:** 8px circle, accent color, `position: fixed`, `pointer-events: none`, `z-index: 9999`  
**Ring spec:** 32px circle, accent color 30% opacity, `position: fixed`, `pointer-events: none`, `z-index: 9999`  
**Ring follow:** Spring physics — stiffness 120, damping 14. Ring position lags 60ms behind the dot.

**State sizes:**

| Mode | Dot | Ring | Ring opacity |
|------|-----|------|-------------|
| default | 8px | 32px | 30% |
| text | 12px | 48px | 60% |
| button | 0px (hidden) | 56px solid | 15% |
| media | 0px (hidden) | 80px with label | 20% |
| drag | 0px (hidden) | double-arrow icon | — |

**Animation dependencies:** Framer Motion `motion.div`, `useSpring`, `useMotionValue`, `lib/motion.ts` EASING.springFluid

---

## 9. Shared Video System

### `components/video/video-card.tsx`

The primary video interaction component. Used for testimonials and CSR campaign tiles.

**Props:**
```
src: string                        # Video file path (videos/Clients/... or videos/CSR/...)
poster?: string                    # First-frame poster image path
title: string                      # Client name or campaign title
description?: string               # Short description (used for CSR tiles)
aspectRatio?: "16/9" | "9/16" | "4/3"    default: "9/16" (portrait for testimonials)
hoverPreview?: boolean             default: true
modalOnClick?: boolean             default: true
className?: string
```

**Behavior:**
1. Renders poster image at rest
2. On hover (desktop): video begins playing muted; poster fades out; cursor mode set to "media" with label "PLAY"
3. On click: if `modalOnClick: true`, dispatches event to open `VideoModal` with this video's `src`
4. On hover exit: video pauses; poster fades back in; cursor mode reset

**Data source:** `src` and `poster` provided by calling section  
**Animation dependencies:** `lib/hooks/use-cursor.ts` (cursor mode), `lib/hooks/use-reduced-motion.ts` (disable hover preview if reduced motion), Framer Motion for fade states

---

### `components/video/video-reel.tsx`

The autoplay muted reel. Used for the collection video on the Clients section preview.

**Props:**
```
src: string
poster?: string
aspectRatio?: "16/9" | "4/3"       default: "16/9"
className?: string
```

**Behavior:**
1. Renders poster at rest
2. On scroll: `use-video-autoplay.ts` hook fires `video.play()` when 50% in viewport (muted)
3. Pauses when less than 10% in viewport
4. Click: unmute toggle (not modal — this is a reel, not a testimonial)
5. Full-screen button in corner: enters browser native fullscreen

**Data source:** `src` provided by caller  
**Animation dependencies:** `lib/hooks/use-video-autoplay.ts`, `lib/hooks/use-in-view.ts`

---

### `components/video/video-modal.tsx`

Global modal — renders into a React Portal at the `<body>` level. Only one instance exists in the component tree (rendered in root layout). Individual video cards dispatch events to it rather than each rendering their own modal.

**Props (as context, not direct props):**
```
VideoModalContext:
  open: boolean
  src: string | null
  title: string | null
  openModal(src, title): void
  closeModal(): void
```

**Behavior:**
- `openModal()`: sets open=true, locks body scroll, plays video
- `closeModal()`: sets open=false, pauses and resets video, restores scroll
- Keyboard: Escape key closes. Tab trap within modal while open.
- Click on backdrop: closes modal

**Animation:**
- Open: backdrop `opacity: 0 → 0.85`, modal `scale: 0.88 → 1, opacity: 0 → 1`, `dur.normal`, `ease.enter`
- Close: `scale: 1 → 0.92, opacity: 1 → 0`, `dur.fast`, `ease.exit`

**Animation dependencies:** Framer Motion `AnimatePresence`, `motion.div`, `lib/motion.ts`

---

### `components/video/video-poster.tsx`

Static poster image with permanent play button. Used on mobile as the fallback for all video elements.

**Props:**
```
src: string                        # Poster image path
title: string
onClick: () => void
aspectRatio?: "16/9" | "9/16"      default: "9/16"
```

**Animation dependencies:** None — static component. Play button is CSS only.

---

### `lib/hooks/use-video-autoplay.ts`

Hook that manages autoplay gating.

**Returns:** `{ ref, isPlaying }` — attach `ref` to the video element

**Logic:**
- Creates two IntersectionObservers on the video element: one with threshold 0.5 (play trigger) and one with threshold 0.1 (pause trigger)
- Respects `prefers-reduced-motion` — no autoplay if reduced motion is active
- On mobile (pointer: coarse): returns `{ ref, isPlaying: false }` immediately — no observers registered

---

## 10. Shared Portrait System

### `components/portrait/portrait-card.tsx`

Individual portrait with tilt, bio reveal, and name overlay.

**Props:**
```
src: string                        # Portrait image path
name: string
role: string
bio?: string                       # Short bio text (1–2 sentences)
specialisations?: string[]         # Tags shown below role
size?: "sm" | "md" | "lg"          default: "md"
priority?: boolean                 default: false  # Next.js Image priority
className?: string
```

**Behavior (desktop):**
- Renders portrait image with name + role overlaid on gradient at bottom
- On hover: 3D tilt (±8deg x/y, mapped from cursor position within element), scale `1 → 1.04`, bio slides up from below
- Cursor mode set to "media" with label "VIEW" on hover enter
- On hover exit: all values spring back to rest

**Behavior (mobile):**
- No tilt, no scale
- Bio always visible below the portrait image (not overlaid)
- Standard touch feedback only

**Data source:** `src`, `name`, `role`, `bio` provided by calling section component  
**Animation dependencies:** Framer Motion `motion.div`, `useMotionValue`, `useSpring`, `useTransform`, `lib/hooks/use-cursor.ts`, `lib/hooks/use-reduced-motion.ts`, `lib/motion.ts`

---

### `components/portrait/portrait-gallery.tsx`

Row or grid of `PortraitCard` components with staggered entrance.

**Props:**
```
people: Array<{
  src: string
  name: string
  role: string
  bio?: string
  specialisations?: string[]
}>
layout?: "row" | "grid"            default: "row"
maxVisible?: number                # Slice the people array (used on homepage — shows 3)
```

**Data source:** Receives pre-sliced array from calling section  
**Animation dependencies:** `motion/stagger-children.tsx`, `lib/motion.ts` STAGGER.portraits

---

## 11. Three.js Boundaries

**Three.js / React Three Fiber is NOT used in V1.**

The motion system spec (`03-Motion-System-V2.md`) calls for a particle field and a regional map. Both are achievable with the Canvas 2D API and SVG respectively, at a fraction of the Three.js bundle cost.

**Rationale:**
- Three.js adds ~600KB+ to the bundle (even with tree-shaking)
- The particle field requires only 2D canvas operations — no depth, no lighting, no 3D geometry
- The regional map is a flat SVG with animated `stroke-dashoffset` — no 3D required
- Next.js App Router with Server Components means adding a heavy client-only library like R3F requires careful boundary placement; the added complexity is not justified by the use case

**If Three.js is introduced in a future version (V2+), it would be scoped to:**
- A 3D expertise node graph (future enhancement, not V1)
- A 3D globe visualization for the LLA page (future enhancement)

**Boundary rule:** No file in the V1 codebase may import from `three`, `@react-three/fiber`, or `@react-three/drei`. If a future feature requires 3D, it must be introduced in a separate PR with explicit performance budgeting.

---

## 12. GSAP Boundaries

**GSAP is NOT used in V1.**

**Rationale:**
- The existing codebase already has Framer Motion v12 installed and used
- Framer Motion handles all animation requirements defined in the motion system:
  - Scroll-driven animations: `useScroll`, `useTransform`
  - Spring physics: Framer Motion spring
  - Stagger: `staggerChildren` variants
  - AnimatePresence: modal open/close
  - `useReducedMotion`: built-in accessibility hook
- GSAP's ScrollTrigger (the main reason to choose GSAP over Framer Motion) is replicated by Framer Motion's `useScroll` for the specific pinned section use case
- Running two animation libraries simultaneously creates coordination complexity and bundle bloat without proportional benefit

**If GSAP is introduced in a future version, it would be scoped to:**
- ScrollTrigger-based horizontal scroll sections if Framer Motion's scroll handling proves insufficient
- Complex SVG morphing animations (logos, icons)
- Timeline-sequenced animations that would be verbose in Framer Motion

**Boundary rule:** No file in the V1 codebase may import from `gsap` or `@gsap/*`. GSAP may be evaluated for V2 after V1 performance profiling is complete.

---

## 13. Framer Motion Boundaries

Framer Motion v12 is the sole animation library. These are the permitted and prohibited usages:

### Permitted

| Usage | Component |
|-------|-----------|
| `motion.div` / `motion.span` / `motion.section` | Anywhere |
| `AnimatePresence` | `presence.tsx`, `video-modal.tsx` |
| `useScroll` + `useTransform` | `parallax.tsx`, `pin.tsx` |
| `useSpring` | `cursor.tsx`, `portrait-card.tsx`, `magnetic.tsx` |
| `useMotionValue` | `cursor.tsx`, `portrait-card.tsx`, `magnetic.tsx` |
| `useInView` | `reveal.tsx`, `stat-counter.tsx` |
| `useReducedMotion` | All animation components — always checked |
| `variants` + `staggerChildren` | `stagger-children.tsx`, `text-reveal.tsx` |
| `LayoutGroup` + `layoutId` | Page transitions (shared element transitions) |

### Prohibited

| Usage | Reason |
|-------|--------|
| `motion()` HOC on third-party components | Creates prop conflicts and type errors; wrap with `motion.div` instead |
| Direct `animate` prop for scroll-driven values | Use `useTransform` instead; direct animate causes React re-renders on every scroll frame |
| `whileHover` on large containers | Causes entire subtree to re-render; use `useMotionValue` + `useSpring` for hover tracking |
| `transition` prop on every element (inline) | All transition configs must come from `lib/motion.ts` tokens |
| `framer-motion/dist/*` direct imports | Use the package root import only |

### Performance Rule for Framer Motion

- `motion.div` components that animate on every scroll frame (`useTransform` outputs) must have no React children that re-render frequently — isolate them to leaf nodes
- All Framer Motion variants must be defined **outside** component render functions (as module-level constants) to prevent object recreation on re-render
- `useReducedMotion` must be called at the top of every component that uses motion values, and all `transition` durations must be conditionally set to 0 when reduced motion is active

---

## 14. Performance Rules

### Bundle Budget

| Asset | Budget | Current | Action |
|-------|--------|---------|--------|
| First Load JS | < 200KB | Unknown | Audit after build |
| Framer Motion chunk | < 60KB | Included in deps | Tree-shake; use only needed exports |
| Total page weight (homepage, no videos) | < 400KB | Unknown | Audit after build |
| Largest Contentful Paint (LCP) | < 2.5s | Unknown | Prioritize logo + hero image/canvas |
| Cumulative Layout Shift (CLS) | < 0.1 | Unknown | All animated elements have reserved space |
| First Input Delay (FID) | < 100ms | Unknown | Defer non-critical JS |

---

### Component-Level Performance Rules

**Rule 1: Never animate layout properties.**  
Only `transform` and `opacity` may be animated. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size`, or `border-radius` with JavaScript. CSS transitions on `border-radius` are permitted.

**Rule 2: All animated elements use `will-change: transform` sparingly.**  
Apply `will-change: transform` only during active animation (set on animation start, removed on completion). Never set it globally or persistently — it consumes GPU memory continuously.

**Rule 3: Canvas elements pause when out of viewport.**  
Both `ParticleField` and `MapCanvas` use `IntersectionObserver` to pause their `requestAnimationFrame` loops when not in viewport. The observer threshold is 0 (pause when fully out of viewport).

**Rule 4: Images use Next.js `<Image>` with correct dimensions.**  
All images use the Next.js `<Image>` component. `width` and `height` are always specified to prevent layout shift. `priority={true}` is set only on the logo and the above-the-fold content (hero area).

**Rule 5: Videos use `preload="none"` by default.**  
No video loads data until triggered. The one exception is the collection reel which uses `preload="metadata"` to allow poster frame extraction. Videos are served from the `/videos/` folder directly (Next.js static serving) — no CDN in V1. This may become a performance concern if the video files are large; the build step should note the file sizes.

**Rule 6: Google Fonts load with `display=swap`.**  
The Sora font is loaded via Next.js `next/font/google` with `display: swap`. This prevents invisible text during font load (FOIT).

**Rule 7: The `Potraits/` folder must be moved to `public/` before build.**  
Files outside `public/` are not served by Next.js. All portrait images must be copied to `public/portraits/` before the People page is built. The filenames with spaces must be URL-encoded or renamed (spaces in paths cause issues in `<Image>` src attributes).

**Rule 8: CSS animations are preferred over JS for simple hover states.**  
Underline draw, color shifts, and opacity changes on hover are implemented as CSS `transition` properties, not Framer Motion. Framer Motion is reserved for scroll-driven, spring-physics, and mount/unmount animations.

**Rule 9: No layout shift from animations.**  
All elements that animate `y` or `x` on entry must have their space pre-reserved in the layout. The `y: 24px → 0` reveal animation moves the element but does not expand the page — the element occupies its full layout space from the moment it renders (it is just translated and invisible).

---

### Code Splitting Rules

| Component | Splitting Strategy |
|-----------|-------------------|
| `ParticleField` | `dynamic(() => import(...), { ssr: false })` — never renders on server |
| `MapCanvas` | `dynamic(() => import(...), { ssr: false })` — never renders on server |
| `VideoModal` | `dynamic(() => import(...), { ssr: false })` — modal not needed for initial render |
| `Cursor` | `dynamic(() => import(...), { ssr: false })` — cursor is client-only |
| `ArrivalSequence` | `dynamic(() => import(...), { ssr: false })` — pure client animation |
| All page sections | Default (server-rendered) — content must be in initial HTML for SEO |
| Framer Motion | Included in main bundle — used pervasively enough that dynamic import would not save meaningful size |

---

## 15. Asset Loading Strategy

### Images

| Image | Strategy | Notes |
|-------|----------|-------|
| `public/logo.png` | `priority={true}`, eager | Above the fold in navbar |
| Hero area (no image) | N/A | Hero uses canvas, not an image |
| `public/about-office.png` | Lazy (default) | Below the fold |
| `public/dubai-skyline.png` | Lazy | Below the fold |
| `public/team/partner-*.png` | Lazy | Below the fold |
| `Potraits/*.png` | Lazy, after move to `public/portraits/` | Below the fold |
| `public/news/article-featured.png` | Lazy | Below the fold |
| `public/news/article-*.png` | Lazy | Below the fold |

**Format strategy:** All images should be served as WebP where possible. Next.js `<Image>` with `next.config.mjs` image optimization handles this automatically — however, the current config has `images: { unoptimized: true }`. This must be changed to `unoptimized: false` before production build to enable WebP conversion and responsive srcsets.

---

### Videos

| Video | Strategy | Size concern |
|-------|----------|-------------|
| `Collection_Video-1.mp4` | `preload="metadata"`, lazy | Likely large — should be compressed to < 10MB |
| `Jalpa_Testimonial.mp4` | `preload="none"`, lazy | < 50MB each |
| `Mostafa_Testimonial.mp4` | `preload="none"`, lazy | < 50MB each |
| `Shadhad_testimonial.mp4` | `preload="none"`, lazy | < 50MB each |
| `Srinivas_Singh.mp4` | `preload="none"`, lazy | < 50MB each |
| `Breast-Cancer-Awareness.mov` | `preload="none"`, lazy | `.mov` files should be re-encoded as `.mp4` |
| `International Stress Awareness Day-UK-Horizontal.mp4` | `preload="none"`, lazy | Filename has spaces — must be renamed before use |
| `UN-Post-1.mov` | `preload="none"`, lazy | `.mov` → `.mp4` required |
| `Website-International-Day-of-Education.mp4` | `preload="none"`, lazy | OK |
| `World Gratitude Day.mov` | `preload="none"`, lazy | `.mov` → `.mp4`; spaces in name |

**Pre-build actions required for video assets:**
1. Convert all `.mov` files to `.mp4` (H.264, AAC audio)
2. Rename files with spaces to use hyphens: `World-Gratitude-Day.mp4`, `International-Stress-Awareness-Day.mp4`
3. Compress all videos to web-appropriate bitrates (720p max for testimonials, 1080p max for the reel)
4. Generate poster frames (first frame as `.jpg`) for each video and place in `public/video-posters/`

**Video poster naming convention:**
```
videos/Clients/Collection_Video-1.mp4    →    public/video-posters/collection-reel.jpg
videos/Clients/Jalpa_Testimonial.mp4     →    public/video-posters/jalpa.jpg
videos/Clients/Mostafa_Testimonial.mp4   →    public/video-posters/mostafa.jpg
videos/Clients/Shadhad_testimonial.mp4   →    public/video-posters/shadhad.jpg
videos/Clients/Srinivas_Singh.mp4        →    public/video-posters/srinivas-singh.jpg
videos/CSR/Breast-Cancer-Awareness.mp4   →    public/video-posters/breast-cancer.jpg
videos/CSR/International-Stress...mp4   →    public/video-posters/stress-awareness.jpg
videos/CSR/UN-Post-1.mp4                 →    public/video-posters/un-post.jpg
videos/CSR/Website-International...mp4  →    public/video-posters/education-day.jpg
videos/CSR/World-Gratitude-Day.mp4       →    public/video-posters/gratitude-day.jpg
```

---

### Fonts

| Font | Strategy |
|------|----------|
| Sora | `next/font/google` — loaded at root layout, preconnect to Google Fonts, `display: swap`, subsets: `latin` only |
| Geist | `next/font/local` — already bundled with Next.js 16, no additional load |
| Geist Mono | `next/font/local` — already bundled, used only in code contexts (if any) |

---

### Favicons and Icons

| File | Usage |
|------|-------|
| `public/icon.svg` | Primary favicon (SVG, scales infinitely) |
| `public/icon-dark-32x32.png` | Fallback favicon for browsers that don't support SVG |
| `public/icon-light-32x32.png` | Light theme favicon variant |
| `public/apple-icon.png` | Apple touch icon (180×180px recommended) |

Configured in `app/layout.tsx` via Next.js metadata API:
```
metadata.icons = {
  icon: [{ url: "/icon.svg" }, { url: "/icon-dark-32x32.png", sizes: "32x32" }],
  apple: "/apple-icon.png"
}
```

---

## Homepage Section Component Specification

### Complete map of every homepage section: component name, props, data source, and animation dependencies.

---

### Section 1 — ArrivalSequence

**Component:** `components/sections/home/arrival-sequence.tsx`

**Props:**
```
duration?: number          default: 1400 (ms) — total overlay duration
logo: string               path to logo image
onComplete?: () => void    callback when overlay fully exits
```

**Data source:** `public/logo.png` (passed in from `app/page.tsx`)

**Animation dependencies:**
- Framer Motion `motion.div` (overlay), `AnimatePresence`
- `lib/motion.ts` EASING.enter, EASING.exit, DURATION.epic
- `lib/hooks/use-reduced-motion.ts` — skips entirely if reduced motion

---

### Section 2 — HeroSection

**Component:** `components/sections/home/hero.tsx`

**Props:**
```
headline: string
subheadline: string
primaryCta: { label: string; href: string }
secondaryCta: { label: string; href: string }
stats: Array<{ value: number; suffix?: string; label: string }>
```

**Data source:**
- Headline, subheadline, CTAs: hardcoded in `app/page.tsx` (static copy)
- Stats: hardcoded array (20, 500, 4, 98 with appropriate suffixes/labels)

**Animation dependencies:**
- `canvas/particle-field.tsx` — background canvas
- `motion/text-reveal.tsx` — word-by-word headline
- `motion/stagger-children.tsx` — CTA and stats entry
- `motion/magnetic.tsx` — both CTA buttons
- `ui/stat-counter.tsx` — four counters
- `lib/motion.ts` STAGGER.words, DURATION.enter, EASING.enter

---

### Section 3 — ExpertiseEcosystem

**Component:** `components/sections/home/expertise-ecosystem.tsx`

**Props:**
```
services: Service[]           from lib/content.ts SERVICES (all 6)
headline: string
eyebrow: string
cta: { label: string; href: string }
```

**Data source:** `lib/content.ts` SERVICES array — all 6 entries with id, slug, title, icon, description, keyPoints

**Animation dependencies:**
- `motion/pin.tsx` — scroll pinning for 6× viewport height
- `motion/presence.tsx` — panel content swap
- Framer Motion `motion.div` — active underline slide (layoutId for shared-element underline transition)
- `motion/stagger-children.tsx` — key points list in active panel
- `ui/reveal.tsx` — section entry
- `lib/motion.ts` EASING.smooth, DURATION.normal (panel transitions)

---

### Section 4 — IndustryIntelligence

**Component:** `components/sections/home/industry-intelligence.tsx`

**Props:**
```
industries: Industry[]        from lib/content.ts INDUSTRIES (all 12)
stats: Array<{ value: number; suffix?: string; label: string }>
headline: string
eyebrow: string
cta: { label: string; href: string }
```

**Data source:** `lib/content.ts` INDUSTRIES array — all 12 entries; stats hardcoded (12, 500, 15)

**Sub-components:**
- `IndustryRibbonRow` — internal component, not exported
  - Props: `items: string[]`, `speed: number`, `direction: "ltr" | "rtl"`

**Animation dependencies:**
- `requestAnimationFrame` loop for ribbon scroll (not Framer Motion — too expensive to drive 36+ elements with FM)
- Framer Motion `motion.div` for ribbon entry (slide in from sides)
- `ui/stat-counter.tsx` — three counters
- `ui/reveal.tsx` — section headline entry
- `lib/hooks/use-reduced-motion.ts` — stops ribbon auto-scroll if reduced motion

---

### Section 5 — LeadershipNetwork

**Component:** `components/sections/home/leadership-network.tsx`

**Props:**
```
people: TeamMember[]          from lib/content.ts TEAM (sliced to first 3)
headline: string
eyebrow: string
cta: { label: string; href: string }
```

**Data source:** `lib/content.ts` TEAM array, `.slice(0, 3)`

**Animation dependencies:**
- `motion/parallax.tsx` — portrait row container
- `portrait/portrait-gallery.tsx` — renders the three portraits with stagger
- `portrait/portrait-card.tsx` — individual portrait tilt + bio reveal
- `ui/reveal.tsx` — headline entry
- `lib/motion.ts` STAGGER.portraits, DURATION.slow, EASING.enter

---

### Section 6 — ClientImpactStories

**Component:** `components/sections/home/client-impact-stories.tsx`

**Props:**
```
reel: { src: string; poster?: string }
testimonials: Array<{ src: string; poster?: string; name: string }>
headline: string
eyebrow: string
stats: Array<{ value: number; suffix?: string; label: string }>
cta: { label: string; href: string }
```

**Data source:**
- `reel.src`: `"/videos/Clients/Collection_Video-1.mp4"`
- `testimonials`: array of 4 objects with src from `videos/Clients/`
- Stats: hardcoded (500, 98)
- All paths hardcoded in `app/page.tsx` — video paths are not in `lib/content.ts`

**Animation dependencies:**
- `video/video-reel.tsx` — collection video
- `video/video-card.tsx` — four individual cards
- `video/video-modal.tsx` — modal (rendered via context, not as direct child)
- `motion/stagger-children.tsx` — four video cards
- `ui/reveal.tsx` — headline and reel entry
- `ui/stat-counter.tsx` — two stats
- `lib/hooks/use-cursor.ts` — media cursor mode on video hover

---

### Section 7 — CsrImpactEngine

**Component:** `components/sections/home/csr-impact-engine.tsx`

**Props:**
```
campaigns: Array<{ src: string; poster?: string; title: string; description?: string }>
headline: string
eyebrow: string
body: string
cta: { label: string; href: string }
```

**Data source:**
- `campaigns`: array of 4 objects with src from `videos/CSR/`
- All video paths hardcoded in `app/page.tsx`
- Headline, body, CTA copy: hardcoded in `app/page.tsx`

**Animation dependencies:**
- `motion/pin.tsx` — left column pinned while strip scrolls
- `video/video-card.tsx` — four CSR tiles
- `video/video-modal.tsx` — via context
- `motion/stagger-children.tsx` — film strip cards
- `motion/text-reveal.tsx` — left column text entry
- `lib/motion.ts` EASING.enter, parallax speed 0.8

---

### Section 8 — RegionalPresence

**Component:** `components/sections/home/regional-presence.tsx`

**Props:**
```
regions: Array<{ name: string; coordinates: [number, number]; descriptor?: string }>
office: { address: string; phone: string; email: string; hours: string }
headline: string
eyebrow: string
cta: { label: string; href: string }
```

**Data source:**
- `office`: from `lib/site.ts` CONTACT_DETAILS
- `regions`: hardcoded array of jurisdiction objects (placeholder data until real data provided)
- Headline, CTAs: hardcoded in `app/page.tsx`

**Animation dependencies:**
- `canvas/map-canvas.tsx` — SVG map with draw animation
- `ui/reveal.tsx` — text column entry
- Framer Motion `motion.span` — region name entries with `x` stagger
- `lib/motion.ts` EASING.enter, STAGGER.mapNodes, DURATION.cinematic (map draw)

---

### Section 9 — InsightsHub

**Component:** `components/sections/home/insights-hub.tsx`

**Props:**
```
featured: Article                  # The article with featured: true
supporting: Article[]              # Up to 3 non-featured articles
headline: string
eyebrow: string
cta: { label: string; href: string }
```

**Data source:** `lib/content.ts` ARTICLES — filtered and split in `app/page.tsx`:
- `featured` = `ARTICLES.find(a => a.featured)`
- `supporting` = `ARTICLES.filter(a => !a.featured).slice(0, 3)`

**Animation dependencies:**
- `motion/parallax.tsx` — featured article image
- `ui/reveal.tsx` — section entry
- `motion/stagger-children.tsx` — three supporting article rows
- `lib/hooks/use-cursor.ts` — text cursor mode on article hover
- `lib/motion.ts` EASING.enter, DURATION.slow (featured entry), DURATION.enter (supporting)

---

### Section 10 — ContactExperience

**Component:** `components/sections/home/contact-experience.tsx`

**Props:**
```
headline: string
body: string
primaryCta: { label: string; href: string }
email: string
phone: string
```

**Data source:**
- `email`, `phone`: from `lib/site.ts` CONTACT_DETAILS
- All copy: hardcoded in `app/page.tsx`

**Animation dependencies:**
- `motion/text-reveal.tsx` — character-by-character headline (mode: "characters")
- `motion/magnetic.tsx` — primary CTA button
- `ui/reveal.tsx` — body text and secondary links
- `lib/motion.ts` STAGGER.characters (0.03s), DURATION.enter
- Trigger fires at 60% viewport threshold (later than standard reveals)

---

### Section 11 — FooterExperience (Global Footer)

**Component:** `components/global/footer.tsx`

**Props:** None — footer reads directly from `lib/site.ts` and `lib/content.ts`

**Data source:**
- Navigation: `lib/site.ts` NAV_LINKS (updated to 9 new routes)
- Practice Areas: `lib/content.ts` SERVICES (title only, as links to `/expertise`)
- Contact: `lib/site.ts` CONTACT_DETAILS
- Logo: `public/logo.png`
- Copyright year: `new Date().getFullYear()`

**Animation dependencies:**
- CSS `transition` only — no Framer Motion in the footer
- Underline draw on links: CSS `transform: scaleX(0 → 1)` on `::after` pseudo-element
- No scroll-triggered animation — footer is static

---

## Data Flow Summary

```
lib/content.ts ──────────────────────┐
  SERVICES (6)    →   ExpertiseEcosystem, ServiceNavigator, ContactForm dropdown, Footer
  INDUSTRIES (12) →   IndustryIntelligence, IndustriesGrid
  TEAM (6)        →   LeadershipNetwork (sliced to 3), LeadershipGallery (all)
  ARTICLES (5)    →   InsightsHub (split featured/supporting), ArticleGrid

lib/site.ts ──────────────────────────┐
  NAV_LINKS       →   Navbar, Footer
  CONTACT_DETAILS →   RegionalPresence, ContactExperience, Footer, ContactPage

app/page.tsx ─────────────────────────┐
  (hardcoded)     →   Video src arrays (Client + CSR videos — not in lib/content.ts)
                  →   Section copy (headlines, eyebrows, CTAs)
                  →   Stats arrays passed to StatCounter
```

**Rule:** `lib/content.ts` and `lib/site.ts` are the single source of truth for all structured data. Video paths are the exception — they are defined as constants in `app/page.tsx` until a proper content management layer is introduced. Section copy (headlines, CTAs) lives in the page file, not in a separate config, to keep copy changes easy to find.

---

## Pre-Build Checklist

Before any implementation begins, the following assets must be resolved:

| Action | Owner | Blocker |
|--------|-------|---------|
| Move `Potraits/*.png` → `public/portraits/` and rename (no spaces) | Asset prep | People page |
| Convert `.mov` files to `.mp4` | Asset prep | CSR + Clients sections |
| Rename video files with spaces to use hyphens | Asset prep | All video sections |
| Generate poster JPGs for all 10 videos → `public/video-posters/` | Asset prep | All video sections |
| Change `next.config.mjs` `unoptimized: true` → `false` | Config | Image optimization |
| Add redirects to `next.config.mjs` for retired routes | Config | SEO continuity |
| Align `Potraits/` filenames with real TEAM data in `lib/content.ts` | Data | People page |
| Update `lib/site.ts` NAV_LINKS to new 9-route structure | Data | Navigation |
| Update Footer practice areas to pull from `lib/content.ts` SERVICES | Code | Footer accuracy |

---

*End of Build Architecture.*
