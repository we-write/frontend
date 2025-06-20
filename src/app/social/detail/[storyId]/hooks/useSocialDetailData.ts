import { useGetStory } from '@/hooks/api/supabase/stories/useGetStory';
import useGetStoryCollaborators from '@/hooks/api/supabase/story-collaborators/useGetStoryCollaborators';
import getUserRole from '@/utils/getUserRole';
import { UseSocialDetailDataParams } from '@/app/social/detail/[storyId]/type';

const useSocialDetailData = ({
  storyId,
  userId,
}: UseSocialDetailDataParams) => {
  const { data: storiesData, isLoading: isStoriesDataLoading } =
    useGetStory(storyId);

  const {
    data: storyCollaboratorsData,
    isLoading: isStoryCollaboratorsDataLoading,
  } = useGetStoryCollaborators(storyId);

  const userRole =
    userId && storyCollaboratorsData
      ? getUserRole({ storyCollaboratorsData, currentUserId: userId })
      : 'GUEST';

  const isLoading = isStoriesDataLoading || isStoryCollaboratorsDataLoading;

  return { storiesData, storyCollaboratorsData, userRole, isLoading };
};

export default useSocialDetailData;
