import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#0070f3',
    background: '#000000',
    text: '#222222',
  },
});
