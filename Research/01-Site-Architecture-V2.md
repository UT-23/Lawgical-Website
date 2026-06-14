# Site Architecture V2 — Lawgical Group
**Source of truth:** Repository-Audit.md  
**Principle:** Not a law firm website. A legal intelligence platform.  
**Date:** 2026-06-10

---

## Navigation Map

```
/                   Home
/expertise          Expertise         (replaces /services)
/industries         Industries        (existing, elevated)
/people             People            (replaces /team)
/clients            Clients           (new — testimonial videos + wall)
/csr                CSR               (new — CSR video hub)
/lla                LLA               (new — regional presence map)
/insights           Insights          (replaces /news)
/contact            Contact           (existing, elevated)
```

### New Navigation Order (Navbar)
```
Logo  |  Expertise · Industries · People · Clients · CSR · LLA · Insights  |  [Book a Consultation]
```

### Retired Routes (content migrated)
- `/about` — absorbed into Home (firm positioning) and People (values + culture)
- `/services` — renamed `/expertise`
- `/team` — renamed `/people`
- `/news` — renamed `/insights`

---

## Global Layout

### Navbar
- **Component:** `components/navbar.tsx` (extend existing)
- **Left:** `public/logo.png` — wordmark
- **Center:** 7 navigation links with active state indicator
- **Right:** "Book a Consultation" CTA → `/contact`
- **Behavior:** Transparent on load → glass morphism + border after 10px scroll
- **Mobile:** Hamburger → staggered slide-down menu
- **Interaction:** Magnetic hover on CTA button; smooth active link underline animation

### Footer
- **Component:** `components/footer.tsx` (extend existing)
- **Column 1 — Brand:** Logo + tagline "Reimagining legal services for the modern world." + social links (placeholder slots)
- **Column 2 — Navigate:** All 9 page links from new nav
- **Column 3 — Practice Areas:** Corporate Law · Arbitration · Litigation · Debt Collection · Regulatory & Compliance · Strategic Advisory
- **Column 4 — Get in Touch:** Address, phone, email, hours
- **Bottom bar:** Copyright © [year] Lawgical Group · Downtown Dubai, UAE
- **Content source:** `lib/site.ts` (CONTACT_DETAILS), `lib/content.ts` (SERVICES for practice areas)
- **Interaction:** Reveal animation on scroll into view; links with hover underline slide

---

## Page 1 — Home

**Route:** `/`  
**File:** `app/page.tsx`

### Purpose
Establish Lawgical Group as a category-defining legal intelligence platform. Convert first-time visitors into believers before they read a single word. Serve as the primary conversion gateway to Expertise, People, and Contact.

### User Goal
Understand within 10 seconds what this firm does, who it serves, and why it is different from every other law firm in the region. Find a path to a relevant service or a consultation.

### Business Goal
Create a memorable first impression that earns trust, signals premium positioning, and drives qualified enquiries via the "Book a Consultation" CTA. Surface all major practice areas and differentiators without requiring the user to navigate away.

---

### Sections

#### Section 1 — Hero
- **Headline:** "Legal Solutions, Reimagined"
- **Subheadline:** Short positioning sentence — Dubai-based, modern legal intelligence
- **Background:** `ParticleField` canvas animation — particles connect into nodes representing Expertise, Industries, and Regions
- **CTAs:** "Explore Our Expertise" → `/expertise` · "Book a Consultation" → `/contact`
- **Stats row (4 counters):**
  - 20+ Years experience
  - 500+ Clients advised
  - 4 Core practices
  - 98% Client retention
- **Content source:** `lib/site.ts`, `components/hero.tsx`
- **Assets:** `components/particle-field.tsx` (existing canvas animation)
- **Interaction:** Stats animate as counting numbers on mount; CTA buttons have magnetic hover pull; particle nodes pulse on cursor proximity

#### Section 2 — Firm Positioning
- **Eyebrow:** "About Lawgical Group"
- **Headline:** Who we are and what sets us apart
- **Body:** 2–3 sentences on the firm — Dubai base, regional expertise paired with modern technology, tailored legal solutions, integrity
- **Image:** `public/about-office.png` (office interior) or `public/dubai-skyline.png`
- **Values strip (4 tiles):**
  - Integrity — Honest counsel, always
  - Client Focus — Your goals lead the strategy
  - Precision — Detail-driven execution
  - Innovation — Modern legal thinking
- **Content source:** About page copy (existing), `lib/content.ts` values
- **Assets:** `public/about-office.png`, `public/dubai-skyline.png`
- **Interaction:** `Reveal` component — fade + slide on scroll; image parallax on scroll

