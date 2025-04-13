import { create } from 'zustand';
import { ThemeMode, ThemeState } from './types';

// 시스템 환경 설정에서 기본 테마를 가져오는 함수
const getSystemTheme = (): ThemeMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Zustand를 이용한 테마 상태 전역 store 생성
const useThemeStoreHook = create<ThemeState>((set) => ({
  // 초기 테마 상태 설정:
  // 1. 클라이언트 환경일 경우 localStorage 값 우선
  // 2. 없으면 시스템 설정 기반
  // 3. 서버 환경에서는 'light' 기본값 사용
  theme:
    typeof window !== 'undefined'
      ? ((localStorage.getItem('theme') as ThemeMode) ?? getSystemTheme())
      : 'light',

  // 테마를 강제로 설정하는 함수
  setTheme: (mode: ThemeMode) => {
    localStorage.setItem('theme', mode); // localStorage에 저장
    set({ theme: mode }); // 상태 업데이트
  },

  // 현재 테마를 반대로 토글하는 함수 (light <-> dark)
  toggleTheme: () =>
    set((state: ThemeState) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next); // 변경된 테마 저장
      return { theme: next }; // 상태 업데이트
    }),
}));

export const useThemeStore = useThemeStoreHook;
