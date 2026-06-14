# Motion System

## Principles
- Motion should support clarity, trust, and premium feel
- Use subtle transitions rather than theatrical animation
- Animate the interface, not the user
- Prefer smooth, responsive, GPU-friendly effects

## Timing
### Fast
- 180ms to 250ms
- Use for button hover, focus states, small icon motion

### Normal
- 300ms to 500ms
- Use for cards, reveals, menus, form feedback

### Slow
- 600ms to 800ms
- Use for expanding panels, hero reveal, section transitions

## Easing
Recommended:
- ease-out for entry motion
- ease-in-out for expansion states
- spring motion only when very restrained

## Motion patterns
### Hero
- Shuffle text or reveal text
- Subtle background movement
- Very light parallax only

### Cards
- Hover lift
- Image fade and scale
- Overlay reveal
- Button fade-in

### Counters
- Count up when entering viewport

### Testimonials
- Carousel slide with controlled movement
- Pause on hover
- Keyboard accessible

### Office panels
- Expand/collapse width animation
- Smooth content reveal

### Forms
- Focus glow
- Floating icon feedback
- Success state animation

## Accessibility rules
- Respect prefers-reduced-motion
- Do not rely on motion alone to communicate state
- Keep interactive elements keyboard accessible
- Keep contrast strong in all states

## Performance rules
- Use transform and opacity wherever possible
- Avoid expensive layout animation when not needed
- Lazy-load images
- Keep repeated motion minimal
- Do not overuse continuous animation

## Recommended libraries
- Framer Motion for component motion
- React Bits for text and reveal effects
- Embla Carousel for testimonials
- Lenis for smooth scrolling if needed
- React CountUp for metrics