#### Section 3 — Expertise Ecosystem
- **Eyebrow:** "Our Expertise"
- **Headline:** "Six practice areas. One integrated firm."
- **Layout:** Interactive node/card grid — 6 service cards
- **Cards (all 6 services from `lib/content.ts`):**
  1. Corporate Law — Company formation, M&A, Commercial contracts
  2. Arbitration — DIAC & ICC, Award enforcement, Dispute strategy
  3. Litigation — Civil & commercial disputes, DIFC courts, Appeals
  4. Debt Collection — Amicable settlement, Legal recovery, Cross-border claims
  5. Regulatory & Compliance — AML & KYC, Data protection, Corporate governance
  6. Strategic Advisory — Risk management, Board advisory, Structuring
- **CTA:** "View All Expertise" → `/expertise`
- **Content source:** `lib/content.ts` SERVICES array
- **Assets:** Lucide icons (Briefcase, Landmark, Gavel, FileSearch, ShieldCheck, Scale)
- **Interaction:** `ServiceCard` hover lift (`-translate-y-1`) and border color shift; staggered reveal on scroll

#### Section 4 — Industries Preview
- **Eyebrow:** "Industries We Serve"
- **Headline:** "Sector knowledge that changes the advice."
- **Layout:** Scrolling tag cloud or horizontal marquee of all 12 industry names
- **Stats row:**
  - 12+ Industries served
  - 500+ Matters handled
  - 15+ Years combined practice
- **CTA:** "Explore Industries" → `/industries`
- **Content source:** `lib/content.ts` INDUSTRIES array (all 12)
- **Assets:** None — text only
- **Interaction:** Auto-scrolling horizontal ticker; items pause on hover; stats count up on scroll entry

#### Section 5 — Leadership Preview
- **Eyebrow:** "Our People"
- **Headline:** "The team behind the strategy."
- **Layout:** Horizontal scroll or 3-up portrait row — show 3 key people
- **People shown:** First 3 entries from TEAM (Omar Al Mansoori, Sara Khalil, James Whitfield)
- **Each card:** Portrait image · Name · Role · Short bio teaser
- **CTA:** "Meet the Full Team" → `/people`
- **Content source:** `lib/content.ts` TEAM array (first 3)
- **Assets:** `public/team/partner-1.png`, `partner-2.png`, `partner-3.png` (to be replaced with `Potraits/` files)
- **Interaction:** Portrait hover — depth parallax shift on the image; name + role slide up

#### Section 6 — Client Stories Preview
- **Eyebrow:** "Client Stories"
- **Headline:** "Trusted by businesses across the region."
- **Layout:** Video reel embed — `Collection_Video-1.mp4` as the featured piece; 4 individual testimonial thumbnails below
- **Testimonials listed:** Jalpa · Mostafa · Shadhad · Srinivas Singh
- **CTA:** "See All Client Stories" → `/clients`
- **Content source:** `videos/Clients/` folder
- **Assets:** `videos/Clients/Collection_Video-1.mp4`, `videos/Clients/Jalpa_Testimonial.mp4`, `videos/Clients/Mostafa_Testimonial.mp4`, `videos/Clients/Shadhad_testimonial.mp4`, `videos/Clients/Srinivas_Singh.mp4`
- **Interaction:** Collection reel plays on scroll into view (muted, autoplay); individual thumbnails play on hover; click opens full-screen modal

#### Section 7 — CSR Snapshot
- **Eyebrow:** "Our Impact"
- **Headline:** "Law with a conscience."
- **Layout:** 2-column — text left, video grid right (2×2 CSR clips)
- **Body:** Short statement on the firm's commitment to social responsibility
- **Videos shown (up to 4):** Breast-Cancer-Awareness · International Stress Awareness Day · Website-International-Day-of-Education · World Gratitude Day
- **CTA:** "Explore Our CSR Work" → `/csr`
- **Content source:** `videos/CSR/` folder
- **Assets:** `videos/CSR/Breast-Cancer-Awareness.mov`, `videos/CSR/International Stress Awareness Day-UK-Horizontal.mp4`, `videos/CSR/Website-International-Day-of-Education.mp4`, `videos/CSR/World Gratitude Day.mov`
- **Interaction:** Video thumbnails reveal on scroll; muted autoplay on hover

