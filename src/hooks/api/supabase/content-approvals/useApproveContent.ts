import { approveContent, updateContentMerge } from '@/api/stories/api';
import { ApproveContentParams } from '@/api/stories/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { DBContentApprovalResponse } from '@/types/dbStory';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

interface UseApproveContentParams {
  storyId: string;
  contentId?: string;
}

const useApproveContent = ({
  storyId,
  contentId,
}: UseApproveContentParams): UseMutationResult<
  DBContentApprovalResponse[],
  Error,
  ApproveContentParams
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveContent,
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
