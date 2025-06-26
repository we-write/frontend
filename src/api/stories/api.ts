import {
  DBContentApprovalResponse,
  DBContentResponse,
  DBStoryResponse,
} from '@/types/dbStory';
import instanceBaaS from '../instanceBaaS';
import {
  GetContentsParams,
  PostContentRequest,
  GetApproveUserParams,
  ApproveContentRequest,
  GetStoriesParams,
  CreateStoryRequest,
} from './type';

export const getStories = async ({
  keyword,
  searchType,
  genres,
  offset,
  limit,
}: GetStoriesParams) => {
  const from = offset * limit;
  const to = from + limit - 1;

  const column = searchType === '제목' ? 'title' : 'summary';
  const validGenres = genres.filter((g) => g !== '전체');

  let query = instanceBaaS.from('Stories').select('*').eq('is_public', true);

  if (keyword.trim()) {
    query = query.ilike(column, `%${keyword}%`);
  }

  if (validGenres.length > 0) {
    query = query.in('genre', validGenres);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return data;
};

export const getSocialSummary = async (id: string) => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .select('*')
    .eq('social_id', id)
    .single();

  if (error) {
    console.error('Error fetching summary:', error);
    return '모임장이 소개글을 작성하고 있어요!';
  }

  return data?.summary || '모임장이 소개글을 작성하고 있어요!';
};

export const getStory = async (id: string): Promise<DBStoryResponse> => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .select('*')
    .eq('story_id', id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getLastContent = async (
  id: string
): Promise<DBContentResponse> => {
  const { data, error } = await instanceBaaS
    .from('Contents')
    .select('*')
    .eq('story_id', id)
    .order('merged_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const createStory = async (story: CreateStoryRequest) => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .insert(story)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const postImage = async (image: File) => {
  const imageName = `cover/${Date.now()}.${image.name.split('.').pop()}`;
  const { data, error } = await instanceBaaS.storage
    .from('imagestore')
    .upload(imageName, image);
  if (error) {
    throw new Error(error.message);
  }

  return {
    path: data.path,
    fullPath: data.fullPath,
  };
};
export const getImage = async (imageName: string) => {
  const { data } = await instanceBaaS.storage
    .from('imagestore')
    .getPublicUrl(imageName);

  return data.publicUrl;
};

export const getContents = async ({
  storyId,
}: GetContentsParams): Promise<{
  data: DBContentResponse[];
  count: number;
}> => {
  const { data, error, count } = await instanceBaaS
    .from('Contents')
    .select('*', { count: 'exact' })
    .eq('story_id', storyId)
    .order('merged_at', { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return { data, count: count ?? 0 };
};

export const updateContentMerge = async (storyId: string): Promise<void> => {
  try {
    const { data: story, error } = await instanceBaaS
      .from('Stories')
      .select('approved_count')
      .eq('story_id', storyId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const { data: content, error: contentsError } = await instanceBaaS
      .from('Contents')
      .select('content_id')
      .eq('story_id', storyId)
      .eq('status', 'PENDING')
      .single();
    if (contentsError) {
      throw new Error(contentsError.message);
    }

    const { data: content_approve_count, error: contentApproveError } =
      await instanceBaaS
        .from('ContentApproval')
        .select('*', { count: 'exact' })
        .eq('content_id', content.content_id);
    if (contentApproveError) {
      throw new Error(contentApproveError.message);
    }

    if (content_approve_count.length >= story.approved_count) {
      await instanceBaaS
        .from('Contents')
        .update({
          status: 'MERGED',
        })
        .eq('story_id', storyId);
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

export const postContent = async ({
  content,
  storyId,
  userId,
}: PostContentRequest) => {
  const { error } = await instanceBaaS.from('Contents').insert([
    {
      story_id: storyId,
      user_id: userId,
      content: content,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};

export const getApproveUser = async ({ contentId }: GetApproveUserParams) => {
  const { data, error } = await instanceBaaS
    .from('ContentApproval')
    .select('*')
    .eq('content_id', contentId);

  if (error && error.code === 'PGRST116') return null;
  if (error) throw new Error(error.message);
  return data;
};

export const approveContent = async ({
  userId,
  contentId,
}: ApproveContentRequest): Promise<DBContentApprovalResponse[]> => {
  const { data, error } = await instanceBaaS
    .from('ContentApproval')
    .insert([
      {
        content_id: contentId,
        user_id: userId,
      },
    ])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getSocialParticipantsByDb = async (userId: number) => {
  const { data, error } = await instanceBaaS
    .from('story_collaborators')
    .select('user_name')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
  return data[0].user_name;
};

export const likeStory = async (storyId: string, userId: number) => {
  const { data, error } = await instanceBaaS.from('story_likes').insert([
    {
      story_id: storyId,
      user_id: userId,
    },
  ]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getStoryLikes = async (storyId: string) => {
  const { data, error } = await instanceBaaS
    .from('story_likes')
    .select('*', { count: 'exact' })
    .eq('story_id', storyId);
  if (!data) return [];

  if (error) {
    throw new Error(error);
  }
  return data;
};

export const cancelLikeStory = async (storyId: string, userId: number) => {
  const { data, error } = await instanceBaaS
    .from('story_likes')
    .delete()
    .eq('story_id', storyId)
    .eq('user_id', userId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const checkStoryExists = async (storyId: string) => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .select('story_id')
    .eq('story_id', storyId)
    .single();

  return !error && !!data;
};
