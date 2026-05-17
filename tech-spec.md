# Tech Spec — Viktor Bereziak Portfolio

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM renderer |
| three | ^0.172.0 | WebGL 3D engine |
| @react-three/fiber | ^9.0.0 | React renderer for Three.js |
| @react-three/drei | ^9.0.0 | R3F helpers (Html, useTexture, useAspect) |
| gsap | ^3.12.0 | Animation engine + ScrollTrigger plugin |
| lenis | ^1.2.0 | Smooth scroll with inertia |
| tailwindcss | ^4.0.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | React Fast Refresh + JSX |
| typescript | ^5.7.0 | Type checking |
| @types/react | ^19.0.0 | React types |
| @types/react-dom | ^19.0.0 | ReactDOM types |
| @types/three | ^0.172.0 | Three.js types |

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Single — fixed bar, mobile hamburger overlay, scroll-triggered border |
| Footer | Custom | Single — social icons + copyright |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Particle canvas background + staggered fade-in text |
| AboutSection | Custom | 2-col grid, portrait image |
| SkillsSection | Custom | 4-col badge grid with staggered fade-in |
| ProjectsSection | Custom | 3D canvas (desktop) / static card fallback (mobile <768px) |
| ContactSection | Custom | Social icons + form with validation |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| ParticleCanvas | Custom | HeroSection — canvas rAF loop with IntersectionObserver pause |
| CardScrollGallery | Custom | ProjectsSection — R3F Canvas + curved tube scene |
| ProjectInfoPanel | Custom | ProjectsSection — overlay text, updates from active card z-position |
| ContactForm | Custom | ContactSection — validation, success state |
| MobileProjectCards | Custom | ProjectsSection — static vertical stack, shown only <768px |
| FadeIn | Custom hook | About, Skills, Contact sections — IntersectionObserver + CSS transitions |

### Hooks

| Hook | Purpose |
|------|---------|
| useFadeIn | Attaches IntersectionObserver to ref, toggles `.visible` class for CSS transitions. Supports configurable threshold and stagger delay. |
| useLenisScroll | Initializes Lenis, wires GSAP ticker for `lenis.raf`, exposes `lenis` instance for programmatic scroll-to. |
| useActiveProject | Tracks which project card is closest to camera z=0 in the 3D gallery, returns index for cross-fading the info panel. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Particle constellation (drift + line connections + mouse repulsion) | Vanilla Canvas 2D | Hand-written rAF loop in ParticleCanvas. Canvas pauses via IntersectionObserver when hero offscreen. | **High** 🔒 |
| 3D curved card scroll gallery | Three.js + R3F + custom GLSL | Custom vertex shader curves PlaneGeometry along CatmullRomCurve3 path. Scroll drives card group z-position via Lenis. Mouse drives camera look with lerp damping. Infinite wrap via modulo. | **High** 🔒 |
| Active card highlight glow | CSS | Dynamic class toggle on center-most card. `box-shadow` + `scale` transition. | Low |
| Project info panel cross-fade | CSS | Opacity transition (0.3s) on panel content keyed by `useActiveProject` index. | Low |
| Skill badge hover glow | CSS | `transition` on background, border-color, transform, box-shadow. Pure CSS, no JS. | Low |
| Hero text staggered fade-in | CSS + IntersectionObserver | useFadeIn hook applies `.fade-in` class with sibling `transition-delay` (0.1s increments). | Low |
| Section fade-in (About, Skills, Contact) | CSS + IntersectionObserver | useFadeIn hook, 0.6s translateY + opacity transition. Skills badges get 0.05s stagger. | Low |
| Mobile scroll indicator pulse | CSS | `@keyframes pulse` on opacity, 2s infinite. Hidden when scrollY > 100px. | Low |
| Nav border on scroll | CSS | Class toggle when scrollY > 100vh, opacity transition 0.3s. | Low |
| Button hover scale/shadow | CSS | `transition` on transform + box-shadow. | Low |
| Social icon hover lift | CSS | `transition` on color + transform. | Low |
| Mobile hamburger overlay | Framer Motion or CSS | Open/close transition on fullscreen overlay. Can be done with CSS transitions; Framer Motion not strictly needed for this alone. **Decision: skip Framer Motion** — overlay is a simple opacity + translateY transition, CSS is sufficient. | Low |
| Contact form success transition | CSS | Fade-in on success message replacing form. | Low |

---

## State & Logic Plan

### 1. Lenis ↔ GSAP ↔ ScrollTrigger Bridge

Lenis owns the scroll loop. GSAP's ticker calls `lenis.raf(time * 1000)` each frame. ScrollTrigger instances register for About, Skills, and Contact section fade-in triggers. No React state involved — purely imperative wiring in `useLenisScroll`.

### 2. Particle Canvas Lifecycle

ParticleCanvas manages its own imperative rAF loop. On mount, creates canvas context and starts the loop. Uses IntersectionObserver on its container to pause/resume the loop. On unmount, cancels rAF. All particle positions/velocities live in a flat Float32Array for performance, not React state.

### 3. 3D Gallery Scroll Binding

The CardScrollGallery reads Lenis scroll progress (not React scroll state). A `useFrame` hook in R3F consumes `lenis.scroll` each frame to update the card group's z-position and the `uScrollSpeed` uniform. The `useActiveProject` hook reads the card group's world z-positions each frame to determine which card index is nearest center. This index is stored in a ref (not useState) to avoid React re-renders at 60fps — the ProjectInfoPanel reads this ref directly or updates at a throttled rate.

### 4. Contact Form State Machine

Three states: `idle` | `submitting` | `success`. Field-level validation on blur/submit. No external library — hand-written validation (required, email regex, min lengths). On success, replace form with success message via CSS fade.

### 5. Mobile 3D Fallback

ProjectsSection renders either CardScrollGallery or MobileProjectCards based on a `useMediaQuery` hook checking `(min-width: 768px)`. The Canvas only mounts on desktop — no conditional rendering inside R3F, the entire R3F subtree is absent on mobile, saving bundle weight and GPU resources.

---

## Other Key Decisions

### No shadcn/ui

The design is fully custom-dark with no standard UI patterns (no dialogs, dropdowns, tables, forms that benefit from shadcn primitives). All components are bespoke styled elements. Adding shadcn would introduce unused infrastructure.

### No Framer Motion

The design's animations are either canvas-based (particles, 3D gallery) or simple CSS transitions (fade-in, hover effects). The only potentially FM-appropriate animation is the mobile nav overlay, which is a straightforward CSS opacity/translate transition. Framer Motion would add ~30KB for marginal value.

### Custom GLSL Shaders for 3D Gallery

The curved card tunnel requires a custom vertex shader that displaces each vertex of the PlaneGeometry based on its world position along a CatmullRomCurve3 path. This is not achievable with standard R3F materials. The vertex shader applies `uCurveStrength` and `uCurveFrequency` to bend cards along a smooth curve. The fragment shader is a basic texture sampler. The shader code is the critical complexity point of the entire project.

### Project Data Source

Project metadata (titles, descriptions, tags, screenshot paths) is a static array in a `projects.ts` file. Consumed by both the 3D gallery (for texture mapping and info panel) and the mobile fallback cards.
