'use client';

import SideButtonGroup from './SideButtonGroup';
import Image from 'next/image';
import { DBStoryResponse } from '@/types/dbStory';

const ContentCover = ({ story }: { story: DBStoryResponse }) => {
  return (
    <div className="flex-center h-[80dvh] w-[95%] flex-col">
      <div className="flex w-full justify-start">
        <SideButtonGroup />
      </div>
      <div className="relative aspect-square max-h-[50vh] min-h-[200px] w-[80%] max-w-[500px] min-w-[200px]">
        {story?.cover_image_url && (
          <Image
            src={story?.cover_image_url ?? ''}
            alt={story?.title ?? '스토리 이미지'}
            fill
            className="rounded-lg object-contain"
            priority
          />
        )}
      </div>
      <div className="mt-8 flex h-[100px] items-center justify-center">
        <strong className="text-2xl font-bold text-gray-800">
          {story?.title}
        </strong>
      </div>
    </div>
  );
};
export default ContentCover;
