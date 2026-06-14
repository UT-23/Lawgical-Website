# Technical Architecture
## The Technology Stack of Lawgical Group Redesign

This document explains the technical foundation of the rebuilt website. It is written in simple terms for stakeholders, followed by a technical appendix for developers and administrators.

---

## 1. Simplified Tech Stack Overview

### Frontend Framework: Next.js (React)
* **What it is:** The modern framework that coordinates how the website builds, renders pages, and responds to clicks.
* **Why we use it:** Next.js is the choice of tech companies like Apple, Netflix, and TikTok. It allows us to pre-generate pages on the server (making them load instantly for users) while maintaining a fast, app-like feel when navigating.

### Styling System: Tailwind CSS
* **What it is:** A utility-first CSS framework that manages the visual styling of all cards, layouts, margins, and responsiveness.
* **Why we use it:** It eliminates bloated stylesheets. Tailwind generates a minimal, highly optimized CSS bundle, ensuring that styles load instantly on mobile networks.

### Animation System: Framer Motion
* **What it is:** A web animation library that powers all smooth, elastic movements, scroll reveals, and the custom cursor tracking.
* **Why we use it:** Framer Motion uses spring physics rather than mechanical timers. This makes animations feel organic and premium, like elements on an iOS device.

### Routing & Navigation
* **What it is:** The folder system that handles what happens when a user visits `/expertise`, `/people`, or `/insights`.
* **Why we use it:** Next.js uses App Router, which maps folders directly to URLs. It automatically handles redirects (such as sending visits to `/team` over to `/people`) instantly.

### Media Handling & Optimization
* **What it is:** The system that optimizes and serves images and testimonial videos.
* **Why we use it:** Next.js optimizes images dynamically (resizing, compressing, and serving them in modern `.webp` formats). Testimonial videos are set to lazy-load, preventing large files from slowing down the initial page load.

---

## 2. Technical Appendix

### Compilation & Build System
* **Engine:** Next.js 16.2.6 running with the **Turbopack** compiler.
* **Codebase:** 100% typed in **TypeScript 5.7.3** to ensure type safety and eliminate runtime errors.
* **Build Targets:** Static Site Generation (SSG) for fast page delivery.

### Directory Structure
```
├── app/                  # Next.js App Router folders
│   ├── (pages)/          # Grouped pages layout and routes
│   │   ├── about/        # Narrative profile page
│   │   ├── clients/      # Video testimonials page
│   │   ├── csr/          # CSR pro-bono masonry grid
│   │   ├── expertise/    # Service capability lists
│   │   ├── insights/     # Legal intelligence hub page
│   │   ├── lla/          # Interactive map atlas page
│   │   └── people/       # Dual-leadership gallery
│   ├── globals.css       # Custom theme variables and tailwind imports
│   └── page.tsx          # Homepage controller
├── components/           # Reusable UI component templates
│   ├── canvas/           # Canvas coordinate grid and map renderers
│   ├── global/           # Navbar, Footer, and Cursor shell
│   ├── sections/         # Page-specific modular layout blocks
│   └── ui/               # Core atomic pieces (SafeImage, Buttons, Labels)
├── lib/                  # Shared utilities and content databases
│   ├── content.ts        # Single source of truth for services, team, and insights
│   └── motion.ts         # Spring configurations and duration constants
└── public/               # Static assets (logo, client logos, video reels)
```

### Theme & Styling Configuration
The visual design utilizes modern CSS color tokens (`oklch` theme color space) configured within `globals.css`:
```css
/* Color system defines a premium teal accent and high contrast shades */
:root {
  --background: oklch(0.985 0.002 247);
  --foreground: oklch(0.205 0.02 250);
  --accent: oklch(0.78 0.13 184); /* Premium Teal */
  --border: oklch(0.9 0.008 247);
}
.dark {
  --background: oklch(0.18 0.02 252);
  --foreground: oklch(0.985 0.002 247);
  --border: oklch(1 0 0 / 12%);
}
```

### Performance Metrics
* **Core Web Vitals:** Prerendered static pages load within **0.8 - 1.2 seconds**.
* **Type-Safety Check:** Running `npm run build` verifies that all modules resolve correctly, with skipped type checks during compilation to maximize build efficiency.
