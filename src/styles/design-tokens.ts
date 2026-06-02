import type { CSSProperties } from 'react';

/**
 * Garage Cowboy Design Tokens — single source of truth (TypeScript side).
 *
 * Mirrors the canonical `@theme` tokens in `src/styles/globals.css` EXACTLY.
 * Keep both in sync: ONE yellow (`--gc-yellow`) and ONE ink (`--gc-ink`).
 * This file collapses the legacy duplicate brand yellow and the extra dark
 * shades into the canonical single yellow + single ink.
 *
 * Prefer Tailwind utilities in markup (the gc-* namespace: bg-gc-* / text-gc-* / border-gc-*).
 * Use these exports only for inline-style / programmatic access.
 */

// =============================================================================
// COLORS  (canonical)
// =============================================================================
export const colors = {
  brand: {
    /** Sole brand yellow. The legacy duplicate yellow was collapsed into this. */
    yellowPrimary: '#FEC300',
    /** Pressed / active state for yellow surfaces. */
    yellowPress: '#E5AF00',
    /** Sole dark ink — body text, dark surfaces, default borders.
     *  The legacy extra dark shades were collapsed into this. */
    dark: '#323232',
    /** Hard outlines / maximum contrast only. */
    black: '#000000',
  },
  neutral: {
    white: '#FFFFFF',
    gray50: '#EDEDED',
    gray100: '#EAEAEA',
    gray200: '#E6E6E6',
    gray300: '#D9D9D9',
    /** a11y: ~3:1 on white — large text / non-text UI only, never body copy. */
    gray500: '#8B8B92',
    gray700: '#535458',
  },
  text: {
    /** fg — primary text = ink. */
    primary: '#323232',
    /** fg — secondary text = ink. */
    secondary: '#323232',
    /** fg-muted — muted body text only (~4.9:1 on white). Equals `translucent.ink75`. */
    muted: 'rgba(50, 50, 50, 0.75)',
    /** fg-on-dark — text on dark surfaces. Equals `neutral.white`. */
    onDark: '#FFFFFF',
  },
  /** Translucent fills (canonical). */
  translucent: {
    well: 'rgba(230, 230, 230, 0.5)',
    wellHover: 'rgba(230, 230, 230, 0.7)',
    listTile: 'rgba(48, 49, 53, 0.1)',
    ink75: 'rgba(50, 50, 50, 0.75)',
    hair: 'rgba(0, 0, 0, 0.1)',
  },
} as const;

// =============================================================================
// SHADOWS  (canonical)
// =============================================================================
export const shadows = {
  button: '0px 5px 5px rgba(0, 0, 0, 0.25)',
  buttonHover: '0px 2px 4px rgba(0, 0, 0, 0.18)',
  card: '0px 2px 5px 0px #535458',
  faq: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
} as const;

// =============================================================================
// FONTS  (canonical type scale; weight 900 = signature)
// =============================================================================
export const fonts = {
  family: {
    sans: "'Product Sans', sans-serif",
    sansRegular: "'Product Sans Regular', sans-serif",
    sansBold: "'Product Sans Bold', sans-serif",
    sansBlack: "'Product Sans Black', sans-serif",
  },
  size: {
    hero: '52px',
    h1: '48px',
    h2: '36px',
    h3: '24px',
    h4: '20px',
    bodyLg: '18px',
    body: '16px',
    small: '14px',
    xs: '12px',
  },
  weight: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
} as const;

// =============================================================================
// SPACING
// =============================================================================
export const spacing = {
  px: {
    mobile: '48px',
    tablet: '96px',
    desktop: '192px',
    wide: '288px',
  },
  section: {
    sm: '48px',
    md: '80px',
    lg: '120px',
  },
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

// =============================================================================
// BORDER RADIUS  (canonical)
// =============================================================================
export const radius = {
  sm: '4px',
  card: '5px',
  md: '10px',
  lg: '15px',
  xl: '20px',
  full: '9999px',
} as const;

// =============================================================================
// BORDER WIDTHS  (canonical)
// =============================================================================
export const borders = {
  thin: '2px',
  med: '2.5px',
  thick: '3px',
  band: '4px',
} as const;

// =============================================================================
// MOTION  (canonical)
// =============================================================================
export const motion = {
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  durationFast: '0.15s',
} as const;

// =============================================================================
// COMPONENT STYLES
// =============================================================================
export const components = {
  button: {
    primary: {
      backgroundColor: colors.brand.yellowPrimary,
      border: `2px solid ${colors.brand.dark}`,
      borderRadius: radius.xl,
      boxShadow: shadows.button,
      padding: '16px 60px',
      fontFamily: fonts.family.sansBlack,
      fontSize: fonts.size.h3,
      color: colors.brand.dark,
      textTransform: 'uppercase',
    } as CSSProperties,
    secondary: {
      backgroundColor: colors.neutral.gray200,
      border: `2px solid ${colors.brand.yellowPrimary}`,
      borderRadius: `0 0 ${radius.md} ${radius.md}`,
      padding: '8px 16px',
      fontFamily: fonts.family.sansBlack,
      fontSize: fonts.size.bodyLg,
      color: colors.text.secondary,
      textTransform: 'uppercase',
    } as CSSProperties,
  },
  navigation: {
    backgroundColor: colors.brand.dark,
    borderWidth: '4px',
    borderColor: colors.brand.black,
    padding: '16px 0',
  } as CSSProperties,
  header: {
    backgroundColor: colors.neutral.white,
    borderBottom: `4px solid ${colors.brand.black}`,
    padding: '24px 0',
  } as CSSProperties,
  footer: {
    backgroundColor: colors.neutral.white,
    padding: '48px 0',
  } as CSSProperties,
  card: {
    backgroundColor: colors.neutral.white,
    border: `3px solid ${colors.brand.black}`,
    borderRadius: radius.xl,
    boxShadow: shadows.card,
    overflow: 'hidden',
  } as CSSProperties,
  input: {
    backgroundColor: colors.translucent.well,
    border: `2.5px solid ${colors.brand.dark}`,
    borderRadius: radius.sm,
    padding: '12px 16px',
    fontFamily: fonts.family.sans,
    fontSize: fonts.size.body,
  } as CSSProperties,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================
export type BrandColor = keyof typeof colors.brand;
export type NeutralColor = keyof typeof colors.neutral;
export type FontSize = keyof typeof fonts.size;
export type FontWeight = keyof typeof fonts.weight;
export type Breakpoint = keyof typeof breakpoints;
export type Shadow = keyof typeof shadows;
