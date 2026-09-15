---
name: Wedding Keepsake & Polaroid App
colors:
  surface: '#fef9ee'
  surface-dim: '#dedacf'
  surface-bright: '#fef9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3e8'
  surface-container: '#f2ede3'
  surface-container-high: '#ece8dd'
  surface-container-highest: '#e7e2d7'
  on-surface: '#1d1c15'
  on-surface-variant: '#524438'
  inverse-surface: '#323029'
  inverse-on-surface: '#f5f0e5'
  outline: '#857467'
  outline-variant: '#d7c3b3'
  surface-tint: '#8b5009'
  primary: '#8b5009'
  on-primary: '#ffffff'
  primary-container: '#d08841'
  on-primary-container: '#4b2700'
  inverse-primary: '#ffb876'
  secondary: '#37693d'
  on-secondary: '#ffffff'
  secondary-container: '#b8f1b9'
  on-secondary-container: '#3d6f43'
  tertiary: '#7e5700'
  on-tertiary: '#ffffff'
  tertiary-container: '#c48e26'
  on-tertiary-container: '#422c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc0'
  primary-fixed-dim: '#ffb876'
  on-primary-fixed: '#2d1600'
  on-primary-fixed-variant: '#6b3b00'
  secondary-fixed: '#b8f1b9'
  secondary-fixed-dim: '#9dd49e'
  on-secondary-fixed: '#002108'
  on-secondary-fixed-variant: '#1e5127'
  tertiary-fixed: '#ffdeac'
  tertiary-fixed-dim: '#f9bc51'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#fef9ee'
  on-background: '#1d1c15'
  surface-variant: '#e7e2d7'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  polaroid-caption:
    fontFamily: Playfair Display
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system translates the intimate, nostalgic elegance of a rustic-boho celebration into a mobile-first digital experience. Crafted around tactile, analog photography metaphors, it prioritizes warmth, authenticity, and visual breathing room. The aesthetic bridges classic editorial typography with functional, clean modern interfaces.

### Personality & Emotional Tenor
- **Timeless & Romantic:** Evokes artisanal stationery, pressed botanical keepsakes, and physical instant film without pastiche or artificial kitsch.
- **Intimate & Welcoming:** Generous spacing, warm paper-toned backdrops, and muted botanical accents make guests and hosts feel grounded and present.
- **Refined & Modern:** Clutter-free interfaces ensure the photography remains the protagonist, relying on clean structural framing rather than heavy ornamental chrome.

### Visual Style
A blend of **Minimalist Editorial** and **Tactile Tactility**. Physical Polaroid cards feature subtle organic paper grain, natural cream borders, tactile elevation, and intentional, delicate asymmetry. No emojis are permitted anywhere in the system; expressive communication relies on refined typographic hierarchy and Google Material Symbols styled in optical weights matching the surrounding typography.

## Colors

The palette is rooted in earth, dried florals, olive groves, and warm sunlight, tailored for both sunlit outdoor ceremonies and candlelit evening receptions.

### Core Swatches
- **Primary (`#D08841` - Warm Terracotta):** Represents dried clay, leather, and late-afternoon sun. Anchors primary calls-to-action, key badges, active tabs, and memorable accents.
- **Secondary (`#71A674` - Sage Olive):** Echoes eucalyptus and olive branches. Used for secondary affirmations, photo verification states, presence confirmations, and tranquil indicators.
- **Tertiary (`#ECB147` - Golden Mustard / Amber):** Captures champagne toasts, sunset golden hour, and celebratory highlights. Reserved for special moments, favorited polaroids, and subtle ambient glows.
- **Neutral Surface Light (`#FFFAEF` - Soft Cream / Natural Paper):** Replaces pure digital white with an unbleached linen/cotton paper cast for main view canvases and modal backgrounds.

### Extended Tone Structure
- **Light Theme Structure:**
  - `surface-canvas`: `#FFFAEF`
  - `surface-card`: `#FFFFFF` (pure white border for the polaroid film frame)
  - `surface-container`: `#F5EEDB` (soft parchment tint for chips, inputs, and recessed trays)
  - `text-primary`: `#2A241E` (rich deep espresso, avoiding harsh `#000000`)
  - `text-secondary`: `#6B5E52` (warm earth gray)
  - `border-subtle`: `rgba(42, 36, 30, 0.08)`

