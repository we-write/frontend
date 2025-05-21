import { SignUpRequest } from '@/types/user';
import instance from '../instance';
import axios from 'axios';

const createUser = async (data: SignUpRequest) => {
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

export default createUser;
