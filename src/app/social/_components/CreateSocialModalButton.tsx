import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import useBoolean from '@/hooks/useBoolean';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import { Modal } from '@/components/common/Modal/Modal';
import CreateSocialForm from './create-social-form/CreateSocialForm';

const CreateSocialModalButton = () => {
  const { value: isOpen, setFalse: close, setTrue: open } = useBoolean();
  const { isSignIn } = useAuth();
  const router = useRouter();

  const handleModalClick = () => {
    if (isSignIn) {
      open();
    } else {
      alert('로그인 후 이용해주세요.');
      router.push('/auths/signin');
    }
  };

  return (
    <>
      {/* 모임만들기 버튼 */}
      <Button size="custom" className="px-4" onClick={handleModalClick}>
        스토리그룹 만들기
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={close}
        className="max-h-[70vh] overflow-scroll"
      >
        <CreateSocialForm onClose={close} />
      </Modal>
    </>
  );
};

export default CreateSocialModalButton;
