import { getLastContent } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

interface UseGetLastContentParams {
  storyId: string;
}

const useGetLastContent = ({ storyId }: UseGetLastContentParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LAST_CONTENT, storyId],
    queryFn: () => getLastContent(storyId),
    enabled: !!storyId,
  });
};

export default useGetLastContent;
