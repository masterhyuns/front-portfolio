// libs/ui/src/components/source-link/source-link.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const container = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: vars.space[4],
});

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[2],
  fontSize: vars.fontSize.sm,
  padding: `${vars.space[1]} ${vars.space[3]}`,
  borderRadius: vars.radius.md,
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  color: vars.color.primary,
  textDecoration: 'none',
  transition: 'background-color 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
    '.dark &': {
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
    },
    '.dark &:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.25)',
    },
  },
});
