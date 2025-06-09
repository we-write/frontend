import { createCollaborator } from '@/api/story-collaborators/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface useParticipateCollaboratorParams {
  socialId: number;
}

const useParticipateCollaborator = ({
  socialId,
}: useParticipateCollaboratorParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCollaborator,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS, socialId],
      });
    },
  });
};

export default useParticipateCollaborator;
