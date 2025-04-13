import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const wrapper = style({
  maxWidth: '480px',
  margin: '0 auto',
  padding: vars.space[6],
  backgroundColor: vars.color.white,
  borderRadius: vars.radius.lg,
  selectors: {
    '.dark &': {
      backgroundColor: vars.color.gray900,
    },
  },
});

export const title = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 600,
  marginBottom: vars.space[6],
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: vars.space[6],
});
