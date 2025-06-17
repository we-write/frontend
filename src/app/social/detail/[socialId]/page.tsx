import {
  getSocialDetail,
  getSocialParticipants,
  getStoryId,
  getSummary,
  getUserRole,
} from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { GetStoryIdResponse } from '@/api/social-detail/type';
import { SocialDetailPageParams } from './type';
import NotFoundRedirect from './_components/NotFoundRedirect';
import SocialOverView from './_components/SocialOverView';
import StorySummary from './_components/StorySummary';
import { getMyInfoOnServer } from '@/providers/auth-provider/authProviderUtil';

const SocialDetail = async ({
  params,
}: {
  params: Promise<SocialDetailPageParams>;
}) => {
  const { socialId } = await params;
  if (!socialId || isNaN(Number(socialId))) {
    throw new Error('잘못된 요청입니다.');
  }
  const numericStoryId = Number(socialId);
  const queryClient = getQueryClient();
  const storyId = await getStoryId({ socialId: numericStoryId });
  if (storyId === 'not-found') {
    return <NotFoundRedirect />;
  }
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.SOCIAL_DETAIL, numericStoryId],
    queryFn: () => getSocialDetail({ socialId: numericStoryId }),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS, numericStoryId],
    queryFn: () => getSocialParticipants({ socialId: numericStoryId }),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_SUMMARY, numericStoryId],
    queryFn: () => getSummary({ socialId: numericStoryId }),
  });

  const { isSignIn, myInfo } = await getMyInfoOnServer();

  if (isSignIn && myInfo) {
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.GET_USER_ROLE, socialId],
      queryFn: () =>
        getUserRole({
          userId: myInfo.id,
          storyId: (storyId as GetStoryIdResponse).story_id,
        }),
    });
  }

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialOverView
          currentSocialId={numericStoryId}
          {...(isSignIn &&
            myInfo && {
              currentUserId: myInfo.id,
            })}
          {...(isSignIn &&
            myInfo && {
              currentUserName: myInfo.name,
            })}
          {...(storyId! && { currentStoryId: storyId.story_id })}
        />
        <StorySummary
          currentSocialId={numericStoryId}
          {...(isSignIn &&
            myInfo && {
              currentUserId: myInfo.id,
            })}
          {...(storyId! && { currentStoryId: storyId.story_id })}
        />
      </HydrationBoundary>
    </div>
  );
};

export default SocialDetail;
