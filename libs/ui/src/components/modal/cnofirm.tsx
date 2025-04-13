import { Modal } from './modal';
import { ModalFooter } from './modal-footer';
import { FC } from 'react';
import { useModal } from './provider';
import { Button } from '../button/button';

interface ConfirmProps {
  message: string;
}

/**
 * 사용자의 확인/취소 입력을 받는 Confirm 모달 컴포넌트입니다.
 * - `message`는 모달 본문에 표시될 안내 메시지입니다.
 * - 취소 버튼 클릭 시 close(false), 확인 버튼 클릭 시 close(true)로 Promise가 resolve됩니다.
 */
const ConfirmComponent: FC<ConfirmProps> = ({ message }) => {
  const { close } = useModal<boolean>();
  return (
    <Modal title="확인">
      <div style={{ padding: '1rem' }}>{message}</div>
      <ModalFooter>
        <Button variant={'secondary'} onClick={() => close(false)}>
          취소
        </Button>
        <Button variant={'primary'} onClick={() => close(true)}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const Confirm = ConfirmComponent;
