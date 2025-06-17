import type { Meta, StoryObj } from '@storybook/react';
import ToastMessage from './ToastMessage';

const meta: Meta<typeof ToastMessage> = {
  title: 'ui/ToastMessage',
  component: ToastMessage,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ToastMessage>;

export const Success: Story = {
  args: {
    toastData: {
      id: '1',
      type: 'success',
      title: '성공',
      message: '모임 참가에 성공하였습니다.',
    },
    closeToast: () => {},
  },
};

export const Error: Story = {
  args: {
    toastData: {
      id: '2',
      type: 'error',
      title: '에러',
      message: '유효하지 않은 요청입니다.',
    },
    closeToast: () => alert('닫기'),
  },
};

export const Warning: Story = {
  args: {
    toastData: {
      id: '3',
      type: 'warning',
      title: '경고',
      message:
        '30자 이상의 메시지를 인자로 전달하면 이렇게 2줄까지는 토스트 내부에 표시되다가 이후엔 줄임표로 표시됩니다.',
    },
    closeToast: () => {},
  },
};

export const Info: Story = {
  args: {
    toastData: {
      id: '4',
      type: 'info',
      title: '',
      message: 'User03 님에게 메시지가 도착했습니다.',
    },
    closeToast: () => alert('닫기'),
  },
};
