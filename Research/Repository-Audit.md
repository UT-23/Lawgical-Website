# Repository Audit — Lawgical Group Website v0

**Date:** 2026-06-10  
**Project root:** `lawgical-group-website (1)/`  
**Framework:** Next.js 16.2.6 (App Router) · React 19 · TypeScript 5.7.3

---

## 1. Folder Structure

```
lawgical-group-website (1)/
├── app/                              # Next.js App Router pages
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── industries/
│   │   ├── industries-client.tsx
│   │   └── page.tsx
│   ├── news/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── team/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                     # Homepage
├── components/
│   ├── ui/
│   │   └── button.tsx
│   ├── article-card.tsx
│   ├── contact-form.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   ├── page-header.tsx
│   ├── particle-field.tsx
│   ├── reveal.tsx
│   └── service-card.tsx
├── lib/
│   ├── content.ts                   # All data: services, team, industries, articles
│   ├── site.ts                      # Nav links, contact details, site config
│   └── utils.ts
├── public/
│   ├── news/
│   │   ├── article-1.png
│   │   ├── article-2.png
│   │   ├── article-3.png
│   │   ├── article-4.png
│   │   └── article-featured.png
│   ├── team/
│   │   ├── partner-1.png
│   │   ├── partner-2.png
│   │   ├── partner-3.png
│   │   ├── partner-4.png
│   │   ├── partner-5.png
│   │   └── partner-6.png
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
├── Potraits/                        # Actual team portrait images
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
├── 03-Inspiration/
├── 04-Interaction-System/
├── 05-Design-System/
├── 06-Windsurf-Prompts/
├── Information/                     # Screenshots and documentation images
├── Research/                        # This folder
├── lawgical-redesign-pack/
├── logo/
├── NEXT-STEPS.md
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── postcss.config.mjs
└── tsconfig.json
```

---

## 2. Routes

All routes use the Next.js App Router pattern. No dynamic segments exist yet.

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage |
| `/about` | `app/about/page.tsx` | About page |
| `/services` | `app/services/page.tsx` | Services listing |
| `/industries` | `app/industries/page.tsx` | Industries grid |
| `/team` | `app/team/page.tsx` | Team members |
| `/news` | `app/news/page.tsx` | News & insights |
| `/contact` | `app/contact/page.tsx` | Contact form |

There are no dynamic routes (e.g. `/services/[slug]`, `/news/[slug]`). Individual service, article, and team pages do not exist yet.

---

## 3. Components

### Shared Components (`components/`)

| Component | File | Description |
|-----------|------|-------------|
| Navbar | `navbar.tsx` | Fixed header; logo, 7 nav links, CTA button, mobile hamburger menu; glass-morphism on scroll |
| Footer | `footer.tsx` | 4-column footer: brand, navigation, practice areas, contact info |
| Hero | `hero.tsx` | Homepage hero with `ParticleField`, animated headline, stats row, dual CTAs |
| PageHeader | `page-header.tsx` | Reusable page banner with eyebrow label, title, and description |
| Reveal | `reveal.tsx` | Framer Motion scroll-trigger wrapper; supports `up`, `left`, `right`, `none` directions |
| ServiceCard | `service-card.tsx` | Card for displaying a single service with icon, title, description, key points, link |
| ArticleCard | `article-card.tsx` | News card with image, category badge, title, excerpt, date, read time |
| ContactForm | `contact-form.tsx` | Controlled form with name, email, company, service dropdown, message; success state animation |
| ParticleField | `particle-field.tsx` | Canvas-based particle animation with velocity bounce and proximity-based connecting lines |
| Button | `ui/button.tsx` | Base-UI–backed button with `default`, `outline`, `ghost` variants and `sm`, `default`, `lg` sizes |

### Page-Level Client Components

| Component | File | Description |
|-----------|------|-------------|
| IndustriesClient | `app/industries/industries-client.tsx` | Client component rendering industries grid with `whileInView` and `whileHover` animations |

