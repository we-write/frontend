'use client';

import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import { MyInfoResponse } from '@/types/user';
import { UseQueryResult } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { AuthProviderState } from './authProviderUtil';

type AuthContextValue = Omit<AuthProviderState, 'queryClient'> & {
  queryMethods: UseQueryResult<MyInfoResponse, Error>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderClientProps {
  children: React.ReactNode;
  myInfo: MyInfoResponse | undefined;
  isSignIn: boolean;
  accessToken: string;
}

const AuthProviderClient = ({
  children,
  myInfo,
  isSignIn,
  accessToken,
}: AuthProviderClientProps) => {
  const queryMethods = useGetMyInfo(accessToken);

  return (
    <AuthContext.Provider
      value={{ myInfo, isSignIn, accessToken, queryMethods }}
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
