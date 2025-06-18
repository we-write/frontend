import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelLikeStory,
  getIsLikedStory,
  getStoryLikesCount,
  likeStory,
} from '@/api/stories/api';

const useLikeStory = (id: string, userId: number) => {
  const queryClient = useQueryClient();
  const { data: isLiked } = useQuery({
    queryKey: ['isLiked', id, userId],
    queryFn: () => getIsLikedStory(id, userId),
  });
  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', id],
    queryFn: () => getStoryLikesCount(id),
  });
  const { mutate: handleLikeStory } = useMutation({
    mutationFn: async () => {
      if (!!isLiked) {
        return cancelLikeStory(id, userId);
      }
      return likeStory(id, userId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['isLiked', id, userId] });
      await queryClient.cancelQueries({ queryKey: ['likeCount', id] });

      const prevIsLiked = queryClient.getQueryData(['isLiked', id, userId]);
      const preLikeCount = queryClient.getQueryData(['likeCount', id]);

      queryClient.setQueryData(
        ['isLiked', id, userId],
        (prev: boolean) => !prev
      );
      queryClient.setQueryData(['likeCount', id], (prev: number) =>
        isLiked ? prev - 1 : prev + 1
      );
      return { prevIsLiked, preLikeCount };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          ['isLiked', id, userId],
          () => context.prevIsLiked
        );
        queryClient.setQueryData(['likeCount', id], () => context.preLikeCount);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['isLiked', id, userId] });
      queryClient.invalidateQueries({ queryKey: ['likeCount', id] });
    },
  });

  return { handleLikeStory, isLiked, likeCount };
};

export default useLikeStory;