#### Section 8 — Insights Preview
- **Eyebrow:** "Insights"
- **Headline:** "Intelligence that moves with the market."
- **Layout:** Featured article large card + 3 secondary cards
- **Featured article:** "What the 2026 UAE Arbitration Reforms Mean for Businesses" — `news/article-featured.png`
- **Supporting 3:** Structuring JVs · Enforcing Foreign Judgments · Debt Recovery Playbook
- **CTA:** "Read All Insights" → `/insights`
- **Content source:** `lib/content.ts` ARTICLES array
- **Assets:** `public/news/article-featured.png`, `public/news/article-1.png`, `public/news/article-2.png`, `public/news/article-3.png`
- **Interaction:** `ArticleCard` hover — image scale-105, border color; featured card parallax image on scroll

#### Section 9 — Contact CTA (Immersive)
- **Headline:** "Ready to talk strategy?"
- **Body:** One line — invite to book a consultation
- **CTA:** "Book a Consultation" → `/contact`  ·  "hello@lawgicalgroup.ae"
- **Background:** Full-bleed dark section — near-black or primary navy
- **Content source:** `lib/site.ts` CONTACT_DETAILS
- **Assets:** None — typographic only
- **Interaction:** Headline animates character by character on scroll entry; CTA magnetic button; email link underline draw on hover

---

## Page 2 — Expertise

**Route:** `/expertise`  
**File:** `app/expertise/page.tsx`  
(Replaces `app/services/page.tsx`)

### Purpose
Present all six practice areas in depth. Position each service as a sophisticated capability, not a commodity offering. Help prospects self-identify by practice area and understand Lawgical's specific edge in each.

### User Goal
Understand the scope of each practice area, determine which is relevant to their situation, and find the path to speak with the right person or book a consultation.

### Business Goal
Qualify inbound leads by practice area. Demonstrate sector depth to sophisticated clients and in-house counsel. Reduce friction between "interest" and "contact."

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Our Expertise"
- **Headline:** "Six practice areas. One integrated firm."
- **Description:** Short statement — end-to-end legal counsel from formation to dispute resolution
- **Component:** `components/page-header.tsx`
- **Interaction:** Fade + slide on mount

#### Section 2 — Service Navigator
- **Layout:** Sticky left sidebar of 6 service names; right panel shows detail for selected service
- **Default active:** Corporate Law
- **Each service panel contains:**
  - Icon (Lucide)
  - Title
  - Full description
  - Key points list
  - "Speak to a specialist" CTA → `/contact`
- **Content source:** `lib/content.ts` SERVICES (all 6 slugs, descriptions, keyPoints)
- **Interaction:** Click service name in sidebar → panel transitions (fade + slide); active sidebar item has accent underline; on mobile, collapse to accordion

#### Section 3 — Related Industries
- **Headline:** "Practice areas connect across every sector."
- **Layout:** Matrix or grid — practice area rows × industry columns with dots showing intersection
- **Content source:** `lib/content.ts` SERVICES + INDUSTRIES
- **Interaction:** Hover cell highlights the intersecting row and column; tooltip shows relevant work type

#### Section 4 — Expertise CTA
- **Headline:** "Not sure which practice fits your situation?"
- **Body:** Invite to a diagnostic consultation
- **CTA:** "Book a Consultation" → `/contact`
- **Interaction:** Reveal on scroll

---

## Page 3 — Industries

**Route:** `/industries`  
**File:** `app/industries/page.tsx`

### Purpose
Demonstrate that Lawgical's expertise is not generic — it is shaped by deep knowledge of the sectors its clients operate in. Signal to prospects in any of the 12 sectors that the firm understands their world.

### User Goal
Identify their own sector quickly, understand the firm's specific capabilities and experience within it, and feel that this firm speaks their language.

### Business Goal
Remove the "do they understand our industry?" objection. Drive sector-specific enquiries. Build credibility with in-house teams and institutional buyers.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Industries We Serve"
- **Headline:** "Sector knowledge that changes the advice."
- **Stats strip:**
  - 12+ Industries served
  - 500+ Matters handled
  - 15+ Years combined practice
- **Component:** `components/page-header.tsx` + stats row
- **Content source:** `lib/content.ts` INDUSTRIES stats

#### Section 2 — Industries Grid
- **Layout:** 4×3 interactive card grid — all 12 industries
- **Each card contains:**
  - Industry title
  - Short descriptor (e.g., "Banks, funds & fintech")
  - Hover state expands to show relevant practice areas
- **Content source:** `lib/content.ts` INDUSTRIES array (all 12)
- **Existing component:** `app/industries/industries-client.tsx` (client component, already has whileInView + whileHover)
- **Interaction:** `whileInView` fade/y-slide on entry; `whileHover` y-lift (−4px); hover reveals practice area tags

