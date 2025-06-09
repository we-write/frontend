'use client';
import { getMyInfo } from '@/api/auth';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = (enabled: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEY.MY_INFO],
    queryFn: getMyInfo,
    enabled: !!enabled,
  });
};
