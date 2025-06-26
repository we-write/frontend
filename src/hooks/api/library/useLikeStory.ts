import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelLikeStory, getStoryLikes, likeStory } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';

interface UseLikeStoryParams {
  user_id: number;
  story_id: string;
}

const useLikeStory = ({ story_id, user_id }: UseLikeStoryParams) => {
  const queryClient = useQueryClient();
  const { data: isLiked } = useQuery({
    queryKey: [QUERY_KEY.IS_LIKED, story_id, user_id],
    queryFn: () => getStoryLikes(story_id),
    select: (data) => data.some((like) => like.user_id === user_id),
  });
  const { data: likeCount } = useQuery({
    queryKey: [QUERY_KEY.LIKE_COUNT, story_id],
    queryFn: () => getStoryLikes(story_id),
    select: (data) => data.length,
  });

  const { mutate: handleLikeStory, isPending } = useMutation({
    mutationFn: () => {
      if (!!isLiked) {
        return cancelLikeStory(story_id, user_id);
      }
      return likeStory(story_id, user_id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.IS_LIKED, story_id, user_id],
      });
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.LIKE_COUNT, story_id],
      });

      const prevIsLiked = queryClient.getQueryData([
        QUERY_KEY.IS_LIKED,
        story_id,
        user_id,
      ]);
      const preLikeCount = queryClient.getQueryData([
        QUERY_KEY.LIKE_COUNT,
        story_id,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY.IS_LIKED, story_id, user_id],
        (prev: boolean) => !prev
      );
      queryClient.setQueryData(
        [QUERY_KEY.LIKE_COUNT, story_id],
        (prev: number) => (isLiked ? prev - 1 : prev + 1)
      );
      return { prevIsLiked, preLikeCount };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          [QUERY_KEY.IS_LIKED, story_id, user_id],
          () => context.prevIsLiked
        );
        queryClient.setQueryData(
          [QUERY_KEY.LIKE_COUNT, story_id],
          () => context.preLikeCount
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.IS_LIKED, story_id, user_id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LIKE_COUNT, story_id],
      });
    },
  });

  return { handleLikeStory, isLiked, likeCount, isPending };
};

export default useLikeStory;
