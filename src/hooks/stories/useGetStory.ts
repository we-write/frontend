import { getStory } from '@/api/stories/api';
import { useQuery } from '@tanstack/react-query';

export const useGetStory = (id: string) => {
  return useQuery({
    queryKey: ['story', id],
    queryFn: () => getStory(id),
  });
};