- **Warm Night Mode Structure (Dark Mode):**
  - `surface-canvas`: `#1B1612` (deep roasted cacao)
  - `surface-card`: `#27201A` (warm charcoal-espresso)
  - `surface-container`: `#332B23` (elevated earthen block)
  - `text-primary`: `#F8F2E6` (warm ivory)
  - `text-secondary`: `#B5A899` (weathered linen)
  - `border-subtle`: `rgba(248, 242, 230, 0.10)`
  - `primary-tint`: `#E29E5B` (lightened terracotta for contrast against dark surfaces)

## Typography

The typographic hierarchy combines the grace of a high-contrast editorial serif (`Playfair Display`) with the functional legibility of an open humanist sans (`Plus Jakarta Sans`).

### Font Roles
- **Headlines & Displays (`Playfair Display`):** Used for couple monograms, section titles ("Momentos", "Mural de Recados"), dates (`10.10.26`), and modal headers. Imparts ceremony, gravitas, and editorial warmth.
- **Polaroid Captions (`Playfair Display Italic`):** Mimics the refined, handwritten-style notes and wedding guest signatures traditionally penned at the bottom of physical prints.
- **Interface & Body (`Plus Jakarta Sans`):** Powers upload feedback, forms, descriptions, timestamps, metadata, and buttons. Offers optimal readability on mobile screens under outdoor sunlight or low evening lighting.

### Iconography Alignment
Icons must strictly use **Google Material Symbols Outlined** (font-variation: `'wght' 300, 'GRAD' 0, 'opsz' 24`). Never substitute icons with colored emojis. Keep icon strokes fine and delicate to complement the serif hair-lines and thin rule borders.

## Layout & Spacing

The layout treats the smartphone screen as a curated gallery board. Visual elements are rhythmically distributed using a base 4px/8px module, prioritizing tactile tap targets and unhurried whitespace.

### Grid & Responsiveness
- **Mobile Handset (Primary Viewport, &lt; 600px):**
  - Outer margins: `1.25rem` (20px) to maximize preview area while protecting thumbs.
  - Column system: Single or 2-column masonry grid for the polaroid feed.
  - Interactive touch bounds: Minimum 48x48px hit area for all camera triggers, shutter buttons, and navigation nodes.
- **Tablet / Large Screen (&gt; 600px):**
  - Center-constrained feed container with maximum width of `560px` for phone emulation or a multi-column scrapbook gallery maxing at `960px`.
  - Outer margin expands to `2rem`.

### Spacing Rhythm
- `space-xs` (4px): Micro gaps between icons and inline status text.
- `space-sm` (8px): Spacing inside compact tags, chip groups, and date indicators.
- `space-md` (16px): Standard polaroid framing gutter, card content padding, and field stack.
- `space-lg` (24px): Distance separating narrative moments, guestbook entries, and distinct card groups.
- `space-xl` (36px): Generous breathing room above milestone headings and around ceremony transitions.

## Elevation & Depth

Visual depth emulates real paper cards pinned or gently resting on linen surfaces, replacing sterile technological drops with warm, tinted shadows.

### Atmospheric Shadow Palette
- **Level 0 (Flat / Canvas):** Plain surface tint; no elevation.
- **Level 1 (Polaroid Paper Float):** A double-pass warm ambient shadow simulating photographic stock:
  `box-shadow: 0 2px 4px rgba(42, 36, 30, 0.04), 0 8px 20px rgba(42, 36, 30, 0.08)`
  In night mode: `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45), 0 0 1px rgba(248, 242, 230, 0.12)`.
- **Level 2 (Active Shutter / Floating Modals / Drawer Sheet):**
  `box-shadow: 0 12px 32px rgba(42, 36, 30, 0.14), 0 2px 6px rgba(42, 36, 30, 0.06)`.
  In night mode: `box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65)`.

### Tactile Textures & Skeuomorphic Restraint
Polaroid frames employ a paper-white background (`#FFFFFF` in light, `#27201A` in dark) with a hairline organic edge (`1px solid rgba(42, 36, 30, 0.06)`). Occasional micro-rotations (-1.2deg to +1.5deg) are applied randomly to cards in the feed, recreating an organic scattered-photo tabletop.

