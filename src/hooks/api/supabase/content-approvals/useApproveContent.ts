import { updateContentMerge } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { insertContentApproveUser } from '@/lib/supabase/repositories/content_approval';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseApproveContentParams {
  storyId: string;
  contentId?: string;
}

const useApproveContent = ({ storyId, contentId }: UseApproveContentParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertContentApproveUser,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: async () => {
      await updateContentMerge(storyId);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LAST_CONTENT, storyId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_APPROVE_USER, contentId],
      });
      setTimeout(() => alert('승인되었습니다.'), 0);
    },
  });
};

export default useApproveContent;