#### Section 3 — Sector Deep Dive
- **Layout:** Horizontally scrollable panels — one per industry
- **Each panel:** Industry name · descriptor · relevant practice areas listed · "Discuss your matter" CTA
- **Content source:** `lib/content.ts` INDUSTRIES + cross-reference with SERVICES
- **Interaction:** Horizontal scroll with snap points; keyboard navigable

#### Section 4 — Industries CTA
- **Headline:** "Your sector has its own legal language. We speak it."
- **CTA:** "Book a Sector Consultation" → `/contact`
- **Interaction:** Reveal on scroll

---

## Page 4 — People

**Route:** `/people`  
**File:** `app/people/page.tsx`  
(Replaces `app/team/page.tsx`)

### Purpose
Humanise the firm. Present the team as a collection of distinct, credible individuals — not an anonymous group. Build personal trust that the right person will handle their matter.

### User Goal
Put faces to the firm. Understand who the senior partners are, what each person specialises in, and whether they feel confident working with this team.

### Business Goal
Convert trust into consultation requests. Showcase the breadth of seniority and specialisation. Differentiate from firms that hide their team behind institutional language.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Our People"
- **Headline:** "The team behind the strategy."
- **Description:** One sentence — experienced practitioners who combine regional knowledge with modern legal thinking
- **Component:** `components/page-header.tsx`

#### Section 2 — Leadership Gallery
- **Layout:** Full-width portrait gallery — large format, editorial style
- **Per person:**
  - Portrait image (high-res)
  - Name
  - Role / title
  - Short bio (1–2 sentences)
  - Specialisations (tags)
  - Optional: LinkedIn link slot
- **People from placeholder data (6 entries in `lib/content.ts`):**
  - Omar Al Mansoori · Founding Partner
  - Sara Khalil · Partner, Dispute Resolution
  - James Whitfield · Partner, Corporate
  - Layla Hassan · Senior Associate, Arbitration
  - Daniel Roberts · Senior Associate, Litigation
  - Aisha Rahman · Counsel, Compliance
- **Real portraits available (`Potraits/` folder — 11 files, to be mapped to real data):**
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
- **Content source:** `lib/content.ts` TEAM array (placeholder) + `Potraits/` folder (real assets)
- **Assets:** Real portraits from `Potraits/` once data is aligned
- **Interaction:** Portrait hover — subtle depth parallax; name + role overlay slides up; cursor changes to custom pointer on portrait hover

#### Section 3 — Culture & Values
- **Eyebrow:** "How We Work"
- **Headline:** "Principles that shape every engagement."
- **4 value tiles:**
  - Integrity — Honest counsel, always
  - Client Focus — Your goals lead the strategy
  - Precision — Detail-driven execution
  - Innovation — Modern legal thinking
- **Content source:** About page copy (existing values list)
- **Interaction:** Staggered reveal on scroll; tile hover — border accent glow

#### Section 4 — People CTA
- **Headline:** "Ready to work with us?"
- **CTA:** "Book a Consultation" → `/contact`
- **Interaction:** Reveal on scroll

---

## Page 5 — Clients

**Route:** `/clients`  
**File:** `app/clients/page.tsx`  
(New page — no existing equivalent)

### Purpose
Let clients speak for the firm. Demonstrate real-world trust through video testimonials and a social proof wall. Make visiting prospects feel they are joining a community of satisfied clients, not taking a risk.

### User Goal
Hear from real people who have worked with Lawgical Group. Understand what the experience of working with the firm feels like. Build confidence before making contact.

### Business Goal
Reduce conversion friction through peer validation. Provide the strongest form of trust signal — authentic client voices. Establish the firm's track record across a range of client types.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Client Stories"
- **Headline:** "Trusted by businesses across the region."
- **Description:** One sentence — Lawgical Group has advised 500+ clients across 12 sectors
- **Stats:** 500+ Clients advised · 98% Client retention
- **Component:** `components/page-header.tsx`
- **Content source:** `lib/site.ts` stats, hero stats

#### Section 2 — Featured Reel
- **Layout:** Full-width video player
- **Video:** `videos/Clients/Collection_Video-1.mp4` — multi-client compilation reel
- **Controls:** Play / pause; muted by default; full-screen option
- **Assets:** `videos/Clients/Collection_Video-1.mp4`
- **Interaction:** Autoplay muted on scroll into view; click to unmute; expand to full-screen on icon click

#### Section 3 — Individual Testimonials
- **Layout:** 2×2 grid of testimonial video cards
- **Per card:**
  - Video thumbnail (first frame or poster)
  - Client first name
  - Play button overlay
  - Click → opens modal with full video
