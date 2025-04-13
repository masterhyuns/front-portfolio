import * as styles from './components-layout.css';
import { NavLink } from '@remix-run/react';
import { FC, ReactNode } from 'react';
const ComponentLayoutComponent: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <nav>
          <ul>
            <li>
              <NavLink to="button">Button</NavLink>
            </li>
            <li>
              <NavLink to="modal">Modal</NavLink>
            </li>
            <li>
              <NavLink to="form-wizard">Form Wizard</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export const ComponentLayout = ComponentLayoutComponent;
