import React from 'react';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '../getQueryClient';

import { fetchCalendarYears } from '~/apis/calendar';
import MasterLayout from '~/components/layout/MasterLayout';
import { calendarQueryKeys } from '~/queries/calendar';
import { setTokenToHttp } from '~/utils/token';

export default async function Layout({ children }: { children: React.ReactNode }) {
  setTokenToHttp();

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: calendarQueryKeys.fetchCalendarYears.queryKey,
    queryFn: fetchCalendarYears,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MasterLayout>{children}</MasterLayout>
    </HydrationBoundary>
  );
}
