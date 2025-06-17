import { AxiosError } from 'axios';

type StatusCodeCallback = (statusCode?: number | string) => void;

// Axios 에러 핸들러
export const axiosErrorHandler = (
  error: AxiosError,
  statusCodeCallback?: StatusCodeCallback
) => {
  const statusCode = error.response?.status;

  switch (statusCode) {
    case 400:
      console.error('잘못된 요청입니다.');
      break;
    case 401:
      console.error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
      break;
    case 403:
      console.error('접근 권한이 없습니다.');
      break;
    case 404:
      console.error('요청한 리소스를 찾을 수 없습니다.');
      break;
    case 500:
      console.error('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      break;
    default:
      console.error(`Axios 에러: ${error.message}`);
  }

  statusCodeCallback?.(statusCode);
};
