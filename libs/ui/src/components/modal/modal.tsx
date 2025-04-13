import { FC, useEffect } from 'react';
import { ModalFooterProps, ModalProps } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import * as styles from './modal.css';
import { ModalFooter } from './modal-footer';
import { useModal } from './provider';
import clsx from 'clsx';

export interface ModalComponent extends FC<ModalProps> {
  Footer: FC<ModalFooterProps>;
}

/**
 * 실제 모달 콘텐츠를 보여주는 Modal 컴포넌트입니다.
 * - Framer Motion을 사용한 애니메이션 효과 포함
 * - 제목과 닫기 버튼이 있는 헤더를 렌더링합니다.
 * - 외부에서 Esc 키를 누르면 닫히도록 이벤트 리스너 설정
 */
export const Modal: ModalComponent = ({ children, title, size = 'md' }) => {
  const { close } = useModal();
  useEffect(() => {
    // ESC 키 입력 시 모달을 닫기 위한 키보드 이벤트 등록
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(undefined);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [close]);

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(styles.modal, styles.modalSize[size])}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.header}>
            <h2>{title}</h2>
            <button className={styles.close} onClick={close} aria-label="닫기">
              ×
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

Modal.Footer = ModalFooter;
