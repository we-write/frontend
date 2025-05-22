import { SignInFormData } from '@/types/user';
import instance from '../instance';
import axios from 'axios';
import { setCookie } from './cookies';

export const postSignIn = async (data: SignInFormData) => {
  try {
    const res = await instance.post('/auths/signin', data);
    if (res.status === 200) {
      await setCookie('accessToken', res.data.token);

      return res.data;
    }

    throw new Error('로그인 실패');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      const code = error.response?.data.code;
      if (code === 'INVALID_CREDENTIALS') {
        throw new Error(message);
      }
      if (code === 'USER_NOT_FOUND') {
        throw new Error(message);
      }
      if (code === 'SERVER_ERROR') {
        throw new Error(message);
      }
    }
    console.error(error);
    throw error;
  }
};
