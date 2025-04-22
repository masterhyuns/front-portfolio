import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: vars.color.gray100,
  color: vars.color.gray900,
});

export const header = style({
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${vars.space[5]}`,
  borderBottom: `1px solid ${vars.color.gray300}`,
  backgroundColor: vars.color.white,
});

export const logo = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 'bold',
  color: vars.color.black,
});

export const menuNav = style({
  display: 'flex',
  gap: vars.space[4],
});

export const navLink = style({
  textDecoration: 'none',
  color: vars.color.black,
  fontSize: vars.fontSize.base,
  fontWeight: 500,
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderRadius: vars.radius.md,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.gray200,
    },
  },
});

export const navLinkActive = style([
  navLink,
  {
    backgroundColor: vars.color.primary,
    color: vars.color.white,
  },
]);

export const rightSlot = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[3],
});

export const logoutButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  fontSize: vars.fontSize.base,
  color: vars.color.black,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      color: vars.color.primary,
    },
  },
});
export const mainContent = style({
  flex: 1,
  padding: vars.space[5],
  overflowY: 'auto',
});
