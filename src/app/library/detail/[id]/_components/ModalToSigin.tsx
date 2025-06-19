import Button from '@/components/common/Button/Button';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/common/Modal/Modal';
import { APP_ROUTES } from '@/constants/appRoutes';
import { useRouter } from 'next/navigation';
import { ModalToSiginProps } from '../type';

const ModalToSigin = ({ isModalOpen, setFalse }: ModalToSiginProps) => {
  const router = useRouter();

  return (
    <Modal isOpen={isModalOpen} onClose={setFalse}>
      <ModalHeader>스토리가 마음에 들었나요?</ModalHeader>
      <ModalContent>로그인해서 좋아요를 눌러보세요</ModalContent>
      <ModalFooter>
        <Button onClick={() => router.push(APP_ROUTES.signin)}>
          로그인하러 가기
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalToSigin;
