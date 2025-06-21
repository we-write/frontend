import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from './throwOnSupabaseError';
import { TABLE_NAMES, COLUMN_NAMES, Content, ContentInsert } from './type';

// ===== Contents 테이블 CRUD 함수들 =====

/**
 * 스토리의 마지막 콘텐츠 조회
 */
export const getLastContent = async (
  storyId: string
): Promise<Content | null> => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.CONTENTS)
      .select('*')
      .eq(COLUMN_NAMES.CONTENTS.STORY_ID, storyId)
      .order(COLUMN_NAMES.CONTENTS.MERGED_AT, { ascending: false })
      .limit(1)
      .single();
  });
  return data;
};

// 추후 삭제 예정
interface GetContentsParams {
  id: string;
  page: number;
  limit: number;
}

/**
 * TODO: count 변수 확인 후 추가 예정
 * 스토리의 콘텐츠 조회
 * from: api/stories/api.ts line.118
 */
export const getContents = async ({ id, page, limit }: GetContentsParams) => {
  const from = (page - 1) * limit;
  const to = page * limit - 1;

  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.CONTENTS)
      .select('*', { count: 'exact' })
      .eq(COLUMN_NAMES.CONTENTS.STORY_ID, id)
      .order(COLUMN_NAMES.CONTENTS.MERGED_AT, { ascending: true })
      .range(from, to);
  });
  return { data, count: -1 };
};

interface PostContentRequest {
  content: ContentInsert;
  storyId: Content['story_id'];
  userId: Content['user_id'];
}

/**
 * 콘텐츠 추가
 * from: api/stories/api.ts line.189
 */
export const insertContent = async ({
  content,
  storyId,
  userId,
}: PostContentRequest) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.CONTENTS)
      .insert([{ ...content, story_id: storyId, user_id: userId }]);
  });
  return data;
};
