'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import ContentComponent from '@/components/feature/library/ContentComponent';
import { PaginationControl } from '@/components/feature/library/PaginationControl';
export interface Content {
  content_id: string;
  content: string;
}
const StoryDetailPage = () => {
  const { id } = useParams();
  const { data: story } = useGetStory(id as string);
  const [page, setPage] = useState(1);
  const { data: contents } = useGetContent({
    id: id as string,
    page: page,
    limit: 10,
  });

  const currentContents = contents?.data || [];

  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil((contents?.count ?? 0) / (ITEMS_PER_PAGE * 2));

  const leftPageContents = currentContents.slice(0, ITEMS_PER_PAGE);
  const rightPageContents = currentContents.slice(
    ITEMS_PER_PAGE,
    currentContents.length
  );

  return (
    <div className="flex min-h-full w-full flex-col items-center bg-white">
      <div className="relative flex h-[740px] w-[95%] max-w-[1600px] flex-col">
        <div className="relative mt-8 flex-1 md:flex">
          <section className="relative h-[700px] w-full overflow-y-auto border-r border-gray-200 px-8 py-8 md:w-1/2">
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
