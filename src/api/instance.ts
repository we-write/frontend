import axios from 'axios';
import { getCookie } from './cookies';

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
    /^\/gatherings\/\d+(\/.*)?$/,
    '/reviews',
    '/reviews/scores',
  ]; // 검증없이 접근 가능한 경로

  const fullUrl = new URL(config.url || '', config.baseURL || '');
  const path = fullUrl.pathname;
  const isExcluded = excludedPaths.some((rule) =>
    rule instanceof RegExp ? rule.test(path) : rule === path
  );

  const accessToken = await getCookie('accessToken');

  //TODO: 임시적으로 처리 추후 삭제
  if (path.includes('cancel')) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  if (isExcluded) {
    return config;
  }

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
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
