import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const toggleButton = style({
  width: '36px',
  height: '36px',
  borderRadius: vars.radius.full,
  display: 'flex',
  paddingTop: '3px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.gray100,
  border: `1px solid ${vars.color.gray200}`,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.gray200,
    },
    '.dark &': {
      backgroundColor: vars.color.gray900,
      borderColor: vars.color.gray700,
    },
    '.dark &:hover': {
      backgroundColor: vars.color.gray700,
    },
  },
});
