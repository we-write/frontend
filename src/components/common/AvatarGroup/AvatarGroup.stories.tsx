import type { Meta, StoryObj } from '@storybook/react';
import AvatarGroup from '@/components/common/AvatarGroup/AvatarGroup';
import { AvatarGroupProps } from '@/components/common/AvatarGroup/type';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Common/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

export const IsAvatarOverflow: Story = {
  args: {
    imageUrls: [
      'https://cdn.pixabay.com/photo/2017/08/08/14/32/adler-2611528_1280.jpg',
      'https://cdn.pixabay.com/photo/2024/08/05/13/17/dog-8946829_1280.jpg',
      'https://cdn.pixabay.com/photo/2022/08/12/12/25/vulture-7381642_1280.jpg',
      'https://cdn.pixabay.com/photo/2019/10/30/16/19/fox-4589927_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/04/03/00/16/shire-horse-2197214_1280.jpg',
      'https://cdn.pixabay.com/photo/2023/04/27/10/22/cat-7954262_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/10/21/22/58/animal-2876068_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277417_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/04/09/09/01/owl-3303542_1280.jpg',
    ],
  } as AvatarGroupProps,
};

export const IsAvatarWithinDisplayLimit: Story = {
  args: {
    imageUrls: [
      'https://cdn.pixabay.com/photo/2017/08/08/14/32/adler-2611528_1280.jpg',
      'https://cdn.pixabay.com/photo/2024/08/05/13/17/dog-8946829_1280.jpg',
      'https://cdn.pixabay.com/photo/2022/08/12/12/25/vulture-7381642_1280.jpg',
    ],
  } as AvatarGroupProps,
};

export const HasImageLoadFailed: Story = {
  args: {
    imageUrls: ['', 'https://www.naver.com', 'undefined'],
  } as AvatarGroupProps,
};

export const OneImageLoadFailed: Story = {
  args: {
    imageUrls: [
      'https://cdn.pixabay.com/photo/2017/08/08/14/32/adler-2611528_1280.jpg',
      'https://cdn.pixabay.com/photo/2024/08/05/13/17/dog-8946829_1280.jpg',
      'undefined',
      'https://cdn.pixabay.com/photo/2022/08/12/12/25/vulture-7381642_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/04/03/00/16/shire-horse-2197214_1280.jpg',
      'https://cdn.pixabay.com/photo/2023/04/27/10/22/cat-7954262_1280.jpg',
    ],
  } as AvatarGroupProps,
};
