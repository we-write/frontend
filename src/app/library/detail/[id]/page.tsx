'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ContentComponent from '@/components/feature/library/ContentComponent';
import { PaginationControl } from '@/components/feature/library/PaginationControl';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
// import { ChevronLeft, Heart } from 'lucide-react';
export interface Content {
  content_id: string;
  content: string;
}
const StoryDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { data: story } = useGetStory(id as string);
  console.log(story);
  const [page, setPage] = useState(0);
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
      {page === 0 ? (
        <div className="flex-center h-[80dvh] w-[95%] flex-col">
          <div className="absolute top-20 left-4 flex flex-row md:top-20 md:left-40 md:flex-col md:gap-4">
            <button
              className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
              onClick={() => router.push('/library')}
            >
              <ChevronLeft className="text-write-main h-6 w-6" />
            </button>
            {/* <button
              className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
              onClick={() => router.push('/library')}
            >
              <Heart className="text-write-main h-6 w-6" />
            </button> */}
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
            <section className="relative h-[700px] w-full overflow-y-auto border-r border-gray-200 px-8 py-8 sm:h-[600px] md:w-1/2">
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
        page={page}
        totalPage={totalPage}
        setPage={setPage}
      />
    </div>
  );
};

export default StoryDetailPage;
