'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentComponent from '@/components/feature/library/ContentComponent';
import { PaginationControl } from '@/components/feature/library/PaginationControl';
import { TeamUserRole } from '@/types/teamUserRole';
import WritableUserModal from './_components/WritableUserModal';

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
  const [storyPageNumber, setStoryPageNumber] = useState(1);
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

  // MEMO : 임시 유저 역할
  const userRole = 'MEMBER';

  const renderWritableUserModalByRole = (role: TeamUserRole) => {
    switch (role) {
      case 'GUEST':
        return null;
      case 'LEADER':
      case 'MEMBER':
        return (
          <WritableUserModal
            currentChapter={currentContents?.length ?? 0}
            approvalPeriod={story?.approval_period ?? 0}
            approvedCount={story?.approved_count ?? 0}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-50 flex min-h-full w-full flex-col items-center">
      <div className="flex h-[80dvh] w-[95%] max-w-[1600px] flex-col md:h-[740px]">
        <div className="mt-8 flex-1 md:flex">
          <section className="h-full w-full overflow-y-auto px-8 py-8 md:w-1/2 md:bg-white">
            <ContentComponent contents={leftPageContents} />
          </section>

          <div className="hidden w-[1px] bg-gray-200 md:block" />

          <section className="hidden h-full w-1/2 overflow-y-auto bg-white px-8 py-8 md:block">
            <ContentComponent contents={rightPageContents} />
          </section>
        </div>

        <PaginationControl
          title={story?.title}
          page={storyPageNumber}
          totalPage={totalPage}
          setPage={setStoryPageNumber}
        />
      </div>

      {renderWritableUserModalByRole(userRole)}
    </div>
  );
};

export default StoryDetailPage;
