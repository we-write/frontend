import { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';
import useBoolean from '@/hooks/useBoolean';

const meta: Meta<typeof CheckBox> = {
  title: 'Common/Input/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

const InteractiveCheckBox = () => {
  const { value, toggle } = useBoolean(false);

  return (
    <CheckBox
      name="interactive-checkbox"
      checked={value}
      onChange={toggle}
      label="체크박스"
      labelPosition="right"
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveCheckBox />,
};

export const WithLabelRight: Story = {
  args: {
    checked: false,
    label: '오른쪽 라벨',
    labelPosition: 'right',
  },
};

export const WithLabelLeft: Story = {
  args: {
    checked: false,
    label: '왼쪽 라벨',
    labelPosition: 'left',
  },
};

export const BoxChecked: Story = {
  args: {
    checked: true,
  },
};

export const BoxUnchecked: Story = {
  args: {
    checked: false,
  },
};

export const BoxDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};
