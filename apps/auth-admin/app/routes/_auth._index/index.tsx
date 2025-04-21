import { useAuthStore } from '@portfolio/shared';
import { Link, Outlet } from '@remix-run/react';

const IndexPage = () => {
  const { auth } = useAuthStore();
  return (
    <div>
      <p>{auth?.name}IndexPage</p>
    </div>
  );
};
export default IndexPage;
