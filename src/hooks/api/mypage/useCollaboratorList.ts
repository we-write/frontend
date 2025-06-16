import { useQuery } from '@tanstack/react-query';
import {
  getStoryBySocialId,
  getCollaboratorsByStoryId,
} from '@/api/mypage/api';
import { QUERY_KEY } from '@/constants/queryKey';

const useCollaboratorList = (socialId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.COLLABORATOR_LIST, socialId],
    queryFn: async () => {
      const storyId = await getStoryBySocialId(socialId);
      if (!storyId) return [];

      const collaborators = await getCollaboratorsByStoryId(storyId);

      // user_id 기준으로 중복 제거된 배열 반환
      const uniqueUserIds = Array.from(
        new Set(collaborators.map((item) => item.user_id))
      );

      return uniqueUserIds;
    },
  });
};

export default useCollaboratorList;
