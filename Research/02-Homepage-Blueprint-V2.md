# Homepage Blueprint V2 — Lawgical Group
**Sources:** Repository-Audit.md · 01-Site-Architecture-V2.md  
**Principle:** Not a law firm website. A legal intelligence platform.  
**Route:** `/`  
**Date:** 2026-06-10

---

## Blueprint Overview

The homepage is a continuous, scroll-driven narrative. It moves the visitor through five emotional stages:

1. **Arrival** — arrested attention, premium signal, identity established
2. **Belief** — six practice areas felt as a living system, not a list
3. **Relevance** — their sector is named; the firm already understands them
4. **Trust** — real people, real client voices, real social proof
5. **Action** — invitation extended, friction eliminated

Each section has a single job. No section repeats a job another section already owns. The page reads as one coherent argument for why Lawgical Group is the only call worth making.

---

## Section 1 — Arrival Sequence

### Purpose
The moment before the hero renders. A controlled, intentional load state that primes the visitor for a premium experience before the full canvas appears. The arrival sequence prevents the jarring flash of unstyled content and replaces it with a deliberate beat of anticipation.

### Content Source
- Wordmark / logo: `public/logo.png`
- No additional data required — this is a purely temporal experience

### Assets Used
- `public/logo.png`

### Layout Concept
Full-viewport dark overlay. The logo appears at center. No navigation, no copy, no distractions. The overlay dissolves to reveal the hero behind it. Duration: 1.2–1.6 seconds maximum. Never blocks interaction if the user scrolls immediately.

### Scroll Behavior
Not applicable. The arrival sequence completes before the page becomes scrollable. If the user scrolls before it finishes, it skips to completion instantly.

### Hover Behavior
Not applicable during arrival.

### Mobile Behavior
Identical to desktop. Duration may be shortened to 0.8 seconds on slower connections to avoid penalising mobile users.

### Animation Behavior
- Logo fades in from opacity 0 at center: duration 400ms, ease-out
- Logo holds for 300ms
- Overlay fades out: duration 500ms, ease-in-out
- Hero content begins its own entrance animation as the overlay clears
- If user has `prefers-reduced-motion: reduce`, skip directly to hero — no overlay

### Transition Behavior
The overlay fade-out and the hero entrance animation overlap by 200ms so the hero begins appearing before the overlay is fully gone. This creates a sense of depth — the site emerging from behind a curtain rather than snapping on.

### Conversion Objective
None directly. This section builds the psychological state that makes the hero's claim land harder. Visitors who experience a deliberate, premium entry sequence are primed to perceive the brand as confident and considered.

---

## Section 2 — Hero Intelligence Network

### Purpose
Establish Lawgical Group's identity, core claim, and emotional register in under ten seconds. The hero is not a banner with a headline — it is a living system that embodies the concept of connected legal intelligence. The particle network is not decoration; it is the metaphor for the firm itself: expertise, industries, and regions connected into a single, coherent whole.

### Content Source
- Headline: "Legal Solutions, Reimagined" (existing hero copy)
- Subheadline: Dubai-based positioning sentence (to be refined)
- CTA 1: "Explore Our Expertise" → `/expertise`
- CTA 2: "Book a Consultation" → `/contact`
- Stats: 20+ Years experience · 500+ Clients advised · 4 Core practices · 98% Client retention (`lib/site.ts` / hero copy)
- Particle system: `components/particle-field.tsx` (existing)

### Assets Used
- `components/particle-field.tsx` — canvas-based particle animation with connecting lines
- `public/logo.png` — visible in the navbar above this section (transparent state)

### Layout Concept
Full-viewport height. Dark or near-black background to give the particle field maximum contrast and dimensionality. Content is vertically centered with a two-line hierarchy:

- **Line 1 (eyebrow):** Small caps label — "Legal Intelligence Platform" or firm descriptor
- **Line 2 (headline):** Large, bold — "Legal Solutions, Reimagined" — occupying 2–3 lines at display scale
- **Line 3 (subheadline):** One sentence — confident, specific, not generic
- **Line 4 (CTAs):** Two buttons side by side — primary solid, secondary outlined
- **Line 5 (stats):** Four stat columns below the CTAs — numbers prominent, labels below in smaller weight

The particle field occupies the entire viewport behind the text content. Particle nodes are spaced and sized so they do not compete with the headline — they frame it. Three to five named nodes are slightly larger and labelled ("Expertise" · "Industries" · "Regions") to reinforce the metaphor.

### Scroll Behavior
- As the user scrolls down, the particle field and headline content fade and scale slightly as the next section comes up — a parallax exit, not a hard cut
- The particle canvas stops animating once fully out of the viewport to preserve performance
- A subtle scroll-down indicator (animated line or chevron) sits below the stats row and disappears once scrolling begins

### Hover Behavior
- Cursor proximity causes nearby particles to gently accelerate toward the cursor and then drift away — like a magnetic repulsion
- Named nodes pulsate with a soft ring on hover
- CTA buttons have magnetic hover: the button shifts toward the cursor by 4–6px as the cursor approaches within a 60px radius
- CTA buttons show a subtle background gradient shift on direct hover
- Stats have no hover state — they are read-only anchors

### Mobile Behavior
- Particle field renders at reduced density on mobile (fewer nodes, shorter connection distances) to maintain 60fps
- Headline font size scales down proportionally — still large but not overflowing
- CTAs stack vertically (primary above secondary)
- Stats become a 2×2 grid instead of a 4-column row
- If `prefers-reduced-motion` is set: particle field is replaced by a static gradient or the Dubai skyline image at low opacity; text entrance animations are skipped

