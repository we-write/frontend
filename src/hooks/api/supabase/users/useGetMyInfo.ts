'use client';

import { QUERY_KEY } from '@/constants/queryKey';
import { fetchMyInfo } from '@/providers/auth-provider/authProviderUtil';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = (accessToken: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_INFO],
    queryFn: () => fetchMyInfo(accessToken),
    enabled: !!accessToken,
  });
};
