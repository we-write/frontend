import { checkToken } from '@/api/cookies';
import { AuthProvider } from '@/utils/authContext';
import React, { ReactNode } from 'react';

export const UserInfoProvider = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const hasToken = await checkToken();
  const isSignIn = !!hasToken;
  return <AuthProvider hasToken={isSignIn}>{children}</AuthProvider>;
};
