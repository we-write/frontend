import {
  getMyCreatedSocialList,
  getMyJoinedSocialList,
  getMyLikedSocialList,
} from '@/api/mypage/api';
import { TabType } from '@/app/mypage/_components/my-social-list/type';
import { useInfiniteQuery } from '@tanstack/react-query';

const FETCH_GET_ITEM_LIMIT = 12;

export const useMySocialList = (activeTab: TabType, userId: number) => {
  return useInfiniteQuery({
    queryKey: ['mySocialList', activeTab, userId],
    enabled: !!userId,
    queryFn: async ({ pageParam = 0 }) => {
      return activeTab === 'joined'
        ? await getMyJoinedSocialList({
            userId,
            offset: pageParam,
            limit: FETCH_GET_ITEM_LIMIT,
          })
        : activeTab === 'created'
          ? await getMyCreatedSocialList({
              userId,
              offset: pageParam,
              limit: FETCH_GET_ITEM_LIMIT,
            })
          : await getMyLikedSocialList({
              userId,
              offset: pageParam,
              limit: FETCH_GET_ITEM_LIMIT,
            });
    },

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < FETCH_GET_ITEM_LIMIT) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
};
