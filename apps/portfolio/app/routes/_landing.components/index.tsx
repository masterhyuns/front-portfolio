import { Outlet } from '@remix-run/react';
import { ComponentLayout } from '@portfolio/ui';

const ComponentsPage = () => {
  return (
    <ComponentLayout>
      <Outlet />
    </ComponentLayout>
  );
};
export default ComponentsPage;
