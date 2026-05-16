# Dekorama Design System - Premium Minimalist

## Design Principles

1. **Generous Whitespace** - Let content breathe with ample padding and spacing
2. **Subtle Elegance** - Minimal shadows, refined typography, soft interactions
3. **Consistency First** - Every page follows the same structural patterns
4. **Accessibility Always** - Clear focus states, proper contrast, semantic markup
5. **Performance Aware** - Optimize images, minimize animations, fast loading

---

## Color Palette

### Primary Colors
```
Black:        #000000    (headings, primary text, buttons, borders)
White:        #FFFFFF    (backgrounds, button text on dark)
```

### Gray Scale
```
gray-50:      #F9FAFB    (light backgrounds, subtle sections)
gray-bg:      #F5F5F5    (section backgrounds - alias for gray-50)
gray-300:     #D1D5DB    (borders, dividers)
gray-400:     #9CA3AF    (placeholder text)
gray-500:     #6B7280    (secondary text, muted elements)
gray-600:     #4B5563    (subtitles, descriptions)
gray-700:     #374151    (body text - improved readability)
gray-800:     #1F2937    (button hover states)
```

### Accent Colors
```
accent:       #6B5344    (warm brown - brand primary, use sparingly for highlights)
accent-light: #8B7355    (lighter brown - hover states, decorative elements)
whatsapp:     #25D366    (WhatsApp CTA button, messaging links)
```

### Feedback Colors
```
red-50:       #FEF2F2    (error background)
red-300:      #FCA5A5    (error border)
red-800:      #991B1B    (error text)
yellow-400:   #FBBF24    (star ratings)
yellow-500:   #F59E0B    (star ratings filled)
```

### Usage Guidelines
- **Black/White dominance** - 80% of UI uses black/white/gray
- **Accent sparingly** - Use #6B5344 for strategic highlights only (max 10% of design)
- **Gray hierarchy** - gray-700 (body), gray-600 (subtitles), gray-500 (muted)

---

## Typography

### Font Families
```css
--font-heading: 'Playfair Display', Georgia, serif
--font-sans:    'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Type Scale - Headings

```
H1 (Page Titles):
  Mobile:    text-4xl  (36px)
  Tablet:    text-5xl  (48px)
  Desktop:   text-6xl  (60px)
  Weight:    font-bold (700)
  Tracking:  tracking-tight (-0.025em)
  Family:    font-heading (Playfair Display)

H2 (Section Titles):
  Mobile:    text-3xl  (30px)
  Tablet:    text-4xl  (36px)
  Desktop:   text-4xl  (36px)
  Weight:    font-semibold (600)
  Tracking:  tracking-tight (-0.025em)
  Family:    font-heading (Playfair Display)

H3 (Card Titles):
  All:       text-2xl  (24px) ⚠️ LOCKED - no text-xl variants
  Weight:    font-semibold (600)
  Family:    font-heading (Playfair Display)

H4 (Small Headings):
  All:       text-xl   (20px)
  Weight:    font-semibold (600)
  Family:    font-heading (Playfair Display)
```

### Type Scale - Body Text

```
Large Body:
  Size:      text-xl   (20px)
  Leading:   leading-relaxed (1.625)
  Color:     text-gray-600

Body (Default):
  Size:      text-base (16px)
  Leading:   leading-relaxed (1.625)
  Color:     text-gray-700 (darker for readability)

Small Text:
  Size:      text-sm   (14px)
  Leading:   leading-normal (1.5)
  Color:     text-gray-600

Tiny Text:
  Size:      text-xs   (12px)
  Leading:   leading-normal (1.5)
  Color:     text-gray-500
```

### Typography Rules
- All headings use `tracking-tight` for elegant spacing
- Body text uses `leading-relaxed` (1.625) for improved readability
- Subtitles use `text-gray-600`, body uses `text-gray-700`
- Font smoothing: `antialiased` globally

---

## Spacing System

### Container & Layout
```
Container Max Width:    max-w-7xl        (1280px)
Container Padding:      px-6 lg:px-8     (24px mobile, 32px desktop)
                                         (wider gutters for premium feel)
```

### Section Spacing (Vertical)

```
Hero Sections:
  Top:       pt-20 md:pt-32            (80px mobile, 128px desktop)
  Bottom:    pb-16 md:pb-24            (64px mobile, 96px desktop)

Content Sections:
  Vertical:  py-16 md:py-24            (64px mobile, 96px desktop)
  ⚠️ MINIMUM - never use py-12 anymore

Small Sections:
  Vertical:  py-12 md:py-16            (48px mobile, 64px desktop)
  Use only for compact utility sections