---

## 4. Assets

### Images in `public/`

| File | Usage |
|------|-------|
| `logo.png` | Brand logo in navbar and footer |
| `icon.svg` | Browser tab icon (SVG) |
| `icon-dark-32x32.png` | Dark theme favicon |
| `icon-light-32x32.png` | Light theme favicon |
| `apple-icon.png` | Apple touch icon |
| `about-office.png` | Office interior image (About page) |
| `dubai-skyline.png` | Dubai skyline hero/background |
| `placeholder.jpg` | Generic image placeholder |
| `placeholder.svg` | Generic SVG placeholder |
| `placeholder-logo.png` | Logo placeholder (PNG) |
| `placeholder-logo.svg` | Logo placeholder (SVG) |
| `placeholder-user.jpg` | User avatar placeholder |
| `news/article-1.png` – `article-4.png` | News article thumbnails |
| `news/article-featured.png` | Featured article image |
| `team/partner-1.png` – `partner-6.png` | Team portrait placeholders (not real portraits) |

---

## 5. Images (All Files)

### `public/` (15 files)
- about-office.png, apple-icon.png, dubai-skyline.png, icon-dark-32x32.png, icon-light-32x32.png, icon.svg, logo.png, placeholder-logo.png, placeholder-logo.svg, placeholder-user.jpg, placeholder.jpg, placeholder.svg
- news/article-1.png, article-2.png, article-3.png, article-4.png, article-featured.png
- team/partner-1.png through partner-6.png

### `Potraits/` (11 actual team portraits)
- AbdelRehman Atef Barakat.png
- Amira Siddiqui.png
- Asaf Rizvi.png
- Dosa Mohamed.png
- Dr. Essa Al Nuaimi UAE Advocate.png
- Fathima Salam.png
- Kishore Mulani MD.png
- Malak Al Dairi.png
- Meera Mohan.png
- Muskan Bangani.png
- Sara Essam.png

> Note: The `Potraits/` portraits are **not yet wired** into the site. The team page uses generic `public/team/partner-*.png` placeholders.

### `Information/` (screenshots)
- Screenshot 2026-06-10 172531.png
- Screenshot 2026-06-10 175622.png
- Screenshot 2026-06-10 175637.png
- Screenshot 2026-06-10 180158.png

### `logo/`
- Screenshot 2026-06-07 193026.png

---

## 6. Videos

All video files live in `videos/` and are **not currently integrated** into any page or component.

### `videos/Clients/` — Client Testimonials

| File | Description |
|------|-------------|
| `Collection_Video-1.mp4` | Multi-client collection reel |
| `Jalpa_Testimonial.mp4` | Testimonial from Jalpa |
| `Mostafa_Testimonial.mp4` | Testimonial from Mostafa |
| `Shadhad_testimonial.mp4` | Testimonial from Shadhad |
| `Srinivas_Singh.mp4` | Testimonial from Srinivas Singh |

### `videos/CSR/` — Corporate Social Responsibility Content

| File | Description |
|------|-------------|
| `Breast-Cancer-Awareness.mov` | Breast cancer awareness campaign |
| `International Stress Awareness Day-UK-Horizontal.mp4` | Stress awareness day (UK) |
| `UN-Post-1.mov` | UN-related post |
| `Website-International-Day-of-Education.mp4` | International Day of Education |
| `World Gratitude Day.mov` | World Gratitude Day campaign |

---

## 7. Team Members

Defined in `lib/content.ts` as `TEAM` array. Currently uses placeholder images.

