import { FC } from 'react';
import { MainLayoutProps } from './types';
import { Link, NavLink } from '@remix-run/react';

import * as styles from './main-layout.css';
import { ThemeToggleButton } from '../theme-toggle-button/theme-toggle-button';

const MainLayoutComponent: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/components">Components</NavLink>
        </nav>
        <ThemeToggleButton />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} front portfolio
      </footer>
    </div>
  );
};

export const MainLayout = MainLayoutComponent;
