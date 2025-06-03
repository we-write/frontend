import { postSignOut } from '@/api/auth';
import { deleteCookie, getCookie } from '@/api/cookies';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostSignout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      deleteCookie('accessToken');
      // 100~200ms 후에 쿠키 존재 확인 → 제거되었으면 새로고침
      setTimeout(() => {
        const token = getCookie('accessToken');
        if (!token) {
          router.refresh(); // 또는 router.refresh()
        } else {
          console.warn('accessToken이 아직 제거되지 않았습니다.');
        }
      }, 150);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
