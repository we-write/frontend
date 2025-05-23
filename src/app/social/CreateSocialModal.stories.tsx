import { Meta, StoryObj } from '@storybook/react';
import CreateSocialModal from './CreateSocialModal';

const meat: Meta<typeof CreateSocialModal> = {
  title: 'Social/CreateSocialModal',
  component: CreateSocialModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meat;

type Story = StoryObj<typeof CreateSocialModal>;

export const Default: Story = {};
