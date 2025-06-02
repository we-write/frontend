'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
interface Content {
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

  const PAGE_LIMIT = 5;
  const totalPage = Math.ceil((contents?.count ?? 0) / (PAGE_LIMIT * 2));

  const leftPageContents = currentContents.slice(0, PAGE_LIMIT);
  const rightPageContents = currentContents.slice(
    PAGE_LIMIT,
    currentContents.length
  );

  return (
    <div className="flex min-h-full w-full flex-col items-center bg-white">
      <div className="relative flex h-[740px] w-[95%] max-w-[1600px] flex-col">
        <div className="relative mt-8 flex-1 border-x border-gray-200 md:flex">
          <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-gray-200 md:block" />
          <div className="relative h-[740px] w-full overflow-y-auto border-r border-gray-200 px-8 py-8 md:w-1/2">
            <div className="text-sm text-gray-600 md:text-base">
              {leftPageContents.map((content: Content) => (
                <div className="mb-4" key={content.content_id}>
                  {content.content}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-0 right-0 hidden h-full w-1/2 overflow-y-auto px-8 py-8 md:block">
            <div className="text-sm text-gray-600 md:text-base">
              {rightPageContents.map((content: Content) => (
                <div className="mb-4" key={content.content_id}>
                  {content.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4">
          <div>{story?.title}</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-400">
              {page} / {totalPage}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPage}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;
