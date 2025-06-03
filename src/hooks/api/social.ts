import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/queryKey';
import { GetSocialListParams } from '@/api/social/type';
import { SocialResponse } from '@/api/social/type';
import { FETCH_GET_ITEM_LIMIT, getSocialList } from '@/api/social/api';

export const useGetSocialList = (filter: GetSocialListParams) => {
  return useInfiniteQuery<SocialResponse[]>({
    queryKey: [QUERY_KEY.SOCIAL, filter],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await getSocialList({
          ...filter,
          offset: pageParam as number,
          limit: FETCH_GET_ITEM_LIMIT,
        });
        return response;
      } catch (error) {
        console.error('소셜 데이터 조회 실패:', error);
        throw error;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < FETCH_GET_ITEM_LIMIT) return;
      return allPages.length * FETCH_GET_ITEM_LIMIT;
    },
  });
};
