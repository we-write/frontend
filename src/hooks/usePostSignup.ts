import getSignup from '@/api/postSignup';
import { SignUpRequest } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

const usePostSignup = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => getSignup(data),
    onError: (error) => {
      console.error(error);
    },
  });
};

export default usePostSignup;
