'use client';

import GridCard from '@/components/common/Card/GridCard';
import Observer from '@/components/common/Observer/Observer';
import { useInfiniteStories } from '@/hooks/stories/useInfiniteStories';
import htmlToString from '@/utils/htmlToString';

const limit = 12;
const keyword = '';
const LibraryListGrid = () => {
  const {
    data: stories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStories(keyword, limit);

  const flatStories = stories?.pages.flat() || [];
  if (isLoading)
    return (
      <div className="gap-2: grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <GridCard
            key={index}
            pageId="1"
            image={{
              src: '',
              alt: '',
            }}
            textContent={{
              title: '',
              genre: '',
              description: '',
            }}
            isCardDataLoading={true}
          />
        ))}
      </div>
    );

  if (!stories || flatStories.length === 0)
    return (
      <div className="flex-center text-base text-gray-500">
        <p>아직 스토리가 없어요</p>
      </div>
    );

  return (
    <>
      <div className="gap-2: grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-4">
        {flatStories?.map((story) => (
          <GridCard
            key={story.story_id}
            pageId={story.story_id}
            image={{
              src:
                story.cover_image_url ||
                'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
              alt: `${story.title || '대체'} 커버 이미지`,
            }}
            textContent={{
              title: story.title,
              genre: story.genre,
              description: htmlToString(story.summary),
            }}
            isCardDataLoading={false}
          />
        ))}
      </div>

      <Observer
        enabled={hasNextPage && !isFetchingNextPage}
        onIntersect={fetchNextPage}
        threshold={0.1}
      />
    </>
  );
};

export default LibraryListGrid;
