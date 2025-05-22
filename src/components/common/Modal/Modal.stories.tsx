import Button from '@/components/common/Button/Button';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex-center h-60 w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

/** 기본 모달 */
export const Default: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}}>
      <ModalHeader>
        <h1>모달 헤더</h1>
      </ModalHeader>
      <ModalContent>
        <p>모달 내용</p>
      </ModalContent>
      <ModalFooter>
        <Button>취소</Button>
        <Button>확인</Button>
      </ModalFooter>
    </Modal>
  ),
};

export const noBackDrop: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}} noBackdrop>
      <ModalHeader>
        <h1>모달 헤더</h1>
      </ModalHeader>
      <ModalContent>
        <p>모달 내용</p>
      </ModalContent>
      <ModalFooter>
        <Button>취소</Button>
        <Button>확인</Button>
      </ModalFooter>
    </Modal>
  ),
};
export const noCloseButton: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}} noCloseButton>
      <ModalHeader>
        <h1>모달 헤더</h1>
      </ModalHeader>
      <ModalContent>
        <p>모달 내용</p>
      </ModalContent>
      <ModalFooter>
        <Button>취소</Button>
        <Button>확인</Button>
      </ModalFooter>
    </Modal>
  ),
};

export const fullScreen: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}} fullScreen>
      <ModalHeader>
        <h1>모달 헤더</h1>
      </ModalHeader>
      <ModalContent fullScreen>
        <p>모달 내용</p>
      </ModalContent>
      <ModalFooter>
        <Button>취소</Button>
        <Button>확인</Button>
      </ModalFooter>
    </Modal>
  ),
};
