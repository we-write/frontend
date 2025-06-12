import { postContent } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UsePostContentRequest {
  storyId: string;
}

const usePostContent = ({ storyId }: UsePostContentRequest) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postContent,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LAST_CONTENT, storyId],
      });
      setTimeout(() => alert('등록되었습니다.'), 0);
    },
  });
};

export default usePostContent;
