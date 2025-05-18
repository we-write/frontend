import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import Image from 'next/image';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
  },
};

export const WithSuffixIcon: Story = {
  args: {
    name: 'password',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    SuffixIcon: (
      <Image
        src="/assets/icons/VisibilityOff.svg"
        alt="search"
        width={20}
        height={20}
      />
    ),
  },
};

export const WithErrorHelperText: Story = {
  args: {
    name: 'email',
    placeholder: '이메일을 입력해주세요',
    hasError: true,
  },
};
