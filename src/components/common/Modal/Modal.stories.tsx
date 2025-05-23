import Button from '@/components/common/Button/Button';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import type { Meta, StoryObj } from '@storybook/react';
import InputForm from '@/components/common/Form/InputForm';

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
      <ModalHeader>모달 헤더</ModalHeader>
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
      <ModalHeader>모달 헤더</ModalHeader>
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

export const CloseButtonDark: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}} closeButtonDark>
      <ModalHeader>모달 헤더</ModalHeader>
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
      <ModalHeader>모달 헤더</ModalHeader>
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
      <ModalHeader>111111111111111</ModalHeader>
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

export const NoModalHeader: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}}>
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

/**  버튼 넓이 지정 필요 */
export const NoCancelButton: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}}>
      <ModalContent>
        <p>모달 내용</p>
      </ModalContent>
      <ModalFooter>
        <div className="w-1/2">
          <Button>확인</Button>
        </div>
      </ModalFooter>
    </Modal>
  ),
};

export const ModalContentGroup: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}}>
      <ModalHeader>모달 헤더의 내용을 string으로 작성해주세요</ModalHeader>
      <ModalContent group>
        <InputForm
          type="email"
          label="Email"
          name="email"
          placeholder="이메일을 입력해줘"
        />
        <InputForm
          type="password"
          label="Password"
          name="password"
          placeholder="비밀번호를 입력해줘"
        />
      </ModalContent>
      <ModalFooter>
        <Button>확인</Button>
      </ModalFooter>
    </Modal>
  ),
};
