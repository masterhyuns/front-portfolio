import { useAuthStore } from '@portfolio/shared';

const IndexPage = () => {
  const { auth } = useAuthStore();
  return (
    <div>
      <p>{auth?.name}IndexPage</p>
    </div>
  );
};
export default IndexPage;
