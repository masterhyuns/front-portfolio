import { create } from 'zustand';
import { ThemeMode, ThemeState } from './types';

// Zustand를 이용한 테마 상태 전역 store 생성
const useThemeStoreHook = create<ThemeState>((set) => ({
  theme: undefined,

  // 외부에서 theme 값을 정확히 반영하도록 상태만 관리
  setTheme: (mode: ThemeMode) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', mode);
      document.cookie = `theme=${mode}; path=/; max-age=31536000`;
    }
    set({ theme: mode });
  },

  toggleTheme: () =>
    set((state: ThemeState) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', next);
        document.cookie = `theme=${next}; path=/; max-age=31536000`;
      }
      return { theme: next };
    }),
}));

export const useThemeStore = useThemeStoreHook;
