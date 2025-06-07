import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo } from '@/api/auth';
import { UserRequest } from '@/types/user';

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['myInfo'],
    mutationFn: (data: UserRequest) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
