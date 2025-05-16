import axios from 'axios';

const instanceBaaS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BAAS_URL,
  timeout: 5000,
});

export default instanceBaaS;
