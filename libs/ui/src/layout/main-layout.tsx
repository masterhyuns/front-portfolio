import { FC } from 'react';
import { MainLayoutProps } from './types';
import { NavLink } from '@remix-run/react';
import { clsx } from 'clsx';

import * as styles from './main-layout.css';
import { ThemeToggleButton } from '../theme-toggle-button/theme-toggle-button';
import * as navStyles from './nav.css';
const MainLayoutComponent: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/components"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Components
              </NavLink>
            </li>
          </ul>
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
