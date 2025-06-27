'use client';

import { deleteSocial } from '@/api/social/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/queryClinet';
import { useMutation } from '@tanstack/react-query';

const useDeleteSocial = (option?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (socialId: number) => deleteSocial(socialId),
    onError: (error) => {
      option?.onError?.(error);
    },
    onSuccess: () => {
      option?.onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SOCIAL] });
    },
  });
};

export default useDeleteSocial;
