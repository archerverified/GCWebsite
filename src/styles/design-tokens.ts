import type { CSSProperties } from 'react';

/**
 * Garage Cowboy Design Tokens
 * TypeScript access to brand colors, shadows, fonts, and component styles
 * Use alongside globals.css @theme block for CSS variable access
 */

// =============================================================================
// COLORS
// =============================================================================
export const colors = {
  brand: {
    yellowPrimary: '#fec300',
    yellowSecondary: '#f7bd15',
    dark: '#35363a',
    black: '#222222',
  },
  neutral: {
    white: '#ffffff',
    offWhite: '#eaeaea',
    gray: '#e6e6e6',
    darkGray: '#323232',
    black: '#000000',
  },
  text: {
    primary: '#222222',
    secondary: '#323232',
    light: '#eaeaea',
    white: '#ffffff',
    muted: 'rgba(48, 49, 53, 0.75)',
  },
} as const;

// =============================================================================
// SHADOWS
// =============================================================================
export const shadows = {
  button: '0px 5px 5px rgba(0, 0, 0, 0.25)',
  buttonHover: '0px 2px 4px rgba(0, 0, 0, 0.18)',
  section: '0px 1px 0px rgba(17, 17, 26, 0.05), 0px 0px 8px rgba(17, 17, 26, 0.1)',
  card: '0px 2px 5px 0px #535458',
  textSm: '0px 2px 2px rgba(0, 0, 0, 0.25)',
  textLg: '0px 8px 8px rgba(0, 0, 0, 0.25)',
} as const;

// =============================================================================
// FONTS
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
    body: '16px',
    bodyLg: '18px',
    small: '14px',
    xs: '12px',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
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
// BORDER RADIUS
// =============================================================================
export const radius = {
  sm: '4px',
  md: '10px',
  lg: '15px',
  xl: '20px',
  full: '9999px',
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
      color: colors.brand.black,
      textTransform: 'uppercase',
    } as CSSProperties,
    secondary: {
      backgroundColor: colors.neutral.gray,
      border: `2px solid ${colors.brand.yellowSecondary}`,
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
    borderColor: colors.neutral.black,
    padding: '16px 0',
  } as CSSProperties,
  header: {
    backgroundColor: colors.neutral.white,
    borderBottom: `4px solid ${colors.neutral.black}`,
    padding: '24px 0',
  } as CSSProperties,
  footer: {
    backgroundColor: colors.neutral.white,
    padding: '48px 0',
  } as CSSProperties,
  card: {
    backgroundColor: colors.neutral.white,
    border: `3px solid ${colors.neutral.black}`,
    borderRadius: radius.xl,
    boxShadow: shadows.card,
    overflow: 'hidden',
  } as CSSProperties,
  input: {
    backgroundColor: 'rgba(230, 230, 230, 0.5)',
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