- **Videos (4 individuals):**
  - Jalpa — `videos/Clients/Jalpa_Testimonial.mp4`
  - Mostafa — `videos/Clients/Mostafa_Testimonial.mp4`
  - Shadhad — `videos/Clients/Shadhad_testimonial.mp4`
  - Srinivas Singh — `videos/Clients/Srinivas_Singh.mp4`
- **Assets:** All files in `videos/Clients/`
- **Interaction:** Hover reveals play button + client name; click opens modal; modal close on Escape or backdrop click; staggered card reveal on scroll

#### Section 4 — By The Numbers
- **Layout:** 4-stat row
- **Stats:**
  - 500+ Clients advised
  - 12+ Industries served
  - 98% Client retention
  - 20+ Years combined experience
- **Content source:** Hero stats, industries page stats
- **Interaction:** Stats count up on scroll entry

#### Section 5 — Clients CTA
- **Headline:** "Join 500+ businesses who trust Lawgical Group."
- **CTA:** "Book a Consultation" → `/contact`
- **Interaction:** Reveal + magnetic CTA button

---

## Page 6 — CSR

**Route:** `/csr`  
**File:** `app/csr/page.tsx`  
(New page — no existing equivalent)

### Purpose
Demonstrate that Lawgical Group is a firm with values that extend beyond client work. Showcase the firm's commitment to social causes, awareness campaigns, and global issues. Build emotional resonance and brand depth.

### User Goal
Understand what the firm stands for beyond law. See evidence of genuine civic engagement. Feel that working with this firm means working with people of principle.

### Business Goal
Differentiate on values, not just capability. Attract talent and clients who care about purpose. Build brand equity through cause-aligned content. Give the firm a human dimension that pure legal credentials cannot.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Corporate Social Responsibility"
- **Headline:** "Law with a conscience."
- **Description:** One sentence — the firm's belief that legal excellence and social responsibility are not separate pursuits
- **Component:** `components/page-header.tsx`

#### Section 2 — Impact Highlights
- **Layout:** 3-column stat row
- **Content:** Placeholder stats (to be filled with real data)
  - Campaigns supported
  - Awareness days observed
  - Community engagements
- **Interaction:** Count-up animation on scroll

#### Section 3 — CSR Video Hub
- **Layout:** Masonry or editorial video grid — 4 CSR videos
- **Per card:**
  - Video title
  - Video thumbnail / poster
  - Campaign description (1–2 lines)
  - Play button — opens modal
- **Videos (5 files from `videos/CSR/`):**
  - Breast-Cancer-Awareness — `Breast-Cancer-Awareness.mov`
  - International Stress Awareness Day (UK) — `International Stress Awareness Day-UK-Horizontal.mp4`
  - UN Post — `UN-Post-1.mov`
  - International Day of Education — `Website-International-Day-of-Education.mp4`
  - World Gratitude Day — `World Gratitude Day.mov`
- **Assets:** All files in `videos/CSR/`
- **Interaction:** Hover lifts card; play on click (modal); staggered scroll reveal; video autoplays muted on hover preview

#### Section 4 — Causes We Champion
- **Layout:** Text-forward editorial section
- **Content:** Named cause areas matching video subjects:
  - Health Awareness — Breast Cancer Awareness
  - Mental Wellbeing — International Stress Awareness
  - Education Access — International Day of Education
  - Global Citizenship — UN initiatives, World Gratitude Day
- **Interaction:** Reveal on scroll; each cause line has a subtle icon

#### Section 5 — CSR CTA
- **Headline:** "Interested in partnering on social impact?"
- **Body:** Open invitation for cause-aligned partnerships or enquiries
- **CTA:** "Get in Touch" → `/contact`
- **Interaction:** Reveal on scroll

---

## Page 7 — LLA

**Route:** `/lla`  
**File:** `app/lla/page.tsx`  
(New page — no existing equivalent)

### Purpose
Showcase Lawgical Group's regional footprint and legal network across the Middle East and beyond. Present the firm not as a single-office practice but as a regionally connected legal intelligence hub. "LLA" represents the firm's Legal Location Atlas — the geographic and jurisdictional reach of the practice.

### User Goal
Understand whether the firm can handle matters in their jurisdiction. Gain confidence in the firm's cross-border capabilities and regional relationships. Know which markets the firm is active in.

### Business Goal
Attract cross-border and multinational clients who need regional reach. Signal credibility to GCC, MENA, and international counterparties. Differentiate from purely local practices.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Legal Location Atlas"
- **Headline:** "Regional reach. Local depth."
- **Description:** One sentence — Lawgical Group advises clients across the GCC and MENA with on-the-ground knowledge of each jurisdiction
- **Component:** `components/page-header.tsx`

