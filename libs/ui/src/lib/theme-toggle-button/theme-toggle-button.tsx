import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@portfolio/shared';
import { darkTheme, lightTheme } from '@portfolio/theme';
import * as styles from './theme-toggle-button.css';
/**
 * 테마 토글 버튼 컴포넌트
 * - zustand 전역 상태를 사용하여 테마 변경
 * - HTML 루트에 클래스 적용하여 vanilla-extract 테마 반영
 */
const ThemeToggleButtonComponent = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  // 테마가 변경될 때 HTML 루트 클래스에 반영 (다크/라이트)
  useEffect(() => {
    document.documentElement.classList.remove(
      theme === 'light' ? darkTheme : lightTheme
    );
    document.documentElement.classList.add(
      theme === 'light' ? lightTheme : darkTheme
    );
  }, [theme]);

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};

export const ThemeToggleButton = ThemeToggleButtonComponent;
