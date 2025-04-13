import { vars } from '@portfolio/theme';
import { style } from '@vanilla-extract/css';

export const card = style({
  position: 'relative',
  border: `1px solid ${vars.color.gray200}`,
  borderRadius: vars.radius.lg,
  padding: vars.space[4],
  transition: 'box-shadow 0.2s ease',
  backgroundColor: vars.color.white,
  selectors: {
    '&:hover': {
      boxShadow: vars.shadow.lg,
    },
    '.dark &': {
      backgroundColor: vars.color.gray900,
      border: `1px solid ${vars.color.gray700}`,
    },
  },
});

export const preview = style({
  zIndex: 1,
});

export const snippet = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  marginTop: vars.space[2],
  backgroundColor: vars.color.gray900,
  color: vars.color.gray100,
  padding: vars.space[4],
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  boxShadow: vars.shadow.lg,
  zIndex: 10,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowX: 'auto',
});

export const code = style({
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  backgroundColor: vars.color.gray900,
  color: vars.color.gray100,
  padding: vars.space[3],
  fontSize: vars.fontSize.sm,
  borderRadius: vars.radius.md,
  overflowX: 'auto',
  lineHeight: '1.6',
  scrollbarWidth: 'thin',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  selectors: {
    '&::-webkit-scrollbar': {
      height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.color.gray200,
      borderRadius: '6px',
    },
  },
});

export const copyButton = style({
  position: 'absolute',
  top: vars.space[2],
  right: vars.space[3],
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: vars.color.gray100,
});
