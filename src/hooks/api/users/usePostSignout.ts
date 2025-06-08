import { postSignOut } from '@/api/auth';
import { deleteCookie } from '@/api/cookies';
import { useMutation } from '@tanstack/react-query';

export const usePostSignout = () => {
  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      deleteCookie('accessToken');
      localStorage.removeItem('isSignIn');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
