# Medicoz Infosystems - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern healthcare tech platforms like Headspace, Calm, and modern SaaS landing pages with healthcare sensibility. Emphasis on clean, trustworthy design with interactive engagement.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Pure White (#FFFFFF): Clean backgrounds, text on dark
- Forest Green (#80A586): Primary brand color for CTAs, accents
- Sage Green (#CAD9C2): Secondary backgrounds, subtle sections
- Mint Cream (#EAF3DE): Soft section backgrounds, cards
- Teal (#74B3BC): Interactive elements, hover states
- Deep Teal (#27515F): Typography, headers, navigation

**Color Application:**
- Dark mode disabled for this healthcare context - maintaining light, approachable aesthetic
- Hero: White text on dark teal (#27515F) background with parallax imagery
- Alternating sections: White, #EAF3DE, #CAD9C2 for visual rhythm
- CTAs: #80A586 with #27515F text, hover to #74B3BC
- Accent highlights: #74B3BC for interactive states

### B. Typography
**Font Families:**
- Headings: 'Inter' (700, 600, 500) - modern, professional
- Body: 'Inter' (400, 500) - excellent readability
- Accent/Tagline: 'Playfair Display' (600) - elegant, trustworthy

**Hierarchy:**
- H1 (Hero): 4xl-6xl, font-bold, tracking-tight
- H2 (Sections): 3xl-4xl, font-semibold
- H3 (Cards): xl-2xl, font-medium
- Body: base-lg, leading-relaxed
- Tagline: 2xl-3xl italic

### C. Layout System
**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Section padding: py-20 lg:py-32
- Component spacing: gap-8 to gap-12
- Card padding: p-8 to p-12
- Micro-spacing: p-4, m-4

**Container Strategy:**
- Max-width: max-w-7xl mx-auto
- Side padding: px-6 lg:px-8
- Content blocks: max-w-4xl for text-heavy sections

### D. Component Library

**Hero Section:**
- Full viewport height (min-h-screen) with parallax background
- Large hero image: Healthcare professional or diverse patients in consultation (warm, inclusive imagery)
- Overlay: Dark gradient (#27515F with 60% opacity) for text contrast
- Centered content with tagline and subheadline
- Floating nav bar (sticky, blurred background)

**Navigation:**
- Fixed top, backdrop-blur-md with white/10 opacity
- Logo left, smooth scroll anchor links right
- #27515F text, hover state #74B3BC
- Mobile: Hamburger menu with slide-in drawer

**Objectives Section:**
- 2x2 grid on desktop (grid-cols-1 md:grid-cols-2)
- Cards with rounded-2xl, bg-white, shadow-lg
- Icon or number badge in #80A586
- Staggered scroll animations (delay-100, delay-200, delay-300, delay-400)
- Hover: lift effect (translate-y-1, shadow-xl)

**CTA Banner:**
- Full-width section with #80A586 background
- Large headline with button group
- Primary button: bg-white text-#27515F
- Secondary button (outline): border-white text-white with backdrop-blur-sm
- Parallax subtle movement on scroll

**Scroll Animations:**
- Fade-in-up: Default for all sections (opacity + translateY)
- Parallax speeds: Hero background (0.5x), mid-layer (0.7x), foreground (1x)
- Number counters: Animate on scroll into view
- Scale-in: Cards grow from 0.95 to 1 on reveal
- Slide-in: Objectives appear from left/right alternating

### E. Interactive Elements
**Hover States:**
- Cards: scale(1.02) + shadow increase
- Buttons: brightness adjustment + slight scale
- Links: color transition to #74B3BC

**Micro-interactions:**
- Button ripple effect on click
- Smooth scroll with offset for fixed nav
- Cursor change for interactive elements
- Loading states for form submissions

**Parallax Implementation:**
- Hero background image: data-speed="0.5"
- Floating elements: subtle transform on scroll
- Section backgrounds: slight parallax for depth

## Images

**Hero Image:**
Large, high-quality hero image required - diverse healthcare setting showing compassionate care, technology integration, or patient-provider connection. Image should convey warmth, professionalism, and accessibility. Dimensions: 1920x1080 minimum, optimized for web.

**Placement:** Hero section background with dark overlay gradient

**Supporting Images:**
- Objectives section: Consider subtle icon illustrations (SVG) in brand colors
- Optional: Small accent images for visual interest between sections

## Animation Specifications
- Intersection Observer API for scroll triggers
- Animation timing: 0.6s ease-out for fades, 0.8s for parallax
- Stagger delays: 100-200ms between elements
- Respect prefers-reduced-motion for accessibility

## Responsive Behavior
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hero: Reduce text size, maintain full viewport
- Grid: Stack to single column below md
- Navigation: Collapse to hamburger below lg
- Parallax: Reduce or disable on mobile for performance