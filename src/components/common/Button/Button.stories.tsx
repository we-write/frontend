import Button from './Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'default',
  },
};

export const WhiteInverted: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'inverted',
  },
};

export const Custom: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'default',
    size: 'custom',
    className: 'w-[100px] h-[100px]',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    color: 'secondary',
    variant: 'default',
  },
};

export const SecondaryWhiteInverted: Story = {
  args: {
    children: 'Button',
    color: 'secondary',
    variant: 'inverted',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'default',
    isDisabled: true,
  },
};
