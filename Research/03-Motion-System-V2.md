# Motion System V2 — Lawgical Group
**Sources:** Repository-Audit.md · 01-Site-Architecture-V2.md · 02-Homepage-Blueprint-V2.md  
**Principle:** Motion is meaning. Every animation earns its place by communicating something — hierarchy, relationship, state, or direction. No motion exists purely for decoration.  
**Date:** 2026-06-10

---

## Motion Philosophy

Three constraints govern every decision in this system:

1. **Direction communicates hierarchy.** Content entering from below signals arrival. Content exiting upward signals progression. Content arriving from the left signals sequence. Nothing arrives from above (that signals falling, not arriving) and nothing arrives from the right (that signals contradiction).

2. **Deceleration signals intelligence.** Every entrance uses ease-out: fast arrival, slow settle. This reads as intentional, controlled, confident. Ease-in (slow start, fast exit) is reserved for departures only. Linear motion is forbidden — it reads as mechanical, not considered.

3. **Restraint over abundance.** A page with 40 animations is a page with no animations — the eye habituates and the signal disappears. Each section earns a maximum of one signature animation. Supporting elements use the simplest motion that communicates the required state change.

---

## Easing System

All easing is defined in four named tokens. These are the only easing values used anywhere on the site.

### Token Definitions

| Token | Cubic Bezier | Use Case |
|-------|-------------|----------|
| `ease.enter` | `[0.22, 1, 0.36, 1]` | All entrance animations — elements arriving into view |
| `ease.exit` | `[0.55, 0, 1, 0.45]` | All departure animations — elements leaving the viewport or being dismissed |
| `ease.spring` | `type: spring, stiffness: 280, damping: 28` | Interactive responses — hover states, magnetic pull, button press |
| `ease.smooth` | `[0.4, 0, 0.2, 1]` | State transitions — panel swaps, filter changes, accordion open/close |

### Easing Decision Rule

- **Element entering the page / viewport** → `ease.enter`
- **Element leaving the page / viewport** → `ease.exit`
- **User-triggered interaction** → `ease.spring`
- **State change without entering/leaving** → `ease.smooth`

---

## Duration System

All durations are defined in seven named tokens. These are the only duration values used.

| Token | Value | Use Case |
|-------|-------|----------|
| `dur.instant` | 100ms | Micro-feedback — button press depression, focus ring appearance |
| `dur.fast` | 200ms | Hover state changes — color, underline, opacity |
| `dur.normal` | 350ms | Component state transitions — panel swap, accordion |
| `dur.enter` | 500ms | Standard element entrance — text blocks, cards, rows |
| `dur.slow` | 700ms | Rich element entrance — portraits, featured images |
| `dur.cinematic` | 1200ms | Signature animations — hero entrance, map draw, stat count-up |
| `dur.epic` | 1800ms | Full-page transitions, arrival overlay |

### Stagger Intervals

| Context | Stagger |
|---------|---------|
| Sibling text lines (eyebrow → headline → body) | 80ms |
| Character-by-character text | 30ms per character |
| Word-by-word text | 60ms per word |
| Cards in a row | 80ms |
| Portrait row | 120ms |
| List items in sidebar | 60ms |
| Map nodes appearing | 60ms |
| Stats counting up | 100ms delay between each stat |

---

## 1. Global Motion

### 1.1 Page Transitions

The site uses a shared-axis page transition — pages slide on a horizontal axis. Leaving page exits left; entering page enters from the right. This reinforces the spatial mental model of moving forward through a navigation sequence.

**Trigger:** User clicks a navigation link or CTA button  
**Duration:** `dur.normal` (350ms) exit + `dur.normal` (350ms) enter, overlapping by 100ms  
**Easing:** Exit uses `ease.exit`; enter uses `ease.enter`  
**Behavior:**
- Current page: `x: 0 → -60px`, `opacity: 1 → 0`, `filter: blur(0 → 4px)` over 350ms
- New page: enters from `x: 60px → 0`, `opacity: 0 → 1`, `filter: blur(4px → 0)` over 350ms
- The blur on exit/enter is subtle (4px) — enough to signal transition without looking like a browser effect
- During transition: navigation links are disabled (pointer-events: none on the nav)
- Scroll position of the new page always starts at 0

**Mobile fallback:** Simplify to opacity-only cross-fade (`opacity: 0 → 1`), 250ms, `ease.enter`. Eliminate the x-axis movement to avoid janky mobile transitions.

---

### 1.2 Section Transitions

Movement between sections within the same page. Sections flow into each other without hard cuts. The transition is felt in the background color shift and the rhythm of content entering.

**Trigger:** User scrolls past the bottom of a section  
**Duration:** Background color crossfade: 400ms. Content of incoming section begins its entrance animation independently.  
**Easing:** `ease.smooth`  
**Behavior:**
- Light sections (white/off-white background) → light sections: no background transition, seamless
- Light section → dark section (Contact, Footer, Regional Presence): background darkens over 400ms as the dark section enters the viewport from below. The darkening begins when the dark section's top is 30% below the viewport bottom.
- Dark section → light section: background lightens over 400ms as the light section enters from below
- The scroll indicator (thin line/chevron on Hero) fades out after the first scroll interaction, `dur.fast`

**Mobile fallback:** Same behavior — background crossfade is a CSS `transition: background-color` property, not JavaScript. Works identically on mobile.

---

### 1.3 Reveal Timings

The reveal system is the foundational building block of all scroll-triggered content entrance. Every element that enters on scroll uses one of these three reveal patterns:

#### Reveal Standard
The default reveal for text blocks, cards, and supporting elements.

