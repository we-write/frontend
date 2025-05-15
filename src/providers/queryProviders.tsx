'use client';

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5분 캐시 지속 시간
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return createQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
  }
};

const QueryProviders = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviders;
