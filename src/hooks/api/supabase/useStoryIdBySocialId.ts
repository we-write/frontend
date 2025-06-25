import { useQuery } from '@tanstack/react-query';
import { getStoryBySocialId } from '@/api/mypage/api';

export const useStoryIdBySocialId = (socialId: number) => {
  return useQuery({
    queryKey: ['storyId', socialId],
    queryFn: () => getStoryBySocialId(socialId),
    enabled: !!socialId, // socialId가 존재할 때만 fetch
  });
};
