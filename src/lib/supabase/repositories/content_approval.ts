import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from '@/lib/supabase/throwOnSupabaseError';
import { TABLE_NAMES, COLUMN_NAMES } from '@/constants/supabase';
import { Contents } from '@/lib/supabase/custom-types';
import { InsertContentApproveUserRequest } from '@/lib/supabase/repositories/content_approval.type';

/**
 * 콘텐츠 승인 사용자 조회
 */
export const getContentApproveUser = async (
  contentId: Contents['content_id']
) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.CONTENT_APPROVAL)
      .select('*')
      .eq(COLUMN_NAMES.CONTENT_APPROVAL.CONTENT_ID, contentId);
  });
  return data;
};

/**
 * 콘텐츠 승인 사용자 추가
 */
export const insertContentApproveUser = async ({
  userId,
  contentId,
}: InsertContentApproveUserRequest) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.CONTENT_APPROVAL)
      .insert([{ content_id: contentId, user_id: userId }])
      .select();
  });
  return data;
};
