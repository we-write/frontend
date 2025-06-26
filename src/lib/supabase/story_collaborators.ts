// ===== Story Collaborators 테이블 CRUD 함수들 =====

import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from '@/lib/supabase/throwOnSupabaseError';
import { StoryCollaborators, UserRole } from '@/lib/supabase/custom-types';
import { TABLE_NAMES, COLUMN_NAMES } from '@/constants/supabase';

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
