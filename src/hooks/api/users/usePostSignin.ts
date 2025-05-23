//TODO: 병합 후 수정
import { useMutation } from '@tanstack/react-query';
import { postSignIn, getMyInfo } from '@/api/auth';
import { SigninRequest } from '@/types/user';
import useUserStore from '@/utils/store/useUserStore';
import { useRouter } from 'next/navigation';

export const usePostSignin = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SigninRequest) => postSignIn(data),
    onSuccess: async () => {
      const { user } = await getMyInfo();

      if (!!user) {
        setUser(user);

        router.push('/');
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
