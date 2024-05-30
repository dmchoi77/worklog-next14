'use client';
import React, { useState } from 'react';

import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';

import { ThemeProvider, createTheme } from '@mui/material';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalPortal } from '~/components/Portal/GlobalPortal';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 0,
          },
        },
      }),
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: '#303030cd',
      },
    },
  });

  return (
    <GlobalPortal.Provider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalPortal.Provider>
  );
}
