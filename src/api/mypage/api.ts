import instanceBaaS from '@/api/instanceBaaS';
import {
  DeleteCollaboratorFromSocialParams,
  GetCollaboratorCountMapParams,
  GetMySocialListParams,
} from '@/api/mypage/type';
import { getStoryCollaborators } from '@/api/story-collaborators/api';

export const deleteCollaboratorFromSocial = async ({
  userId,
  storyId,
}: DeleteCollaboratorFromSocialParams) => {
  const { data, error } = await instanceBaaS
    .from('story_collaborators')
    .delete()
    .match({ user_id: userId, story_id: storyId });

  if (error) throw new Error(error.message);
  return data;
};

export const getCollaboratorCountMap = async ({
  storyIds,
}: GetCollaboratorCountMapParams) => {
  const collaboratorData = await getStoryCollaborators(storyIds);

  return collaboratorData?.reduce(
    (acc, cur) => {
      acc[cur.story_id] = (acc[cur.story_id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
};

export const getMyLikedSocialList = async ({
  userId,
  offset,
  limit,
}: GetMySocialListParams) => {
  if (!userId) return [];
  const from = offset * limit;
  const to = from + limit - 1;

  const { data, error } = await instanceBaaS
    .from('story_likes')
    .select(
      `
    story_id,
    liked_at,
    Stories (
    capacity,
    cover_image_url,
    genre,
    title
    )
    `
    )
    .eq('user_id', userId)
    .range(from, to);

  if (error) throw new Error(error.message);

  const storyIds = data.map((item) => item.story_id);
  const collaboratorCountMap = await getCollaboratorCountMap({ storyIds });

  return data.map((item) => {
    const { Stories, ...rest } = item;
    return {
      ...rest,
      ...Stories,
      collaborator_count: collaboratorCountMap?.[item.story_id] ?? 0,
    };
  });
};

export const getMySocialList = async ({
  userId,
  offset,
  limit,
}: GetMySocialListParams) => {
  if (!userId) return [];
  const from = offset * limit;
  const to = from + limit - 1;
  const { data, error } = await instanceBaaS
    .from('story_collaborators')
    .select(
      `
    joined_at,
    role,
    story_id,
    Stories (
    capacity,
    cover_image_url,
    genre,
    title
    )
    `
    )
    .eq('user_id', userId)
    .range(from, to);
  if (error) throw new Error(error.message);

  const storyIds = data.map((item) => item.story_id);
  const collaboratorCountMap = await getCollaboratorCountMap({ storyIds });

  return data.map((item) => {
    const { Stories, ...rest } = item;
    return {
      ...rest,
      ...Stories,
      collaborator_count: collaboratorCountMap?.[item.story_id] ?? 0,
    };
  });
};

export const getMyJoinedSocialList = async ({
  userId,
  offset,
  limit,
}: GetMySocialListParams) => {
  const mySocialList = await getMySocialList({ userId, offset, limit });
  return mySocialList.filter((item) => item.role === 'MEMBER');
};

export const getMyCreatedSocialList = async ({
  userId,
  offset,
  limit,
}: GetMySocialListParams) => {
  const mySocialList = await getMySocialList({ userId, offset, limit });
  return mySocialList.filter((item) => item.role === 'LEADER');
};
