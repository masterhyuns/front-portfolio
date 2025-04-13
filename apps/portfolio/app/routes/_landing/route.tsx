import { Outlet } from '@remix-run/react';
import { MainLayout } from '@portfolio/ui';

const Route = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default Route;
