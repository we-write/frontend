import instanceBaaS from '../instanceBaaS';

export const getStories = async () => {
  const { data, error } = await instanceBaaS.from('Stories').select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
