// ===== Story Collaborators 테이블 CRUD 함수들 =====

import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from './throwOnSupabaseError';
import { COLUMN_NAMES, StoryCollaborator, TABLE_NAMES, UserRole } from './type';

/**
 * 사용자 역할 조회
 * from: api/stories/api.ts line.233
 */
export const getSocialParticipantsByDb = async (
  userId: StoryCollaborator['user_id']
): Promise<StoryCollaborator['user_name'] | null> => {
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
  userId: StoryCollaborator['user_id'],
  storyId: StoryCollaborator['story_id']
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
