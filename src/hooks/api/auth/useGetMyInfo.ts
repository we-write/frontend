'use client';

import { getMyInfo } from '@/api/auth/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = (accessToken: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_INFO],
    queryFn: () => getMyInfo(accessToken),
    enabled: !!accessToken,
  });
};
