import { getStories } from '@/api/stories/api';
import { useQuery } from '@tanstack/react-query';

export const useGetStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: getStories,
  });
};
