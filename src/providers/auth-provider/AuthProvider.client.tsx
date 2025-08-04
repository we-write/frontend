'use client';

import { useGetMyInfo } from '@/hooks/api/auth/useGetMyInfo';
import { createContext, useContext } from 'react';
import { AuthContextValue, AuthProviderClientProps } from './type';
import { getUserInfo } from '@/lib/supabase/repositories/users';
import { useQuery } from '@tanstack/react-query';
import { UserInfoResponse } from '@/api/auth/type';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProviderClient = ({
  children,
  accessToken,
  isSignIn,
}: AuthProviderClientProps) => {
  const { data: myInfo, ...rest } = useGetMyInfo(accessToken ?? '');
  const { data: userInfo } = useQuery<UserInfoResponse | null>({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
    enabled: !!accessToken,
  });

  return (
    <AuthContext.Provider
      value={{
        isSignIn,
        myInfo,
        userInfo,
        queryMethods: rest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthContext not found');
  }
  return context;
};

export default AuthProviderClient;
