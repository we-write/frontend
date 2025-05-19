import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('Base URL is not defined');
}
export default instance;
