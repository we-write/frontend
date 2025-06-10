import { getSocialParticipantsByDb } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { DBStoryCollaboratorsResponse } from '@/types/dbStory';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetSocialParticipantsByDbParams {
  userId?: number;
}

type UseGetSocialParticipantsByDbResponse =
  DBStoryCollaboratorsResponse['user_name'];

const useGetSocialParticipantsByDb = ({
  userId,
}: UseGetSocialParticipantsByDbParams): UseQueryResult<UseGetSocialParticipantsByDbResponse | null> => {
  return useQuery({
    queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS_BY_DB, userId],
    queryFn: () => getSocialParticipantsByDb(userId!),
    enabled: userId != null,
  });
};

export default useGetSocialParticipantsByDb;