**Trigger:** Element enters viewport at 20% from the bottom edge  
**Duration:** `dur.enter` (500ms)  
**Easing:** `ease.enter`  
**Behavior:** `opacity: 0 → 1`, `y: 24px → 0`  
**Once:** true — does not re-trigger on scroll back  
**Mobile fallback:** Identical behavior — `y` value reduced to 12px to avoid overflow on narrow screens

#### Reveal Slow
For rich elements — portraits, featured images, large editorial blocks — that deserve a more deliberate entrance.

**Trigger:** Element enters viewport at 20% from the bottom edge  
**Duration:** `dur.slow` (700ms)  
**Easing:** `ease.enter`  
**Behavior:** `opacity: 0 → 1`, `y: 40px → 0`  
**Once:** true  
**Mobile fallback:** `y` value reduced to 20px; duration reduced to `dur.enter` (500ms) to avoid perceptible lag on slower devices

#### Reveal Instant
For small supporting elements where motion would be distracting — labels, dates, metadata.

**Trigger:** Element enters viewport  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.enter`  
**Behavior:** `opacity: 0 → 1` only — no y translation  
**Once:** true  
**Mobile fallback:** Identical

---

## 2. Cursor System

### 2.1 Default Cursor

The site uses a custom cursor on desktop. The cursor consists of two elements:

- **Dot:** 8px circle, accent color (`oklch(0.78 0.13 184)` — teal), filled, always visible
- **Ring:** 32px circle, accent color at 30% opacity, outline only (1px stroke), follows the dot with a 60ms lag

**Trigger:** Page load — cursor replaces OS cursor globally on desktop viewport  
**Duration:** Ring follow lag: 60ms. This is not an easing value — it is a simple delay on the ring's position update loop.  
**Easing:** Ring position uses `ease.spring` (stiffness 120, damping 14) for fluid following  
**Behavior:** The dot tracks cursor position exactly (no lag). The ring trails behind with spring physics, creating a leader/follower relationship that makes the cursor feel alive.  
**Mobile fallback:** Custom cursor is disabled entirely on touch devices. The OS cursor behavior is restored. All hover effects that depend on cursor proximity are replaced with tap behaviors.

---

### 2.2 Hover Cursor States

The cursor transforms based on what it is hovering over. These are the four cursor states:

#### Text Link State
**Trigger:** Cursor enters a text hyperlink  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.smooth`  
**Behavior:** Dot scales from 8px to 12px; ring scales from 32px to 48px; both shift to full accent color opacity (ring goes from 30% to 60% opacity)

#### Button State
**Trigger:** Cursor enters a button element  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.smooth`  
**Behavior:** Dot disappears (`scale: 1 → 0`, `opacity: 1 → 0`); ring scales up to 56px diameter and becomes a solid circle at 15% opacity. The ring merges visually with the button's magnetic halo effect.

#### Media State
**Trigger:** Cursor enters a video element or portrait image  
**Duration:** `dur.normal` (350ms)  
**Easing:** `ease.spring`  
**Behavior:** Dot disappears; ring expands to 80px and displays a text label inside it. Label reads "PLAY" for video elements; "VIEW" for portrait images. Label fades in within the ring using `dur.fast` after the ring has expanded. The ring border becomes solid (not outline) at low opacity. On video hover the ring pulses slowly (scale `1 → 1.15 → 1`, period 1.6s) to indicate playable content.

#### Drag/Scroll State
**Trigger:** Cursor enters a horizontally scrollable container (Industry ribbon, Leadership row)  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.smooth`  
**Behavior:** Ring collapses; a horizontal double-arrow icon appears at cursor position in the ring space. Indicates the interaction mode.

**Mobile fallback for all cursor states:** Not applicable — OS cursor is used on mobile/touch devices.

---

### 2.3 Magnetic Interactions

Magnetic behavior is applied to all primary CTA buttons and to portrait images. The element itself (not the cursor) moves toward the cursor.

**Elements with magnetic behavior:**
- "Book a Consultation" button (Navbar)
- Hero primary and secondary CTAs
- All section-level CTA buttons
- Portrait images (subtle — reduced magnitude)
- Footer direct-contact links (email, phone)

**Trigger:** Cursor enters within the magnetic radius of the element (not just hovering the element itself — the field extends beyond the element boundary)  
**Magnetic radius:** 80px from the nearest edge of the element  
**Magnitude:** Maximum 8px displacement on buttons; maximum 4px displacement on portrait images  
**Duration:** Continuous — updates on every `mousemove` event while cursor is within radius  
**Easing:** `ease.spring` applied to the element's `x` and `y` transform values (stiffness 280, damping 28)  
**Behavior:** 
- Element position is calculated as a function of cursor distance from element center
- At the magnetic radius boundary: displacement is 0px
- At the element center: displacement is at maximum (8px buttons, 4px portraits)
- The displacement direction is toward the cursor
- When cursor exits the magnetic radius: element springs back to `x: 0, y: 0` with `ease.spring`
- The cursor itself also moves slightly toward the element center (1–2px) when inside the magnetic radius — a bidirectional pull

**Click behavior:** On click within the magnetic radius, the element briefly springs back to center (`x: 0, y: 0`, `scale: 0.96 → 1`, `dur.instant`) then returns to the magnetic offset position if the cursor has not moved.

**Mobile fallback:** Magnetic behavior is disabled entirely. Buttons have a standard active state (`scale: 0.97`) on tap instead.

---

## 3. Scroll System

### 3.1 Pinned Sections

Two sections on the homepage use scroll-pinning: Expertise Ecosystem and CSR Impact Engine. Pinning is achieved via `position: sticky` with JavaScript-controlled state, not `overflow: hidden` scroll-jacking.

#### Expertise Ecosystem Pin

