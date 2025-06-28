import { getStory } from '@/api/stories/api';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ storyId: string }>;
}): Promise<Metadata> => {
  const { storyId } = await params;
  const storiesData = await getStory(storyId);

  return {
    title: `${storiesData.title} - WeWrite`,
    description: `${storiesData.title} 스토리를 읽고, 다양한 사람들의 참여로 완성된 이야기를 경험해보세요.`,
  };
};

const LibraryDetailLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default LibraryDetailLayout;
