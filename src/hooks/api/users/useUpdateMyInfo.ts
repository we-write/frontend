import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/api/auth';
import { UserRequest } from '@/types/user';
import { QUERY_KEY } from '@/constants/queryKey';

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['myInfo'],
    mutationFn: (data: UserRequest) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_INFO] });
    },
  });
};
