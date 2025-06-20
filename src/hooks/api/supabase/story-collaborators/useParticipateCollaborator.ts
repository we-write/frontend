import { createCollaborator } from '@/api/story-collaborators/api';
import { QUERY_KEY } from '@/constants/queryKey';
import toast from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UseParticipateCollaboratorParams {
  storyId?: string;
}

const useParticipateCollaborator = ({
  storyId,
}: UseParticipateCollaboratorParams) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createCollaborator,
    onError: (error) => {
      console.error('모임 참여 실패 : ', error);
      toast({
        type: 'error',
        message: '오류가 발생하여 모임 참여에 실패하였습니다.',
        duration: 5,
      });
      router.refresh();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_STORY_COLLABORATORS, storyId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_USER_ROLE, storyId],
      });
      setTimeout(() => toast.success('모임 참여에 성공하였습니다.'), 0);
    },
  });
};

export default useParticipateCollaborator;
