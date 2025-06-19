import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { GET_SOCIAL_LIST_INIT_FILTER, getSocialList } from '@/api/social/api';
import { getQueryClient } from '@/lib/queryClinet';
import SocialListContainer from './_components/SocialListContainer';
import { BookOpen } from 'lucide-react';

const Social = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.SOCIAL],
    queryFn: () => getSocialList(GET_SOCIAL_LIST_INIT_FILTER),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-center gap-5 px-3 py-8 md:px-7">
        <h1 className="text-xl leading-tight font-medium text-gray-900 md:text-[1.5rem]">
          모두와 만들어 나가는 상상의 여정
          <span className="text-write-sub-title mt-1 block text-[2.4rem] font-extrabold">
            함께 쓰고, 함께 완성하는 이야기
            <span className="text-write-sub-title ml-2 inline-block pt-1.5 align-top">
              <BookOpen className="h-6.5 w-6.5" aria-hidden="true" />
            </span>
          </span>
        </h1>
        <p className="text-lg font-medium text-gray-400 md:text-lg">
          지금, 당신의 상상을 더해보세요
        </p>
      </div>
      <SocialListContainer />
    </HydrationBoundary>
  );
};

export default Social;
