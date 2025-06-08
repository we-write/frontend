'use client';
import { getMyInfo } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = (enabled: boolean) => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    enabled: enabled,
  });
};
