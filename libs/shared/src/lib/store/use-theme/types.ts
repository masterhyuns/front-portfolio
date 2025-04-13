// 타입 : 다크 모드 or 라이트 모드
export type ThemeMode = 'light' | 'dark';
export interface ThemeState {
  theme: ThemeMode; // 현재 테마 상태
  setTheme: (mode: ThemeMode) => void; // 테마를 수동으로 설정하는 함수
  toggleTheme: () => void; // 테마를 토글 ( 라이트 <-> 다크) 하는 함수
}
