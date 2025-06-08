import { getLastContent } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { DBContentResponse } from '@/types/dbStory';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetLastContentParams {
  storyId: string;
}

const useGetLastContent = ({
  storyId,
}: UseGetLastContentParams): UseQueryResult<DBContentResponse | null> => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_LAST_CONTENT, storyId],
    queryFn: () => getLastContent(storyId),
    enabled: !!storyId,
  });
};

export default useGetLastContent;
