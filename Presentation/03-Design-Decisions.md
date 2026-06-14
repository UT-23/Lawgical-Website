# Design Decisions
## Strategic Rationale Behind the Redesign

This document outlines the core visual, layout, and motion choices implemented for the new Lawgical Group website, detailing the strategic reasons why each decision was made.

---

## 1. Visual Language: The "Legal Intelligence" Theme
* **Decision:** We rejected the standard corporate "brochure" look (which uses stock pictures of scales, gavels, and business handshakes) and implemented a clean, dark-mode-first, financial-terminal-inspired visual theme.
* **Why:** Corporate general counsels and multi-national boards operate on data, speed, and precision. A design inspired by **Palantir** and **Bloomberg terminals** instantly communicates that Lawgical operates with modern technical sophistication. The dark accents create visual depth and a premium, high-end feel that makes the firm look more authoritative.

---

## 2. Typography: Sora + Geist Fonts
* **Decision:**
  * **Headings:** **Sora** (a modern geometric sans-serif from Google Fonts with high structural legibility and premium character spacing).
  * **Body Copy:** **Geist** (a clean, highly readable monospaced-influenced sans-serif designed for data density and clarity).
* **Why:** Traditional law firm websites use standard serif fonts (like Times New Roman or Georgia) to try to look historic. By using Sora and Geist, we position Lawgical Group as a forward-looking, technology-driven firm. The geometry of Sora stands out on headers, while Geist ensures that long briefings and contract checklists are easy to read on mobile and desktop viewports.

---

## 3. Layout System: Asymmetric Editorial Grids
* **Decision:** We replaced symmetric, repeating card grids with editorial-style asymmetric grid panels (for example, the split featured cover card on the Insights feed and the floating irregular constellation blocks for client logos).
* **Why:** Standard uniform grids look like templates. Asymmetric editorial layouts mirror high-end digital design galleries (like Apple and Stripe). This immediately informs visitors that the website was custom-designed for this brand, implying that the firm delivers bespoke, partner-led legal counsel rather than copy-paste solutions.

---

## 4. Imagery Strategy: Manual Cropping and Framing
* **Decision:**
  * All portraits are set up with custom, coordinate-based cropping configurations (`objectPosition: 'center 10%-18%'` values inside our database schema).
  * We avoid generic stock photography in favor of real office interiors, real portraits, and vector drawings.
* **Why:** Standard center crops frequently clip heads, crop out facial details, or focus on mid-body clothes, creating an inconsistent and unprofessional team grid. By manually aligning each partner’s face and eyes into the upper third of their frame, we ensure a unified, clean grid of advocates. Avoiding generic stock images builds genuine local credibility.

---

## 5. Motion Strategy: Spring Physics and Low-Opacity Accents
* **Decision:**
  * All interactive elements (such as the Custom Compass Cursor, modal fade-ins, and scroll reveals) utilize Framer Motion's spring physics.
  * We completely disable transitions and canvas fields if the user has **"Reduced Motion"** active on their operating system.
* **Why:** Linear CSS transitions feel mechanical and robotic. Spring physics mirror the natural weight and elasticity of physical objects, making the website feel organic, responsive, and alive. Disabling animations on reduced motion settings ensures the site is accessible and does not cause dizziness.

---

## 6. Branding Integration: Vector Monogram & Logo Accents
* **Decision:**
  * We copied the official company logo PNG from the `logo/` folder and used it in the Navbar, Footer, and the scale-and-fade Arrival Sequence loader.
  * We integrated tiny vector hexagon accents (matching the logo’s hexagonal geometry) as list bullets in Positioning cards and article header separators.
* **Why:** Integrating the monogram geometry into the loader and navigation makes the brand feel deliberate, established, and memorable. It quietly reinforces the brand identity without cluttering the screen with large, repetitive logo text.

---

## 7. Content Hierarchy: Transactional vs. Dispute Balance
* **Decision:** We restructured the homepage layout to present the **Expertise Ecosystem** first, followed by the **Trust Constellation** (logos), the **Leadership Spotlight**, and finally **Insights**.
* **Why:** Prospective clients visit a law firm website to verify three key things: *What do you do? Who have you done it for? and Who is leading the case?* Putting capability details, trusted logos, and partner credentials first answers these questions instantly. It prioritizes information and leads visitors toward booking a consultation.
