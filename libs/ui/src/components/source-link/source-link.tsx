import { FC } from 'react';
import { SourceLinkProps } from './types';
import * as styles from './source-link.css';
import { FaGithub } from 'react-icons/fa';
/**
 * GitHub 등 소스 코드 링크를 상단에 띄우는 공통 컴포넌트입니다.
 */
const SourceLinkComponent: FC<SourceLinkProps> = ({
  href,
  label = '소스코드 보기 ↗',
}) => {
  return (
    <div className={styles.container}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <FaGithub size={16} />
        {label}
      </a>
    </div>
  );
};

export const SourceLink = SourceLinkComponent;