## Shapes

The system adopts a crisp, tailored soft geometry (`roundedness: 1`). Rather than generic rounded-pebble shapes, it relies on structured paper silhouettes with soft, tactile corners.

### Shape Scales
- **Polaroid Cards:** `rounded-sm` (0.25rem / 4px) to retain the traditional die-cut paper corner of physical instant photos.
- **Buttons & Action Trays:** `rounded-sm` (4px) to `rounded-md` (8px) for an artisanal, hand-trimmed card feel.
- **Circular Elements:** Reserved strictly for shutter buttons, avatar badges, and floating action cameras (`border-radius: 9999px`).
- **Input Fields & Dialogue Drawers:** Top corners of bottom sheets use `rounded-lg` (0.5rem) to balance clean lines with touch-friendly softness.

## Components

### 1. Polaroid Card (Signature Component)
- **Geometry:** Top, left, and right borders: `12px`. Bottom chin: `44px` (providing the classic polaroid proportions).
- **Surface:** Light mode uses pure `#FFFFFF`; dark mode uses `#27201A`. Both feature a 1px border `rgba(42, 36, 30, 0.07)`.
- **Media Box:** 1:1 square or 4:5 aspect ratio image window with inner subtle edge shadow to represent paper depth.
- **Bottom Chin Elements:**
  - Handwritten-style guest message or couple date stamp styled in `polaroid-caption` (`Playfair Display Italic`).
  - Subtle guest signature and timestamp in `label-sm` (`Plus Jakarta Sans`).
  - Micro-action button (heart/favoriting) featuring Material Symbol `favorite` with stroke weight 300.

### 2. Buttons
- **Primary Action (e.g., "Revelar Foto", "Salvar"):**
  - Background: `#D08841` (Terracotta).
  - Text: `#FFFFFF`, `label-md` in uppercase with `0.06em` letter spacing.
  - Height: `48px` minimum. Radius: `4px`.
  - Active State: Lightness compresses 6%, subtle scale transform `scale(0.98)`.
- **Secondary Action (e.g., "Adicionar Mensagem", "Filtro"):**
  - Background: Transparent. Border: `1.5px solid #71A674` (Sage).
  - Text: `#71A674` in light mode; `#97C59A` in dark mode.
- **Floating Shutter Action (Camera Trigger):**
  - Full circular button (`64px x 64px`) centered at the bottom viewport bar.
  - Border: `3px solid #FFFAEF` with a concentric Terracotta outer ring and Amber shutter indicator.

### 3. Chips & Filter Pills
- Used for photo moments ("Cerimônia", "Festa", "Brinde", "Mesa do Bolo").
- Surface: `#F5EEDB` in light; `#332B23` in dark mode.
- Border: `1px solid rgba(42, 36, 30, 0.06)`.
- Selected State: Background `#71A674`, text `#FFFFFF`, without outline.

### 4. Input Fields
- Understated paper feel with inset borders rather than thick glowing outlines.
- Background: `#FFFFFF` (light) / `#231C17` (dark).
- Border: `1px solid rgba(42, 36, 30, 0.16)`.
- Focus State: Border color `#D08841` with a `2px` faint terracotta tint ring (`rgba(208, 136, 65, 0.18)`).
- Typography: `body-md` in `Plus Jakarta Sans`.

### 5. Checkboxes & Radio Controls
- Border: `1.5px solid #6B5E52`.
- Checked: `#D08841` fill with a crisp white checkmark symbol (`check`).
- Radius: `3px` for checkbox; pure circle for radio.

### 6. Lists & Recados (Guestbook Stream)
- Divided by hairline borders `1px solid rgba(42, 36, 30, 0.06)`.
- Avatar badges feature couple initials or guest portraits in circular paper rings.
- Trailing metadata displayed in `label-sm` with sage-tinted verified badges.

### 7. Shutter & Developing Toast (Custom Component)
- Instant film developing simulation banner: toasts display an amber/terracotta progress line ("Revelando sua foto de 10.10.26...").
- Subtle fade-in through a soft blur filter mimicking photographic emulsion coming into focus.