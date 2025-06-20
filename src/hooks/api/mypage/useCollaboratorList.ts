import { useQuery } from '@tanstack/react-query';
import {
  getStoryBySocialId,
  getCollaboratorsByStoryId,
} from '@/api/mypage/api';
import { QUERY_KEY } from '@/constants/queryKey';

const useCollaboratorList = (socialId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.COLLABORATOR_LIST, socialId],
    queryFn: async () => {
      const storyId = await getStoryBySocialId(socialId);
      if (!storyId) return [];

      const collaborators = await getCollaboratorsByStoryId(storyId);

      return collaborators;
    },
  });
};

export default useCollaboratorList;
