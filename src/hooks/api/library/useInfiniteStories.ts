import { useInfiniteQuery } from '@tanstack/react-query';
import { getStories } from '@/api/stories/api';

const FETCH_GET_ITEM_LIMIT = 12;

export const useInfiniteStories = (
  keyword: string,
  searchType: '제목',
  genres: string[],
  limit: number
) => {
  return useInfiniteQuery({
    queryKey: ['stories', keyword, genres],
    queryFn: ({ pageParam = 0 }) =>
      getStories({
        keyword,
        searchType,
        genres,
        offset: pageParam,
        limit: FETCH_GET_ITEM_LIMIT,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
};