**Trigger:** Top of the Expertise section reaches the top of the viewport  
**Duration of pin:** Equivalent to 6× viewport height of scroll distance  
**Behavior during pin:** The section remains fixed while the scrollable container advances. Each viewport height of scroll advances the active practice area by one (1/6 total). A progress bar on the left edge fills from 0% to 100% as the user scrolls through all six areas.  
**Unpin trigger:** After the sixth practice area has been displayed for one full viewport height of scroll, the section unpins and the next section enters from below.  
**Mobile fallback:** No pinning. The section becomes a vertically scrolling accordion. Each practice area is collapsed by default; tap to expand.

#### CSR Impact Engine Pin

**Trigger:** Top of the CSR section reaches the top of the viewport  
**Duration of pin:** The right film strip is taller than the viewport — the pin lasts until the film strip's bottom edge comes into view  
**Behavior during pin:** Left column is fixed; right film strip scrolls at 80% of the scroll velocity (parallax slow-scroll relative to the scroll position). The user sees the film strip content advancing as they scroll.  
**Unpin trigger:** When the bottom of the right film strip aligns with the viewport bottom, the section unpins.  
**Mobile fallback:** No pinning, no parallax. Both columns flow as single vertical stack.

---

### 3.2 Parallax Layers

Parallax is used surgically — only where it communicates depth, never as decoration.

#### Hero Parallax (Exit)
**Trigger:** User scrolls down from the hero  
**Behavior:** Hero content translates upward at 0.3× scroll velocity (moves 30px for every 100px scrolled). Particle canvas translates at 0.15× — slightly slower than content, creating depth separation.  
**Range:** Active while hero is 0–100% visible in viewport  
**Mobile fallback:** Disabled — hero exits at normal scroll speed

#### Portrait Row Parallax (Entrance)
**Trigger:** Leadership section enters the viewport  
**Behavior:** Portrait images translate upward at 0.85× scroll velocity while the section is entering — they appear to rise slightly slower than the scroll, creating a sense of the portraits lifting into frame  
**Range:** Active while section is 0–100% in viewport  
**Mobile fallback:** Disabled

#### Featured Article Image Parallax
**Trigger:** Insights section is in viewport  
**Behavior:** The featured article's background image translates at 0.8× scroll velocity within its container (a CSS `transform: translateY` on the image inside an `overflow: hidden` container). The image appears to scroll slower than its container, creating an internal zoom/drift effect.  
**Range:** Active while section is in viewport  
**Mobile fallback:** Disabled — image is static

#### Dubai Skyline Parallax (Regional Presence)
**Trigger:** Regional Presence section is in viewport  
**Behavior:** Background image (if used) translates at 0.7× scroll velocity  
**Mobile fallback:** Disabled

---

### 3.3 Velocity Reactions

The scroll velocity affects certain elements to create a sense of physicality.

#### Industry Ribbon Speed Scaling
**Trigger:** User accelerates their scroll while the Industry section is in view  
**Behavior:** The ribbon's auto-scroll speed scales with scroll velocity — faster scroll = faster ribbon. Maximum ribbon speed is 2× normal (80px/s → 160px/s). The scaling is proportional: `ribbon_speed = base_speed × (1 + scroll_velocity / 400)`. When scrolling stops, ribbon decelerates back to base speed over 600ms, `ease.smooth`.  
**Mobile fallback:** Ribbon speed is constant on touch — velocity scaling is disabled

#### Particle Field Velocity
**Trigger:** Mouse movement across the hero  
**Behavior:** Nearby particles accelerate proportionally to mouse velocity. Fast mouse movement = larger disturbance radius and higher particle acceleration. The disturbance decays over 800ms after mouse stops moving.  
**Mobile fallback:** Touch events cause a single-pulse disturbance at the touch point — all nearby particles accelerate outward once then return to normal trajectories.

---

### 3.4 Scroll-Triggered Reveals

All scroll-triggered reveals use `IntersectionObserver` with a threshold of 0.2 (element is 20% visible) and `rootMargin: "0px 0px -50px 0px"` (trigger slightly before the element reaches the true viewport bottom, so content is not clipped at arrival).

All reveals fire `once: true` — they do not re-trigger.

**Standard reveal pattern:** `y: 24px → 0`, `opacity: 0 → 1`, `dur.enter`, `ease.enter`  
**Rich reveal pattern:** `y: 40px → 0`, `opacity: 0 → 1`, `dur.slow`, `ease.enter`  
**Directional reveal (left):** `x: -24px → 0`, `opacity: 0 → 1`, `dur.enter`, `ease.enter`  
**Directional reveal (right):** `x: 24px → 0`, `opacity: 0 → 1`, `dur.enter`, `ease.enter`  
**Scale reveal:** `scale: 0.92 → 1`, `opacity: 0 → 1`, `dur.enter`, `ease.enter`

---

## 4. Button System

### 4.1 Primary Button (Solid)

The "Book a Consultation" and "Explore Our Expertise" class of buttons — filled, high contrast.

**Rest state:** Solid background, primary navy. White label text.

**Hover state:**  
**Trigger:** Cursor enters the 80px magnetic radius  
**Duration:** `dur.fast` (200ms) for color; continuous spring for magnetic displacement  
**Easing:** `ease.spring` for position; `ease.smooth` for color  
**Behavior:** Background shifts from navy to accent (teal). Label color remains white. Button displaces magnetically toward cursor (max 8px). The cursor ring merges with the button's visual halo.

**Active / Press state:**  
**Trigger:** Mouse down or touch start  
**Duration:** `dur.instant` (100ms)  
**Easing:** `ease.spring` (stiffness 400, damping 20)  
**Behavior:** `scale: 1 → 0.96`. Background shifts slightly darker. Springs back to `scale: 1` on mouse up, `dur.fast`.

**Focus state (keyboard):**  
**Trigger:** Tab navigation reaches button  
**Behavior:** Visible focus ring — 2px offset, accent color. No scale change. No magnetic effect (cursor is not involved). Label remains white.