### Animation Behavior
Staggered entrance sequence triggered on mount (after the arrival overlay clears):
1. Eyebrow label — fade in, `y: 12 → 0`, delay: 100ms
2. Headline — fade in, `y: 20 → 0`, delay: 250ms
3. Subheadline — fade in, `y: 16 → 0`, delay: 350ms
4. CTAs — fade in, `y: 12 → 0`, delay: 450ms
5. Stats row — fade in, `y: 8 → 0`, delay: 550ms; each stat number then counts up from 0 to its value over 1200ms with an ease-out curve

Particle field begins animating immediately on canvas mount — it is the first thing the eye sees, even before the text enters.

### Transition Behavior
- Exiting (scroll down): content `opacity: 1 → 0` over 200px of scroll distance; particle canvas fades to 0 opacity over the same range
- The transition out does not happen until the next section is 20% into the viewport — the hero never disappears before there is something to replace it

### Conversion Objective
Primary conversion point of the entire homepage. The two CTAs are the most important interactive elements on the page. The primary CTA ("Explore Our Expertise") drives exploration. The secondary CTA ("Book a Consultation") captures high-intent visitors who arrived with a specific need. The stat row provides instant credibility before the visitor has read a single paragraph.

---

## Section 3 — Expertise Ecosystem

### Purpose
Present the six practice areas not as a menu of services but as a living ecosystem — interconnected, not siloed. Each practice area should feel like a distinct character with depth, not a bullet point. The section's job is to make visitors feel that the firm can handle their specific situation, whatever it is.

### Content Source
- Eyebrow: "Our Expertise"
- Headline: "Six practice areas. One integrated firm."
- All 6 services from `lib/content.ts` SERVICES array:
  1. Corporate Law — Briefcase icon — Company formation, M&A, Commercial contracts
  2. Arbitration — Landmark icon — DIAC & ICC, Award enforcement, Dispute strategy
  3. Litigation — Gavel icon — Civil & commercial disputes, DIFC courts, Appeals
  4. Debt Collection — FileSearch icon — Amicable settlement, Legal recovery, Cross-border claims
  5. Regulatory & Compliance — ShieldCheck icon — AML & KYC, Data protection, Corporate governance
  6. Strategic Advisory — Scale icon — Risk management, Board advisory, Structuring
- CTA: "View All Expertise" → `/expertise`

### Assets Used
- Lucide icons: Briefcase, Landmark, Gavel, FileSearch, ShieldCheck, Scale
- No image assets — this section is built on typography, iconography, and interaction

### Layout Concept
Not a card grid. Instead: a **horizontal split panel system**.

The section occupies 100vh minimum. The left side is a persistent vertical list of the six practice area names — large, spaced, and typographically dominant. The right side is a detail panel that responds to which practice area is active.

- **Left panel (40% width):** Numbered list 01–06. Each practice area name in display type. The active item is full opacity; inactive items are at 40% opacity with reduced scale. The active item has an accent underline that slides from the previous active item (the underline moves, it does not blink in/out).
- **Right panel (60% width):** Shows the active practice area — icon at top, title, full description, key points as a short vertical list, and a "Speak to a specialist" link.
- **Background:** The background of the right panel shifts subtly per practice area — not a color change, but a texture or noise shift that makes each area feel distinct without breaking the monochrome palette.

On scroll, the section auto-advances through the 6 practice areas as the user scrolls — the left panel is pinned while the scroll drives the selection. After the sixth area, the section unpins and the next section scrolls in.

### Scroll Behavior
- Section pins (sticky position) for a fixed scroll distance equivalent to 6 × viewport height
- Each 1 viewport height of scroll advances the active practice area by one
- Progress indicator: thin vertical line on the far left that fills from top to bottom as the user scrolls through all six areas
- After the sixth practice area is shown and the user continues scrolling, the section unpins and the next section enters from below

### Hover Behavior
- Left panel: hovering a non-active practice area name highlights it (full opacity) and shows a small arrow indicating clickability
- Click on any practice area name immediately jumps to that area without waiting for scroll — the panel updates instantly
- Right panel: key points have a subtle left-border accent that appears on hover
- "Speak to a specialist" link has an underline that draws from left to right on hover
- The icon in the right panel has a 15° rotation on hover, ease spring

### Mobile Behavior
- The split panel becomes a vertical accordion
- All six practice areas are listed; tapping one expands its detail panel below
- Only one area is open at a time — opening a new one closes the previous with an animated collapse
- The scroll-pinning behavior is disabled on mobile; the accordion scrolls naturally with the page
- The active area indicator becomes a left border accent (2px, accent color)

### Animation Behavior
- **Section entry:** Eyebrow and headline slide in from bottom on scroll entry — `y: 24 → 0`, `opacity: 0 → 1`, duration 600ms, stagger 120ms
- **Practice area transition (left panel):** Active name transitions to full opacity over 200ms; previous active name transitions to 40% opacity simultaneously
- **Active underline:** Slides from the y-position of the previous active item to the current active item — `y` animates over 300ms, ease-out cubic
- **Right panel content swap:** Previous content fades out (`opacity: 1 → 0`, `x: 0 → -20`, 200ms); new content fades in (`opacity: 0 → 1`, `x: 20 → 0`, 200ms, 200ms delay)
- **Icon entrance (per area):** Scale `0.8 → 1`, `opacity: 0 → 1`, 250ms ease spring
- **Key points:** Stagger in from left, 60ms apart, after the title and description have settled

### Transition Behavior
- Entry into section: the entire section fades in as the user scrolls into it — no hard cut from the hero
- Exit from section: content fades out as the section unpins; next section slides up from below

### Conversion Objective
Ensure every visitor can identify at least one practice area relevant to their situation. The "Speak to a specialist" link within the active practice area panel is a micro-CTA that leads directly to `/contact` with the relevant service pre-selected in the form dropdown. The section CTA ("View All Expertise") drives visitors who want depth before committing.

---

## Section 4 — Industry Intelligence

### Purpose
Prove that the firm's legal advice is shaped by deep sector knowledge, not applied generically. The section must make a visitor from any of the 12 industries feel immediately seen — "they understand my world." It is not a list of industries served; it is a demonstration of sector fluency.

