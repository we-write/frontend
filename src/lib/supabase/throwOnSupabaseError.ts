import { SupabaseResponse } from './type';

const throwOnSupabaseError = async <T>(
  operation: () => Promise<SupabaseResponse<T>>
): Promise<T> => {
  const response = await operation();

  if (!response) {
    throw new Error('No response received from Supabase');
  }

  if ('error' in response && response.error) {
    throw response.error;
  }

  if ('data' in response && response.data === null) {
    throw new Error('No data found');
  }

  return response.data!;
};

export default throwOnSupabaseError;
