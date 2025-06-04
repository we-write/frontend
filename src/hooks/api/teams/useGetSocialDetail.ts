import { getSocialDetail } from '@/api/social-detail/api';
import { LocationType } from '@/api/social/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetSocialDetailParams {
  socialId: number;
}

interface GetSocialDetailResponse {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string;
  cancledAt: null;
}

const useGetSocialDetail = ({
  socialId,
}: UseGetSocialDetailParams): UseQueryResult<GetSocialDetailResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.SOCIAL_DETAIL, socialId],
    queryFn: () => getSocialDetail({ socialId: socialId }),
    enabled: !!socialId,
  });
};

export default useGetSocialDetail;
