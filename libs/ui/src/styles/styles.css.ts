// libs/ui/src/styles/styles.css.ts
import { globalStyle } from '@vanilla-extract/css';
import { vars } from '@portfolio/theme';

// Reset 기본
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  backgroundColor: vars.color.white,
  color: vars.color.black,
  lineHeight: '1.5',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle('button', {
  fontFamily: 'inherit',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
});

globalStyle('ul, ol', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
});
