---
name: Sacred Script Learning System
colors:
  surface: '#fff8f6'
  surface-dim: '#eed5c9'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#ffeae0'
  surface-container-high: '#fde3d7'
  surface-container-highest: '#f7ddd1'
  on-surface: '#261912'
  on-surface-variant: '#554242'
  inverse-surface: '#3c2d25'
  inverse-on-surface: '#ffede5'
  outline: '#887271'
  outline-variant: '#dbc0c0'
  surface-tint: '#9e3f44'
  primary: '#500310'
  on-primary: '#ffffff'
  primary-container: '#6e1b23'
  on-primary-container: '#f48286'
  inverse-primary: '#ffb3b3'
  secondary: '#2c6860'
  on-secondary: '#ffffff'
  secondary-container: '#afebe1'
  on-secondary-container: '#316c65'
  tertiary: '#342100'
  on-tertiary: '#ffffff'
  tertiary-container: '#503500'
  on-tertiary-container: '#ce9b49'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b3'
  on-primary-fixed: '#400009'
  on-primary-fixed-variant: '#7f282f'
  secondary-fixed: '#b2eee4'
  secondary-fixed-dim: '#96d2c8'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#0d5049'
  tertiary-fixed: '#ffddaf'
  tertiary-fixed-dim: '#f4bd67'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#614000'
  background: '#fff8f6'
  on-background: '#261912'
  surface-variant: '#f7ddd1'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 52px
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-lg:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  xxl: 24px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is engineered to evoke the feeling of a premium, modern manuscript. It balances the weight of Coptic tradition with the clarity of a high-end educational tool. The aesthetic sits at the intersection of **Minimalism** and **Modern Corporate**, utilizing generous whitespace to allow complex scripts to breathe.

The target audience ranges from cultural enthusiasts to academic researchers. The UI must feel authoritative yet accessible, replacing common "gamified" elements (like mascots) with sophisticated typographic hierarchies and rich, historical color pairings. The interface is strictly **Right-to-Left (RTL)** to honor the linguistic context of the primary instructional language.

## Colors

The palette is rooted in natural pigments found in ancient manuscripts. 

- **Primary (Oxblood):** Used for critical branding, primary actions, and headers.
- **Secondary (Teal):** Reserved for progress tracking and success states, providing a sophisticated alternative to standard "app greens."
- **Gold Accents:** Employed for achievement markers, premium features, and decorative flourishes.
- **Background (Parchment):** The `#FBF6EA` base reduces eye strain and provides a warm, tactile feel compared to pure white.
- **Semantic Accents:** Rose and Purple are used sparingly for categorization (e.g., grammar vs. vocabulary) without breaking the premium aesthetic.

## Typography

The typography system relies on a dual-personality approach. For Arabic and numerals, use a Naskh-revival style (represented here by **Source Serif 4** as a structural proxy for **Amiri/Naskh** metrics). For UI labels and body text, **IBM Plex Sans** (Arabic) provides a clean, professional grotesque feel that ensures legibility in dense lesson screens.

- **Headlines:** Use Bold (700) or ExtraBold (800) for a commanding, historical presence.
- **Body:** Use Medium (500) for UI elements and Regular (400) for long-form instructional text.
- **Numerals:** Always use Serif fonts to maintain the traditional aesthetic.
- **Coptic Script:** Ensure the Coptic Unicode block is rendered with a weight that matches the Arabic Serif to maintain visual equilibrium.

## Layout & Spacing

This design system uses a **fluid grid** model with a base-4 vertical rhythm. The layout is optimized for an RTL reading flow, ensuring that the hierarchy leads the eye from the top-right to bottom-left.

- **Mobile:** 4-column grid with 20px side margins and 16px gutters.
- **Tablet:** 8-column grid with 32px margins.
- **Alignment:** All text should be right-aligned by default. Icons that signify direction (arrows) must be mirrored for the RTL context.
- **Padding:** Use `xl` (20px) for internal card padding to ensure script flourishes (ascenders/descenders) are not clipped.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and two specific shadow profiles that create a "stacked parchment" effect:

- **Surface Layer:** The background is the lowest level (`#FBF6EA`).
- **Standard Cards:** White surfaces (`#FFFFFF`) with a 1px border in `#EEE3CB`. They use a soft, diffused shadow: `0 8px 20px rgba(36, 23, 16, 0.06)`.
- **Hero/Primary Cards:** Used for active lessons or current progress. These utilize a more dramatic, tinted shadow to draw the eye: `0 14px 30px rgba(62, 15, 20, 0.25)`.
- **Interactive States:** On press, elements should drop their shadow and slightly shift downward (1-2px) to simulate physical tactility.

## Shapes

The shape language is varied to distinguish between structural and interactive elements. 

- **Interactive Elements:** Buttons and tags use a fully rounded `pill` shape (`999px`) to create a soft, inviting touch target.
- **Containers:** Standard cards use an `18px` radius, while large Hero sections use `22px`. This generous rounding prevents the traditional color palette from feeling too rigid or archaic.
- **Small UI:** Checkboxes, inputs, and small utility buttons use a `10px` radius.

## Components

- **Buttons:** Primary buttons are Oxblood (`#6E1B23`) with white text, fully rounded. Secondary buttons use the Teal Soft (`#E1EFEC`) background with Teal (`#17564F`) text.
- **Cards:** All cards must feature the `#EEE3CB` border. Hero cards may feature a Gold Accent (`#AD7E2E`) top-border (2px) for emphasis.
- **Input Fields:** Use the Surface White background with a 10px radius. The focus state should utilize a 2px Gold Accent border.
- **Progress Indicators:** Use the Teal Secondary (`#17564F`) for progress bars to signify "growth" and "learning," avoiding standard blue.
- **Chips/Tags:** Used for grammatical categories. Use the Rose or Purple accents with 10% opacity backgrounds and full-saturation text for high legibility.
- **Lesson Lists:** Use a clean, divider-less style where cards are separated by the `lg` (16px) spacing unit, creating a clear vertical stack.
- **Translation Pairs:** In lesson views, Coptic text should be 20% larger than the Arabic instructional text to ensure the target language remains the focal point.