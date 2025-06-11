import { createCollaborator } from '@/api/story-collaborators/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface useParticipateCollaboratorParams {
  socialId: number;
  storyId?: string;
}

const useParticipateCollaborator = ({
  socialId,
  storyId,
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_USER_ROLE, storyId],
      });
    },
  });
};

export default useParticipateCollaborator;
