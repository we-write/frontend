'use client';

import { getMyInfo } from '@/api/auth/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import handleError from '@/utils/error';
import toast from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useGetMyInfo = (accessToken: string) => {
  const router = useRouter();

  const query = useQuery({
    queryKey: [QUERY_KEY.MY_INFO],
    queryFn: () => getMyInfo(accessToken),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (query.error) {
      handleError(query.error, {
        onStatus: (status) => {
          if (status === 401) {
            toast.error('로그인 정보가 만료되었습니다. 다시 로그인해주세요.');
            router.push('/auths/signin');
          }
        },
      });
    }
  }, [query.error, router]);

  return query;
};
