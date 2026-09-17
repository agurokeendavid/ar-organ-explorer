import { TextStyle } from 'react-native';

export const fontFamily = {
  displayExtraBold: 'BricolageGrotesque-ExtraBold',
  displayBold: 'BricolageGrotesque-Bold',
  bodyRegular: 'SourceSans3-Regular',
  bodySemiBold: 'SourceSans3-SemiBold',
  bodyBold: 'SourceSans3-Bold',
  mono: 'monospace',
} as const;

type TextStyleName =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLg'
  | 'body'
  | 'bodySm'
  | 'titleCard'
  | 'titleRow'
  | 'labelStrong'
  | 'button'
  | 'buttonSm'
  | 'chip'
  | 'labelSm'
  | 'meta'
  | 'metaStrong'
  | 'micro'
  | 'tab';

export const textStyles: Record<TextStyleName, TextStyle> = {
  display: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 32,
    lineHeight: 35,
    letterSpacing: -0.64,
  },
  h1: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.52,
  },
  h2: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: fontFamily.displayBold,
    fontSize: 17,
    lineHeight: 21,
  },
  h4: {
    fontFamily: fontFamily.displayBold,
    fontSize: 15,
    lineHeight: 20,
  },
  bodyLg: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 16.5,
    lineHeight: 26,
  },
  body: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodySm: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 13.5,
    lineHeight: 20,
  },
  titleCard: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 16.5,
    lineHeight: 20,
  },
  titleRow: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 16,
    lineHeight: 19,
  },
  labelStrong: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 15,
    lineHeight: 20,
  },
  button: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 16.5,
    lineHeight: 16.5,
  },
  buttonSm: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 15,
    lineHeight: 15,
  },
  chip: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 13.5,
    lineHeight: 13.5,
  },
  labelSm: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 12.5,
    lineHeight: 15,
  },
  meta: {
    fontFamily: fontFamily.mono,
    fontSize: 11.5,
    lineHeight: 16,
  },
  metaStrong: {
    fontFamily: fontFamily.mono,
    fontWeight: '600',
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: 0.46,
  },
  micro: {
    fontFamily: fontFamily.mono,
    fontSize: 10.5,
    lineHeight: 17,
  },
  tab: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 10.5,
    lineHeight: 10.5,
  },
};
