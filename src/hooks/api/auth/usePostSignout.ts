import { deleteCookie } from '@/api/cookies';
import { QUERY_KEY } from '@/constants/queryKey';
import { signout } from '@/lib/supabase/repositories/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostSignout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signout,
    onSuccess: () => {
      deleteCookie('access_token');
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
