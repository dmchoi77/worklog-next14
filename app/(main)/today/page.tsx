import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import dayjs, { extend, locale } from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { getQueryClient } from '../../getQueryClient';

import { fetchMemoList } from '~/apis/memo';
import { fetchWorkList } from '~/apis/work';
import { TestComponent } from '~/components/TestComponent';
import { memoQueryKeys } from '~/queries/memo';
import { workQueryKeys } from '~/queries/work';
import { setTokenToHttp } from '~/utils/token';

extend(utc);
extend(timezone);
locale('ko');
dayjs.tz.setDefault('Asia/Seoul');
const todayDate = dayjs().tz().format('YYYY-MM-DD');

export default async function Page() {
  setTokenToHttp();

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: memoQueryKeys.fetchMemoList({ date: todayDate }).queryKey,
      queryFn: () => fetchMemoList({ date: todayDate }),
    }),
    queryClient.prefetchQuery({
      queryKey: workQueryKeys.fetchWorkList({ date: todayDate }).queryKey,
      queryFn: () => fetchWorkList({ date: todayDate }),
    }),
  ]);
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TestComponent />
      </HydrationBoundary>
    </div>
  );
}
