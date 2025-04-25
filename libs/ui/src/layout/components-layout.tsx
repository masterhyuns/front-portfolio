import * as styles from './components-layout.css';
import { NavLink } from '@remix-run/react';
import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import * as navStyles from './nav.css';
const ComponentLayoutComponent: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="button"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Button
              </NavLink>
            </li>
            <li>
              <NavLink
                to="modal"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Modal
              </NavLink>
            </li>
            <li>
              <NavLink
                to="form/wizard"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Form Wizard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="form/builder"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Form Builder
              </NavLink>
            </li>
            <li>
              <NavLink
                to="table"
                className={({ isActive }) =>
                  clsx(navStyles.link, isActive && navStyles.activeLink)
                }
              >
                Table
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export const ComponentLayout = ComponentLayoutComponent;
