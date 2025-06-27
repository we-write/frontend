import instanceBaaS from '@/api/instanceBaaS';
import throwOnSupabaseError from '@/lib/supabase/throwOnSupabaseError';
import { Stories, StoriesInsert } from '@/lib/supabase/custom-types';
import { TABLE_NAMES, COLUMN_NAMES } from '@/constants/supabase';

/**
 * 스토리 요약 저장
 * from: api/social-detail/api.ts line.113
 */
export const saveSummary = async (
  socialId: Stories['social_id'],
  summaryHtml: NonNullable<Stories['summary']>
): Promise<Stories[]> => {
  const data = await throwOnSupabaseError<Stories[]>(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORIES)
      .update({ summary: summaryHtml })
      .eq(COLUMN_NAMES.STORIES.SOCIAL_ID, socialId)
      .select('*');
  });

  return data || [];
};

/**
 * 스토리 요약 조회
 * from: api/social-detail/api.ts
 */
export const getSummary = async (
  socialId: Stories['social_id']
): Promise<Pick<Stories, 'summary'> | null> => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORIES)
      .select('summary')
      .eq(COLUMN_NAMES.STORIES.SOCIAL_ID, socialId)
      .single();
  });
  return data;
};

/**
 * social_id로 story_id 조회
 * from: api/social-detail/api.ts line.157
 */
export const getStoryId = async (
  socialId: Stories['social_id']
): Promise<Pick<Stories, 'story_id'> | null> => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORIES)
      .select('story_id')
      .eq(COLUMN_NAMES.STORIES.SOCIAL_ID, socialId)
      .single();
  });
  return data;
};

// 타입 정의 부분 위치 논의 후 위치 이동 예정
interface GetStoriesParams {
  keyword: string;
  searchType: string;
  genres: string[];
  offset: number;
  limit: number;
}

/**
 * 스토리 목록 조회
 * from: api/stories/api.ts line.12
 */
export const getStories = async (params: GetStoriesParams) => {
  const { keyword, searchType, genres, offset, limit } = params;

  const from = offset * limit;
  const to = from + limit - 1;

  const column = searchType === '제목' ? 'title' : 'summary';
  const validGenres = genres.filter((g) => g !== '전체');

  let query = instanceBaaS.from('Stories').select('*');

  if (keyword.trim()) {
    query = query.ilike(column, `%${keyword}%`);
  }

  if (validGenres.length > 0) {
    query = query.in('genre', validGenres);
  }

  const data = await throwOnSupabaseError(async () => {
    return await query
      .order('created_at', { ascending: false })
      .range(from, to);
  });

  return data;
};

/**
 * 소셜 요약 조회
 * from: api/stories/api.ts line.43
 */
export const getSocialSummary = async (socialId: Stories['social_id']) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORIES)
      .select('summary')
      .eq(COLUMN_NAMES.STORIES.SOCIAL_ID, socialId)
      .single();
  });

  // TODO: 어떤 에러인지 파악 후 리팩토링 예정

  // if (error) {
  //   console.error('Error fetching summary:', error);
  //   return '모임장이 소개글을 작성하고 있어요!';
  // }

  // return data?.summary || '모임장이 소개글을 작성하고 있어요!';
  return data;
};

/**
 * 스토리 조회
 * from: api/stories/api.ts line.58
 */
export const getStory = async (storyId: Stories['story_id']) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORIES)
      .select('*')
      .eq(COLUMN_NAMES.STORIES.STORY_ID, storyId)
      .single();
  });

  return data;
};

/**
 * 스토리 생성
 * from: api/stories/api.ts line.86
 */
export const insertStory = async (story: StoriesInsert) => {
  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS.from(TABLE_NAMES.STORIES).insert(story).select();
  });

  return data;
};

export const updateContentMerge = async () => {
  //기존 내부 구현에 연쇄적인 부분이라서 리팩토링 예정
};
