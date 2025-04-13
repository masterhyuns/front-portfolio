import { Modal } from './modal';
import { ModalFooter } from './modal-footer';
import { FC } from 'react';
import { useModal } from './provider';
import { Button } from '../button/button';

interface AlertProps {
  message: string;
}

/**
 * 사용자에게 단순 메시지를 알리는 Alert 모달 컴포넌트입니다.
 * - `message`는 모달 본문에 표시할 텍스트입니다.
 * - 확인 버튼을 누르면 close(true)로 모달이 닫히고 resolve됩니다.
 */
const AlertComponent: FC<AlertProps> = ({ message }) => {
  const { close } = useModal<boolean>();

  return (
    <Modal title="알림">
      <div style={{ padding: '1rem' }}>{message}</div>
      <ModalFooter>
        <Button variant={'primary'} onClick={() => close(true)}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const Alert = AlertComponent;
