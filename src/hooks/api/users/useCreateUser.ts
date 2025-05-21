import createUser from '@/api/user/createUser';
import { SignUpRequest } from '@/types/user';
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
