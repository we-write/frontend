import { createUser } from '@/api/auth/api';
import { SignUpRequest } from '@/api/auth/type';
import { useMutation } from '@tanstack/react-query';
import toast from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';

const useCreateUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignUpRequest) => createUser(data),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다.');
      router.push(APP_ROUTES.signin);
    },
    onError: (error) => {
      toast({
        type: 'error',
        title: '회원가입에 실패했습니다.',
        message: error.message,
        duration: 5,
      });
    },
  });
};

export default useCreateUser;
