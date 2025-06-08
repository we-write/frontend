import { postSignOut } from '@/api/auth';
import { deleteCookie } from '@/api/cookies';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostSignout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      deleteCookie('accessToken');
      localStorage.removeItem('isSignIn');
      router.push('/auths/signin');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