**Disabled state:**  
**Behavior:** `opacity: 0.4`. No hover response. No magnetic effect.

**Mobile fallback:** No magnetic effect. Hover is not applicable. Active/press scale (`0.96`) applies on touch start. Focus ring applies on keyboard (if keyboard is attached to mobile device).

---

### 4.2 Secondary Button (Outlined)

The "Learn More" and "View All" class of buttons — outlined, lower contrast.

**Rest state:** Transparent background. Accent-color border (1px). Accent-color label text.

**Hover state:**  
**Trigger:** Cursor enters button  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.smooth`  
**Behavior:** Background fills with accent at 10% opacity. Border brightens to 100% accent opacity. Label shifts to full accent. Magnetic displacement applies (max 6px — slightly less than primary). A subtle inner glow (box-shadow inset) appears.

**Active / Press state:** Same as primary — `scale: 0.96`, `dur.instant`.  
**Focus state:** Same as primary — 2px focus ring, accent color.  
**Mobile fallback:** Same as primary button.

---

### 4.3 Ghost / Text Button

The "Speak to a specialist →" and footer link class — no border, no background.

**Rest state:** Text only. Accent color. Right-facing arrow character or Lucide `ArrowRight` icon.

**Hover state:**  
**Trigger:** Cursor enters the text + icon  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.smooth`  
**Behavior:** Underline draws from left to right under the text — a pseudo-element `scaleX: 0 → 1`, transform-origin: left. Arrow icon translates `x: 0 → 4px`. No background, no scale, no magnetic effect (these buttons are too small for magnetic to feel good).

**Active / Press:** Arrow translates `x: 4px → 8px` briefly then returns. `dur.instant`.  
**Focus state:** Underline is always visible when focused (drawn state), plus focus ring offset.  
**Mobile fallback:** Underline is shown in rest state on touch (since hover is unavailable). Arrow does not animate.

---

### 4.4 CTA Link (Inline)

Email address, phone number in footer and Contact section.

**Rest state:** Muted color. No underline.