```

### Element Spacing (Gaps)

```
Major Section Gaps:     gap-12 md:gap-16  (generous breathing room)
Card Grids:             gap-8 md:gap-12   (comfortable separation)
Content Blocks:         gap-6 md:gap-8    (standard spacing)
List Items:             gap-4 md:gap-6    (readable lists)
Inline Elements:        gap-3 md:gap-4    (buttons, tags, icons)
```

### Margin Scale
```
mb-2:   0.5rem   (8px)   - tight spacing
mb-4:   1rem     (16px)  - default small
mb-6:   1.5rem   (24px)  - default medium
mb-8:   2rem     (32px)  - default large
mb-12:  3rem     (48px)  - section breaks
mb-16:  4rem     (64px)  - major breaks
```

### Padding Scale (Components)
```
Card Padding:           p-8 md:p-10      (32px mobile, 40px desktop)
Button Padding:         px-8 py-4        (32px horizontal, 16px vertical)
Form Input Padding:     px-6 py-4        (24px horizontal, 16px vertical)
Section Inner Padding:  px-4 sm:px-6     (16px mobile, 24px tablet)
```

---

## Shadows - Minimal Usage

```
None:       shadow-none              (flat, minimalist elements)
Minimal:    shadow-sm                (subtle elevation, most cards)
            0 1px 2px 0 rgb(0 0 0 / 0.05)

Medium:     shadow-md                (hover states only)
            0 4px 6px -1px rgb(0 0 0 / 0.1)

⚠️ DEPRECATED - Do not use:
Large:      shadow-lg                (too heavy for minimalist design)
Extra:      shadow-xl                (exception: PartnerCalculator only)
```

### Shadow Usage Rules
- **Default state**: `shadow-sm` or `shadow-none`
- **Hover state**: `shadow-sm hover:shadow-md` (subtle lift)
- **Cards**: `shadow-sm` only
- **Modals**: `shadow-md` maximum
- **Avoid**: Multiple shadows, colored shadows, inset shadows

---

## Border Radius

```
Sharp:      rounded-sm     (2px)   - buttons (for contrast with cards)
Standard:   rounded-lg     (12px)  - cards, containers, images
Soft:       rounded-xl     (16px)  - hero images, feature images
Extra Soft: rounded-2xl    (24px)  - special features (PartnerCalculator)
Circular:   rounded-full   (50%)   - icons, avatars, social buttons
```

### Usage Guidelines
- **Buttons**: `rounded-sm` (creates visual contrast with softer cards)
- **Cards**: `rounded-lg` (standard across all cards)
- **Hero Images**: `rounded-xl` (premium feel)
- **Icons**: `rounded-full` (perfect circles)
- **Consistency**: Don't mix rounded-sm and rounded-lg on similar elements

---

## Image Standards

### Aspect Ratios

```
Hero Images (Page Headers):
  Mobile:    aspect-[4/3]             (1.33:1)
  Desktop:   aspect-[4/3] lg:aspect-[3/2]  (1.5:1 on large screens)

Blog Cards:
  All:       aspect-[16/9]            (1.78:1)

Blog Article Covers:
  All:       aspect-[21/9]            (2.33:1 - cinematic)

Project Cards:
  Dynamic:   Maintain natural aspect  (masonry grid)

Service Icons:
  Square:    aspect-square h-16       (64x64px)
```

### Image Styling

```css
Default Image Treatment:
  Border Radius:  rounded-xl          (soft corners)
  Border:         none                (minimalist - no borders)
  Shadow:         none                (clean look)
  Object Fit:     object-cover        (fill container)

Hero Images Specific:
  Border Radius:  rounded-xl
  Height:         aspect-[4/3] lg:aspect-[3/2]
  Max Height:     max-h-[600px]       (prevent too tall on ultra-wide)
