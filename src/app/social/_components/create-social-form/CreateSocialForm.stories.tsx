import { Meta } from '@storybook/react';
import CreateSocialForm from './CreateSocialForm';
import useBoolean from '@/hooks/useBoolean';
import { Modal } from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';

const meta: Meta<typeof CreateSocialForm> = {
  title: 'Social/CreateSocialModal',
  component: CreateSocialForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default = () => {
  const { value: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <CreateSocialForm onClose={onClose} />
      </Modal>
      <Button onClick={onOpen}>모임만들기</Button>
    </>
  );
};
