import { cookies } from 'next/headers';

import React from 'react';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import dayjs, { extend, locale } from 'dayjs';

import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { fetchCalendarYears } from '~/apis/calendar';
import { fetchMemoList } from '~/apis/memo';
import { fetchWorkList } from '~/apis/work';
import { calendarQueryKeys } from '~/queries/calendar';
import { memoQueryKeys } from '~/queries/memo';
import { workQueryKeys } from '~/queries/work';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

const todayDate = dayjs().tz().format('YYYY-MM-DD');
export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  console.log('🚀 ~ Layout ~ cookieStore:', cookieStore.get('access_token'));

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: memoQueryKeys.fetchMemoList({ date: todayDate }).queryKey,
      queryFn: () => fetchMemoList({ date: todayDate }),
      initialData: [],
    }),
    queryClient.prefetchQuery({
      queryKey: workQueryKeys.fetchWorkList({ date: todayDate }).queryKey,
      queryFn: () => fetchWorkList({ date: todayDate }),
    }),
    queryClient.prefetchQuery({
      queryKey: calendarQueryKeys.fetchCalendarYears.queryKey,
      queryFn: () => fetchCalendarYears(),
      initialData: [],
    }),
  ]);

  return (
    <div style={{ width: '100%' }}>
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
    </div>
  );
}