#### Section 2 — Interactive Regional Map
- **Layout:** Full-width interactive SVG or canvas map of the Middle East / GCC region
- **Regions highlighted:**
  - UAE (primary — Downtown Dubai, Level 21, Boulevard Plaza Tower 1)
  - Saudi Arabia (KSA)
  - Qatar
  - Bahrain
  - Kuwait
  - Oman
  - Egypt (MENA reach)
  - UK / International (indicated by secondary node)
- **Per node (on click/hover):**
  - Jurisdiction name
  - Key legal context (e.g., "DIFC & ADGM courts", "Saudi Vision 2030 matters")
  - Relevant practice areas active in this jurisdiction
- **Primary office marker:** Downtown Dubai — address, phone, email
- **Content source:** `lib/site.ts` CONTACT_DETAILS (Dubai office); jurisdiction data (to be defined)
- **Assets:** `public/dubai-skyline.png` (used as office visual)
- **Interaction:** Hover node → pulsing ring + tooltip; click node → panel slides in with jurisdiction detail; map pan/zoom on mobile pinch

#### Section 3 — Jurisdictions We Operate In
- **Layout:** Scrollable list or card row — one card per active jurisdiction
- **Per jurisdiction card:**
  - Country / zone name
  - Key courts or regulatory bodies (e.g., DIFC Courts, DIAC, ICC Dubai, ADGM)
  - Practice areas with regional activity
- **Content source:** To be defined based on real firm data; placeholder: UAE, KSA, Qatar, Bahrain
- **Interaction:** Staggered reveal on scroll; hover lifts card

#### Section 4 — Primary Office
- **Layout:** 2-column — office image left, details right
- **Content:**
  - Address: Level 21, Boulevard Plaza Tower 1, Downtown Dubai, UAE
  - Phone: +971 4 123 4567
  - Email: hello@lawgicalgroup.ae
  - Hours: Sunday – Thursday, 9:00 – 18:00 GST
- **Assets:** `public/about-office.png` or `public/dubai-skyline.png`
- **Content source:** `lib/site.ts` CONTACT_DETAILS
- **Interaction:** Reveal on scroll; map embed or static image with parallax

#### Section 5 — LLA CTA
- **Headline:** "Operating across borders? We're already there."
- **CTA:** "Discuss your cross-border matter" → `/contact`
- **Interaction:** Reveal + magnetic CTA button

---

## Page 8 — Insights

**Route:** `/insights`  
**File:** `app/insights/page.tsx`  
(Replaces `app/news/page.tsx`)

### Purpose
Position Lawgical Group as a thought leader and source of authoritative legal intelligence for the region. Provide genuine value to prospects and clients through substantive articles. Build organic search presence over time.

### User Goal
Find articles relevant to their legal situation or industry. Absorb actionable insights that help them understand a legal issue or make a better-informed decision. Share content with colleagues.

### Business Goal
Establish authority and expertise beyond credentials. Generate inbound interest from search and social. Demonstrate that the firm's practitioners are actively tracking market developments. Convert readers into enquiries.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Insights"
- **Headline:** "Intelligence that moves with the market."
- **Description:** One sentence — legal analysis, regulatory updates, and strategic thinking from the Lawgical Group team
- **Component:** `components/page-header.tsx`

#### Section 2 — Featured Article
- **Layout:** Full-width editorial card — large image, headline, excerpt, category badge, author, date, read time
- **Featured article:** "What the 2026 UAE Arbitration Reforms Mean for Businesses"
  - Slug: `uae-arbitration-reforms-2026`
  - Category: Arbitration
  - Date: Jun 2, 2026
  - Read time: 6 min
  - Image: `public/news/article-featured.png`
- **CTA:** "Read Article" — links to article detail (future dynamic route `/insights/[slug]`)
- **Content source:** `lib/content.ts` ARTICLES (featured: true)
- **Assets:** `public/news/article-featured.png`
- **Interaction:** Image parallax on hover; category badge reveals on scroll; CTA underline draw

#### Section 3 — Article Grid
- **Layout:** Responsive 2×2 grid — all remaining articles
- **Articles (4 non-featured):**
  1. Structuring Joint Ventures Across the GCC · Corporate · May 21, 2026 · `news/article-1.png`
  2. Enforcing Foreign Judgments Through the DIFC · Litigation · May 9, 2026 · `news/article-2.png`
  3. Debt Recovery: A Practical Playbook for 2026 · Debt Collection · Apr 28, 2026 · `news/article-3.png`
  4. Navigating the UAE Data Protection Landscape · Compliance · Apr 12, 2026 · `news/article-4.png`
