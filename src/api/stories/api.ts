import { DBContentResponse, DBStoryResponse } from '@/types/dbStory';
import instanceBaaS from '../instanceBaaS';
import { GetContentsProps } from './type';

export const getStories = async () => {
  const { data, error } = await instanceBaaS.from('Stories').select('*');

  if (error) {
    throw new Error(error.message);
  }
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
