import { DBContentResponse, DBStoryResponse } from '@/types/dbStory';
import instanceBaaS from '../instanceBaaS';
import { GetContentsProps } from './type';

export const getStories = async ({
  keyword,
  searchType,
  genres,
  offset,
  limit,
}: {
  keyword: string;
  searchType: '제목' | '소개글';
  genres: string[];
  offset: number;
  limit: number;
}) => {
  const from = offset * limit;
  const to = from + limit - 1;

  let query = instanceBaaS.from('Stories').select('*');

  // keyword로 제목, 소개글 검색
  if (keyword.trim() !== '') {
    const column = searchType === '제목' ? 'title' : 'summary';
    query = query.ilike(column, `%` + keyword + `%`);
  }

  // '전체' 선택 시 필터 생략, 그렇지 않으면 장르 배열로 필터
  const validGenres = genres.filter((g) => g !== '전체');
  if (validGenres.length > 0) {
    query = query.in('genre', validGenres); // Supabase의 `.in()` 사용
  }

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const getStory = async (id: string) => {
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
): Promise<{ data: DBContentResponse }> => {
  const { data, error } = await instanceBaaS
    .from('Contents')
    .select('*')
    .eq('story_id', id)
    .order('merged_at', { ascending: false })
    .limit(1)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};

export const createStory = async (story: DBStoryResponse) => {
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
  id,
  page,
  limit,
}: GetContentsProps): Promise<{
  data: DBContentResponse[];
  count: number;
}> => {
  const from = (page - 1) * limit;
  const to = page * limit - 1;
  const { data, error, count } = await instanceBaaS
    .from('Contents')
    .select('*', { count: 'exact' })
    .eq('story_id', id)
    .order('merged_at', { ascending: true })
    .range(from, to);
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
    } else {
      throw new Error('스토리 승인 기준 미달');
    }
  } catch (error) {
    throw new Error(error as string);
  }
};
