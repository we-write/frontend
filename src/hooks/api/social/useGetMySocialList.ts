import { getJoinedSocialList } from '@/api/mypage/api';
import { useQuery } from '@tanstack/react-query';
import { GetJoinedSocialListParams } from '@/api/mypage/type';

export const useGetJoinedSocialList = (params: GetJoinedSocialListParams) => {
  return useQuery({
    queryKey: ['mySocialList', params],
    queryFn: () => getJoinedSocialList(params),
    retry: false,
  });
};
