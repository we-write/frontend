import { PostgrestError } from '@supabase/supabase-js';
import { StatusCodeCallback } from './type';

// Postgrest 에러 핸들러
const postgrestErrorHandler = (
  error: PostgrestError,
  statusCodeCallback?: StatusCodeCallback
) => {
  statusCodeCallback?.(error.code);

  switch (error.code) {
    case '23505':
      return '중복된 데이터입니다.';
    case '23503':
      return '유효하지 않은 참조입니다.';
    case '23502':
      return '필수 항목이 누락되었습니다.';
    case '22001':
      return '입력 값이 너무 깁니다.';
    case '22003':
      return '숫자 범위를 초과했습니다.';
    default:
      return `PostgREST 에러: ${error.message}`;
  }
};

export default postgrestErrorHandler;
