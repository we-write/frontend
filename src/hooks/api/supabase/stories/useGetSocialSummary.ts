import { useQuery } from '@tanstack/react-query';
import { getSocialSummary } from '@/api/stories/api';
import { GetSocialResponse } from '@/api/social/type';
import { QUERY_KEY } from '@/constants/queryKey';

const useGetSocialSummary = (socialList: GetSocialResponse[]) => {
  return useQuery({
    queryKey: [QUERY_KEY.SOCIAL_SUMMARY, socialList.map((item) => item.id)],
    queryFn: async () => {
      const summaries = await Promise.all(
        socialList.map(async (item) => {
          const summary = await getSocialSummary(item.id);
          return summary;
        })
      );
      return summaries;
    },
    enabled: !!socialList.length,
  });
};

export default useGetSocialSummary;
