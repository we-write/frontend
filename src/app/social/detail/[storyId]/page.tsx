import {
  getSocialDetail,
  getSocialParticipants,
} from '@/api/social-detail/api';
import SocialOverView from '@/app/social/detail/[storyId]/SocialOverView';
import { SocialDetailPageParams } from '@/app/social/detail/[storyId]/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const SocialDetail = async ({
  params,
}: {
  params: Promise<SocialDetailPageParams>;
}) => {
  const { storyId } = await params;
  if (!storyId || isNaN(Number(storyId))) {
    throw new Error('잘못된 요청입니다.');
  }
  const numericStoryId = Number(storyId);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.SOCIAL_DETAIL, numericStoryId],
    queryFn: () => getSocialDetail({ storyId: numericStoryId }),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS, numericStoryId],
    queryFn: () => getSocialParticipants({ storyId: numericStoryId }),
  });

  return (
    <div className="flex justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialOverView currentStoryId={numericStoryId} />
      </HydrationBoundary>
    </div>
  );
};

export default SocialDetail;
