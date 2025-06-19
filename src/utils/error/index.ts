import { isAxiosError } from 'axios';
import { PostgrestError } from '@supabase/supabase-js';
import axiosErrorHandler from './axiosErrorHandler';
import postgrestErrorHandler from './postgrestErrorHandler';
import { ErrorType, HandleErrorOptions } from './type';

const isPostgrestError = (error: ErrorType): error is PostgrestError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error
  );
};

// 통합 에러 핸들러
const handleError = (error: ErrorType, options?: HandleErrorOptions) => {
  const { onDone, onStatus } = options ?? {};

  if (isAxiosError(error)) {
    axiosErrorHandler(error, onStatus);
  } else if (isPostgrestError(error)) {
    postgrestErrorHandler(error as PostgrestError, onStatus);
  } else if (error instanceof Error) {
    console.log('error', error);
  } else {
    console.error('알 수 없는 에러가 발생했습니다.', error);
  }

  onDone?.();
};

export default handleError;
export { axiosErrorHandler, postgrestErrorHandler, isPostgrestError };
