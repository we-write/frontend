import { getSocialParticipantsByDb } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

interface UseGetSocialParticipantsByDbParams {
  userId?: number;
}

const useGetSocialParticipantsByDb = ({
  userId,
}: UseGetSocialParticipantsByDbParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS_BY_DB, userId],
    queryFn: () => getSocialParticipantsByDb(userId!),
    enabled: userId != null,
  });
};

export default useGetSocialParticipantsByDb;
