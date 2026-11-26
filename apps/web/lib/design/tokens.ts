/**
 * Central NAVOSYS Design System Tokens (P03).
 * Mirrors CSS custom properties in styles/globals.css for programmatic validation and docs.
 */

export const NAVOSYS_COLORS = {
  warmIvory: "#FAF8F5",
  sand: "#E9E4DC",
  deepNavy: "#23364D",
  deepNavyInk: "#101B27",
  mutedNavy: "#3E4E62",
  mutedTeal: "#6F9690",
  mutedTealDeep: "#3D645E",
  mutedTealHover: "#355853",
  warmGold: "#C89F79",
  borderSubtle: "#D9D2C7",
  borderStrong: "#66707C",
  error: "#8F2D2D",
  errorSurface: "#FDF4F3",
  success: "#2B5B54",
  successSurface: "#F2F7F6",
  warning: "#7A4E1D",
  warningSurface: "#FBF6EF",
} as const;

export const NAVOSYS_BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export interface ContrastPair {
  name: string;
  foreground: string;
  background: string;
  minimumRatio: number;
}

/**
 * Approved foreground/background pairs verified against WCAG 2.2 AA thresholds
 * (4.5:1 for normal text, 3.0:1 for non-text UI controls/borders).
 */
export const APPROVED_CONTRAST_PAIRS: readonly ContrastPair[] = [
  {
    name: "Deep Navy heading/body on Warm Ivory canvas",
    foreground: NAVOSYS_COLORS.deepNavy,
    background: NAVOSYS_COLORS.warmIvory,
    minimumRatio: 4.5,
  },
  {
    name: "Deep Navy heading/body on Sand surface",
    foreground: NAVOSYS_COLORS.deepNavy,
    background: NAVOSYS_COLORS.sand,
    minimumRatio: 4.5,
  },
  {
    name: "Muted Navy secondary text on Warm Ivory canvas",
    foreground: NAVOSYS_COLORS.mutedNavy,
    background: NAVOSYS_COLORS.warmIvory,
    minimumRatio: 4.5,
  },
  {
    name: "Muted Navy secondary text on Sand surface",
    foreground: NAVOSYS_COLORS.mutedNavy,
    background: NAVOSYS_COLORS.sand,
    minimumRatio: 4.5,
  },
  {
    name: "Warm Ivory text on Deep Navy surface",
    foreground: NAVOSYS_COLORS.warmIvory,
    background: NAVOSYS_COLORS.deepNavy,
    minimumRatio: 4.5,
  },
  {
    name: "Sand text on Deep Navy surface",
    foreground: NAVOSYS_COLORS.sand,
    background: NAVOSYS_COLORS.deepNavy,
    minimumRatio: 4.5,
  },
  {
    name: "Warm Ivory text on Muted Teal Deep primary CTA",
    foreground: NAVOSYS_COLORS.warmIvory,
    background: NAVOSYS_COLORS.mutedTealDeep,
    minimumRatio: 4.5,
  },
  {
    name: "Warm Ivory text on Muted Teal Hover primary CTA",
    foreground: NAVOSYS_COLORS.warmIvory,
    background: NAVOSYS_COLORS.mutedTealHover,
    minimumRatio: 4.5,
  },
  {
    name: "Deep Navy Ink on Base Muted Teal accent/badge",
    foreground: NAVOSYS_COLORS.deepNavyInk,
    background: NAVOSYS_COLORS.mutedTeal,
    minimumRatio: 4.5,
  },
  {
    name: "Deep Navy on Warm Gold decorative badge",
    foreground: NAVOSYS_COLORS.deepNavy,
    background: NAVOSYS_COLORS.warmGold,
    minimumRatio: 4.5,
  },
  {
    name: "Form control border on Warm Ivory",
    foreground: NAVOSYS_COLORS.borderStrong,
    background: NAVOSYS_COLORS.warmIvory,
    minimumRatio: 3.0,
  },
  {
    name: "Form control border on Sand",
    foreground: NAVOSYS_COLORS.borderStrong,
    background: NAVOSYS_COLORS.sand,
    minimumRatio: 3.0,
  },
  {
    name: "Error text on Error surface",
    foreground: NAVOSYS_COLORS.error,
    background: NAVOSYS_COLORS.errorSurface,
    minimumRatio: 4.5,
  },
  {
    name: "Success text on Success surface",
    foreground: NAVOSYS_COLORS.success,
    background: NAVOSYS_COLORS.successSurface,
    minimumRatio: 4.5,
  },
  {
    name: "Warning text on Warning surface",
    foreground: NAVOSYS_COLORS.warning,
    background: NAVOSYS_COLORS.warningSurface,
    minimumRatio: 4.5,
  },
];
