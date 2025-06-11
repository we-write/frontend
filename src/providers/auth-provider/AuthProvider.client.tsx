'use client';

import { useGetMyInfo } from '@/hooks/api/auth/useGetMyInfo';
import { MyInfoResponse } from '@/api/auth/type';
import { UseQueryResult } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

interface AuthContextValue {
  myInfo: MyInfoResponse | undefined;
  isSignIn: boolean;
  queryMethods: UseQueryResult<MyInfoResponse, Error>;
}

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
    <AuthContext.Provider value={{ myInfo, isSignIn, queryMethods }}>
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
