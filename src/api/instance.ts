import axios from 'axios';
import { getCookie } from './auths/cookies';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('Baas URL is not defined');
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

  const isExcluded = excludedPaths.some((path) => {
    if (path instanceof RegExp) {
      return path.test(config.url || ''); //정규식 비교
    }
    return path === config.url;
  });

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

export default instance;
