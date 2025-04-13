/**
 * ModalProvider 시스템
 * - 전역적으로 모달을 다루기 위한 Context 기반 모달 관리 구조입니다.
 * - Confirm, Alert 모달도 이 시스템을 통해 Promise 기반으로 사용할 수 있습니다.
 */

import {
  ComponentType,
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ModalContextType, ModalRequest } from './types';
import { v4 as uuid } from 'uuid';
import { Confirm } from './cnofirm';
import { Alert } from './alert';
import * as styles from './modal.css';

// 모달 관리용 전역 컨텍스트 (openModal, close 함수 공유)
const ModalContext = createContext<ModalContextType | null>(null);

// 현재 활성화된 모달 ID를 저장하는 컨텍스트
const ActiveModalContext = createContext<string | null>(null);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalRequest[]>([]);

  // 새로운 모달을 생성하고 상태에 추가 (Promise 형태로 결과를 돌려줌)
  const openModal = <T,>(
    Component: ComponentType<any>,
    { props }: { props: any }
  ) => {
    return new Promise<T>((resolve) => {
      const id = uuid();
      const element = <Component {...props} />;
      const typedResolve = resolve as (result: unknown) => void;
      setModals((prev) => [...prev, { id, element, resolve: typedResolve }]);
    });
  };

  // 특정 ID의 모달을 닫고, resolve로 결과 전달
  const close = (id: string, result: unknown) => {
    setModals((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target) target.resolve(result);
      return prev.filter((m) => m.id !== id);
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, close }}>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          <>
            {modals.length > 0 && <div className={styles.backdrop}></div>}
            {modals.map((modal, index) => (
              <ActiveModalContext.Provider key={modal.id} value={modal.id}>
                <div
                  className={styles.activeModal}
                  style={{ zIndex: 1000 + index }}
                >
                  {modal.element}
                </div>
              </ActiveModalContext.Provider>
            ))}
          </>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

// 모달 컨텍스트를 사용하는 훅 (alert, confirm 포함)
export const useModal = <T,>() => {
  const modalCtx = useContext(ModalContext);
  const activeId = useContext(ActiveModalContext);

  if (!modalCtx) throw new Error('useModal must be used within ModalProvider');

  return {
    close: (value: T) => {
      if (!activeId) throw new Error('No active modal id found.');
      modalCtx.close(activeId, value);
    },
    open: modalCtx.openModal,
    alert: (message: string): Promise<undefined> =>
      modalCtx.openModal(Alert, { props: { message } }),
    confirm: (message: string): Promise<boolean> =>
      modalCtx.openModal(Confirm, { props: { message } }),
  };
};
