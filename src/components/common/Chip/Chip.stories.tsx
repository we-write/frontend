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
    chipType: 'default',
    color: 'primary',
    variant: 'default',
  },
};
export const rounded: Story = {
  args: {
    text: '999+',
    chipType: 'rounded',
    color: 'primary',
    variant: 'default',
  },
};
export const inverted: Story = {
  args: {
    text: 'Chip',
    chipType: 'default',
    color: 'primary',
    variant: 'inverted',
  },
};
export const dateText: Story = {
  args: {
    text: '1월 7일',
    chipType: 'default',
    color: 'primary',
    variant: 'default',
  },
};

export const koreanText: Story = {
  args: {
    text: '이용 예정',
    chipType: 'rounded',
    color: 'primary',
    variant: 'default',
  },
};
export const Custom: Story = {
  args: {
    text: 'Custom',
    color: 'custom',
    variant: 'default',
    chipType: 'custom',
    className: 'rounded-full',
  },
};
