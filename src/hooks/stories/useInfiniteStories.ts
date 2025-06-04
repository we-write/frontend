import { useInfiniteQuery } from '@tanstack/react-query';
import { getStories } from '@/api/stories/api';

export const useInfiniteStories = (keyword: string, limit: number) => {
  return useInfiniteQuery({
    queryKey: ['stories', keyword],
    queryFn: ({ pageParam = 0 }) =>
      getStories({ keyword, offset: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
};
