import React, { PropsWithChildren } from 'react';
import AuthProviderClient from './AuthProvider.client';
import { getMyInfoOnServer } from './authProviderUtil';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const AuthProvider = async ({ children }: PropsWithChildren) => {
  const { isSignIn, accessToken, queryClient } = await getMyInfoOnServer();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthProviderClient isSignIn={isSignIn} accessToken={accessToken ?? ''}>
        {children}
      </AuthProviderClient>
    </HydrationBoundary>
  );
};

export default AuthProvider;
