import axios from 'axios';

const instanceBaaS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BAAS_URL,
  timeout: 5000,
});
if (!process.env.NEXT_PUBLIC_BAAS_URL) {
  throw new Error('Baas URL is not defined');
}
export default instanceBaaS;
