import { TabType } from '@/app/mypage/_components/my-social-list/type';
import {
  getMyCreatedSocialList,
  getMyJoinedSocialList,
} from '@/lib/supabase/repositories/story_collaborators';
import { getMyLikedSocialList } from '@/lib/supabase/repositories/story_likes';
import { useInfiniteQuery } from '@tanstack/react-query';

const FETCH_GET_ITEM_LIMIT = 12;

export const useMySocialList = (activeTab: TabType, userId?: number) => {
  return useInfiniteQuery({
    queryKey: ['mySocialList', activeTab, userId],
    enabled: !!userId,
    queryFn: async ({ pageParam = 0 }) => {
      if (!userId) return [];

      const params = { userId, offset: pageParam, limit: FETCH_GET_ITEM_LIMIT };

      switch (activeTab) {
        case 'joined':
          return await getMyJoinedSocialList(params);
        case 'created':
          return await getMyCreatedSocialList(params);
        case 'liked':
        default:
          return await getMyLikedSocialList(params);
      }
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < FETCH_GET_ITEM_LIMIT ? undefined : allPages.length,
    initialPageParam: 0,
  });
};
