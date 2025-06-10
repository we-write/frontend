import { getCookie } from '@/api/cookies';
import React, { PropsWithChildren } from 'react';
import AuthProviderClient from './AuthProvider.client';
import { QUERY_KEY } from '@/constants/queryKey';
import { getQueryClient } from '@/lib/queryClinet';
import { UserResponse } from '@/types/user';
import { API_PATH } from '@/constants/apiPath';

export const fetchUserInfo = async (accessToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${API_PATH.USER}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.json();
};

const AuthProvider = async ({ children }: PropsWithChildren) => {
  const accessToken = await getCookie('accessToken');
  const queryClient = getQueryClient();

  let userInfo: UserResponse | null = null;
  let isSignIn = false;

  try {
    if (accessToken) {
      const data = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY.MY_INFO],
        queryFn: () => fetchUserInfo(accessToken),
      });
      userInfo = data;
      isSignIn = true;
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    // 토큰이 있지만 유효하지 않은 경우
    isSignIn = false;
    userInfo = null;
  }

  return (
    <AuthProviderClient userInfo={userInfo} isSignIn={isSignIn}>
      {children}
    </AuthProviderClient>
  );
};

export default AuthProvider;
