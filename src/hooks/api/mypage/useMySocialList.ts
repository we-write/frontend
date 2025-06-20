import { getJoinedSocialList } from '@/api/mypage/api';
import { getSocialList } from '@/api/social/api';
import { TabType } from '@/app/mypage/_components/my-social-list/type';
import { useInfiniteQuery } from '@tanstack/react-query';

const FETCH_LIMIT = 12;

export const useMySocialList = (activeTab: TabType, userId?: number) => {
  return useInfiniteQuery({
    queryKey: ['mySocialList', activeTab, userId],
    enabled: !!userId,
    queryFn: async ({ pageParam = 0 }) => {
      const filter = {
        limit: FETCH_LIMIT,
        offset: pageParam,
        ...(activeTab === 'created' && { createdBy: Number(userId) }),
      };

      return activeTab === 'joined'
        ? await getJoinedSocialList(filter)
        : await getSocialList(filter);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === FETCH_LIMIT
        ? allPages.length * FETCH_LIMIT
        : undefined,
    initialPageParam: 0,
  });
};
