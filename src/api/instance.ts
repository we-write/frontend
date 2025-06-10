import axios from 'axios';
import { deleteCookie, getCookie } from './cookies';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('BASE URL is not defined');
}
instance.interceptors.request.use(async (config) => {
  const excludedPaths = [
    '/auths/signup',
    '/auths/signin',
    '/gatherings',
    /^\/gatherings\/\d+$/, // 숫자로 이루어진 ID를 가진 gatherings 엔드포인트
    '/reviews',
    '/reviews/scores',
  ]; // 검증없이 접근 가능한 경로
  const fullUrl = new URL(config.url || '', config.baseURL || '');
  const path = fullUrl.pathname;
  const isExcluded = excludedPaths.some((rule) =>
    rule instanceof RegExp ? rule.test(path) : rule === path
  );
  if (isExcluded) {
    return config;
  }

  const accessToken = await getCookie('accessToken');
  if (!accessToken) {
    throw new Error('accessToken이 없습니다.');
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response);
    if (error.status === 401) {
      const response = await deleteCookie('refreshToken');
      console.log(response);
      console.log('hello');
    }

    return Promise.reject(error);
  }
);

export default instance;
