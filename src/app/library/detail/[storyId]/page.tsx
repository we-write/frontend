'use client';

import { useParams } from 'next/navigation';
import { useRef } from 'react';
import PaginatedContentViewer from '@/app/library/detail/[storyId]/_components/PaginatedContentViewer';
import { PaginationControl } from '@/app/library/detail/[storyId]/_components/PaginationControl';
import { TeamUserRole } from '@/types/teamUserRole';
import WritableUserModal from './_components/WritableUserModal';
import { StoryWriteOrApproveModalProviders } from '@/providers/StoryWriteOrApproveModalProviders';
import StoryModalTriggerButton from '@/app/library/detail/[storyId]/_components/StoryModalTriggerButton';
import useGetUserRole from '@/hooks/api/supabase/story-collaborators/useGetUserRole';
import ContentCover from './_components/ContentCover';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import { useGetStory } from '@/hooks/api/supabase/stories/useGetStory';
import { useGetContent } from '@/hooks/api/supabase/contents/useGetContent';
import { useSearchParams } from 'next/navigation';
import SideButtonGroup from './_components/SideButtonGroup';
import useCurrentViewPort from '@/hooks/useCurrentViewPort';
import usePaginateContentsByViewport from '@/app/library/detail/[storyId]/hooks/usePaginateContentsByViewport';

const StoryDetail = () => {
  const { storyId } = useParams();
  const storyIdAsString = storyId as string;

  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const storyPageNumber = pageParam ? parseInt(pageParam, 10) : 1;

  const { data: story } = useGetStory(storyIdAsString);
  const { myInfo } = useAuth();

  const { data: userRoleData } = useGetUserRole({
    userId: myInfo?.id,
    storyId: storyIdAsString,
  });
  const currentUserRole = userRoleData ? userRoleData.role : 'GUEST';

  const { data: contents } = useGetContent({
    storyId: storyIdAsString,
  });
  const { viewportWidth: currentViewPortWidth } = useCurrentViewPort();
  const paginatedContents = usePaginateContentsByViewport({
    contents,
    currentViewPortWidth,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const renderWritableUserModalByRole = (role: TeamUserRole) => {
    switch (role) {
      case 'GUEST':
        return null;
      case 'LEADER':
      case 'MEMBER':
        return (
          <>
            <StoryModalTriggerButton storyId={storyIdAsString} />
            <WritableUserModal
              currentStoryId={storyIdAsString}
              {...(myInfo && { currentUserId: myInfo.id })}
              approvalPeriod={story?.approval_period ?? 0}
              approvedCount={story?.approved_count ?? 0}
              maxContentLength={story?.max_length ?? 0}
            />
          </>
        );
      default:
        return null;
    }
  };

  // MEMO: 타입 안정성 개선 필요
  if (!story) return null;

  return (
    <div className="h-screen w-screen bg-white">
      <div className="flex-center relative h-full w-full flex-col">
        {storyPageNumber === 0 ? (
          <>
            <SideButtonGroup />
            <ContentCover story={story} />
          </>
        ) : (
          <PaginatedContentViewer
            ref={containerRef}
            pageData={paginatedContents[storyPageNumber - 1]}
          />
        )}

        <PaginationControl
          storyId={storyIdAsString}
          title={story?.title}
          page={storyPageNumber}
          totalPage={paginatedContents.length}
        />

        <StoryWriteOrApproveModalProviders>
          {renderWritableUserModalByRole(currentUserRole)}
        </StoryWriteOrApproveModalProviders>
      </div>
    </div>
  );
};

export default StoryDetail;
