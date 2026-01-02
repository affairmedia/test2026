import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const textStyles = StyleSheet.create({
  h1: {
    fontSize: FONT_SIZES.huge,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 2,
  },
  h2: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 1.5,
  },
  h3: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 1,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  body: {
    fontSize: FONT_SIZES.md,
    color: COLORS.offWhite,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.lightGray,
  },
});

export const brutalistShadow = {
  shadowColor: COLORS.shadowDark,
  shadowOffset: {
    width: 4,
    height: 4,
  },
  shadowOpacity: 0.5,
  shadowRadius: 0,
  elevation: 8,
};

export const neumorphicStyles = {
  light: {
    shadowColor: COLORS.shadowLight,
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  dark: {
    shadowColor: COLORS.shadowDark,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
};
