'use client';

import { useGetMyInfo } from '@/hooks/api/auth/useGetMyInfo';
import { createContext, useContext } from 'react';
import { AuthContextValue, AuthProviderClientProps } from './type';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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