```

### Image Optimization
- Format: WebP + AVIF (Next.js Image component)
- Loading: `lazy` except hero images
- Sizes: Responsive srcset for all screen sizes
- Quality: 80 (balance quality/performance)

---

## Buttons & CTAs

### Primary Button
```css
.btn-primary {
  @apply px-8 py-4 
         bg-black text-white text-sm font-semibold 
         rounded-sm 
         transition-colors duration-300
         hover:bg-gray-800 
         focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2;
}
```

### Secondary Button
```css
.btn-secondary {
  @apply px-8 py-4 
         border-2 border-black text-black text-sm font-semibold 
         rounded-sm 
         transition-all duration-300
         hover:bg-black hover:text-white 
         focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2;
}
```

### Icon Button
```css
.btn-icon {
  @apply w-12 h-12 
         rounded-full 
         flex items-center justify-center 
         transition-colors duration-300
         focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2;
}
```

### Button Rules
- ⚠️ **NO SCALE TRANSFORMS** - Use color/opacity changes only
- Padding: Always `px-8 py-4` for primary/secondary
- Transitions: `duration-300` (consistent speed)
- Focus: Always include `focus-visible:ring-2`
- Border radius: `rounded-sm` for buttons (contrast with cards)

---

## Cards

### Standard Card
```css
.card {
  @apply bg-white p-8 md:p-10
         rounded-lg 
         shadow-sm 
         transition-shadow duration-300
         hover:shadow-md;
}
```

### Interactive Card (Clickable)
```css
.card-interactive {
  @apply bg-white p-8 md:p-10
         rounded-lg 
         shadow-sm 
         transition-all duration-300
         hover:shadow-md 
         cursor-pointer;
}
```

### Card Rules
- Border radius: Always `rounded-lg` (12px)
- Shadow: `shadow-sm` default, `shadow-md` on hover
- Padding: `p-8 md:p-10` (generous internal spacing)
- ⚠️ **NO SCALE TRANSFORMS** on hover
- Background: Always `bg-white` (clean, minimal)

---

## Forms

### Input Fields
```css
.input-field {
  @apply w-full px-6 py-4 
         border border-gray-300 bg-white 
         rounded-sm
         text-gray-900 placeholder:text-gray-400
         transition-colors duration-300
         focus:outline-none focus:border-black 
         focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2;
}
```

### Form Rules
- Border: `border-gray-300` default, `border-black` on focus
- Padding: `px-6 py-4` (comfortable hit area)
- Border radius: `rounded-sm` (matches buttons)
- Transitions: `duration-300` for smooth state changes

---

## Interactions & Animations

### Hover Effects - Premium Minimalist

```
Buttons:
  Primary:     hover:bg-gray-800       (subtle darkening)
  Secondary:   hover:bg-black hover:text-white  (fill effect)
  Icon:        hover:bg-gray-100       (subtle background)

Cards:
  Standard:    hover:shadow-md         (subtle lift)
  Interactive: hover:shadow-md         (same, no scale)

Links:
  Default:     hover:text-black transition-colors duration-300
  Footer:      hover:text-white transition-colors duration-300

Images:
  Overlays:    hover:opacity-90        (subtle fade, no zoom)
```

### Transition Standards

```
Duration:
  Fast:        duration-200            (rare - instant feedback)
  Standard:    duration-300            ⚠️ USE THIS 90% OF THE TIME
  Slow:        duration-500            (deprecated - too sluggish)

Timing:
  Default:     ease-out                (feels natural)
  Smooth:      ease-in-out             (smooth both ways)

Properties:
  Colors:      transition-colors       (links, buttons)
  All:         transition-all          (complex multi-property)
  Specific:    transition-[property]   (when only one property changes)
```

### Rules for Minimalist Interactions
- ⚠️ **NO SCALE TRANSFORMS** (`hover:scale-105`, etc.)
- ⚠️ **NO ZOOM EFFECTS** on images
- Use opacity changes: `hover:opacity-90`
- Use color shifts: `hover:bg-gray-800`
- Use shadow increases: `hover:shadow-md`
- All transitions: `duration-300` (consistent)

---

## Breadcrumbs

### Standard Breadcrumb Styling
```css
.breadcrumb-nav {
  @apply text-sm text-gray-500 mb-8;
}

.breadcrumb-link {
  @apply hover:text-black transition-colors duration-300;
}

.breadcrumb-current {
  @apply text-black font-medium;
}

.breadcrumb-separator {
  @apply mx-2 text-gray-400;
  content: ' / ';
}
```

### Breadcrumb Rules
- Always appear on all pages except homepage
- Located inside PageHeader component
- Separator: ' / ' (slash with spaces)
- Include JSON-LD structured data for SEO
- Support 2-level and 3-level hierarchies

---

## Section Headers

### Light Section Header (Default)
```css
.section-header {
  @apply bg-gray-50 
         pt-20 pb-16 md:pt-32 md:pb-24 
         px-4 sm:px-6 lg:px-8;
}
```

### Section Header Rules
- Default background: `bg-gray-50` (light gray)
- Padding: `pt-20 pb-16 md:pt-32 md:pb-24` (generous vertical)
- Always includes breadcrumb component
- Can have hero image on right (split layout)
- Can be centered without image

---

## CTA Sections

### Bottom CTA Section
```css
.cta-section {
  @apply bg-black text-white 
         py-16 md:py-24 
         px-4 sm:px-6 lg:px-8;
}
```

### CTA Section Rules
- Background: `bg-black` (strong contrast)
- Text: `text-white` (high readability)
- Padding: `py-16 md:py-24` (generous breathing room)
- Used for conversion-focused bottom sections
- Different from CTAFinal (which includes form)

---

## Focus States - Accessibility

### Standard Focus Ring
```css
.focus-ring {
  @apply focus-visible:ring-2 
         focus-visible:ring-black 
         focus-visible:ring-offset-2;
}
```

### Focus State Rules
- Always use `focus-visible` (not `focus`)
- Ring color: Black (brand consistency)
- Ring width: 2px
- Ring offset: 2px (breathing room)
- Apply to: buttons, links, form inputs, interactive cards

---

## Responsive Breakpoints

```
Tailwind Default Breakpoints:
  sm:   640px   (tablet portrait)
  md:   768px   (tablet landscape)
  lg:   1024px  (desktop)
  xl:   1280px  (large desktop)
  2xl:  1536px  (extra large)

