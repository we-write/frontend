import { SignUpRequest, SignInFormData } from '@/types/user';
import { setCookie } from './auths/cookies';
import instance from './instance';
import axios from 'axios';

export const createUser = async (data: SignUpRequest) => {
  try {
    const res = await instance.post('/auths/signup', data);

    if (res.status === 201) {
      return res.data;
    }
    throw new Error('회원가입 실패');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      const code = error.response?.data.code;
      if (code === 'EMAIL_EXISTS') {
        throw new Error(message);
      }
    }
    console.error(error);
    throw error;
  }
};

export const postSignIn = async (data: SignInFormData) => {
  try {
    const res = await instance.post('/auths/signin', data);
    if (res.status === 200) {
      setCookie('accessToken', res.data.token);

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