| Name | Role | Image (current) | Bio Summary |
|------|------|-----------------|-------------|
| Omar Al Mansoori | Founding Partner | /team/partner-1.png | 20+ years advising multinationals on corporate transactions and complex arbitration across the Middle East |
| Sara Khalil | Partner, Dispute Resolution | /team/partner-2.png | High-value commercial disputes before DIFC courts |
| James Whitfield | Partner, Corporate | /team/partner-3.png | Cross-border M&A, joint ventures, and structuring |
| Layla Hassan | Senior Associate, Arbitration | /team/partner-4.png | Institutional and ad hoc arbitration; construction and energy focus |
| Daniel Roberts | Senior Associate, Litigation | /team/partner-5.png | Commercial disputes and enforcement |
| Aisha Rahman | Counsel, Compliance | /team/partner-6.png | AML, sanctions, and data protection for financial institutions |

> Note: The actual real team portraits exist in `Potraits/` (11 people) but names and roles differ from the placeholder content in `lib/content.ts`.

---

## 8. Services

Defined in `lib/content.ts` as `SERVICES` array. Each entry has: `id`, `slug`, `title`, `icon` (Lucide), `description`, `keyPoints[]`.

| # | Title | Slug | Icon | Key Points |
|---|-------|------|------|------------|
| 1 | Corporate Law | `corporate-law` | Briefcase | Company formation, Mergers & acquisitions, Commercial contracts |
| 2 | Arbitration | `arbitration` | Landmark | DIAC & ICC proceedings, Award enforcement, Dispute strategy |
| 3 | Litigation | `litigation` | Gavel | Civil & commercial disputes, DIFC courts, Appeals & enforcement |
| 4 | Debt Collection | `debt-collection` | FileSearch | Amicable settlement, Legal recovery, Cross-border claims |
| 5 | Regulatory & Compliance | `regulatory-compliance` | ShieldCheck | AML & KYC, Data protection, Corporate governance |
| 6 | Strategic Advisory | `advisory` | Scale | Risk management, Board advisory, Structuring |

---

## 9. Industries

Defined in `lib/content.ts` as `INDUSTRIES` array. Each entry has: `id`, `title`, `description`.

| # | Title | Description |
|---|-------|-------------|
| 1 | Financial Services | Banks, funds & fintech |
| 2 | Real Estate | Developers & investors |
| 3 | Construction | Contractors & EPC |
| 4 | Energy | Oil, gas & renewables |
| 5 | Technology | Startups & platforms |
| 6 | Healthcare | Providers & life sciences |
| 7 | Retail & FMCG | Brands & distributors |
| 8 | Hospitality | Hotels & leisure |
| 9 | Logistics | Trade & shipping |
| 10 | Manufacturing | Industrial & supply |
| 11 | Media | Entertainment & sport |
| 12 | Family Offices | Wealth & succession |

---

## 10. Clients

No client logos or names are hardcoded in any page or component. Client presence exists only as video testimonials in `videos/Clients/`:

- **Jalpa** — video testimonial
- **Mostafa** — video testimonial
- **Shadhad** — video testimonial
- **Srinivas Singh** — video testimonial
- **Collection reel** — multi-client compilation

These videos are not yet embedded anywhere in the site.

---

## 11. Navigation

Defined in `lib/site.ts` as `NAV_LINKS`.

### Primary Navigation (Navbar + Footer)

| Label | Href |
|-------|------|
| Home | `/` |
| About | `/about` |
| Services | `/services` |
| Industries | `/industries` |
| Team | `/team` |
| News | `/news` |
| Contact | `/contact` |

### Navbar Behavior (`components/navbar.tsx`)
- Fixed position, full-width
- Logo left, nav links center, CTA button right
- Active link: bottom border indicator
- Scroll effect: backdrop blur + border appears after 10px scroll
- Mobile: hamburger icon toggles a slide-down menu with staggered link animations
- CTA button: "Book a Consultation" → links to `/contact`

---

## 12. Footer

Defined in `components/footer.tsx` and data from `lib/site.ts`.

### Structure (4 columns)

**Column 1 — Brand**
- Logo image
- Tagline: "Reimagining legal services for the modern world."
- No social media links currently

**Column 2 — Navigate**
- All 7 nav links (Home, About, Services, Industries, Team, News, Contact)

