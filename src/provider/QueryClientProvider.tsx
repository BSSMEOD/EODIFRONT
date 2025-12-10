'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider as EODIQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useApiError } from '@hooks/useApiError';

interface QueryClientProviderProps {
  children: ReactNode;
}

const TanstackQueryProvider = ({ children }: QueryClientProviderProps) => {
  const { handleError } = useApiError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: handleError,
          },
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <EODIQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </EODIQueryClientProvider>
  );
};

export default TanstackQueryProvider;