### Content Source
- Eyebrow: "Industries We Serve"
- Headline: "Sector knowledge that changes the advice."
- All 12 industries from `lib/content.ts` INDUSTRIES:
  1. Financial Services — Banks, funds & fintech
  2. Real Estate — Developers & investors
  3. Construction — Contractors & EPC
  4. Energy — Oil, gas & renewables
  5. Technology — Startups & platforms
  6. Healthcare — Providers & life sciences
  7. Retail & FMCG — Brands & distributors
  8. Hospitality — Hotels & leisure
  9. Logistics — Trade & shipping
  10. Manufacturing — Industrial & supply
  11. Media — Entertainment & sport
  12. Family Offices — Wealth & succession
- Stats: 12+ Industries served · 500+ Matters handled · 15+ Years combined practice
- CTA: "Explore Industries" → `/industries`

### Assets Used
- No image assets — this section is built entirely on typography and motion
- Data from `lib/content.ts` INDUSTRIES array

### Layout Concept
Not a grid. A **continuous horizontal scroll ribbon** with **depth layering**.

Three rows of industry names scroll horizontally at different speeds and in different directions (parallax scrolling rows), creating a sense of a living, abundant ecosystem rather than a finite checklist:

- **Row 1 (fast, left-to-right):** Financial Services · Real Estate · Construction · Energy · Technology
- **Row 2 (medium, right-to-left):** Healthcare · Retail & FMCG · Hospitality · Logistics · Manufacturing
- **Row 3 (slow, left-to-right):** Media · Family Offices · Financial Services · Real Estate … (loops)

Each industry name in the ribbon is in large type. When a user's cursor passes over a name, the name expands briefly to reveal the 3–4 word descriptor below it (e.g., "Banks, funds & fintech") and highlights in accent color.

Below the ribbon, a **stats row** with the three statistics appears with count-up animation on scroll entry.

Below the stats, a single sentence + CTA.

### Scroll Behavior
- Ribbon begins scrolling as soon as the section enters the viewport (driven by `requestAnimationFrame`, not scroll position)
- Scroll speed is constant — not driven by user scroll velocity
- User scroll controls when they exit the section, not the animation speed
- On scroll entry: eyebrow, headline, and ribbon each animate in sequentially
- On scroll exit: no special exit behavior — next section enters normally

### Hover Behavior
- Hovering an industry name in the ribbon: name scales up 10%, descriptor fades in below it, color shifts to accent
- The ribbon pauses its auto-scroll while any name is being hovered — giving the user time to read
- The hovered name has a cursor style change to indicate it is a link
- Click on any industry name navigates to `/industries` (full industries page)
- Stats row: no hover state
- CTA: magnetic hover — button shifts toward cursor by 4px within 60px radius

### Mobile Behavior
- The three-row ribbon collapses to a single row with touch-swipe scrolling
- Auto-scroll continues but at reduced speed on mobile
- The descriptor appears below the industry name by default (not on hover) because touch has no hover state
- Stats become a 2×3 grid (or 3 stacked rows on very small screens)
- CTA button is full-width below the stats

### Animation Behavior
- **Entry:** Eyebrow fades + slides up (`y: 16 → 0`, `opacity: 0 → 1`, 500ms). Headline follows 150ms later. The three ribbon rows slide in from their respective sides (Row 1 from left, Row 2 from right, Row 3 from left) with a slight stagger — each starting 100ms after the previous.
- **Ribbon motion:** Each row scrolls at a constant speed. Row 1: 40px/second. Row 2: 28px/second (opposite direction). Row 3: 18px/second. Speeds are chosen so the composition never looks static.
- **Hover expansion:** Industry name scale and descriptor fade — `scale: 1 → 1.1`, `opacity: 0 → 1` for descriptor, 200ms ease-out
- **Pause on hover:** Ribbon deceleration to 0 over 300ms when a name is hovered; reacceleration back to full speed over 400ms when hover ends
- **Stats count-up:** Each stat counts from 0 to its target value over 1200ms on scroll entry, with ease-out deceleration

### Transition Behavior
- Entry: section fades in from `opacity: 0` as it enters the viewport
- Exit: standard scroll — no special transition

### Conversion Objective
Intercept visitors who are sector-shopping — evaluating whether this firm understands their world before engaging. Any user who recognises their industry in the ribbon and feels seen is significantly more likely to continue scrolling. The ribbon creates multiple moments of recognition across the 12 sectors simultaneously. The CTA directs high-intent sector-specific visitors to the full Industries page.

---

## Section 5 — Leadership Network

### Purpose
Put faces to the firm. This is the moment the visitor stops evaluating the institution and starts evaluating the people. The section must transform the perceived abstract firm into a set of real, credible, distinct human beings. Trust in a law firm is ultimately trust in the people, not the brand.

### Content Source
- Eyebrow: "Our People"
- Headline: "The team behind the strategy."
- First 3 people from `lib/content.ts` TEAM (to be replaced with real data):
  - Omar Al Mansoori — Founding Partner — "Over 20 years advising multinationals on corporate transactions and complex arbitration across the Middle East."
  - Sara Khalil — Partner, Dispute Resolution — "A formidable litigator with a track record of high-value commercial disputes before the DIFC courts."
  - James Whitfield — Partner, Corporate — "Specialises in cross-border M&A, joint ventures and structuring for the region's fastest-growing companies."
- CTA: "Meet the Full Team" → `/people`

### Assets Used
- Portrait images (temporary): `public/team/partner-1.png`, `partner-2.png`, `partner-3.png`
- Portrait images (to replace with real): `Potraits/AbdelRehman Atef Barakat.png`, `Potraits/Amira Siddiqui.png`, `Potraits/Asaf Rizvi.png` (or whichever 3 are mapped to senior roles once real data is aligned)

### Layout Concept
Not a card row. A **full-bleed portrait stage**.

