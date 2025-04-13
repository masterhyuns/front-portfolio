import { ComponentLayout } from '@portfolio/ui';
import { Outlet } from '@remix-run/react';

const Route = () => {
  return (
    <ComponentLayout>
      <Outlet />
    </ComponentLayout>
  );
};
export default Route;