**Column 3 — Practice Areas** (hardcoded, not from `SERVICES`)
- Corporate Law
- Arbitration
- Litigation
- Debt Collection

**Column 4 — Get in Touch**
- Address: Level 21, Boulevard Plaza Tower 1, Downtown Dubai, UAE
- Phone: +971 4 123 4567
- Email: hello@lawgicalgroup.ae

**Bottom bar**
- Copyright: `© [year] Lawgical Group. All rights reserved.`
- Right: `Downtown Dubai, UAE`

---

## 13. Existing Animations

### Libraries

| Library | Version | Usage |
|---------|---------|-------|
| `framer-motion` | ^12.40.0 | Primary animation library; used in Hero, Reveal, Navbar, ContactForm, IndustriesClient |
| `tw-animate-css` | ^1.4.0 | Tailwind-based CSS animations (utility classes) |
| Custom Canvas API | — | `particle-field.tsx` — raw `requestAnimationFrame` loop |

### Animation Inventory

| Component | Type | Details |
|-----------|------|---------|
| `hero.tsx` | Mount animation | `opacity: 0→1`, `y: 20→0`; staggered delays 0.1s / 0.25s / 0.35s / 0.45s on heading, subheading, CTA, stats |
| `reveal.tsx` | Scroll trigger | `whileInView`; fade + directional slide (up/left/right/none); custom ease `[0.22, 1, 0.36, 1]`; `once: true` |
| `navbar.tsx` | Scroll effect | CSS class swap: adds `backdrop-blur` + `border-b` after 10px scroll |
| `navbar.tsx` (mobile) | Mount animation | Mobile menu: `AnimatePresence` + `height: 0→auto`; list items stagger at 0.06s intervals |
| `particle-field.tsx` | Canvas loop | Particles with random velocity; bounce on canvas edges; connecting lines drawn between nearby particles with opacity based on distance; respects `prefers-reduced-motion` |
| `contact-form.tsx` | State change | Success message: `scale: 0.9→1`, `opacity: 0→1` on submission |
| `industries-client.tsx` | Scroll + hover | `whileInView` fade/y-slide; `whileHover` y-lift (`-4px`) |
| `service-card.tsx` | Hover (CSS) | `-translate-y-1`, shadow elevation, border color shift via Tailwind transitions |
| `article-card.tsx` | Hover (CSS) | Image `scale-105`, border color transition |

### Easing
- Custom spring: `[0.22, 1, 0.36, 1]` (used in Reveal)
- Default Framer Motion spring on hover states

---

## 14. Dependencies

From `package.json`:

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.6 | Framework (App Router) |
| `react` | ^19 | UI library |
| `react-dom` | ^19 | DOM rendering |
| `framer-motion` | ^12.40.0 | Animations |
| `@base-ui/react` | ^1.5.0 | Headless UI primitives |
| `shadcn` | ^4.8.0 | Component scaffold tool |
| `lucide-react` | ^1.16.0 | Icon library |
| `@vercel/analytics` | 1.6.1 | Usage analytics |
| `class-variance-authority` | ^0.7.1 | CSS variant management |
| `clsx` | ^2.1.1 | Conditional class names |
| `tailwind-merge` | ^3.3.1 | Tailwind class deduplication |
| `tw-animate-css` | ^1.4.0 | Tailwind animation utilities |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4.2.0 | CSS framework |
| `@tailwindcss/postcss` | ^4.2.0 | PostCSS integration |
| `postcss` | ^8.5 | CSS processing |
| `typescript` | 5.7.3 | Type system |
| `@types/node` | ^24 | Node type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |

---

## 15. Design System

Defined in `app/globals.css` using CSS custom properties in oklch color space.

### Color Tokens