The section uses the full viewport width. Three large portrait images are positioned side by side, filling the available width at approximately 33% each. The images are tall (portrait orientation, not square), giving each person a commanding presence rather than a thumbnail slot.

- Each portrait occupies the full section height
- Portrait images have a subtle dark gradient overlay at the bottom third
- Name, role, and bio sit within the lower portion of each portrait (overlaid on the gradient)
- At rest: name and role visible; bio is hidden below the frame
- On hover: bio slides up from below the name; portrait subtly zooms in (scale 1 → 1.04); name gains accent underline

The section headline and eyebrow sit above the portrait row, left-aligned, at normal document flow. Below the portrait row, the CTA sits right-aligned, balanced against the headline.

### Scroll Behavior
- The portrait row has a mild vertical parallax: as the user scrolls down through the section, the portraits move upward slightly more slowly than the scroll velocity — creating a sense of the portraits emerging from below the page
- No scroll pinning on this section — it scrolls naturally

### Hover Behavior
- **Portrait hover:** Scale `1 → 1.04` over 400ms ease-out; the gradient overlay deepens slightly; bio text slides up from `y: 20 → 0`, `opacity: 0 → 1`, 300ms
- **Name on hover:** Accent color underline draws from left to right, 200ms
- **Role on hover:** No additional change — it stays at its existing opacity
- **CTA button:** Magnetic hover — shifts toward cursor 4px within 60px radius; underline draw on direct hover

### Mobile Behavior
- The three portraits collapse to a single-column vertical stack
- Each portrait is displayed at full width, 60vw height
- Bio is always visible below the portrait (not on hover) since touch has no hover state
- Touch scroll navigates through them naturally
- No parallax on mobile (performance)
- The name + role overlay remains; bio moves below the portrait image rather than being overlaid

### Animation Behavior
- **Section entry:** Eyebrow and headline slide in (`y: 20 → 0`, `opacity: 0 → 1`, 500ms, stagger 120ms)
- **Portrait entry:** The three portraits stagger in with a slight upward drift — `y: 40 → 0`, `opacity: 0 → 1`. Person 1 at 0ms, Person 2 at 120ms, Person 3 at 240ms. Duration 700ms each with ease-out cubic. This creates a sense of each person stepping forward one after another.
- **Bio reveal (on hover):** `y: 16 → 0`, `opacity: 0 → 1`, 280ms, ease-out. Bio slides up within the portrait frame.
- **Portrait exit:** No special exit animation

### Transition Behavior
- Entry: staggered portrait entrance as described above
- Exit: standard scroll — section exits naturally

### Conversion Objective
Build the personal trust that converts a considered prospect into a person who picks up the phone or submits the form. The CTA ("Meet the Full Team") drives visitors who want to see more people or find the right specialist for their matter. This section's conversion is largely emotional — it is the moment a visitor stops thinking "can this firm help me?" and starts thinking "I want to work with these people."

---

## Section 6 — Client Impact Stories

### Purpose
Let clients speak instead of the firm. Video testimonials carry a trust weight that no amount of credentials can match. This section is the peak social proof moment of the homepage — it removes the final objection ("but has this firm actually done this before?") by showing real humans describing real results.

### Content Source
- Eyebrow: "Client Stories"
- Headline: "Trusted by businesses across the region."
- Subtext: "500+ clients advised. 98% retention rate."
- Featured reel: `videos/Clients/Collection_Video-1.mp4` — multi-client compilation
- Individual testimonials:
  - Jalpa — `videos/Clients/Jalpa_Testimonial.mp4`
  - Mostafa — `videos/Clients/Mostafa_Testimonial.mp4`
  - Shadhad — `videos/Clients/Shadhad_testimonial.mp4`
  - Srinivas Singh — `videos/Clients/Srinivas_Singh.mp4`
- CTA: "See All Client Stories" → `/clients`

### Assets Used
- `videos/Clients/Collection_Video-1.mp4`
- `videos/Clients/Jalpa_Testimonial.mp4`
- `videos/Clients/Mostafa_Testimonial.mp4`
- `videos/Clients/Shadhad_testimonial.mp4`
- `videos/Clients/Srinivas_Singh.mp4`

### Layout Concept
Not a thumbnail grid. A **cinematic two-act layout**.

**Act 1 — The Reel (full width):**
The collection video dominates the upper half of the section. It is treated as an editorial film still at rest — the first frame is shown as a high-quality poster. The video is displayed at approximately 16:9, spanning the full content width. A large play button sits at center. The section headline and eyebrow appear above it, and the stat strip ("500+ clients · 98% retention") sits directly below the video.

**Act 2 — The Four Voices (below the reel):**
The four individual testimonial videos are displayed as a horizontal row. Each is a portrait-ratio format (9:16 or close to it), tall and narrow. The client's first name appears below their video in large type. These are not cards — they are film stills in a sequence, like a contact sheet from a photo shoot.

The layout reads: **wide reel on top → four tall portrait films below** — the same way a film festival presents a documentary and its subjects.

### Scroll Behavior
- On scroll entry: the section headline and eyebrow reveal first, then the reel poster image slides up from `y: 40`, then the four individual videos stagger in from below
- The reel begins playing (muted, autoplay) once 50% of the video element is in the viewport
- The four individual videos do not autoplay — they wait for explicit interaction

### Hover Behavior
- **Reel on hover:** Play button pulses (scale `1 → 1.1 → 1`, looping); a subtle vignette appears around the frame edges
- **Individual video on hover:** Portrait scales very slightly (`1 → 1.02`); client name shifts to accent color; a play button icon fades in at center
- **Hover on any individual video:** The other three dim slightly to 70% opacity — focusing attention on the hovered one
- **CTA button:** Magnetic hover

