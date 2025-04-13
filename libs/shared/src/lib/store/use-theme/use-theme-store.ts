import { create } from 'zustand';
import { ThemeMode, ThemeState } from './types';

// Helper to get initial theme safely
const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
  }
  return 'light'; // default SSR-safe
};

// Zustand를 이용한 테마 상태 전역 store 생성
const useThemeStoreHook = create<ThemeState>((set) => ({
  theme: getInitialTheme(),

  // 외부에서 theme 값을 정확히 반영하도록 상태만 관리
  setTheme: (mode: ThemeMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', mode);
    }
    set({ theme: mode });
  },

  toggleTheme: () =>
    set((state: ThemeState) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next);
      }
      return { theme: next };
    }),
}));

export const useThemeStore = useThemeStoreHook;
