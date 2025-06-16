import { postSignOut } from '@/api/auth/api';
import { deleteCookie } from '@/api/cookies';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostSignout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      deleteCookie('accessToken');
      queryClient.removeQueries({ queryKey: [QUERY_KEY.MY_INFO] });
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.GET_USER_ROLE],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