### Mobile Behavior
- Reel is displayed at full width; height is proportional to viewport width (16:9 ratio)
- The four individual portraits become a horizontally scrollable strip (swipe to see all four)
- Each portrait is approximately 70vw wide with 16px gap
- Client name is always visible below (not hover-triggered)
- CTA is full-width below the strip

### Animation Behavior
- **Section entry:** Eyebrow + headline — `y: 20 → 0`, `opacity: 0 → 1`, stagger 120ms, 500ms duration
- **Reel entry:** `y: 40 → 0`, `opacity: 0 → 1`, 600ms ease-out cubic, after headline settles
- **Individual videos entry:** Stagger in from bottom — `y: 48 → 0`, `opacity: 0 → 1`, 100ms stagger, 500ms duration each. Left to right sequence: Jalpa → Mostafa → Shadhad → Srinivas Singh
- **Play button on reel:** Continuous pulse animation on the play icon — scale `1 → 1.15 → 1`, period 2s, ease-in-out
- **Video modal open:** Overlay fades in (`opacity: 0 → 1`, 200ms); modal scales from `scale: 0.9 → 1`, 250ms ease-out spring
- **Video modal close:** Reverse — modal scales `1 → 0.9`, overlay fades out, 200ms

### Transition Behavior
- Entry: staggered reveal as described
- Exit: standard scroll exit — no special transition
- Modal: overlay and modal animate together on open/close

### Conversion Objective
This is the highest-trust section on the page. After watching even 15 seconds of the collection reel, a qualified prospect's conversion likelihood is meaningfully higher. The objective is to drive the watch — not the click. The CTA to `/clients` is secondary; the primary goal is immersion in the testimonials. Visitors who watch one testimonial video on the homepage are significantly more likely to reach the Contact section and submit.

---

## Section 7 — CSR Impact Engine

### Purpose
Reveal the firm's values in action. A prospect who sees genuine civic engagement — not tokenistic mentions of charity, but real campaigns with real presence — forms a more complete picture of the firm as an institution. This section is also a differentiator: most law firms do not surface CSR on their homepage. Lawgical Group does, because it is part of who they are.

### Content Source
- Eyebrow: "Our Impact"
- Headline: "Law with a conscience."
- Body: One paragraph — the firm's belief that legal practice and social responsibility are inseparable
- Campaign tiles (4 of the 5 CSR videos — all visible here, 5th shown on CSR page):
  1. Breast Cancer Awareness — `videos/CSR/Breast-Cancer-Awareness.mov`
  2. International Stress Awareness Day — `videos/CSR/International Stress Awareness Day-UK-Horizontal.mp4`
  3. International Day of Education — `videos/CSR/Website-International-Day-of-Education.mp4`
  4. World Gratitude Day — `videos/CSR/World Gratitude Day.mov`
- CTA: "Explore Our CSR Work" → `/csr`

### Assets Used
- `videos/CSR/Breast-Cancer-Awareness.mov`
- `videos/CSR/International Stress Awareness Day-UK-Horizontal.mp4`
- `videos/CSR/Website-International-Day-of-Education.mp4`
- `videos/CSR/World Gratitude Day.mov`

### Layout Concept
Not a 2×2 grid. A **two-column editorial narrative**.

**Left column (45%):** The text story. Eyebrow, headline, body paragraph, and CTA. The text is anchored and stationary. It is the narrative spine of the section.

**Right column (55%):** A **stacked film strip** of the 4 CSR videos, each displayed as a static poster (first frame) with a campaign title and a small play icon. The strip scrolls independently of the left text column as the user scrolls — creating a sense of an ongoing feed of initiatives, not a finite list.

The film strip is taller than the viewport — the bottom clips off — implying there is more beyond what is visible. This visual device suggests the CSR work is continuous and active, not a one-time PR exercise.

### Scroll Behavior
- The left column pins while the user scrolls through the right film strip
- The right strip scrolls at 80% of normal scroll velocity (parallax slow-scroll)
- After the bottom of the right strip comes into view, the section unpins and scrolling continues normally

### Hover Behavior
- **Campaign tile on hover:** Video autoplays muted within the tile (no sound, no controls); campaign title brightens; a play icon fades in at center-bottom of the tile
- **Campaign title text on hover:** Accent color, underline draws left to right
- **Play icon on hover:** Scale `1 → 1.2`, ease spring
- **CTA button:** Magnetic hover

### Mobile Behavior
- Two-column layout collapses to single-column
- Text section appears first (full width)
- Film strip becomes a vertically scrolling sequence of tiles, each full width
- Poster stills are shown at full width; tap opens modal with full video
- Scroll pinning is disabled; all sections scroll naturally

### Animation Behavior
- **Section entry:** Left column — eyebrow, headline, body paragraph stagger in from left, `x: -20 → 0`, `opacity: 0 → 1`, 500ms, 80ms stagger
- **Right film strip entry:** Each tile slides in from the right, staggered at 120ms, `x: 40 → 0`, `opacity: 0 → 1`, 600ms each
- **Hover video preview:** Video fades in over the poster image — `opacity: 0 → 1`, 400ms — as the `<video>` element behind the poster begins playing
- **Modal open/close:** Same as Client Stories modal — overlay fade + modal scale spring

### Transition Behavior
- Entry: text and film strip enter from their respective sides simultaneously but staggered
- Exit: section unpins and scrolls naturally once the strip is fully in view; no special exit

### Conversion Objective
Not a direct conversion point — this section builds brand depth. The objective is emotional: the visitor should leave this section feeling that Lawgical Group is a firm with a point of view, not just a service provider. Visitors who engage with this section are more likely to form a long-term relationship with the firm (higher retention, referrals). The CTA drives visitors who want to explore the full CSR story.

---

## Section 8 — Regional Presence

### Purpose
Signal that this is not a local practice with local ambitions. Lawgical Group operates across the GCC and MENA. This section answers the question prospects from Saudi Arabia, Qatar, Bahrain, or beyond might ask: "Are they relevant to my market?" It surfaces the firm's regional reach without requiring the visitor to navigate to the LLA page.

