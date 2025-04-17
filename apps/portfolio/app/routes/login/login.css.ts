// apps/portfolio/app/routes/login/login.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

export const container = style({
  maxWidth: '400px',
  margin: '100px auto',
  padding: '32px',
  borderRadius: '12px',
  backgroundColor: vars.color.white,
  boxShadow: `0 4px 10px ${vars.color.black}`,
  color: vars.color.black,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const title = style({
  fontSize: '1.75rem',
  fontWeight: 700,
  marginBottom: '8px',
});

export const subtitle = style({
  fontSize: '0.95rem',
  marginBottom: '24px',
});

export const form = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});
