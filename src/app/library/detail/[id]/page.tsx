'use client';

import { useGetContent } from '@/hooks/stories/useGetContent';
import { useGetStory } from '@/hooks/stories/useGetStory';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContentComponent from '@/components/feature/library/ContentComponent';
import { PaginationControl } from '@/components/feature/library/PaginationControl';
import { TeamUserRole } from '@/types/teamUserRole';
import WritableUserModal from './_components/WritableUserModal';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import { StoryWriteOrApproveModalProviders } from '@/providers/StoryWriteOrApproveModalProviders';
import StoryModalTriggerButton from '@/app/library/detail/[id]/_components/ModalTriggerButton';
import useGetUserRole from '@/hooks/api/teams/useGetUserRole';

const StoryDetailPage = () => {
  const { id } = useParams();
  const storyId = id as string;
  const [isMobile, setIsMobile] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [storyPageNumber, setStoryPageNumber] = useState(1);
  const handleResize = () => {
    setIsMobile(window?.innerWidth < 640);
  };
  const { data: userInfo } = useGetMyInfo(isSignIn);
  const { data: userRoleData } = useGetUserRole({
    userId: userInfo?.id,
    storyId: storyId,
  });
  const { data: story } = useGetStory(storyId);
  const { data: contents } = useGetContent({
    id: storyId,
    page: storyPageNumber,
    limit: 10,
  });

  const currentUserRole = userRoleData ? userRoleData.role : 'GUEST';

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkSignInStatus = () => {
      const localStorageData = localStorage.getItem('isSignIn') === 'true';
      setIsSignIn(localStorageData && !!userInfo);
    };

    checkSignInStatus();
  }, [userInfo]);

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

  const renderWritableUserModalByRole = (role: TeamUserRole) => {
    switch (role) {
      case 'GUEST':
        return null;
      case 'LEADER':
      case 'MEMBER':
        return (
          <>
            <StoryModalTriggerButton />
            <WritableUserModal
              currentChapter={currentContents?.length ?? 0}
              currentStoryId={storyId}
              {...(userInfo && { currentUserId: userInfo.id })}
              approvalPeriod={story?.approval_period ?? 0}
              approvedCount={story?.approved_count ?? 0}
            />
          </>
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

      <StoryWriteOrApproveModalProviders>
        {renderWritableUserModalByRole(currentUserRole)}
      </StoryWriteOrApproveModalProviders>
    </div>
  );
};

export default StoryDetailPage;
