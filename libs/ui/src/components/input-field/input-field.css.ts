// libs/ui/src/components/input-field/input-field.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
  marginBottom: vars.space[4],
});

export const label = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  color: vars.color.black,
  selectors: {
    '.dark &': {
      color: vars.color.gray100,
    },
  },
});

export const input = style({
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
  marginTop: vars.space[1],
});
