import { fontFamily, textStyles } from './typography';

export const colors = {
  bg: {
    app: '#f6f7f9',
    page: '#eceef2',
  },
  surface: {
    default: '#ffffff',
    sunken: '#f1f4fa',
    sunkenAlt: '#f1f3f7',
    tint: '#e7edfd',
  },
  border: '#e2e5ec',
  track: '#eceef2',
  dark: {
    surface: '#23262e',
    frame: '#1a1c22',
    pressed: '#14161c',
    textMuted: '#a7adbb',
    control: 'rgba(255,255,255,0.10)',
  },
  text: {
    primary: '#23262e',
    body: '#3d424e',
    secondary: '#5c6270',
    muted: '#8a90a0',
    faint: '#a7adbb',
    disabled: '#c3c8d4',
    onDark: '#ffffff',
  },
  primary: {
    default: '#2f5fd0',
    pressed: '#2247a3',
    tint: '#e7edfd',
  },
  accent: {
    ar: '#d9822b',
  },
  success: {
    default: '#2f8f5b',
    bg: '#eef7f1',
  },
  error: {
    default: '#c4432e',
    bg: '#fbf0ee',
  },
} as const;

export const spacing = {
  2: 2,
  3: 3,
  5: 5,
  6: 6,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  26: 26,
  34: 34,
} as const;

export const radius = {
  screen: 36,
  xl: 20,
  lg: 18,
  md: 16,
  button: 15,
  sm: 14,
  icon: 12,
  chip: 11,
  pill: 999,
} as const;

export const elevation = {
  sheetOverCamera: 12,
} as const;

export const motion = {
  screenPush: { duration: 280 },
  cardPress: { duration: 120 },
  sectionAdvance: { duration: 220, translateY: 10 },
  answerReveal: { duration: 180 },
  arReticlePulse: {
    duration: 1600,
    opacityFrom: 0.35,
    opacityTo: 0.9,
    scaleFrom: 1,
    scaleTo: 1.06,
  },
  sheetInOut: { duration: 240 },
  pressScale: 0.96,
} as const;

export { fontFamily, textStyles };

export const tokens = {
  colors,
  spacing,
  radius,
  elevation,
  motion,
  fontFamily,
  textStyles,
} as const;
