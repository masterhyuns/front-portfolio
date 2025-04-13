// libs/ui/src/components/form-wizard/step2.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
  marginBottom: vars.space[4],
});

export const label = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: vars.color.gray900,
  selectors: {
    '.dark &': {
      color: vars.color.gray100,
    },
  },
});

export const select = style({
  padding: `${vars.space[2]} ${vars.space[3]}`,
  fontSize: vars.fontSize.base,
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.white,
  color: vars.color.black,
  selectors: {
    '.dark &': {
      backgroundColor: vars.color.gray900,
      color: vars.color.white,
      borderColor: vars.color.gray700,
    },
  },
});

export const error = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.error,
});

export const skillList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space[2],
  marginTop: vars.space[2],
});

export const skillButton = style({
  padding: `${vars.space[1]} ${vars.space[3]}`,
  borderRadius: '999px',
  fontSize: vars.fontSize.sm,
  border: 'none',
  cursor: 'pointer',
});

export const skillActive = style({
  backgroundColor: vars.color.primary,
  color: vars.color.white,
});

export const skillInactive = style({
  backgroundColor: vars.color.gray200,
  color: vars.color.gray800,
  selectors: {
    '.dark &': {
      backgroundColor: vars.color.gray700,
      color: vars.color.gray100,
    },
  },
});
