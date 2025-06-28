import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SocialDetailPageParams } from '@/app/social/detail/[storyId]/type';
import SocialOverView from '@/app/social/detail/[storyId]/_components/SocialOverView';
import StorySummary from '@/app/social/detail/[storyId]/_components/StorySummary';
import getMyInfoOnServer from '@/providers/auth-provider/getMyInfoOnServer';
import { checkStoryExists, getStory } from '@/api/stories/api';
import { getStoryCollaborators } from '@/api/story-collaborators/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ storyId: string }>;
}): Promise<Metadata> => {
  const { storyId } = await params;
  const storiesData = await getStory(storyId);

  return {
    title: `${storiesData.title} - WeWrite`,
    description: `${storiesData.title} 스토리 그룹에 대한 모집 인원, 장르, 소개글 등 다양한 정보를 확인할 수 있습니다. `,
  };
};

const SocialDetail = async ({
  params,
}: {
  params: Promise<SocialDetailPageParams>;
}) => {
  const { storyId } = await params;

  const storyExists = await checkStoryExists(storyId);
  if (!storyExists) return notFound();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_STORY_COLLABORATORS, storyId],
    queryFn: () => getStoryCollaborators(storyId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_STORIES, storyId],
    queryFn: () => getStory(storyId),
  });

  const { isSignIn, myInfo } = await getMyInfoOnServer();

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialOverView
          currentStoryId={storyId}
          {...(isSignIn &&
            myInfo && {
              currentUserId: myInfo.id,
              currentUserName: myInfo.name,
            })}
        />
        <StorySummary
          currentStoryId={storyId}
          {...(isSignIn &&
            myInfo && {
              currentUserId: myInfo.id,
            })}
        />
      </HydrationBoundary>
    </div>
  );
};

export default SocialDetail;
