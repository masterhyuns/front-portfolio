import { Button } from '@portfolio/ui';
import { clientFetch } from '@portfolio/shared';

const DashboardPage = () => {
  const handleOnClick = async () => {
    const result = await clientFetch('http://localhost:8081/api/me');
    console.log('result => ', result);
  };
  return (
    <div>
      <Button variant={'primary'} onClick={handleOnClick}>
        사용자 조회
      </Button>
    </div>
  );
};
export default DashboardPage;
