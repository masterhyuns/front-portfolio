import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1,
});

export const activeModal = style({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const modal = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.radius.lg,
  padding: vars.space[6],
  boxShadow: vars.shadow.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
  width: '100%',
  maxWidth: '600px',
  position: 'relative',
  selectors: {
    '.dark &': {
      backgroundColor: vars.color.gray900,
    },
  },
});

export const modalSm = style({
  maxWidth: '300px',
});

export const modalMd = style({
  maxWidth: '500px',
});

export const modalLg = style({
  maxWidth: '700px',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: vars.fontSize.lg,
  fontWeight: 600,
  borderBottom: `1px solid ${vars.color.gray200}`,
  paddingBottom: vars.space[2],
  selectors: {
    '.dark &': {
      borderBottom: `1px solid ${vars.color.gray700}`,
    },
  },
});

export const close = style({
  background: 'none',
  border: 'none',
  fontSize: '1.25rem',
  lineHeight: 1,
  cursor: 'pointer',
  color: vars.color.black,
  selectors: {
    '.dark &': {
      color: vars.color.white,
    },
  },
});

export const body = style({
  fontSize: vars.fontSize.base,
  color: vars.color.black,
  selectors: {
    '.dark &': {
      color: vars.color.white,
    },
  },
});

export const footer = style({
  marginTop: vars.space[4],
  paddingTop: vars.space[3],
  borderTop: `1px solid ${vars.color.gray200}`,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.space[2],
  selectors: {
    '.dark &': {
      borderTop: `1px solid ${vars.color.gray700}`,
    },
  },
});

export const modalSize = {
  sm: modalSm,
  md: modalMd,
  lg: modalLg,
};
