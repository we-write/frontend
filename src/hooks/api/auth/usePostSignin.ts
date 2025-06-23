import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignIn } from '@/api/auth/api';
import { SigninRequest } from '@/api/auth/type';

import { useRouter } from 'next/navigation';
import toast from '@/utils/toast';
import useReferer from '@/hooks/useReferer';

export const usePostSignin = () => {
  const queryClient = useQueryClient();
  const { redirectPath } = useReferer();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SigninRequest) => postSignIn(data),
    onSuccess: async () => {
      await queryClient.prefetchQuery({ queryKey: ['myInfo'] });
      router.replace(redirectPath);
      toast.success('로그인에 성공했습니다.');
    },
    onError: (error: Error) => {
      const errorData = JSON.parse(error.message);
      toast({
        type: 'error',
        title: '로그인에 실패했습니다.',
        message: errorData.message,
        duration: 5,
      });
    },
  });
};
