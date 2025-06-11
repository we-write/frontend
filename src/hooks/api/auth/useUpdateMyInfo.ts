'use client';

import { useMutation } from '@tanstack/react-query';
import { updateMyInfo } from '@/api/auth/api';
import { UserRequest } from '@/api/auth/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { useRouter } from 'next/navigation';

export const useUpdateMyInfo = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.MY_INFO],
    mutationFn: (data: UserRequest) => updateMyInfo(data),
    onSuccess: () => {
      router.refresh();
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_INFO] });
    },
  });
};
