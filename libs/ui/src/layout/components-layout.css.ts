// libs/ui/src/layouts/components-layout.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const wrapper = style({
  display: 'flex',
  height: '100%',
});

export const sidebar = style({
  width: '220px',
  padding: vars.space[4],
  borderRight: `1px solid ${vars.color.gray200}`,
  backgroundColor: vars.color.white,
  overflowY: 'auto',
  selectors: {
    '.dark &': {
      backgroundColor: vars.color.gray900,
      borderRight: `1px solid ${vars.color.gray700}`,
    },
  },
});

export const content = style({
  flex: 1,
  padding: vars.space[6],
});