Common Patterns:
  Mobile First:     base → sm → md → lg
  Text Sizes:       text-4xl md:text-5xl lg:text-6xl
  Spacing:          py-16 md:py-24
  Grid Columns:     grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  Padding:          px-4 sm:px-6 lg:px-8
```

---

## Grid Systems

### Common Grid Patterns

```
2-Column Split Layout (Hero):
  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center

3-Column Card Grid:
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12

2x2 Feature Grid:
  grid grid-cols-1 md:grid-cols-2 gap-8

2-Column List:
  grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6
```

### Grid Rules
- Mobile: Always single column (`grid-cols-1`)
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns for cards (`lg:grid-cols-3`)
- Gaps: Use `gap-8 md:gap-12` for cards, `gap-4 md:gap-6` for lists

---

## Accessibility Checklist

### Required Practices
- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text)
- [ ] All images have alt text
- [ ] Headings follow logical hierarchy (h1 → h2 → h3)
- [ ] Forms have proper labels and validation
- [ ] Keyboard navigation works on all pages
- [ ] ARIA labels on icon-only buttons
- [ ] Skip-to-content link for keyboard users
- [ ] Semantic HTML (nav, main, section, article)

### Contrast Ratios
```
Black on White:      21:1    ✅ Excellent
gray-700 on White:   10.5:1  ✅ Excellent  (body text)
gray-600 on White:   7.2:1   ✅ AA Large   (subtitles)
gray-500 on White:   4.6:1   ✅ AA         (secondary text)
```

---

## Performance Guidelines

### Image Optimization
- Use Next.js Image component (automatic WebP/AVIF)
- Lazy load all images except above-fold hero
- Provide proper width/height to prevent layout shift
- Use appropriate sizes attribute for responsive images

### Animation Performance
- Prefer `opacity` and `transform` (GPU-accelerated)
- Avoid animating: `width`, `height`, `margin`, `padding`
- Use `will-change` sparingly (only for known animations)
- Remove `transition-all` where specific property known

### Bundle Size
- Tree-shake unused Tailwind classes (via purge)
- Lazy load components not needed on initial render
- Optimize font loading with `font-display: swap`

---

## Migration Notes

### Deprecated Patterns (DO NOT USE)

```
❌ hover:scale-105               → Use opacity/color changes
❌ hover:scale-[1.02]            → Use opacity/color changes
❌ shadow-lg, shadow-xl          → Use shadow-sm or shadow-md max
❌ text-xl for h3                → Always use text-2xl
❌ py-12 for content sections    → Minimum py-16 md:py-24
❌ transition-transform          → Use transition-colors or transition-all
❌ duration-500                  → Use duration-300
❌ bordered images               → Use rounded-xl, no borders
❌ Custom section backgrounds    → Use unified .section-header
```

### Required Changes

```
✅ All h3 → text-2xl font-semibold
✅ All buttons → .btn-primary or .btn-secondary classes
✅ All cards → .card or .card-interactive
✅ All pages → include Breadcrumb component
✅ All hero sections → use PageHeader component
✅ All transitions → duration-300
✅ All shadows → shadow-sm maximum (except modals)
```

---

## Quick Reference

### Most Common Patterns

```html
<!-- Primary Button -->
<button class="btn-primary">Text</button>

<!-- Secondary Button -->
<button class="btn-secondary">Text</button>

<!-- Card -->
<div class="card">Content</div>

<!-- Section -->
<section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">Content</div>
</section>

<!-- 3-Column Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<!-- Hero Image -->
<div class="aspect-[4/3] lg:aspect-[3/2] rounded-xl overflow-hidden">
  <Image src="..." alt="..." fill class="object-cover" />
</div>
```

---

**Last Updated**: 16 May 2026  
**Version**: 1.0.0  
**Status**: Active - Use as single source of truth for all design decisions
