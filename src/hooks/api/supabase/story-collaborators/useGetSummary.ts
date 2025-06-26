import { getSummary } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

interface UseGetSummaryParams {
  socialId: number;
}

const useGetSummary = ({ socialId }: UseGetSummaryParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_SUMMARY, socialId],
    queryFn: () => getSummary({ socialId: socialId }),
    retry: false,
    enabled: !!socialId,
  });
};

export default useGetSummary;
