import { getMySocialList } from '@/api/mypage/api';
import { useQuery } from '@tanstack/react-query';

export const useGetMySocialList = () => {
  return useQuery({
    queryKey: ['mySocialList'],
    queryFn: getMySocialList,
    retry: true,
  });
};
