import { createTheme } from '@vanilla-extract/css';
import { vars } from './contract.css';

export const darkTheme = createTheme(vars, {
  color: {
    white: '#1a1a1a',
    black: '#ffffff',
    gray100: '#e5e5e5',
    gray200: '#555555',
    gray700: '#374151', // ✅ added for mid-gray tone in dark theme
    gray900: '#000000',
    primary: '#3b82f6',
    error: '#f87171',
    success: '#4ade80',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
  },
  shadow: {
    sm: '0 1px 2px rgba(255, 255, 255, 0.05)',
    md: '0 4px 6px rgba(255, 255, 255, 0.1)',
    lg: '0 10px 15px rgba(255, 255, 255, 0.1)',
  },
});
