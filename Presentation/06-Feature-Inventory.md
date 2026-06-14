# Feature Inventory
## Complete Website Feature Catalog

This document details every major component and interactive feature implemented on the rebuilt website, including its purpose, value, and technical code file locations.

---

## 1. Legal Intelligence Grid Background
* **Purpose:** Create an elegant, abstract canvas representing regional digital presence.
* **Business Value:** Replaces standard animated particle backgrounds with a professional, Bloomberg-inspired coordinate system.
* **Technical Implementation:** Uses HTML5 Canvas inside [particle-field.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/canvas/particle-field.tsx). It draws coordinate lines, glowing nodes (DXB, RUH, DOH, MCT, etc.), traveling data packets, and highlights areas using a mouse spotlight.

---

## 2. Legal Compass Custom Cursor
* **Purpose:** Replace the standard browser cursor with a custom navigation compass pointer.
* **Business Value:** Creates a highly memorable brand experience.
* **Technical Implementation:** Handled inside [cursor.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/global/cursor.tsx). It uses a rotating compass dial with cardinal ticks, coordinates tracking using Framer Motion springs, and updates center icons (Arrow, Play, View, Read, Explore) based on hover states.

---

## 3. Brand Arrival Loader
* **Purpose:** Build anticipation and verify branding on initial page entry.
* **Business Value:** Establishes a premium, premium feel from the first second of page load.
* **Technical Implementation:** Programmed inside [arrival-sequence.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/sections/home/arrival-sequence.tsx). It loops through introductory words before running a scale-and-fade animation of the official company logo, then unlocks the main website content.

---

## 4. Trust Network Client Mosaic
* **Purpose:** Showcase the firm's 25 corporate client relationships.
* **Business Value:** Proves regional trust. Grouping logos into industry sectors in a floating mosaic layout avoids generic scrolling marquee banners.
* **Technical Implementation:** Built inside [trust-constellation.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/sections/home/trust-constellation.tsx). It uses standard Next.js images loaded from `public/all_25_client_logos/` at `opacity-100`. When a logo is hovered, it expands (`scale-108`), reveals the company name in a tooltip, and dims surrounding logos inside the cluster container.

---

## 5. Dual Leadership Gallery
* **Purpose:** Feature principal leadership figures with equal emphasis.
* **Business Value:** Crucial for local advocacy authority. Spotlighting Managing Partner Kishore Mulani and UAE Advocate Dr. Essa Al Nuaimi equally builds trust with institutional clients.
* **Technical Implementation:** Programmed inside [leadership-gallery.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/sections/people/leadership-gallery.tsx). It details alternate full-width cards with large portraits and detailed lists of credentials, practice scopes, and rights of audience.

---

## 6. Portrait Card Depth System
* **Purpose:** Render team member cards in a modern interactive layout.
* **Business Value:** Keeps team bio pages clean while revealing credentials dynamically on scroll and hover.
* **Technical Implementation:** Coded inside [portrait-card.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/portrait/portrait-card.tsx). It applies a 3D tilt effect on mouse movement and reveals bios through slide-up animations. It uses `SafeImage` with fallback logic and handles custom crops to keep faces correctly framed.

---

## 7. Testimonial Video Modal Hub
* **Purpose:** Host high-quality video reviews and pro-bono campaign highlights.
* **Business Value:** Maximizes client conversions by sharing real, video-based success stories.
* **Technical Implementation:** Managed inside [video-modal.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/video/video-modal.tsx) and [video-card.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/video/video-card.tsx). Testimonial cards display muted autoplay video previews on hover. Clicking opens a fullscreen overlays modal with cinema focus.

---

## 8. Regional Location Map (LLA)
* **Purpose:** Provide an interactive map of Middle East jurisdictions and affiliate offices.
* **Business Value:** Proves cross-border capacity. General counsels can visually confirm that the firm operates desks in Saudi Arabia, Qatar, Oman, and Kuwait.
* **Technical Implementation:** Built inside [regional-map.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/sections/lla/regional-map.tsx) and [map-canvas.tsx](file:///d:/uthkarsh/LAW_TEMPLATE/Law_Website%20v0/lawgical-group-website%20(1)/components/canvas/map-canvas.tsx). It draws an interactive SVG map representing GCC nations, updating regional stats in a sidebar as nodes are hovered.
