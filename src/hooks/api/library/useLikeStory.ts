import { useMutation, useQuery } from '@tanstack/react-query';
import {
  cancelLikeStory,
  getIsLikedStory,
  getStoryLikesCount,
  likeStory,
} from '@/api/stories/api';

const useLikeStory = (id: string, userId: number) => {
  const { data: isLiked } = useQuery({
    queryKey: ['isLiked', id, userId],
    queryFn: () => getIsLikedStory(id, userId),
  });

  const { mutate: handleLikeStory } = useMutation({
    mutationFn: () => {
      if (!!isLiked) {
        return cancelLikeStory(id, userId);
      }
      return likeStory(id, userId);
    },
  });
  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', id],
    queryFn: () => getStoryLikesCount(id),
  });
  return { handleLikeStory, isLiked, likeCount };
};

export default useLikeStory;
