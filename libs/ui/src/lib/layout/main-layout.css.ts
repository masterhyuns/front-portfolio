// libs/ui/src/layouts/main-layout.css.ts
import { vars } from '@portfolio/theme';
import { style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: vars.color.white,
  color: vars.color.black,
  selectors: {
    '.dark &': {
      backgroundColor: vars.color.gray900,
      color: vars.color.gray100,
    },
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${vars.space[4]} ${vars.space[6]}`,
  borderBottom: `1px solid ${vars.color.gray200}`,
  color: 'red',
  selectors: {
    '.dark &': {
      borderBottom: `1px solid ${vars.color.gray100}`,
    },
  },
});

export const nav = style({
  display: 'flex',
  gap: vars.space[4],
});

export const main = style({
  flex: 1,
  padding: vars.space[6],
});

export const footer = style({
  padding: `${vars.space[4]} ${vars.space[6]}`,
  borderTop: `1px solid ${vars.color.gray200}`,
  fontSize: vars.fontSize.sm,
  color: vars.color.gray200,
  selectors: {
    '.dark &': {
      borderTop: `1px solid ${vars.color.gray100}`,
      color: vars.color.gray100,
    },
  },
});
