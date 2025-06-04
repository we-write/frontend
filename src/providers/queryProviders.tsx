'use client';

import { getQueryClient } from '@/lib/queryClinet';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const QueryProviders = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviders;
