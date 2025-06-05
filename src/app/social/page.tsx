import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { GET_SOCIAL_LIST_INIT_FILTER, getSocialList } from '@/api/social/api';
import { getQueryClient } from '@/lib/queryClinet';
import SocialListContainer from './SocialListContainer';

const Social = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.SOCIAL],
    queryFn: () => getSocialList(GET_SOCIAL_LIST_INIT_FILTER),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
        다른 사람들과 함께 만들어가는
        <br />
        <span className="text-write-main">특별한 이야기</span>
      </h1>
      <p className="mb-8 text-xl font-medium text-gray-400 md:text-2xl">
        당신의 상상력으로 이야기를 완성해보세요
      </p>
      <SocialListContainer />
    </HydrationBoundary>
  );
};

export default Social;
