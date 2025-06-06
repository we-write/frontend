import { leaveJoinSocial } from '@/api/mypage/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLeaveJoinSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveJoinSocial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySocialList'] });
    },
  });
};
