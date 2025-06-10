'use client';

import { UserResponse } from '@/types/user';
import { createContext } from 'react';

interface AuthContextValue {
  userInfo: UserResponse | null;
  isSignIn: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderClientProps {
  children: React.ReactNode;
  userInfo: UserResponse | null;
  isSignIn: boolean;
}

const AuthProviderClient = ({
  children,
  userInfo,
  isSignIn,
}: AuthProviderClientProps) => {
  return (
    <AuthContext.Provider value={{ userInfo, isSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviderClient;
