import { MyInfoResponse } from '@/api/auth/type';
import { UseQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';

export interface AuthContextValue {
  myInfo: MyInfoResponse | undefined;
  isSignIn: boolean;
  queryMethods: UseQueryResult<MyInfoResponse, Error>;
}

export interface AuthProviderClientProps {
  children: ReactNode;
  myInfo: MyInfoResponse | undefined;
  isSignIn: boolean;
  accessToken: string;
}
