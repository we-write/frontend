import type { Meta, StoryObj } from '@storybook/react';
import TextEditor from '@/components/common/TextEditor/TextEditor';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta: Meta<typeof TextEditor> = {
  title: 'common/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextEditor>;

const EXAMPLE_HTML_TEXT = `
  <p><span style="font-size: 48px; color: pink;"><strong>❤로맨스 소설 <오만과 편견>을 만들어 보실 분들 모집합니다!❤</strong></span></p>
  <br />
  <p><span style="font-size: 28px">기간은 1달! 분량은 챕터5 정도로 생각하고 있습니다.</span></p>
  <p><span style="font-size: 28px">어렸을 적 로맨스 소설을 보고 심쿵했던 경험이 있다면 누구나 환영입니다!</span></p>
  <p><span style="font-size: 20px; color: gray; text-decoration: line-through;">T보다는 F분들 많이 와주셨으면 좋겠습니다(장난입니다😙)</span></p>
  <br />
  <p><span style="font-size: 28px">목표는 💎WeWrite 인기 소설 Top10💎 입니다. 많은 분들의 참여 기다리겠습니다 </span></p>
`;

export const Default: Story = {
  render: () => <TextEditor />,
};

export const Editor400pxHeight: Story = {
  render: () => <TextEditor editorHeight="400px" />,
};

export const Editor900pxHeight: Story = {
  render: () => <TextEditor editorHeight="900px" />,
};

export const ReadOnlyEditor: Story = {
  render: () => <TextEditor isReadOnly={true} />,
};

export const ReadOnlyWithInitialContent: Story = {
  render: () => (
    <TextEditor isReadOnly={true} initialContent={EXAMPLE_HTML_TEXT} />
  ),
};

export const MoblieView: Story = {
  render: () => <TextEditor />,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
};
