import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from '@/lib/supabase/throwOnSupabaseError';
import { StoryCollaborators, UserRole } from '@/lib/supabase/custom-types';
import { TABLE_NAMES, COLUMN_NAMES } from '@/constants/supabase';
import { GetMySocialListParams } from '@/lib/supabase/repositories/story_collaborators.type';
import { getCollaboratorCountMap } from '@/utils/getCollaboratorCountMap';

/**
 * 사용자 역할 조회
 * from: api/stories/api.ts line.233
 */
export const getSocialParticipantsByDb = async (
  userId: StoryCollaborators['user_id']
): Promise<StoryCollaborators['user_name'] | null> => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORY_COLLABORATORS)
      .select(COLUMN_NAMES.STORY_COLLABORATORS.USER_NAME)
      .eq(COLUMN_NAMES.STORY_COLLABORATORS.USER_ID, userId);
  });
  return data?.[0]?.user_name || null;
};

/**
 * 사용자 역할 조회
 * from: api/stories/api.ts line.144
 */
export const getUserRole = async (
  userId: StoryCollaborators['user_id'],
  storyId: StoryCollaborators['story_id']
): Promise<{
  role: UserRole;
} | null> => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORY_COLLABORATORS)
      .select(COLUMN_NAMES.STORY_COLLABORATORS.ROLE)
      .eq(COLUMN_NAMES.STORY_COLLABORATORS.USER_ID, userId)
      .eq(COLUMN_NAMES.STORY_COLLABORATORS.STORY_ID, storyId)
      .maybeSingle();
  });
  return data;
};

/**
 * 유저가 모임에서 탈퇴
 */
export const deleteCollaboratorFromSocial = async (
  userId: StoryCollaborators['user_id'],
  storyId: StoryCollaborators['story_id']
) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from('story_collaborators')
      .delete()
      .match({ user_id: userId, story_id: storyId });
  });
  return data;
};

/**
 * 유저가 가입한 모임 조회(전체)
 */
export const getMySocialList = async ({
  userId,
  offset,
  limit,
}: GetMySocialListParams) => {
  if (!userId) return [];

  const from = offset * limit;
  const to = from + limit - 1;

  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
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
  });

  const storyIds = data?.map((item) => item.story_id) ?? [];
  const collaboratorCountMap = await getCollaboratorCountMap(storyIds);

  return (
    data?.map((item) => {
      const { Stories, ...rest } = item;
      return {
        ...rest,
        ...Stories,
        collaborator_count: collaboratorCountMap?.[item.story_id] ?? 0,
      };
    }) ?? []
  );
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
