import instanceBaaS from '@/api/instanceBaaS';
import { COLUMN_NAMES, TABLE_NAMES } from '@/constants/supabase';
import { getMyLikedSocialListParams } from '@/lib/supabase/repositories/story_likes.type';
import throwOnSupabaseError from '@/lib/supabase/throwOnSupabaseError';
import { getCollaboratorCountMap } from '@/utils/getCollaboratorCountMap';

/**
 * 유저의 좋아요한 모임 목록 조회
 */
export const getMyLikedSocialList = async ({
  userId,
  offset,
  limit,
}: getMyLikedSocialListParams) => {
  const from = offset * limit;
  const to = from + limit - 1;

  const data = await throwOnSupabaseError(async () => {
    return await instanceBaaS
      .from(TABLE_NAMES.STORY_LIKES)
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
      .eq(COLUMN_NAMES.STORY_LIKES.USER_ID, userId)
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
