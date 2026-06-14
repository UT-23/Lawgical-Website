# Motion and Interaction System

## Motion goals
Motion should do four jobs:
- orient the user
- reward exploration
- increase perceived quality
- improve conversion focus

## Recommended motion language
### Entry motion
- Fade + rise on page load
- Staggered reveal for cards and list items
- Hero content enters in layers
- Background elements drift independently

### Scroll motion
- Section headers pin briefly before revealing content
- Service or industry items animate in sequence
- Progress indicators show section position
- Parallax image depth in key hero and story blocks
- Sticky narrative panels for long-form sections

### Hover motion
- Card lift with shadow and border shift
- Image scale plus soft overlay reveal
- CTA buttons with magnetic pull or tracked hover
- Arrow icons drift on hover
- Subtle rotation or tilt on premium cards

### Microinteractions
- Button press compression
- Form field focus glow
- Tab state spring animation
- Success state animation after form submit
- Animated underline transitions for nav links
- Hover tooltips for team profile actions

## 3D and depth ideas
- Hero object that slowly rotates with cursor movement
- Cards with layered perspective on hover
- Floating accent shapes in the background
- Glass-like or translucent panels used sparingly
- Parallax planes in the hero and about sections
- Cursor-reactive spotlight on selected content blocks

## Suggested implementation stack
- Framer Motion for component motion
- GSAP for scroll-driven sequences
- Lenis or equivalent for smooth scrolling feel
- Three.js only where 3D meaningfully adds value
- CSS transforms for lightweight hover states
- IntersectionObserver for reveal timing

## Interaction rules
- Prefer motion that lasts 180ms to 700ms
- Keep easing soft and premium
- Never animate everything at once
- Use one focal interaction per section
- Reduce motion for accessibility and battery-conscious devices
- Preserve keyboard accessibility for every interactive control

## Signature interactions to add
- Hero CTA with magnetic hover
- Service cards that expand with layered details
- Industries cards that reveal sector-specific proof points
- Team profiles that flip between summary and credentials
- News cards with animated reading progress or featured state
- Contact form with instant validation feedback and success state
- Footer that unfolds in columns and animated link clusters
