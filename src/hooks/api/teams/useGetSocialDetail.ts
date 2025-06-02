import { getSocialDetail } from '@/api/social-detail/api';
import { LocationType } from '@/api/social/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetSocialDetailParams {
  storyId: number;
}

interface GetSocialDetailResponse {
  teamId: 0;
  id: 0;
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
  storyId,
}: UseGetSocialDetailParams): UseQueryResult<GetSocialDetailResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.SOCIAL_DETAIL, storyId],
    queryFn: () => getSocialDetail({ storyId: storyId }),
    enabled: !!storyId,
  });
};

export default useGetSocialDetail;
