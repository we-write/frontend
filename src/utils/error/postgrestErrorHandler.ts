import { PostgrestError } from '@supabase/supabase-js';

type StatusCodeCallback = (statusCode?: number | string) => void;

// Postgrest 에러 핸들러
export const postgrestErrorHandler = (
  error: PostgrestError,
  statusCodeCallback?: StatusCodeCallback
) => {
  switch (error.code) {
    case '23505':
      console.error('중복된 데이터입니다.');
      break;
    case '23503':
      console.error('유효하지 않은 참조입니다.');
      break;
    case '23502':
      console.error('필수 항목이 누락되었습니다.');
      break;
    case '22001':
      console.error('입력 값이 너무 깁니다.');
      break;
    case '22003':
      console.error('숫자 범위를 초과했습니다.');
      break;
    default:
      console.error(`PostgREST 에러: ${error.message}`);
  }

  statusCodeCallback?.(error.code);
};
