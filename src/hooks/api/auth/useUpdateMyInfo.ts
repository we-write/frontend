'use client';

import { useMutation } from '@tanstack/react-query';
import { updateMyInfo } from '@/api/auth/api';
import { MyInfoRequest } from '@/api/auth/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { useRouter } from 'next/navigation';

export const useUpdateMyInfo = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.MY_INFO],
    mutationFn: (data: MyInfoRequest) => updateMyInfo(data),
    onSuccess: () => {
      router.refresh();
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_INFO] });
    },
  });
};
