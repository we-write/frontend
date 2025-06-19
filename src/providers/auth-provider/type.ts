import { MyInfoResponse } from '@/api/auth/type';
import { QueryClient, UseQueryResult } from '@tanstack/react-query';
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

export interface AuthProviderServerState {
  myInfo: MyInfoResponse | undefined;
  isSignIn: boolean;
  accessToken: string | undefined;
  queryClient: QueryClient;
}
