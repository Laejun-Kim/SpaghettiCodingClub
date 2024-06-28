// app/providers.tsx
'use client';

import { NextUIProvider, Spinner } from '@nextui-org/react';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            console.log('error', error.message);
            // toast.error(error.message);
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {children}
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
