import { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Common/Chip',
  component: Chip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    text: 'Chip',
    textColor: 'text-white',
    backgroundColor: 'bg-gray-900',
    size: 'small',
  },
};
export const Small: Story = {
  args: {
    text: '999+',
    textColor: 'text-white',
    backgroundColor: 'bg-gray-900',
    size: 'small',
  },
};
export const Medium: Story = {
  args: {
    text: 'Chip',
    textColor: 'text-white',
    backgroundColor: 'bg-gray-900',
    size: 'medium',
  },
};
export const Large: Story = {
  args: {
    text: 'Chip',
    textColor: 'text-white',
    backgroundColor: 'bg-gray-900',
    size: 'large',
  },
};
export const ChangeColor: Story = {
  args: {
    text: 'Chip',
    textColor: 'text-white',
    backgroundColor: 'bg-blue-500',
  },
};
export const ChangeTextColor: Story = {
  args: {
    text: 'Chip',
    textColor: 'text-blue-500',
    backgroundColor: 'bg-gray-900',
  },
};

export const Custom: Story = {
  args: {
    text: 'Custom',
    textColor: 'text-white',
    backgroundColor: 'bg-blue-500',
    size: 'small',
    className: 'rounded-full',
  },
};
