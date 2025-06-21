import { SupabaseResponse } from './type';

const throwOnSupabaseError = async <T>(
  operation: () => Promise<SupabaseResponse<T>>
): Promise<T | null> => {
  const response = await operation();

  if (!response) {
    throw new Error('No response received from Supabase');
  }

  if ('error' in response && response.error) {
    throw response.error;
  }

  if ('data' in response && response.data === null) {
    return null;
  }

  return response.data!;
};

export default throwOnSupabaseError;