**Hover state:**  
**Trigger:** Cursor enters  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.smooth`  
**Behavior:** Color shifts to accent. Underline draws left to right. No other effect.

**Mobile fallback:** Color is full accent in rest state (links always look tappable on mobile). Underline is always present.

---

## 5. Typography System

### 5.1 Headline Stagger Reveal

Used for all section headlines that enter on scroll.

**Trigger:** Section enters viewport at 20% threshold  
**Duration per element:** `dur.enter` (500ms)  
**Easing:** `ease.enter`  
**Behavior:**  
- Eyebrow label: `y: 12px → 0`, `opacity: 0 → 1`, delay: 0ms  
- Headline: `y: 20px → 0`, `opacity: 0 → 1`, delay: 80ms  
- Subheadline / description: `y: 16px → 0`, `opacity: 0 → 1`, delay: 160ms  
- Body paragraph: `y: 12px → 0`, `opacity: 0 → 1`, delay: 240ms

**Mobile fallback:** Same behavior. Y values halved (12px → 6px, 20px → 10px, etc.) to reduce perceived motion on smaller screens.

---

### 5.2 Character-by-Character Animation

Used only for the Contact section headline: "Ready to talk strategy?"

**Trigger:** Contact section enters viewport at 60% from the top (fires later than standard reveals — the user should be deep in the section before this triggers)  
**Duration per character:** 200ms  
**Stagger per character:** 30ms  
**Easing:** `ease.enter`  
**Behavior:** Each character (including spaces) is wrapped in a `<span>`. Each span animates `opacity: 0 → 1`, `y: 8px → 0`. Spaces have `opacity: 0 → 0` (invisible but present for layout). Total animation time: ~800ms for "Ready to talk strategy?"  
**Once:** true  
**Implementation note:** The headline must be split into individual character spans at render time. Spaces and punctuation are included as spans to preserve natural text flow.

**Mobile fallback:** Full headline fades in as a single unit — `opacity: 0 → 1`, `y: 16px → 0`, `dur.enter`. Character animation is disabled on mobile to avoid jank on lower-powered devices.

---

### 5.3 Word-by-Word Animation

Used for the hero headline entering on mount.

**Trigger:** Page mount (after arrival overlay clears)  
**Duration per word:** 350ms  
**Stagger per word:** 60ms  
**Easing:** `ease.enter`  
**Behavior:** "Legal Solutions, Reimagined" is split into three word groups: ["Legal", "Solutions,", "Reimagined"]. Each group animates `opacity: 0 → 1`, `y: 20px → 0`. The comma stays attached to "Solutions,". Total animation time: ~470ms.

**Mobile fallback:** Full headline fades in as a unit — `opacity: 0 → 1`, `y: 20px → 0`, `dur.enter`.

---

### 5.4 Practice Area Transition (Expertise Panel)

The active practice area name in the Expertise left panel transitions as scroll advances.

**Trigger:** User scrolls to advance to next practice area (one per viewport height of scroll)  
**Duration:** 200ms  
**Easing:** `ease.smooth`  
**Behavior:**  
- Inactive names: `opacity: 1 → 0.35`, `font-size: active → resting` (active names may be 2–4% larger, this normalizes)
- Newly active name: `opacity: 0.35 → 1`
- Active underline indicator: translates on the y-axis from the previous active name's y-position to the current active name's y-position — `y: prev → current`, 300ms, `ease.smooth`
- Right panel content exit: `opacity: 1 → 0`, `x: 0 → -20px`, 200ms, `ease.exit`
- Right panel content enter: `opacity: 0 → 1`, `x: 20px → 0`, 200ms, `ease.enter`, 200ms delay (starts as old content finishes exiting)

**Mobile fallback:** The underline slide is replaced by a left border accent that appears/disappears (`width: 0 → 2px`) on the active accordion item.

---

### 5.5 Stats Count-Up

**Trigger:** Stats row enters viewport  
**Duration per stat:** `dur.cinematic` (1200ms)  
**Easing:** Custom ease-out deceleration — fast at first, very slow at the end. Approximated as `[0.0, 0.9, 0.1, 1.0]`.  
**Behavior:** Each number counts from 0 to its target value. Numbers with "+" suffix display the "+" from the beginning (not animated). Numbers with text (e.g., "Years") display the text unit below the counter, not as part of the count animation. Each stat starts its count 100ms after the previous one — staggered left to right.  
**Once:** true  
**Mobile fallback:** Identical — count-up is a JavaScript animation (requestAnimationFrame), not CSS-dependent, so it works identically on mobile.

---

## 6. Video System

### 6.1 Autoplay Behavior

Applies to the collection reel on the Clients section homepage preview and the Clients page featured reel.

**Trigger:** Video element is 50% in the viewport (IntersectionObserver, threshold: 0.5)  
**Behavior on trigger:** `video.play()` is called. Video is muted (`muted` attribute set). Playback begins from the start.  
**Behavior on exit:** Video pauses when less than 10% is in the viewport (threshold: 0.1 for pause). This prevents audio bleed if the user scrolls past quickly.  
**Interaction override:** If the user has clicked the unmute button, the video continues playing with audio even when partially out of viewport. It only pauses when fully out.

**Mobile fallback:** Autoplay is disabled on mobile to respect mobile data and battery constraints. A poster image (first frame) is shown with an explicit play button. The user must tap to begin playback.

---

### 6.2 Hover Preview Behavior (Individual Testimonial Videos)

Applies to the four individual testimonial video cards on the homepage and Clients page.

**Trigger:** Cursor enters the video card element  
**Duration:** Video preview fade-in: `dur.normal` (350ms), `ease.enter`  
**Behavior:** 
- A short preview clip begins playing at 0% volume (muted) inside the card
- The static poster image fades out as the video fades in — cross-fade, not cut
- The play button icon fades in at center of the card (`opacity: 0 → 1`, `dur.fast`)
- The client's name shifts from white to accent color
- Other sibling cards dim to 70% opacity
- On cursor exit: video pauses, poster fades back in over `dur.fast`, siblings return to 100% opacity

**Click behavior:** Cursor click on the card opens a full-screen modal containing the full video at full volume. The click target is the entire card surface (not just the play button).

**Mobile fallback:** No hover preview (touch has no hover). The card shows the poster image with a permanent play button. Tap opens the modal directly. Sibling dimming does not apply.

---

### 6.3 Video Modal Behavior

Applies globally wherever a video is clicked to expand.

**Trigger:** User clicks a video card  
**Open animation:**  
- Duration: `dur.normal` (350ms)  
- Easing: `ease.enter`  
- Backdrop: `opacity: 0 → 0.85`, full-screen dark overlay, covers page scroll content
- Modal container: `scale: 0.88 → 1`, `opacity: 0 → 1`  
- Video begins playing at full volume as soon as the modal reaches full scale
- Page scroll is locked (overflow: hidden on body) while modal is open

**Close animation:**  
- Triggered by: Escape key, click on backdrop, or close button (X)  
- Duration: `dur.fast` (200ms)  
- Easing: `ease.exit`  
- Modal: `scale: 1 → 0.92`, `opacity: 1 → 0`  
- Backdrop: `opacity: 0.85 → 0`  
- Video is paused and reset to 00:00 as close animation ends
- Page scroll is restored

**Mobile fallback:** Modal occupies 95vw × auto height on mobile. Scale animation is retained. Close button is more prominently sized (minimum 44×44px tap target).

---

### 6.4 CSR Hover Preview Behavior

Applies to the CSR campaign tiles in the CSR Impact Engine section.

**Trigger:** Cursor enters the campaign tile  
**Duration:** `dur.normal` (350ms)  
**Easing:** `ease.smooth`  
**Behavior:** 
- The video behind the poster begins playing (muted, looped)
- Poster image fades from `opacity: 1 → 0` over 400ms
- Campaign title shifts to accent color
- Card lifts: `y: 0 → -6px`, `box-shadow` deepens
- A small play icon appears at bottom-right of the tile

**Mobile fallback:** No hover preview. Tiles show the poster with a visible play button. Tap to open modal.

---

### 6.5 Viewport Behavior (Performance)

**Rule:** No video element plays while outside the viewport. All video elements are paused via `IntersectionObserver` when they leave the viewport.

**Poster images:** All video elements have a `poster` attribute pointing to the first frame or a dedicated thumbnail. The poster is always shown before playback begins and while the video is loading.

**Lazy loading:** All video elements use `preload="none"` by default. Video data is not loaded until the user interacts with the video or the autoplay threshold is reached.

**Exception:** The collection reel uses `preload="metadata"` (not "none") to allow the poster frame to be determined programmatically and to reduce the delay between scroll-trigger and playback start.

---

## 7. Portrait System

### 7.1 Portrait Hover Depth Effect

Applies to all portrait images — Leadership section on homepage, People page gallery.

**Trigger:** Cursor enters the portrait element  
**Duration:** `dur.slow` (700ms)  
**Easing:** `ease.spring` (stiffness 180, damping 24)  
**Behavior:** 
- Portrait image scales slightly: `scale: 1 → 1.04`
- A CSS `perspective` transform is applied to the portrait container as a 3D plane. The portrait image rotates subtly on x and y axes based on cursor position within the portrait:
  - Maximum rotation: ±8deg on both x and y axes
  - Rotation is calculated as a linear map from cursor position within the portrait to the rotation angle: center = 0deg, top-left corner = `-8deg, -8deg`, bottom-right corner = `+8deg, +8deg`
- The dark gradient overlay at the bottom deepens from 60% to 75% opacity
- The portrait's `box-shadow` increases to simulate the light source shifting

**Cursor exit behavior:**  
- Duration: `dur.normal` (350ms)  
- Easing: `ease.spring`  
- All values return to rest state: `scale: 1`, `rotateX: 0`, `rotateY: 0`, gradient returns to 60%

**Mobile fallback:** No 3D tilt. No scale. The gradient deepens on tap and returns to rest. No spring physics on mobile.

---

### 7.2 Bio Reveal Behavior

Applies to portrait cards in the Leadership section on the homepage.

**Trigger:** Cursor enters the portrait card  
**Duration:** `dur.normal` (350ms)  
**Easing:** `ease.enter`  
**Behavior:** 
- Bio text is positioned below the name and role, initially clipped by the portrait frame (overflow hidden on the card, bio is at `y: 100%` of its own height)
- On hover: bio translates upward into view: `y: 100% → 0`, `opacity: 0 → 1`
- The name and role shift upward slightly to make room: `y: 0 → -8px`
- The gradient overlay expands upward to cover the bio text adequately

**Cursor exit behavior:**  
- Bio slides back down: `y: 0 → 100%`, `opacity: 1 → 0`, `dur.fast`  
- Name and role return: `y: -8px → 0`, `dur.fast`

**Mobile fallback:** Bio is always visible below the portrait image (not overlaid). The reveal animation does not apply. The portrait and bio are laid out vertically as a standard content block.

---

### 7.3 Portrait Entry Animation (People Page)

**Trigger:** Portrait enters viewport (scroll reveal)  
**Duration:** `dur.slow` (700ms)  
**Stagger:** 120ms per portrait  
**Easing:** `ease.enter`  
**Behavior:** `y: 40px → 0`, `opacity: 0 → 1`  
**Once:** true  
**Mobile fallback:** `y: 20px → 0`, `opacity: 0 → 1`, `dur.enter` (500ms). Stagger maintained.

---

## 8. Map System

Applies to the Regional Presence section and the LLA page.

### 8.1 Map Outline Draw

**Trigger:** Map SVG container enters viewport at 30% threshold  
**Duration:** `dur.cinematic` (1200ms)  
**Easing:** `[0.4, 0, 0.6, 1]` — slow at start (the pen lifts), accelerates, then decelerates as the path completes  
**Behavior:** SVG path has `stroke-dasharray` set equal to its total path length. `stroke-dashoffset` animates from full path length to 0, revealing the path as if drawn by hand. The fill of land masses fades in simultaneously at 30% opacity, completing over the same duration.  
**Once:** true  
**Mobile fallback:** The map outline is shown as a complete static image — no draw animation. The SVG is replaced by a PNG or simplified static SVG at mobile breakpoints.

---

### 8.2 Node Reveal

**Trigger:** Fires 200ms after the map outline draw animation completes  
**Duration per node:** 300ms  
**Stagger:** 60ms per node (UAE first, then neighboring regions outward by geography)  
**Easing:** `ease.spring` (stiffness 240, damping 18)  
**Behavior:** Each node (small circle at each jurisdiction's location on the map) appears with `scale: 0 → 1` from its center point. A secondary ring pulses outward once on appearance: `scale: 1 → 2.5`, `opacity: 0.6 → 0`, duration 600ms. The UAE node is 1.5× larger than other nodes.  
**Once:** true  
**Mobile fallback:** Nodes appear statically — no scale animation, no pulse ring.

---

### 8.3 Connection Line Animation

**Trigger:** Fires after all nodes have appeared (200ms after the last node's entry animation completes)  
**Duration per line:** 400ms  
**Stagger:** 80ms per line  
**Easing:** `ease.enter`  
**Behavior:** Each line draws from its origin point (the region name on the left of the section) to its destination (the map node). Implemented as SVG lines with `stroke-dashoffset` animation, same technique as the map outline draw. Lines are thin (1px), accent color, at 40% opacity.  
**Once:** true  
**Mobile fallback:** Connection lines do not appear on mobile. The layout does not use the two-column text+map composition on mobile — region names are listed plainly.

---

### 8.4 Node Hover State

**Trigger:** Cursor enters within 20px of a map node  
**Duration:** `dur.fast` (200ms)  
**Easing:** `ease.spring`  
**Behavior:** 
- Node scales from 1 → 1.5
- A permanent tooltip appears above the node: jurisdiction name + one-line descriptor
- Tooltip entrance: `y: 8px → 0`, `opacity: 0 → 1`, `dur.fast`
- The corresponding region name on the left panel shifts to full opacity (if at reduced opacity) and accent color
- The connecting line brightens from 40% to 80% opacity

**Cursor exit behavior:** All return to rest state, `dur.fast`.  
**Mobile fallback:** Nodes are tappable. Tap a node to show/hide the tooltip below the node (not a hover state — a toggle).

---

### 8.5 Node Idle Pulse

**Trigger:** After initial appearance, all nodes enter an idle pulse loop  
**Duration of one pulse:** 2400ms (slow enough to be ambient, not distracting)  
**Easing:** `ease-in-out` (CSS)  
**Behavior:** Each node's outer ring pulses independently: `scale: 1 → 1.8`, `opacity: 0.4 → 0`, looping with `alternate: false`. Each node is offset by 300ms from its neighbor so they pulse out of sync — creating an organic, living feel rather than a synchronized heartbeat.  
**Mobile fallback:** Idle pulse is disabled on mobile. Nodes are static.

---

## 9. Particle System

### 9.1 Hero Particle Field

The hero particle canvas is the site's most visible and computationally intensive animation. It must maintain 60fps at all times on desktop.

**Canvas size:** Full viewport width and height, updated on `resize`  
**Particle count (desktop):** 80 particles  
**Particle count (tablet, 768–1024px):** 50 particles  
**Particle count (mobile):** 0 — canvas is hidden; replaced by static gradient background

**Particle properties:**
- Radius: 2–4px, randomly assigned at creation
- Velocity: random direction, speed range 0.3–0.8px per frame
- Color: white at 60% opacity (dots); connecting lines are white at `opacity = (1 - distance/maxDistance) × 0.25`
- Connection distance threshold: 120px — particles within 120px draw a connecting line between them
- Named nodes: 3–5 particles are marked as "named nodes" — slightly larger (6px), slightly brighter (80% opacity), with a text label rendered on the canvas beside them ("Expertise" · "Industries" · "Regions")

**Boundary behavior:** Particles that reach a canvas edge reverse their velocity component on that axis (bounce). The bounce is not perfectly elastic — a small random perturbation is added to prevent particles from travelling in perfectly predictable diagonal lines.

**Mouse interaction:**
- Repulsion radius: 100px from cursor position
- When a particle is within the repulsion radius, it accelerates directly away from the cursor
- Acceleration magnitude: proportional to proximity — strongest at cursor position, zero at 100px boundary
- The acceleration is applied once per frame (not cumulative) — particles return to normal velocity as they exit the repulsion zone

**Cursor attraction (named nodes only):** Named nodes are gently attracted toward the cursor when within 200px — a slow drift, not a fast snap. This makes the named nodes appear to want to follow the cursor, creating a sense of intelligence.

---

### 9.2 Performance Constraints

**Frame budget:** The particle animation must consume no more than 4ms of frame time per frame (leaving 12ms for React rendering and browser compositing in a 60fps budget of 16.7ms total).

**IntersectionObserver gating:** The particle canvas `requestAnimationFrame` loop is paused entirely when the hero section is not in the viewport. This is done via `IntersectionObserver` on the hero container. When the user scrolls past the hero, the animation loop stops and does not resume until the user scrolls back.

**Tab visibility:** The animation loop pauses when the browser tab is not visible (`document.visibilityState === 'hidden'`) and resumes when the tab becomes active again.

**Resize handling:** Canvas dimensions are updated on `window.resize` with debouncing (100ms delay). Particles that fall outside the new canvas boundary after resize are repositioned to be within bounds.

**Reduced motion override:** When `prefers-reduced-motion: reduce` is detected, the particle field is not rendered at all. The hero background falls back to a static dark gradient or a low-opacity image of `public/dubai-skyline.png`.

---

### 9.3 Particle Transition State

Between the arrival overlay and the hero, the particle field is in a "birth" state: particles all start near the center of the canvas and disperse outward to their natural positions over `dur.cinematic` (1200ms). This creates a sense of the network coming alive as the page loads.

**Trigger:** After the arrival overlay fade-out begins  
**Duration:** 1200ms  
**Easing:** Custom — particles decelerate as they approach their initial random positions  
**Mobile fallback:** Not applicable — no particle field on mobile

---

## 10. Mobile Rules

### 10.1 Breakpoint Definitions

| Breakpoint | Width | Motion Profile |
|------------|-------|---------------|
| Mobile | < 640px | Minimal motion — fade and opacity only |
| Tablet | 640px – 1024px | Reduced motion — fade + light y-translate, no 3D, no parallax, reduced stagger |
| Desktop | > 1024px | Full motion — complete system as defined above |

---

### 10.2 Mobile Motion Fallbacks (Complete Reference)

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Arrival overlay | Full — logo + fade | Same duration, no logo scale |
| Hero particles | 80 particles, mouse interaction | None — static gradient background |
| Hero entrance | Word-by-word stagger | Single unit fade-in |
| Page transitions | Slide + blur cross-fade | Fade only (opacity) |
| Scroll pinning (Expertise) | Pinned split panel | Vertical accordion |
| Scroll pinning (CSR) | Pinned left + parallax strip | Single column, natural scroll |
| Parallax (all) | Active | Disabled |
| Character animation | Active (Contact section) | Single unit fade-in |
| Portrait 3D tilt | Active | Disabled |
| Portrait bio reveal | Hover-triggered slide | Always visible below portrait |
| Magnetic buttons | Active (all CTAs) | Disabled — active scale only |
| Custom cursor | Active | Disabled — OS cursor |
| Industry ribbon | Three rows, different speeds | One row, constant speed |
| Video hover preview | Active | Disabled — poster + tap to open |
| Video autoplay | Active (muted, on scroll entry) | Disabled — explicit tap required |
| Map outline draw | Active (SVG animation) | Static image |
| Map node reveal | Active (scale spring) | Static |
| Map connection lines | Active | Hidden |
| Map node pulse | Active | Disabled |
| Cursor: Media state | Active (ring + label) | N/A |
| Cursor: Drag state | Active | N/A |
| Stats count-up | Active | Active (identical) |
| Reveal standard | `y: 24px`, 500ms | `y: 12px`, 500ms |
| Reveal slow | `y: 40px`, 700ms | `y: 20px`, 500ms |
| Stagger intervals | As specified | Reduced by 30% (60ms → 42ms, etc.) |
| Section background crossfade | Active | Active (CSS transition) |

---

### 10.3 Performance Requirements (Mobile)

- **Target:** 60fps on iPhone 12 and equivalent Android. Minimum acceptable: 30fps on iPhone X and equivalent.
- **No JavaScript animations on mobile that affect layout.** Only `transform` and `opacity` are animated — never `width`, `height`, `top`, `left`, `margin`, or `padding`.
- **`will-change: transform`** is applied to elements that animate on mobile, but removed after animation completes to release GPU memory.
- **Video:** `preload="none"` on all video elements on mobile. No video autoplays. Video data is only loaded when explicitly requested by the user.
- **Particle canvas:** Not rendered on mobile. Canvas element is removed from the DOM entirely on mobile (not just hidden) to prevent any GPU allocation.
- **IntersectionObserver:** Used for all scroll-triggered animations on mobile — never `scroll` event listeners (too frequent, causes jank).

---

## 11. Accessibility

### 11.1 Reduced Motion

When `prefers-reduced-motion: reduce` is detected via the CSS media query or the Framer Motion `useReducedMotion` hook, the following rules apply globally:

**Disabled entirely:**
- Particle field (canvas animation)
- 3D portrait tilt
- Magnetic button behavior
- Character-by-character text animation
- Map outline draw
- Map node pulse
- Industry ribbon auto-scroll
- Parallax effects (all)
- Scroll-pinned panel advancement (replaced by click-only)
- Video hover preview
- Video autoplay (even on desktop)
- Arrival overlay animation (page loads directly into hero)

**Simplified (not disabled):**
- All `y` translate values collapse to 0 (opacity-only reveals remain)
- All durations reduce to `dur.fast` (200ms) maximum
- Stagger intervals collapse to 0ms (all elements reveal simultaneously)
- Page transitions reduce to opacity cross-fade only (`dur.fast`)
- Stats count-up: numbers appear at their final values immediately, no counting animation
- Video modal open/close: opacity cross-fade only (`dur.fast`), no scale

**Rule:** Nothing is hidden or inaccessible in reduced-motion mode. All content is visible. All interactions work. Motion is reduced, not removed entirely. The `opacity` transitions are kept because they are gentle and prevent jarring instant appearances.

---

### 11.2 Keyboard Navigation Support

**Custom cursor:** The custom cursor system is not relevant to keyboard navigation (it tracks the mouse, not focus). Focus styles operate independently.

**Focus rings:** Every interactive element has a visible focus ring:
- Color: accent color (`oklch(0.78 0.13 184)`)
- Width: 2px solid
- Offset: 3px (does not overlap the element boundary)
- Shape: matches the element's border-radius

**Scroll-pinned Expertise panel:** Keyboard users can Tab through the six practice area names in the left panel. Pressing Enter or Space on a name activates that practice area (updates the right panel). The scroll-driven auto-advance does not apply to keyboard users — they control the panel manually.

**Video cards:** All video cards are keyboard-focusable. Tab navigates between them. Enter or Space opens the video modal. Escape closes the modal. Focus returns to the card that opened the modal when the modal closes.

**Video modal:** When open, focus is trapped within the modal. Tab cycles through: close button → video controls → close button. The video's native browser controls (`<video controls>`) are accessible when the modal is open.

**Industry ribbon:** The ribbon auto-scrolls but individual industry names are not keyboard-navigable from the homepage (they are links to the Industries page). A "Skip ribbon" element allows keyboard users to skip to the next section.

**Map nodes:** Map nodes on the LLA page and Regional Presence section are keyboard-focusable (via `tabindex="0"`). Tab navigates between nodes. Enter or Space shows the tooltip/panel for that node. The tooltip remains visible until the user presses Escape or moves focus to another node.

**Accordion (mobile Expertise):** Tab navigates between accordion triggers. Enter or Space toggles the accordion open/close. Arrow keys navigate between triggers.

**Modal escape:** All modals (video, any overlay) close on Escape key press. This is implemented as a `keydown` listener that is attached when the modal opens and removed when it closes.

**Skip link:** A visually hidden "Skip to main content" link is the first focusable element on every page. Becomes visible on focus. Links to `#main-content` which is the `<main>` element.

