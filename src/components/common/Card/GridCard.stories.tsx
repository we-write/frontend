import type { Meta, StoryObj } from '@storybook/react';
import GridCard from './GridCard';
import { GridCardProps } from '@/components/common/Card/type';

const meta: Meta<typeof GridCard> = {
  title: 'Common/GridCard',
  component: GridCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GridCard>;

export const ShortContent: Story = {
  args: {
    href: 'social',
    pageId: '1',
    tag: (
      <span className="bg-write-success rounded px-2 py-1 text-xs">New</span>
    ),
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    textContent: {
      title: '짧은 제목',
      genre: '판타지',
      description: '짧은 설명이 들어가는 description 영역입니다.',
    },
    isCardDataLoading: false,
  } as GridCardProps,
};

export const LongContent: Story = {
  args: {
    href: 'social',
    pageId: '3',
    tag: <span className="rounded bg-yellow-200 px-2 py-1 text-xs">Top</span>,
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '긴 설명 이미지',
    },
    textContent: {
      title: '제목이 최대 글자 수를 초과할 경우입니다.',
      genre: '판타지',
      description:
        '이 설명은 지정된 최대 줄 수를 초과하기 때문에 초과된 설명 description을 자르고 line-clamp 스타일을 적용하여 화면에 줄임표(...)로 표시되어야 하는지 확인하기 위한 테스트용 문장입니다.',
    },
    isCardDataLoading: false,
  } as GridCardProps,
};

export const SkeletonUI: Story = {
  args: {
    href: 'social',
    pageId: '1',
    tag: undefined,
    image: {
      src: '',
      alt: '',
    },
    textContent: {
      title: '',
      genre: '',
      description: '',
    },
    isCardDataLoading: true,
  } as GridCardProps,
};
