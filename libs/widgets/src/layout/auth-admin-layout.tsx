import { PropsWithChildren } from 'react';
import { Link, Outlet, useLocation, useNavigate } from '@remix-run/react';
import * as styles from './auth-admin-layout.css';
import { ThemeToggleButton } from '@portfolio/ui';
import { clientFetch } from '@portfolio/shared';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/clients', label: '클라이언트' },
  { to: '/users', label: '사용자' },
  { to: '/settings', label: '세팅' },
];
const AuthAdminComponent = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await clientFetch('/api/auth/logout', { method: 'POST' });
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Admin</div>
        <nav className={styles.menuNav}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                location.pathname.startsWith(item.to)
                  ? styles.navLinkActive
                  : styles.navLink
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.rightSlot}>
          <ThemeToggleButton />
          <button
            type="submit"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </header>
      <main className={styles.mainContent}>{children ?? <Outlet />}</main>
    </div>
  );
};
export const AuthAdminLayout = AuthAdminComponent;
