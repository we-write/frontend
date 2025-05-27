import { getMyInfo } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    retry: false,
  });
};
