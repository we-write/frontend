//TODO: 병합 후 수정
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignIn } from '@/api/auth/api';
import { SigninRequest } from '@/api/auth/type';

import { useRouter } from 'next/navigation';

export const usePostSignin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SigninRequest) => postSignIn(data),
    onSuccess: async () => {
      await queryClient.prefetchQuery({ queryKey: ['myInfo'] });
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
