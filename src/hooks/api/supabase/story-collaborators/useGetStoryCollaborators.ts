import { getStoryCollaborators } from '@/api/story-collaborators/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

const useGetStoryCollaborators = (storyId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_STORY_COLLABORATORS, storyId],
    queryFn: () => getStoryCollaborators(storyId),
  });
};

export default useGetStoryCollaborators;
