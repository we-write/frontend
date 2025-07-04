import { LibraryListGridProps } from '@/app/library/_components/type';
import GridCard from '@/components/common/Card/GridCard';
import { APP_ROUTES } from '@/constants/appRoutes';
import htmlToString from '@/utils/htmlToString';

const PLACEHOLDER_COVER_IMAGE =
  'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75';

const LibraryListGrid = ({
  stories,
  imagePriorityThershold,
}: LibraryListGridProps) => {
  return (
    <div className="gap-2: grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {stories.map((story, index) => (
        <GridCard
          key={story.story_id}
          href={`${APP_ROUTES.library}/detail/${story.story_id}/?page=0`}
          image={{
            src: story.cover_image_url || PLACEHOLDER_COVER_IMAGE,
            alt: `${story.title || '대체'} 커버 이미지`,
            index: index,
            priorityThreshold: imagePriorityThershold,
          }}
          textContent={{
            title: story.title,
            genre: story.genre,
            description:
              htmlToString(story.summary ?? '') ||
              '모임장이 소개글을 작성하고 있어요!',
          }}
          isCardDataLoading={false}
        />
      ))}
    </div>
  );
};

export default LibraryListGrid;