### Content Source
- Eyebrow: "Regional Presence"
- Headline: "Regional reach. Local depth."
- Subtext: One sentence — advising clients across the GCC and MENA from their Dubai base
- Primary office: Level 21, Boulevard Plaza Tower 1, Downtown Dubai, UAE (`lib/site.ts` CONTACT_DETAILS)
- Regions served (to be confirmed with real data — placeholder list):
  - UAE (primary)
  - Saudi Arabia
  - Qatar
  - Bahrain
  - Kuwait
  - Oman
  - Egypt
  - International / UK
- CTA: "Explore Our Regional Network" → `/lla`

### Assets Used
- `public/dubai-skyline.png` — used as a visual anchor for the Dubai primary office
- `public/about-office.png` — optionally used as an office interior visual

### Layout Concept
Not a bullet list of countries. A **kinetic geographic text composition**.

The section background is dark (consistent with the hero and CTA sections). On the left, large typographic region names are listed vertically in a staggered, slightly rotated layout — like coordinates on a map annotation. Each region name is at a different opacity and size, suggesting proximity: UAE largest and most opaque, further regions smaller and more translucent.

On the right, a **simplified abstract map outline** of the GCC/MENA region is rendered in thin lines (SVG or canvas). Active jurisdictions are marked with a pulsing dot. The dots connect to their region names on the left with thin, animated lines — like a network diagram.

The primary office detail (address, phone, email, hours) sits below the composition in clean, readable small type.

### Scroll Behavior
- On scroll entry: region names slide in from the left, staggered by distance (UAE first, then outward by geography)
- Map outline draws on scroll entry — the SVG path `stroke-dashoffset` animates from full to zero, drawing the map outline as the section enters
- Dots on the map appear after the outline is drawn, each pulsing once on arrival
- Section scrolls at standard speed — no pinning

### Hover Behavior
- **Region name on hover:** Opacity increases to 100%, accent color; the corresponding dot on the map pulses with a larger ring; the connecting line brightens
- **Map dot on hover:** Tooltip appears with region name and a one-line descriptor (e.g., "DIFC & ADGM jurisdiction")
- **CTA button:** Magnetic hover

### Mobile Behavior
- The two-column layout collapses to single-column
- The map is shown as a simplified version or replaced by the Dubai skyline image
- Region names are listed as a clean single-column text list with small accent dots
- Office contact details remain below in full
- CTA is full-width

### Animation Behavior
- **Map outline draw:** SVG `stroke-dashoffset` animation — 1200ms, ease-in-out, triggered on scroll entry
- **Region name entrance:** Each name enters with `x: -24 → 0`, `opacity: 0 → 1`, staggered by 80ms (UAE first), 500ms duration
- **Map dots appearance:** Fade in after map outline completes — `scale: 0 → 1`, `opacity: 0 → 1`, 300ms, staggered 60ms
- **Connecting lines:** Draw from name to dot after dots appear — thin line extends from left anchor point to map dot, 400ms each
- **Office details:** Simple `opacity: 0 → 1` after map composition completes, 400ms

### Transition Behavior
- Entry: map draws as the section enters viewport, triggered once, `once: true`
- Exit: standard scroll — no special exit

### Conversion Objective
Intercept cross-border visitors who might otherwise assume the firm is Dubai-only. The section does not need to convince — it just needs to plant the flag of regional reach. Visitors who see their own market represented are more likely to continue to Contact. The CTA drives deeper exploration via the LLA page.

---

## Section 9 — Insights Hub

### Purpose
Demonstrate ongoing intellectual engagement with the markets and issues affecting clients. Insights are not just content — they are proof that the firm's practitioners are actively thinking, not just executing. One strong article can convince a prospect that the firm understands their specific regulatory or commercial challenge better than they expected.

### Content Source
- Eyebrow: "Insights"
- Headline: "Intelligence that moves with the market."
- Featured article (from `lib/content.ts` ARTICLES, featured: true):
  - "What the 2026 UAE Arbitration Reforms Mean for Businesses"
  - Category: Arbitration · Jun 2, 2026 · 6 min read
  - Image: `public/news/article-featured.png`
- Supporting articles (3 of 4 non-featured, from `lib/content.ts` ARTICLES):
  1. Structuring Joint Ventures Across the GCC — Corporate — `public/news/article-1.png`
  2. Enforcing Foreign Judgments Through the DIFC — Litigation — `public/news/article-2.png`
  3. Debt Recovery: A Practical Playbook for 2026 — Debt Collection — `public/news/article-3.png`
- CTA: "Read All Insights" → `/insights`

### Assets Used
- `public/news/article-featured.png`
- `public/news/article-1.png`
- `public/news/article-2.png`
- `public/news/article-3.png`

### Layout Concept
Not a standard news grid. An **editorial magazine layout**.

**The featured article** occupies approximately 60% of the section width and full section height on the left. It is an immersive editorial piece — the image fills the entire left block, title and excerpt are overlaid on a dark gradient at the bottom, with category badge, date, and read time in small type above the title. The entire block is a link.

**The three supporting articles** occupy the right 40% as a vertical stack — three compact editorial rows. Each row has a small image on the left (approximately 80×80px), category badge, title (2 lines max), and date on the right. No excerpts — just enough to identify the article. The tight vertical stack feels like a newspaper's "also in this issue" column.

This creates a clear editorial hierarchy: one story leads, three follow. It is not a democratic grid — it is a curated front page.

### Scroll Behavior
- On scroll entry: featured article image parallaxes slightly (moves at 80% scroll speed within its container, creating a subtle zoom effect)
- The three secondary articles stagger in from the right as the section enters viewport
- No scroll pinning — the section behaves normally

