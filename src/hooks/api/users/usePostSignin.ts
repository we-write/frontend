//TODO: 병합 후 수정
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignIn } from '@/api/auth';
import { SigninRequest } from '@/types/user';

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