- **Component:** `components/article-card.tsx` (existing — image scale-105 hover, border color transition)
- **Content source:** `lib/content.ts` ARTICLES array (all non-featured)
- **Assets:** `public/news/article-1.png` through `article-4.png`
- **Interaction:** `ArticleCard` existing hover; staggered `Reveal` on scroll

#### Section 4 — Category Filter
- **Layout:** Horizontal filter strip above the article grid
- **Categories (from existing articles):** All · Arbitration · Corporate · Litigation · Debt Collection · Compliance
- **Behaviour:** Filter updates grid in place — no page reload
- **Content source:** Derived from `lib/content.ts` ARTICLES categories
- **Interaction:** Active filter has accent underline; grid items animate out/in on filter change

#### Section 5 — Insights CTA
- **Headline:** "A question raised by something you read?"
- **Body:** Invite to bring the specific issue to the team
- **CTA:** "Talk to a Specialist" → `/contact`
- **Interaction:** Reveal on scroll

---

## Page 9 — Contact

**Route:** `/contact`  
**File:** `app/contact/page.tsx`

### Purpose
Convert intent into an actionable enquiry. Remove every possible friction point between "I want to talk to someone" and a submitted form or direct communication. Feel like the beginning of a professional relationship, not a support ticket.

### User Goal
Reach the right person at Lawgical Group as quickly as possible. Know which service area they need help with before submitting. Receive immediate confirmation that their message has been received.

### Business Goal
Maximise qualified enquiry conversion. Capture service area intent at point of contact to enable faster routing internally. Provide multiple contact channels to suit different communication preferences.

---

### Sections

#### Section 1 — Page Header
- **Eyebrow:** "Get in Touch"
- **Headline:** "Let's talk about your matter."
- **Description:** One sentence — invite to start the conversation with a consultation
- **Component:** `components/page-header.tsx`

#### Section 2 — Contact Experience
- **Layout:** 2-column — form left, contact details right
- **Left — Contact Form:**
  - Name (text input)
  - Email (email input)
  - Company (text input)
  - Service dropdown (6 options matching SERVICES slugs: corporate-law, arbitration, litigation, debt-collection, regulatory-compliance, advisory)
  - Message (textarea)
  - Submit — "Send Message"
  - Success state: scale + fade animation — "Thank you. We'll be in touch within one business day."
  - **Component:** `components/contact-form.tsx` (existing, with success animation)
  - **Content source:** `lib/content.ts` SERVICES (for dropdown options)
- **Right — Contact Details:**
  - Address: Level 21, Boulevard Plaza Tower 1, Downtown Dubai, UAE
  - Phone: +971 4 123 4567
  - Email: hello@lawgicalgroup.ae
  - Hours: Sunday – Thursday, 9:00 – 18:00 GST
  - **Content source:** `lib/site.ts` CONTACT_DETAILS
- **Interaction:** Form fields have animated focus states (accent border draw); submit button magnetic hover; success message animates in (`scale: 0.9→1`, `opacity: 0→1`)

#### Section 3 — Office Location
- **Layout:** Full-width map embed or styled static image with address overlay
- **Content:** Primary Dubai office only
- **Assets:** `public/dubai-skyline.png` as fallback if no map embed
- **Interaction:** Subtle parallax on scroll

#### Section 4 — Alternative CTA
- **Layout:** Simple 1-line row
- **Content:** "Prefer to reach us directly? Email hello@lawgicalgroup.ae or call +971 4 123 4567"
- **Content source:** `lib/site.ts` CONTACT_DETAILS
- **Interaction:** Email and phone are interactive links (mailto / tel)

---

## Content Source Map

| Content | Source File | Used In |
|---------|-------------|---------|
| Services (6) | `lib/content.ts` SERVICES | Home §3, Expertise, Contact form dropdown, Footer §3 |
| Industries (12) | `lib/content.ts` INDUSTRIES | Home §4, Industries, Expertise §3 |
| Team (6 placeholder) | `lib/content.ts` TEAM | Home §5, People |
| Real portraits (11) | `Potraits/` folder | People (once data aligned) |
| Articles (5) | `lib/content.ts` ARTICLES | Home §8, Insights |
| Client videos (5) | `videos/Clients/` | Home §6, Clients |
| CSR videos (5) | `videos/CSR/` | Home §7, CSR |
| Contact details | `lib/site.ts` CONTACT_DETAILS | Navbar CTA, Footer §4, Contact, LLA §4 |
| Nav links | `lib/site.ts` NAV_LINKS | Navbar, Footer §2 |
| Site stats | Hero copy + `lib/content.ts` | Home §1, Clients §4, Industries §1 |
| Logo | `public/logo.png` | Navbar, Footer |
| Office images | `public/about-office.png`, `public/dubai-skyline.png` | Home §2, LLA §4, Contact §3 |
| News images | `public/news/article-*.png` | Insights, Home §8 |
| Team placeholders | `public/team/partner-*.png` | People (temporary) |

