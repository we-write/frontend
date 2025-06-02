import { DB_Content_Response, DB_Story_Response } from '@/types/dbStory';
import instanceBaaS from '../instanceBaaS';

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

export const createStory = async (story: DB_Story_Response) => {
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

export interface GetContentsProps {
  id: string;
  page: number;
  limit: number;
}
export const getContents = async ({
  id,
  page,
  limit,
}: GetContentsProps): Promise<{
  data: DB_Content_Response[];
  count: number;
}> => {
  const from = (page - 1) * limit;
  const to = page * limit - 1;
  const { data, error, count } = await instanceBaaS
    .from('Contents')
    .select('*', { count: 'exact' })
    .eq('story_id', id)
    .order('approved_at', { ascending: true })
    .range(from, to);
  if (error) {
    throw new Error(error.message);
  }
  return { data, count: count ?? 0 };
};