| Token | Value | Description |
|-------|-------|-------------|
| `--background` | `oklch(0.985 0.002 247)` | Off-white page background |
| `--foreground` | `oklch(0.205 0.02 250)` | Deep slate text |
| `--primary` | `oklch(0.27 0.04 252)` | Dark navy primary |
| `--accent` | `oklch(0.78 0.13 184)` | Teal/cyan accent |
| `--secondary` | `oklch(0.96 0.005 247)` | Light gray |
| `--muted` | `oklch(0.97 0.003 247)` | Muted background |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error red |
| `--border` | `oklch(0.9 0.008 247)` | Border color |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | Sora (Google Font) | 400, 500, 600, 700, 800 |
| Body / sans | Geist | — |
| Monospace | Geist Mono | — |

### Border Radius Scale
- `--radius`: 0.5rem (base)
- sm: 0.3rem · md: 0.4rem · lg: 0.5rem · xl: 0.7rem · 2xl: 0.9rem · 3xl: 1.1rem · 4xl: 1.3rem

---

## 16. Site Content & Copy

### Key Stats (Hero section)
- 20+ Years experience
- 500+ Clients advised
- 4 Core practices
- 98% Client retention

### Industries Page Stats
- 12+ Industries served
- 500+ Matters handled
- 15+ Years combined practice

### Core Values (About page)
- Integrity — Honest counsel, always
- Client focus — Your goals lead the strategy
- Precision — Detail-driven execution
- Innovation — Modern legal thinking

### Contact Details
- Address: Level 21, Boulevard Plaza Tower 1, Downtown Dubai, UAE
- Phone: +971 4 123 4567
- Email: hello@lawgicalgroup.ae
- Hours: Sunday – Thursday, 9:00 – 18:00 GST

---

## 17. News / Articles

Defined in `lib/content.ts` as `ARTICLES` array. Each entry has: `slug`, `title`, `excerpt`, `category`, `date`, `readTime`, `image`, `featured`.

| Title | Slug | Category | Date | Read Time | Featured |
|-------|------|----------|------|-----------|----------|
| What the 2026 UAE Arbitration Reforms Mean for Businesses | `uae-arbitration-reforms-2026` | Arbitration | Jun 2, 2026 | 6 min | Yes |
| Structuring Joint Ventures Across the GCC | `structuring-gcc-joint-ventures` | Corporate | May 21, 2026 | 5 min | No |
| Enforcing Foreign Judgments Through the DIFC | `enforcing-foreign-judgments-difc` | Litigation | May 9, 2026 | 7 min | No |
| Debt Recovery: A Practical Playbook for 2026 | `debt-recovery-best-practices` | Debt Collection | Apr 28, 2026 | 4 min | No |
| Navigating the UAE Data Protection Landscape | `data-protection-compliance` | Compliance | Apr 12, 2026 | 5 min | No |

---

## 18. Configuration Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | TypeScript errors ignored in build; images unoptimized |
| `tsconfig.json` | TypeScript configuration (path aliases: `@/*` → `./*`) |
| `components.json` | shadcn/ui component configuration |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss` plugin |
| `.gitignore` | Standard Next.js ignores |
| `pnpm-lock.yaml` | pnpm lockfile (package manager) |
| `package-lock.json` | npm lockfile (also present) |

---

## 19. Gaps & Observations (Audit Only — No Recommendations)

- The `Potraits/` folder (11 real portraits) is not referenced by any component or data file
- The `videos/` folder (10 videos) is not referenced by any component or page
- No dynamic routes exist — individual service, article, or team-member pages are absent
- The `public/team/` images are generic placeholders, not the actual portraits
- The Contact Form has no server action or API route wired up — submission handling is UI-only
- Practice Areas in the footer are hardcoded separately from the `SERVICES` array in `lib/content.ts`
- No social media links or handles appear anywhere in the codebase
- The `03-Inspiration/`, `04-Interaction-System/`, `05-Design-System/`, `06-Windsurf-Prompts/` folders contain design planning documents, not code
- `NEXT-STEPS.md` exists at the project root as a planning document

---

*End of audit.*
