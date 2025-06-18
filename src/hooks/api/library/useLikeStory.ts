import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelLikeStory,
  getIsLikedStory,
  getStoryLikesCount,
  likeStory,
} from '@/api/stories/api';
import { DBStoryLikeResponse } from '@/types/dbStory';

const useLikeStory = ({ story_id, user_id }: DBStoryLikeResponse) => {
  const queryClient = useQueryClient();
  const { data: isLiked } = useQuery({
    queryKey: ['isLiked', story_id, user_id],
    queryFn: () => getIsLikedStory(story_id, user_id),
  });
  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', story_id],
    queryFn: () => getStoryLikesCount(story_id),
  });
  const { mutate: handleLikeStory } = useMutation({
    mutationFn: () => {
      if (!!isLiked) {
        return cancelLikeStory(story_id, user_id);
      }
      return likeStory(story_id, user_id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['isLiked', story_id, user_id],
      });
      await queryClient.cancelQueries({ queryKey: ['likeCount', story_id] });

      const prevIsLiked = queryClient.getQueryData([
        'isLiked',
        story_id,
        user_id,
      ]);
      const preLikeCount = queryClient.getQueryData(['likeCount', story_id]);

      queryClient.setQueryData(
        ['isLiked', story_id, user_id],
        (prev: boolean) => !prev
      );
      queryClient.setQueryData(['likeCount', story_id], (prev: number) =>
        isLiked ? prev - 1 : prev + 1
      );
      return { prevIsLiked, preLikeCount };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          ['isLiked', story_id, user_id],
          () => context.prevIsLiked
        );
        queryClient.setQueryData(
          ['likeCount', story_id],
          () => context.preLikeCount
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['isLiked', story_id, user_id],
      });
      queryClient.invalidateQueries({ queryKey: ['likeCount', story_id] });
    },
  });

  return { handleLikeStory, isLiked, likeCount };
};

export default useLikeStory;
