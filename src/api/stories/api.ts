import instanceBaaS from '../instanceBaaS';
import { CreateStoryRequest } from './type';

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
    .eq('id', id)
    .single();
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
