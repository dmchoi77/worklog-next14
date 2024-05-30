'use client';
import React from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider, createTheme } from '@mui/material';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalPortal } from '~/components/Portal/GlobalPortal';

import { getQueryClient } from '~/app/getQueryClient';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

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
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </GlobalPortal.Provider>
  );
}
