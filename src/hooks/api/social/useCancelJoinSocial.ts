import { cancelJoinSocial } from '@/api/mypage/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelJoinSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelJoinSocial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySocialList'] });
    },
  });
};
