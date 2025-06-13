import { MyInfoResponse } from '@/api/auth/type';
import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface AuthContextValue {
  isSignIn: boolean;
  myInfo: MyInfoResponse | undefined;
  queryMethods: Omit<UseQueryResult<MyInfoResponse, Error>, 'data'>;
}

export interface AuthProviderClientProps {
  children: ReactNode;
  isSignIn: boolean;
  accessToken: string;
}
