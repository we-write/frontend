import { SignUpRequest, SigninRequest, UserRequest } from '@/types/user';

import { setCookie } from './cookies';
import instance from './instance';
import axios from 'axios';
import { API_PATH } from '@/constants/apiPath';

export const createUser = async (data: SignUpRequest) => {
  try {
    const res = await instance.post(API_PATH.SIGN_UP, data);

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
      if (code === 'VALIDATION_ERROR') {
        throw new Error(message);
      }
    }
    console.error(error);
    throw error;
  }
};

export const postSignIn = async (data: SigninRequest) => {
  try {
    const res = await instance.post(API_PATH.SIGN_IN, data);
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
        throw new Error(JSON.stringify({ code, message }));
      }
      if (code === 'USER_NOT_FOUND') {
        throw new Error(JSON.stringify({ code, message }));
      }
      if (code === 'SERVER_ERROR') {
        throw new Error(JSON.stringify({ code, message }));
      }
      if (code === 'VALIDATION_ERROR') {
        throw new Error(JSON.stringify({ code, message }));
      }
    }

    throw error;
  }
};

export const postSignOut = async () => {
  try {
    const res = await instance.post(API_PATH.SIGN_OUT);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error('로그아웃 실패');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMyInfo = async () => {
  try {
    const res = await instance.get(API_PATH.USER);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 401) {
      throw new Error('인증이 필요합니다');
    }
    if (res.status === 404) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    throw new Error('유저 정보 조회 실패');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserInfo = async (updateMyInfo: UserRequest) => {
  const formData = new FormData();
  if (updateMyInfo.companyName !== null) {
    formData.append('companyName', updateMyInfo.companyName);
  }
  if (updateMyInfo.image) {
    formData.append('image', updateMyInfo.image);
  }

  try {
    const res = await instance.put(API_PATH.USER, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    switch (res.status) {
      case 200:
        return res.data;
      default:
        throw new Error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
