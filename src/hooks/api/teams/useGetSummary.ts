import { getSummary } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetSummaryParams {
  socialId: number;
}

interface GetSummaryResponse {
  summary: string;
}

const useGetSummary = ({
  socialId,
}: UseGetSummaryParams): UseQueryResult<GetSummaryResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SUMMARY, socialId],
    queryFn: () => getSummary({ socialId: socialId }),
    enabled: !!socialId,
  });
};

export default useGetSummary;
