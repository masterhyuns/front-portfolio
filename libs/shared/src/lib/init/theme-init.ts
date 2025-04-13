export const initThemeClass = () => {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  const theme =
    localStorage.getItem('theme') ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  html.classList.remove('light', 'dark');
  html.classList.add(theme);
};
