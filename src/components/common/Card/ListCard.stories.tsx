import type { Meta, StoryObj } from '@storybook/react';
import ListCard from '@/components/common/Card/ListCard';
import { ListCardProps } from '@/components/common/Card/type';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta: Meta<typeof ListCard> = {
  title: 'Common/ListCard',
  component: ListCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ListCard>;

export const InProgressStory: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="text-write-main rounded-3xl bg-green-50 px-3 py-1.5 text-sm font-semibold">
        진행중인 스토리
      </span>
    ),
    textContent: {
      title: '해리포터와 마법사의 돌 해리포터와 마법사의 돌',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: false,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,
};

export const CompletedStory: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="rounded-3xl bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-500">
        종료된 스토리
      </span>
    ),
    textContent: {
      title: '해리포터와 마법사의 돌',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: true,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,
};

export const LongTitle: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="text-write-main rounded-3xl bg-green-50 px-3 py-1.5 text-sm font-semibold">
        진행중인 스토리
      </span>
    ),
    textContent: {
      title:
        '제목이 최대 글자 수를 초과할 경우 초과한 글자를 자르고, 끝 부분을 줄임표(...)로 표시해줍니다.',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: false,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,
};

export const CanceledStory: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="text-write-main rounded-3xl bg-green-50 px-3 py-1.5 text-sm font-semibold">
        진행중인 스토리
      </span>
    ),
    textContent: {
      title: '해리포터와 마법사의 돌',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: false,
    isCanceled: true,
    handleButtonClick: () => {},
  } as ListCardProps,
};

export const SkeletonUI: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: undefined,
    textContent: {
      title: '',
      genre: '',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '',
    isCardDataLoading: true,
    isCompletedStory: true,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,
};

export const MobileDeafult: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="text-write-main rounded-3xl bg-green-50 px-3 py-1.5 text-sm font-semibold">
        진행중인 스토리
      </span>
    ),
    textContent: {
      title: '해리포터와 마법사의 돌',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: false,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,

  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
};

export const MobileLongTitle: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="text-write-main rounded-3xl bg-green-50 px-3 py-1.5 text-sm font-semibold">
        진행중인 스토리
      </span>
    ),
    textContent: {
      title:
        '제목이 최대 글자 수를 초과할 경우 초과한 글자를 자르고, 끝 부분을 줄임표(...)로 표시해줍니다.',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: false,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,

  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
};

export const MobileCancledStory: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: (
      <span className="text-write-main rounded-3xl bg-green-50 px-3 py-1.5 text-sm font-semibold">
        진행중인 스토리
      </span>
    ),
    textContent: {
      title: '해리포터와 마법사의 돌',
      genre: '판타지',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '2025-06-30T05:21:34.319Z',
    isCardDataLoading: false,
    isCompletedStory: false,
    isCanceled: true,
    handleButtonClick: () => {},
  } as ListCardProps,

  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
};

export const MobileSkeletonUI: Story = {
  args: {
    pageId: '1',
    image: {
      src: 'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
      alt: '테스트 이미지',
    },
    chip: undefined,
    textContent: {
      title: '',
      genre: '',
      participantCount: 5,
      capacity: 10,
    },
    endDate: '',
    isCardDataLoading: true,
    isCompletedStory: true,
    isCanceled: false,
    handleButtonClick: () => {},
  } as ListCardProps,

  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
  },
};
