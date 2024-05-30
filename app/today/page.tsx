import { cookies } from 'next/headers';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import dayjs, { extend, locale } from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { getQueryClient } from '../getQueryClient';

import { fetchMemoList } from '~/apis/memo';
import { TestComponent } from '~/components/TestComponent';
import { memoQueryKeys } from '~/queries/memo';
import http from '~/utils/http';
import { setTokenToHttp } from '~/utils/token';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');
const todayDate = dayjs().tz().format('YYYY-MM-DD');

export default async function Page() {
  setTokenToHttp();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: memoQueryKeys.fetchMemoList({ date: todayDate }).queryKey,
    queryFn: () => fetchMemoList({ date: todayDate }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestComponent />
      </HydrationBoundary>
    </div>
  );
}
