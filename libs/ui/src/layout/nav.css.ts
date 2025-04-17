import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const link = style({
  padding: '8px 12px',
  borderRadius: '6px',
  color: vars.color.gray600,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.gray100,
    },
    '.dark &': {
      color: vars.color.gray300,
    },
    '.dark &:hover': {
      backgroundColor: vars.color.gray800,
    },
  },
});

export const activeLink = style({
  fontWeight: 600,
  color: vars.color.primary,
});
