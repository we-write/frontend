import React, { PropsWithChildren } from 'react';
import AuthProviderClient from './AuthProvider.client';
import { getAuthOnServer } from './auth-utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const AuthProvider = async ({ children }: PropsWithChildren) => {
  const { myInfo, isSignIn, queryClient, accessToken } =
    await getAuthOnServer();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthProviderClient
        myInfo={myInfo}
        isSignIn={isSignIn}
        accessToken={accessToken ?? ''}
      >
        {children}
      </AuthProviderClient>
    </HydrationBoundary>
  );
};

export default AuthProvider;