### Hover Behavior
- **Featured article on hover:** Image zooms slightly (`scale: 1 → 1.03`), gradient overlay deepens; category badge shifts to accent background; title gains a subtle underline
- **Secondary article row on hover:** Row background darkens slightly; title shifts to accent color; the small image scales very slightly (`scale: 1 → 1.06`)
- **CTA button:** Magnetic hover; underline draw on text link variant

### Mobile Behavior
- Featured article becomes a full-width stacked card (image top, content below — not overlaid)
- Three secondary articles stack below as full-width rows with left image + right text
- Featured image height reduces to approximately 50vw
- CTA is full-width below all articles

### Animation Behavior
- **Section entry:** Eyebrow and headline — `y: 20 → 0`, `opacity: 0 → 1`, 500ms, stagger 120ms
- **Featured article entry:** `y: 30 → 0`, `opacity: 0 → 1`, 700ms ease-out cubic
- **Secondary articles entry:** Stagger from right — `x: 24 → 0`, `opacity: 0 → 1`, 80ms stagger, 500ms duration each
- **Image parallax:** Continuous while the section is in viewport — implemented with Framer Motion `useScroll` + `useTransform`

### Transition Behavior
- Entry: featured and secondary articles enter together but with slight stagger
- Exit: standard scroll — no special exit

### Conversion Objective
Convert intellectual curiosity into an exploratory visit to `/insights`. Visitors who read even the headline of the featured article and find it relevant are significantly more likely to view the firm as a thought partner, not just a service provider. The objective is also SEO — well-titled insights on the homepage signal content depth to search engines. Individual article pages (`/insights/[slug]`) are the deeper conversion point; this section drives the traffic.

---

## Section 10 — Contact Experience

### Purpose
The final beat of the homepage narrative. By this point, the visitor has seen the firm's expertise, sector knowledge, people, client proof, values, and regional presence. The contact section is not a desperate "don't leave" plea — it is a confident, unhurried invitation extended by a firm that knows its own worth. The tone is warm and direct.

### Content Source
- Headline: "Ready to talk strategy?"
- Body: One short line — "Let's start with a conversation."
- CTA primary: "Book a Consultation" → `/contact`
- CTA secondary: Direct email — `hello@lawgicalgroup.ae` (from `lib/site.ts` CONTACT_DETAILS)
- Secondary: Phone — `+971 4 123 4567` (from `lib/site.ts`)

### Assets Used
- No image assets — this section is purely typographic
- Contact details from `lib/site.ts` CONTACT_DETAILS

### Layout Concept
Full-viewport-height dark section. Absolute typographic center. No visual noise.

- The headline is at display scale — the largest type on the page after the hero headline
- The body line sits below in a smaller, lighter weight
- Two CTAs sit below: primary solid button left, secondary email link right (or stacked on mobile)
- At the very bottom of the section, the phone number and email address are displayed in small text as direct-contact anchors

The section's emptiness is intentional. After ten sections of rich content, the contrast of a quiet, spacious dark section with a single direct question creates maximum psychological weight for the headline.

### Scroll Behavior
- No scroll pinning — this section scrolls normally
- A faint vertical line or gradient at the top of the section signals the transition from light content to dark — a visual breath before the final statement

### Hover Behavior
- **Primary CTA:** Magnetic hover — button shifts toward cursor 5px within 70px radius; background shifts from primary to accent on hover
- **Email link:** Underline draws from left to right on hover; color shifts to accent
- **Phone number:** Same underline draw behavior as email

### Mobile Behavior
- Headline scales down but remains large and dominant
- CTAs stack vertically — primary button full-width, email link centered below it
- Phone and email in small text at the bottom remain clickable (tel: / mailto: links)
- Background and spacing identical to desktop

### Animation Behavior
- **Section entry (scroll into view):** Headline animates character-by-character — each character fades in sequentially, `opacity: 0 → 1`, with a 30ms stagger per character and a `y: 8 → 0` drift. Duration per character: 200ms. Total animation time: approximately 800ms for "Ready to talk strategy?"
- **Body line:** Fades in after headline completes, `opacity: 0 → 1`, `y: 8 → 0`, 400ms
- **CTAs:** Fade in together after body settles, `opacity: 0 → 1`, `y: 8 → 0`, 400ms
- **Character-by-character trigger:** Fires once when the section top crosses 60% of the viewport height from the top — `once: true`
- **Background:** The dark background fades in as the section enters the viewport, creating a gentle darkening effect as the user approaches the end of the page

### Transition Behavior
- **Entry from above:** The dark background expands from the bottom of the viewport upward as the user scrolls toward it — giving a sense of the section rising to meet the visitor
- **Exit into footer:** The footer appears below with no hard border; the dark background of this section and the footer share the same tone, creating visual continuity

### Conversion Objective
This is the homepage's final conversion opportunity. Any visitor who has scrolled to this section has consumed the entire homepage argument. The character-by-character headline animation creates a micro-moment of engagement — the visitor watches the question form — which increases time-on-section and dwell time before the decision to click or scroll away. The direct email and phone serve visitors who prefer not to use a form. The goal is maximum conversion from the most engaged visitors on the page.

---

## Section 11 — Footer Experience

### Purpose
Close the homepage as a complete experience, not as an afterthought. The footer must be as considered as every other section — it is the last impression, and it doubles as a navigation hub for return visitors who know exactly where they want to go. It should feel editorial, not administrative.

### Content Source
- Brand: `public/logo.png` · Tagline: "Reimagining legal services for the modern world."
- Navigate (all 9 new page links):
  Home · Expertise · Industries · People · Clients · CSR · LLA · Insights · Contact
- Practice Areas (from `lib/content.ts` SERVICES):
  Corporate Law · Arbitration · Litigation · Debt Collection · Regulatory & Compliance · Strategic Advisory
- Get in Touch (`lib/site.ts` CONTACT_DETAILS):
  - Address: Level 21, Boulevard Plaza Tower 1, Downtown Dubai, UAE
  - Phone: +971 4 123 4567
  - Email: hello@lawgicalgroup.ae
  - Hours: Sunday – Thursday, 9:00 – 18:00 GST
