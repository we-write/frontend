import { createUser } from '@/api/auth/api';
import { SignUpRequest } from '@/api/auth/type';
import { useMutation } from '@tanstack/react-query';

const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => createUser(data),
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useCreateUser;
