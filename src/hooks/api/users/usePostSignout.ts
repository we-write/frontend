import { postSignOut } from '@/api/auth';
import { deleteCookie } from '@/api/auths/cookies';
import { useMutation } from '@tanstack/react-query';

export const usePostSignout = () => {
  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      deleteCookie('accessToken');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