- Bottom bar: © [year] Lawgical Group. All rights reserved. · Downtown Dubai, UAE

### Assets Used
- `public/logo.png`

### Layout Concept
The footer continues the dark aesthetic from the Contact section above it, creating a unified dark conclusion to the homepage.

Four columns at desktop:
1. **Brand column:** Logo (white version or inverted), tagline in muted small text, social media icon slots (placeholder — no handles yet)
2. **Navigate column:** 9 page links in compact type
3. **Practice Areas column:** 6 service links
4. **Get in Touch column:** Address (2 lines), phone, email, hours — each with a small icon

The four columns are separated by generous gutters, not dividers. The layout feels open, not cramped.

Below the four columns, a full-width rule line, then the bottom bar — copyright left, location right.

### Scroll Behavior
The footer is not animated by scroll. It exists outside the main page scroll canvas as a static element. Its entry is the transition from the Contact section — there is no fade in or slide in; the footer is simply present when the user arrives at the bottom.

### Hover Behavior
- **Navigation links:** Underline draw from left to right on hover — `scaleX: 0 → 1` on a pseudo-element, 200ms ease-out
- **Practice area links:** Same underline draw behavior
- **Email link:** Accent color on hover + underline draw
- **Phone link:** Accent color on hover
- **Social icon slots (when activated):** Scale `1 → 1.2`, color shift to accent, 150ms

### Mobile Behavior
- Four columns collapse to a 2×2 grid on tablet
- On mobile (< 640px): single-column stack — Brand → Navigate → Practice Areas → Get in Touch → Bottom bar
- Each column heading gains a small right-pointing chevron on mobile to indicate expandability (accordion behavior optional)
- Bottom bar remains as two rows on mobile: copyright above, location below

### Animation Behavior
- The footer has no scroll-triggered animation — it is present and static
- Link hover underline draws are CSS transitions only — no JavaScript required
- Social icon hover is a CSS transform scale — no JavaScript required

### Transition Behavior
- The footer flows directly from the Contact section. The shared dark background means there is no visual break — the page simply continues into the footer.
- The full-width rule above the bottom bar provides the only visual separator

### Conversion Objective
Secondary navigation and return-visitor orientation. The footer is the recovery mechanism for visitors who browsed the homepage, got distracted, and returned — they can navigate directly to the section they remember without scrolling through the entire page again. The direct contact details (email, phone) in the footer serve visitors who prefer spontaneous contact over form submission.

---

## Scroll Journey Summary

```
Arrival Sequence      → 0.0 – 0.8s      Temporal only — no scroll
Section 1 (Hero)      → 0vh – 100vh     Full viewport, particle canvas
Section 2 (Expertise) → 100vh – 700vh   Pinned for 600vh, auto-advances 6× practice areas
Section 3 (Industries)→ 700vh – 900vh   Ribbon scrolls continuously at natural scroll speed
Section 4 (Leadership)→ 900vh – 1100vh  Parallax portraits, natural scroll
Section 5 (Clients)   → 1100vh – 1350vh Reel + four portrait films, natural scroll
Section 6 (CSR)       → 1350vh – 1600vh Pinned left column while film strip scrolls
Section 7 (Regional)  → 1600vh – 1750vh Map draws on entry, natural scroll
Section 8 (Insights)  → 1750vh – 1950vh Editorial layout, image parallax
Section 9 (Contact)   → 1950vh – 2050vh Dark, full-viewport typographic close
Footer                → 2050vh+          Static, dark, editorial
```

> Note: Viewport heights above are approximations for planning purposes. Actual lengths depend on content density and typography at implementation time.

---

## Animation Principles (Global for Homepage)

| Principle | Rule |
|-----------|------|
| **Entry direction** | Content enters from below or from its natural reading direction (left for LTR) — never from above or right |
| **Easing** | All enter animations use ease-out cubic or `[0.22, 1, 0.36, 1]` (deceleration). No linear. No ease-in for entries. |
| **Exit direction** | Content exits upward or fades — never downward |
| **Stagger** | Sibling elements stagger at 60–120ms intervals — never all at once, never more than 200ms apart |
| **Duration** | Entrance: 400–700ms. Hover: 150–300ms. Pinned transitions: 200–300ms per state. |
| **Once only** | All scroll-triggered animations fire `once: true` — no re-triggering on scroll back |
| **Reduced motion** | All Framer Motion animations respect `useReducedMotion` — duration collapses to 0, translate values collapse to 0, opacity transitions remain |
| **No layout shift** | No animation causes cumulative layout shift (CLS) — all animated elements have reserved space |
| **Canvas perf** | Particle field and map canvas pause when out of viewport (IntersectionObserver) |

---

## Content Completeness Status

| Section | Content Ready | Assets Ready | Notes |
|---------|--------------|--------------|-------|
| Arrival Sequence | Yes | Yes | Logo only |
| Hero | Yes | Yes (particle-field exists) | Copy needs final polish |
| Expertise Ecosystem | Yes | Yes (Lucide icons) | All 6 services defined |
| Industry Intelligence | Yes | — | All 12 industries defined |
| Leadership Network | Placeholder | Placeholder | Real portraits in `Potraits/` need data alignment |
| Client Impact Stories | — | Yes (videos exist) | Client names and context needed beyond first names |
| CSR Impact Engine | — | Yes (videos exist) | Campaign descriptions needed |
| Regional Presence | Partial | Yes (dubai-skyline.png) | Jurisdiction details need real data |
| Insights Hub | Yes | Yes (article images) | Articles exist as title + excerpt; full body needed for detail pages |
| Contact Experience | Yes | — | Contact details confirmed |
| Footer | Yes | Yes (logo) | Social links pending |

---

*End of Homepage Blueprint V2.*
