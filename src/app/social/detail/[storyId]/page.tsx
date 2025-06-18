import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SocialDetailPageParams } from './type';
import SocialOverView from './_components/SocialOverView';
import StorySummary from './_components/StorySummary';
import { getMyInfoOnServer } from '@/providers/auth-provider/authProviderUtil';
import { getStory } from '@/api/stories/api';
import { getStoryCollaborators } from '@/api/story-collaborators/api';

const SocialDetail = async ({
  params,
}: {
  params: Promise<SocialDetailPageParams>;
}) => {
  const { storyId } = await params;
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
            })}
          {...(isSignIn &&
            myInfo && {
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
