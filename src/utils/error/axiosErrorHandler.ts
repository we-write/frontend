import { AxiosError } from 'axios';

type StatusCodeCallback = (statusCode?: number | string) => void;

// Axios 에러 핸들러
const axiosErrorHandler = (
  error: AxiosError,
  statusCodeCallback?: StatusCodeCallback
) => {
  const statusCode = error.response?.status;

  // statusCodeCallback을 먼저 호출
  statusCodeCallback?.(statusCode);

  //TODO : 에러메세지 및 상태코드 상수로 변경 예정
  switch (statusCode) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증이 필요합니다. 로그인 후 다시 시도해주세요.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return `Axios 에러: ${error.message}`;
  }
};

export default axiosErrorHandler;
