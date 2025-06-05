'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ContentComponent from '@/components/feature/library/ContentComponent';
import { PaginationControl } from '@/components/feature/library/PaginationControl';
import Image from 'next/image';
import { SideButtonGroup } from '../SideButtonGroup';

export interface Content {
  content_id: string;
  content: string;
}
const StoryDetailPage = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window?.innerWidth < 640);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { data: story } = useGetStory(id as string);
  const [storyPageNumber, setStoryPageNumber] = useState(0);
  const { data: contents } = useGetContent({
    id: id as string,
    page: storyPageNumber,
    limit: 10,
  });

  const currentContents = contents?.data || [];

  const ITEMS_PER_PAGE = isMobile ? 10 : 5;
  const totalPage = Math.ceil(
    (contents?.count ?? 0) / (isMobile ? ITEMS_PER_PAGE : ITEMS_PER_PAGE * 2)
  );

  const leftPageContents = isMobile
    ? currentContents
    : currentContents.slice(0, ITEMS_PER_PAGE);
  const rightPageContents = isMobile
    ? currentContents.slice(1, 2)
    : currentContents.slice(ITEMS_PER_PAGE, currentContents.length);

  return (
    <div className="flex min-h-full w-full flex-col items-center bg-white">
      {storyPageNumber === 0 ? (
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
      ) : (
        <div className="relative flex h-[80dvh] w-[95%] max-w-[1600px] flex-col md:h-[740px]">
          <div className="relative mt-8 flex-1 md:flex">
            <section className="h-full w-full overflow-y-auto px-8 py-8 md:w-1/2 md:bg-white">
              <ContentComponent contents={leftPageContents} />
            </section>

            <section className="absolute top-0 right-0 hidden h-full w-1/2 overflow-y-auto px-8 py-8 md:block">
              <ContentComponent contents={rightPageContents} />
            </section>
          </div>
        </div>
      )}
      <PaginationControl
        title={story?.title}
        page={storyPageNumber}
        totalPage={totalPage}
        setPage={setStoryPageNumber}
      />
    </div>
  );
};

export default StoryDetailPage;
