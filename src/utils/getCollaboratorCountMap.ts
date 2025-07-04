import { getStoryCollaborators } from '@/api/story-collaborators/api';

export const getCollaboratorCountMap = async (storyIds: string[]) => {
  const collaboratorData = await getStoryCollaborators(storyIds);

  return collaboratorData?.reduce(
    (acc, cur) => {
      acc[cur.story_id] = (acc[cur.story_id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
};
