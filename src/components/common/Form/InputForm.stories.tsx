import { Meta, StoryObj } from '@storybook/react';
import InputForm from './InputForm';

const meta: Meta<typeof InputForm> = {
  title: 'Common/Form/InputForm',
  component: InputForm,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    name: 'email',
    placeholder: '이메일을 입력하세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    name: 'email',
    placeholder: '이메일을 입력하세요',
    helperText: 'helperText',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    hasError: true,
    helperText: '비밀번호가 일치하지 않습니다.',
  },
};
