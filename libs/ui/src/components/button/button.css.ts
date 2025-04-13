import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@portfolio/theme';

export const button = recipe({
  base: {
    border: 'none',
    borderRadius: vars.radius.md,
    fontWeight: 500,
    cursor: 'pointer',
    padding: `${vars.space[2]} ${vars.space[4]}`,
    transition: 'all 0.2s ease-in-out',
    selectors: {
      '&:hover': {
        opacity: 0.9,
      },
      '&:active': {
        transform: 'scale(0.98)',
      },
      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.white,
      },
      secondary: {
        backgroundColor: vars.color.gray200,
        color: vars.color.black,
        selectors: {
          '.dark &': {
            backgroundColor: vars.color.gray700,
            color: vars.color.white,
          },
        },
      },
      success: {
        backgroundColor: vars.color.success,
        color: vars.color.white,
      },
      warning: {
        backgroundColor: '#facc15',
        color: vars.color.black,
      },
      danger: {
        backgroundColor: vars.color.error,
        color: vars.color.white,
      },
    },
    size: {
      sm: {
        fontSize: vars.fontSize.sm,
        padding: `${vars.space[1]} ${vars.space[3]}`,
      },
      md: {
        fontSize: vars.fontSize.base,
        padding: `${vars.space[2]} ${vars.space[4]}`,
      },
      lg: {
        fontSize: vars.fontSize.lg,
        padding: `${vars.space[3]} ${vars.space[5]}`,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
