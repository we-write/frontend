import {
  getSocialDetail,
  getSocialParticipants,
  getSummary,
} from '@/api/social-detail/api';
import SocialOverView from '@/app/social/detail/[socialId]/SocialOverView';
import { SocialDetailPageParams } from '@/app/social/detail/[socialId]/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import StorySummary from '@/app/social/detail/[socialId]/StorySummary';

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

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SocialOverView currentSocialId={numericStoryId} />
        <StorySummary currentSocialId={numericStoryId} />
      </HydrationBoundary>
    </div>
  );
};

export default SocialDetail;
