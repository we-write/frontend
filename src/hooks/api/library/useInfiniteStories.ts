// useInfiniteStories.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { getStories } from '@/api/stories/api';

const FETCH_GET_ITEM_LIMIT = 12; // 여기서만 정의

export const useInfiniteStories = (
  keyword: string,
  searchType: '제목',
  genres: string[]
) => {
  return useInfiniteQuery({
    queryKey: ['stories', keyword, genres],
    queryFn: ({ pageParam = 0 }) =>
      getStories({
        keyword,
        searchType,
        genres,
        offset: pageParam,
        limit: FETCH_GET_ITEM_LIMIT, // 내부에서 limit 사용
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < FETCH_GET_ITEM_LIMIT) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
};
