'use client';
import { createContext, ReactNode, useContext } from 'react';
import { UserResponse } from '@/types/user';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
interface AuthContextValue {
  userInfo: UserResponse | null;
  isSignIn: boolean;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({
  children,
  hasToken,
}: {
  children: ReactNode;
  hasToken: boolean | undefined;
}) => {
  const isSignIn = !!hasToken;
  const { data: userInfo } = useGetMyInfo(!!isSignIn);
  return (
    <AuthContext.Provider value={{ userInfo, isSignIn }}>
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
