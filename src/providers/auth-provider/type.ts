import { MyInfoResponse, UserInfoResponse } from '@/api/auth/type';
import { QueryClient, UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface AuthContextValue {
  isSignIn: boolean;
  myInfo: MyInfoResponse | undefined;
  userInfo?: UserInfoResponse | null;
  queryMethods: Omit<UseQueryResult<MyInfoResponse, Error>, 'data'>;
}

export interface AuthProviderClientProps {
  children: ReactNode;
  isSignIn: boolean;
  accessToken: string;
}

export interface AuthProviderServerState {
  myInfo: UserInfoResponse | undefined;
  isSignIn: boolean;
  accessToken: string | undefined;
  queryClient: QueryClient;
}