---

## Motion Token Summary

```
EASING
  ease.enter    [0.22, 1, 0.36, 1]            Entrance animations
  ease.exit     [0.55, 0, 1, 0.45]            Departure animations
  ease.spring   stiffness: 280, damping: 28   Interactive responses
  ease.smooth   [0.4, 0, 0.2, 1]              State transitions

DURATION
  dur.instant   100ms    Micro-feedback
  dur.fast      200ms    Hover states
  dur.normal    350ms    Component transitions
  dur.enter     500ms    Standard entrance
  dur.slow      700ms    Rich entrance
  dur.cinematic 1200ms   Signature animations
  dur.epic      1800ms   Page-level transitions

STAGGER
  Text lines             80ms
  Characters             30ms
  Words                  60ms
  Cards                  80ms
  Portraits              120ms
  List items             60ms
  Map nodes              60ms
  Stats                  100ms delay between

REVEAL DEFAULTS
  Standard    y: 24px → 0, opacity, dur.enter, ease.enter
  Slow        y: 40px → 0, opacity, dur.slow, ease.enter
  Left        x: -24px → 0, opacity, dur.enter, ease.enter
  Right       x: 24px → 0, opacity, dur.enter, ease.enter
  Scale       scale: 0.92 → 1, opacity, dur.enter, ease.enter
  Instant     opacity only, dur.fast, ease.enter

MAGNETIC
  Button radius     80px from element edge
  Button magnitude  8px max displacement
  Portrait radius   80px
  Portrait magnitude 4px max displacement

CURSOR
  Dot size       8px (rest), 12px (text hover)
  Ring size      32px (rest), 48px (text hover), 56px (button hover), 80px (media hover)
  Ring follow    60ms lag, spring stiffness: 120, damping: 14

PARTICLE FIELD
  Desktop count   80 particles
  Tablet count    50 particles
  Mobile count    0 (disabled)
  Connection dist 120px threshold
  Repulsion radius 100px from cursor
  Named nodes     3–5 larger, labelled
```

---

*End of Motion System V2.*
