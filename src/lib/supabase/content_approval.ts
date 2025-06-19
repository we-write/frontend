import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from './throwOnSupabaseError';
import { TABLE_NAMES, COLUMN_NAMES, Content } from './type';

// ===== Content Approval 테이블 CRUD 함수들 =====

/**
 * 콘텐츠 승인 사용자 조회
 * from: api/stories/api.ts line.203
 */
export const getContentApproveUser = async (
  contentId: Content['content_id']
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
 * from: api/stories/api.ts line.214
 */
export const insertContentApproveUser = async (
  contentId: Content['content_id'],
  userId: Content['user_id']
) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.CONTENT_APPROVAL)
      .insert([{ content_id: contentId, user_id: userId }])
      .select();
  });
  return data;
};
