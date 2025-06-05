import { getSocialParticipants } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface UseGetSocialParticipantsParams {
  socialId: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface GetSocialParticipantsResponse {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id?: number;
    email: string;
    name: string;
    companyName: string;
    image: string | null;
  };
}

const useGetSocialParticipants = (
  params: UseGetSocialParticipantsParams
): UseQueryResult<GetSocialParticipantsResponse[]> => {
  const { socialId } = params;
  return useQuery({
    queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS, socialId],
    queryFn: () => getSocialParticipants({ socialId: socialId }),
    enabled: !!socialId,
  });
};

export default useGetSocialParticipants;
