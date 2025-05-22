//TODO: 병합 후 수정
import { useMutation } from '@tanstack/react-query';
import { postSignIn } from '@/api/auth';
import { SignInFormData } from '@/types/user';
import instance from '@/api/instance';
export const usePostSignin = () => {
  return useMutation({
    mutationFn: (data: SignInFormData) => postSignIn(data),
    onSuccess: async () => {
      //쿠키 태스트
      const res = await instance.get('/auths/user');
      console.log(res.data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
