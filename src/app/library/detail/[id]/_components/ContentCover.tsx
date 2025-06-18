'use client';

import Image from 'next/image';
import { DBStoryResponse } from '@/types/dbStory';

const ContentCover = ({ story }: { story: DBStoryResponse }) => {
  return (
    <div className="flex-center h-[80dvh] w-[95%] flex-col">
      <div className="relative aspect-square max-h-[50vh] min-h-[200px] w-[80%] max-w-[500px] min-w-[200px]">
        {story.cover_image_url && (
          <Image
            src={story.cover_image_url ?? ''}
            alt={story.title ?? '스토리 이미지'}
            fill
            className="rounded-lg object-contain"
            priority
          />
        )}
      </div>
      <h1 className="mt-4 text-3xl font-semibold text-gray-800 md:text-[2rem]">
        {story.title}
      </h1>
    </div>
  );
};
export default ContentCover;
