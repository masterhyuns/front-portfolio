import { SourceLink } from '@portfolio/ui';

const ComponentsPage = () => {
  return (
    <div>
      <SourceLink href={'https://github.com/masterhyuns/front-portfolio'} />
      <img
        src="/img.png"
        alt="프로젝트 아키텍처 다이어그램"
        style={{ width: '50%', marginBottom: '2rem', borderRadius: '8px' }}
      />
    </div>
  );
};
export default ComponentsPage;
