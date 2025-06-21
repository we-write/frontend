import { getStory } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetStory = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_STORIES, id],
    queryFn: () => getStory(id),
  });
};
