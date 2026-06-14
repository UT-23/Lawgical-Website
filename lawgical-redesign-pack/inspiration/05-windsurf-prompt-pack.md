# Windsurf Prompt Pack

Use this prompt after the folder is assembled.

## Main prompt
Rebuild this entire law firm website from scratch using the provided content and assets only. Keep all content semantically equivalent, but redesign the experience completely so it feels premium, interactive, modern, and far away from the original layout.

Use the inspiration docs as the motion and layout reference:
- cinematic hero
- layered scroll storytelling
- interactive service exploration
- premium team presentation
- magazine-style news feed
- conversion-focused contact section
- high-end footer

Do not reuse the original spacing, card styles, or section rhythm. Create a new design system with:
- strong typography hierarchy
- darker or richer atmospheric surfaces
- elegant accent color usage
- motion on scroll, hover, and entry
- subtle 3D depth where it adds value
- polished microinteractions
- accessible interactions and responsive behavior

### Required behaviors
- Page transitions or section reveal motion
- Hover lift and magnetic CTA treatment
- Interactive cards for services, industries, and team
- Animated hero content on load
- Scroll-triggered section reveals
- Better footer and contact conversion moment
- Smooth mobile navigation experience

### Constraints
- Preserve all content meaning
- Use existing logos, portraits, images, and videos from the extracted asset folder
- Do not invent new legal claims
- Do not copy the current layout
- Keep the experience performance-conscious
- Respect reduced-motion preferences
- Keep forms accessible and keyboard-friendly

### Implementation guidance
Prefer modular React components with reusable motion primitives. Use Framer Motion for component transitions, GSAP only where scroll timing needs precision, and Three.js only for one meaningful immersive element.

## Secondary prompt
Now produce the redesigned homepage first, then build the inner pages using the same design system and motion language. Prioritize the most visible user journeys before polishing secondary sections.
