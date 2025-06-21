'use client';

import { useMutation } from '@tanstack/react-query';
import { updateMyInfo } from '@/api/auth/api';
import { MyInfoRequest } from '@/api/auth/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { useRouter } from 'next/navigation';
import toast from '@/utils/toast';

export const useUpdateMyInfo = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [QUERY_KEY.MY_INFO],
    mutationFn: (data: MyInfoRequest) => updateMyInfo(data),
    onSuccess: () => {
      toast.success('프로필이 수정되었습니다.');
      router.refresh();
      // queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_INFO] });
    },
    onError: () => {
      toast({
        type: 'error',
        message: '오류가 발생하여 프로필 수정에 실패하였습니다.',
        duration: 5,
      });
    },
  });
};
