import { ComponentType, ReactElement, ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 현재 열려 있는 모달에 대한 정보를 담는 구조입니다.
 * - `id`: 고유 식별자
 * - `element`: 렌더링할 모달 컴포넌트 요소
 * - `resolve`: 모달이 닫힐 때 결과를 반환하는 Promise의 resolve 함수
 */
export interface ModalRequest {
  id: string;
  element: ReactElement;
  resolve: (result: unknown) => void;
}

/**
 * 모달을 열고 닫기 위한 컨텍스트 타입입니다.
 * - `openModal`: 특정 모달 컴포넌트를 열고 Promise로 결과를 기다립니다.
 * - `close`: 특정 모달을 닫고 결과를 전달합니다.
 */
export interface ModalContextType {
  openModal: <T = void>(
    Component: ComponentType<any>,
    options: { props: any }
  ) => Promise<T>;
  close: (id: string, result: unknown) => void;
}

export interface ModalFooterProps {
  children?: ReactNode;
}
