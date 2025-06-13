'use client';

import { useGetMyInfo } from '@/hooks/api/auth/useGetMyInfo';
import { createContext, useContext } from 'react';
import { AuthContextValue, AuthProviderClientProps } from './type';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProviderClient = ({
  children,
  accessToken,
  isSignIn,
}: AuthProviderClientProps) => {
  const queryResult = useGetMyInfo(accessToken ?? '');
  const { data: myInfo } = queryResult;

  return (
    <AuthContext.Provider
      value={{
        isSignIn,
        myInfo,
        queryMethods: queryResult,
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
