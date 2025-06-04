import { getStories } from '@/api/stories/api';
import { useQuery } from '@tanstack/react-query';

export const useGetStories = (
  keyword: string,
  offset: number,
  limit: number
) => {
  return useQuery({
    queryKey: ['stories', keyword, offset, limit],
    queryFn: () => getStories({ keyword, offset, limit }),
    enabled: keyword !== null && keyword !== undefined, // 조건부 fetch
  });
};
