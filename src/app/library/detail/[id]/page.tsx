'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ContentComponent from '@/components/feature/library/ContentComponent';
import { PaginationControl } from '@/components/feature/library/PaginationControl';
export interface Content {
  content_id: string;
  content: string;
}
const StoryDetailPage = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, [window.innerWidth]);
  const { data: story } = useGetStory(id as string);
  const [page, setPage] = useState(1);
  const { data: contents } = useGetContent({
    id: id as string,
    page: page,
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
      <div className="relative flex h-[80dvh] w-[95%] max-w-[1600px] flex-col md:h-[740px]">
        <div className="relative mt-8 flex-1 md:flex">
          <section className="relative h-[700px] w-full overflow-y-auto border-r border-gray-200 px-8 py-8 sm:h-[600px] md:w-1/2">
            <ContentComponent contents={leftPageContents} />
          </section>

          <section className="absolute top-0 right-0 hidden h-full w-1/2 overflow-y-auto px-8 py-8 md:block">
            <ContentComponent contents={rightPageContents} />
          </section>
        </div>

        <PaginationControl
          title={story?.title}
          page={page}
          totalPage={totalPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default StoryDetailPage;
