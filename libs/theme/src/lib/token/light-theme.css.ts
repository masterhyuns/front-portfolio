import { createTheme } from '@vanilla-extract/css';
import { vars } from './contract.css';

export const lightTheme = createTheme(vars, {
  color: {
    white: '#ffffff',
    black: '#000000',
    gray100: '#f5f5f5',
    gray200: '#e5e5e5',
    gray300: '#D1D5DB',
    gray600: '#4B5563',
    gray700: '#4b5563',
    gray800: '#1F2937',
    gray900: '#1a1a1a',
    primary: '#2563eb',
    error: '#dc2626',
    success: '#16a34a',
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
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
});
