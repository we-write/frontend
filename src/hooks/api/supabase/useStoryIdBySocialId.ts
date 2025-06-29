import { useQuery } from '@tanstack/react-query';
import { getStoryBySocialId } from '@/api/mypage/api';

export const useStoryIdBySocialId = (socialId: number) => {
  return useQuery<string | null>({
    queryKey: ['storyId', socialId],
    queryFn: () => getStoryBySocialId(socialId),
    enabled: !!socialId,
  });
};