---

## Asset Assignment

| Asset | Current state | Assigned page |
|-------|---------------|---------------|
| `public/logo.png` | In use | Navbar, Footer |
| `public/about-office.png` | In use | Home §2, LLA §4 |
| `public/dubai-skyline.png` | In use | Home §2, Contact §3 |
| `public/news/article-featured.png` | In use | Insights featured |
| `public/news/article-1.png` – `4.png` | In use | Insights grid |
| `public/team/partner-1.png` – `6.png` | Placeholder | People (temporary) |
| `Potraits/*.png` (11 files) | **Unlinked** | People §2 (needs data alignment) |
| `videos/Clients/Collection_Video-1.mp4` | **Unlinked** | Home §6, Clients §2 |
| `videos/Clients/Jalpa_Testimonial.mp4` | **Unlinked** | Clients §3 |
| `videos/Clients/Mostafa_Testimonial.mp4` | **Unlinked** | Clients §3 |
| `videos/Clients/Shadhad_testimonial.mp4` | **Unlinked** | Clients §3 |
| `videos/Clients/Srinivas_Singh.mp4` | **Unlinked** | Clients §3 |
| `videos/CSR/Breast-Cancer-Awareness.mov` | **Unlinked** | Home §7, CSR §3 |
| `videos/CSR/International Stress Awareness Day-UK-Horizontal.mp4` | **Unlinked** | Home §7, CSR §3 |
| `videos/CSR/UN-Post-1.mov` | **Unlinked** | CSR §3 |
| `videos/CSR/Website-International-Day-of-Education.mp4` | **Unlinked** | Home §7, CSR §3 |
| `videos/CSR/World Gratitude Day.mov` | **Unlinked** | Home §7, CSR §3 |

---

## Interaction System Summary

| Interaction | Components | Pages |
|-------------|------------|-------|
| Particle network (canvas) | `particle-field.tsx` | Home Hero |
| Scroll reveal — fade + slide | `reveal.tsx` (Framer Motion) | All pages |
| Magnetic button hover | CTA buttons | All CTAs |
| Counting number animation | Stats rows | Home, Clients, Industries |
| Navbar glass morphism on scroll | `navbar.tsx` | Global |
| Portrait depth parallax | People gallery | People, Home §5 |
| Video modal (play on click) | Client + CSR video cards | Clients, CSR, Home §6–7 |
| Muted autoplay on scroll entry | Video sections | Home §6, Clients §2 |
| Card hover lift | `service-card.tsx`, `article-card.tsx` | Home §3, Expertise, Insights |
| Image scale on hover | `article-card.tsx` | Insights, Home §8 |
| Accordion collapse | Expertise service navigator | Expertise (mobile) |
| Horizontal scroll with snap | Industries §3, Home §5 | Industries, Home |
| Filter animation | Category filter + grid | Insights |
| Form focus state (border draw) | `contact-form.tsx` | Contact |
| Character-by-character headline | Section 9 CTA | Home |
| Map node hover + click | Regional map | LLA |
| Success animation (scale + fade) | `contact-form.tsx` | Contact |
| Mobile staggered menu | `navbar.tsx` | Global (mobile) |

---

## Open Items (Data Gaps)

These items are in the architecture but require real content before implementation:

1. **Real team data** — The 11 portrait files in `Potraits/` need to be mapped to real names, roles, and bios to replace the placeholder TEAM array in `lib/content.ts`
2. **Contact form server action** — The form currently has no backend handler; a server action or API route is needed to actually send enquiries
3. **LLA jurisdiction data** — The regional map needs real jurisdiction details, active markets, and court/regulatory body information
4. **Client names for testimonial cards** — Only first names are available from video filenames; full client names and company context needed for the testimonial cards
5. **Social media links** — No handles appear anywhere; need to be provided before footer social slots can be activated
6. **CSR campaign descriptions** — Video filenames suggest the cause but campaign descriptions need to be written for the CSR page cards
7. **Article full content** — Five articles exist as title + excerpt + metadata only; full article body content needed for individual article pages (`/insights/[slug]`)
8. **Industries detail copy** — Each industry card currently has only a 3–4 word descriptor; richer copy needed for the sector deep-dive panels
9. **Practice area stats** — The LLA jurisdictions section needs real data about where the firm is active and what matters it handles per market

---

*End of architecture document.*
