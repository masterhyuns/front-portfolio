// libs/theme/contract.ts
import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    white: null,
    black: null,
    gray100: null,
    gray200: null,
    gray700: null,
    gray800: null,
    gray900: null,
    primary: null,
    error: null,
    success: null,
  },
  fontSize: {
    xs: null,
    sm: null,
    base: null,
    lg: null,
    xl: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    full: null,
  },
  space: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  },
  shadow: {
    sm: null,
    md: null,
    lg: null,
  },
});
