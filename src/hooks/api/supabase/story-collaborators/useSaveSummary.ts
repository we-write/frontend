import { saveSummary } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { DBStoryResponse } from '@/types/dbStory';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

interface UseSaveSummaryParams {
  storyId: string;
}

interface UseSaveSummaryResponse {
  storyId: string;
  summaryHtml: string;
}

const useSaveSummary = ({
  storyId,
}: UseSaveSummaryParams): UseMutationResult<
  DBStoryResponse[],
  Error,
  UseSaveSummaryResponse
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveSummary,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_SUMMARY, storyId],
      });
      setTimeout(() => alert('등록되었습니다.'), 0);
    },
  });
};

export default useSaveSummary;
