import { FC, useState } from 'react';
import {
  Button,
  Modal,
  ModalFooter,
  SnippetCard,
  SourceLink,
  useModal,
} from '@portfolio/ui';

const ModalPage = () => {
  const { alert, confirm, open } = useModal();

  const handleAlert = async () => {
    await alert('스토리북 알림입니다!');
  };

  const handleConfirm = async () => {
    const result = await confirm('정말로 확인하시겠습니까?');
    await alert(`결과: ${result ? '확인함' : '취소함'}`);
  };

  const handleCustom = async () => {
    const result = await open(CustomModal, {
      props: { name: '홍길동' },
    });
    console.log('result', result);
  };

  return (
    <div>
      <SourceLink href="https://github.com/masterhyuns/front-portfolio/tree/main/libs/ui/src/components/modal" />
      <h2>Modals</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
      >
        <SnippetCard
          title="Alert Modal"
          codeSnippet={`
  const { alert } = useModal();
  const handleAlert = async () => {
    await alert('스토리북 알림입니다!');
  };

  <Button variant="primary" onClick={handleAlert}>
    Alert
  </Button>`}
        >
          <Button variant="primary" onClick={handleAlert}>
            Alert
          </Button>
        </SnippetCard>

        <SnippetCard
          title="Confirm Modal"
          codeSnippet={`
  const { confirm } = useModal();
  const handleConfirm = async () => {
  const result = await confirm('정말로 확인하시겠습니까?');
    await alert(\`결과: \${result ? '확인함' : '취소함'}\`);
  };

  <Button variant="primary" onClick={handleConfirm}>
    Confirm
  </Button>;`}
        >
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </SnippetCard>

        <SnippetCard
          title="Custom Modal"
          codeSnippet={`
  const { open } = useModal();
  const handleCustom = async () => {
    const result = await open(CustomModal, {
      props: { name: '홍길동' },
    });
    console.log('result', result);
  };

  const CustomModal = ({ name }) => {
    const { close } = useModal();

    const handleClose = () => {
      close({ age: 20, name });
    };

    return (
      <Modal title="알림">
        <div style={{ padding: '1rem' }}>{name}</div>
        <ModalFooter>
          <Button onClick={handleClose}>닫기</Button>
        </ModalFooter>
      </Modal>
    );
  };

  <Button variant="primary" onClick={handleCustom}>
    Custom
  </Button>`}
        >
          <Button variant="primary" onClick={handleCustom}>
            Custom
          </Button>
        </SnippetCard>
      </div>
    </div>
  );
};

export default ModalPage;

const CustomModal: FC<{ name: string }> = ({ name }) => {
  const { close } = useModal();

  const handleClose = () => {
    close({ age: 20, name });
  };
  return (
    <Modal title="알림">
      <div style={{ padding: '1rem' }}>{name}</div>
      <ModalFooter>
        <Button onClick={handleClose}>닫기</Button>
      </ModalFooter>
    </Modal>
  );
};
