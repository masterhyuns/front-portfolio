import { ModalFooterProps } from './types';
import { FC } from 'react';
import * as styles from './modal.css';

/**
 * 모달 하단에 버튼 영역 등 Footer 콘텐츠를 렌더링하는 컴포넌트입니다.
 * - 버튼 그룹, 닫기/확인 등의 액션 영역을 포함할 수 있습니다.
 */
const ModalFooterComponent: FC<ModalFooterProps> = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};

export const ModalFooter = ModalFooterComponent;
